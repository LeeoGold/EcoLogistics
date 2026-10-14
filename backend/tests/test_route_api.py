from datetime import date, datetime, time, timedelta, timezone
from uuid import uuid4

import pytest


def create_route_resources(client, *, driver_state="ACTIVO", vehicle_state="DISPONIBLE", capacity=1000, weight=100):
    suffix = uuid4().hex[:7].upper()
    client_payload = {
        "nombre": f"Cliente Rutas {suffix}",
        "contacto": "987654321",
        "direccion_referencia": "Av. Real 100, Huancayo",
        "latitud": -12.0656,
        "longitud": -75.2040,
        "horario_preferido_inicio": "08:00:00",
        "horario_preferido_fin": "17:00:00",
        "restricciones_acceso": None,
    }
    client_response = client.post("/api/clientes", json=client_payload)
    assert client_response.status_code == 201, client_response.text
    client_id = client_response.json()["cliente_id"]

    driver_payload = {
        "nombre_completo": f"Conductor Ruta {suffix}",
        "documento_identidad": f"RTE{suffix}",
        "licencia": f"LIC{suffix}",
        "categoria_licencia": "A-IIb",
        "anios_experiencia": 4,
        "disponibilidad_inicio": "08:00:00",
        "disponibilidad_fin": "17:00:00",
        "contacto": "999111222",
        "estado": driver_state,
    }
    driver_response = client.post("/api/conductores", json=driver_payload)
    assert driver_response.status_code == 201, driver_response.text
    driver_id = driver_response.json()["conductor_id"]

    vehicle_payload = {
        "placa": f"RUT-{suffix}",
        "tipo": "CAMIONETA",
        "capacidad_kg": capacity,
        "consumo_km_gal": 10,
        "factor_co2_kg_km": 0.25,
        "anio_fabricacion": 2024,
        "estado": vehicle_state,
    }
    vehicle_response = client.post("/api/vehiculos", json=vehicle_payload)
    assert vehicle_response.status_code == 201, vehicle_response.text
    vehicle_id = vehicle_response.json()["vehiculo_id"]

    today = date.today()
    start = datetime.combine(today, time(9, 0), tzinfo=timezone(timedelta(hours=-5)))
    end = datetime.combine(today, time(12, 0), tzinfo=timezone(timedelta(hours=-5)))
    order_payload = {
        "cliente_id": client_id,
        "peso_kg": weight,
        "volumen_m3": 0.5,
        "ventana_inicio": start.isoformat(),
        "ventana_fin": end.isoformat(),
        "prioridad": "ESTANDAR",
        "tipo_producto": "NO_PERECEDERO",
        "estado": "PENDIENTE",
        "referencia_entrega": "Entrada principal",
    }
    order_response = client.post("/api/pedidos", json=order_payload)
    assert order_response.status_code == 201, order_response.text

    return {
        "client_id": client_id,
        "driver_id": driver_id,
        "vehicle_id": vehicle_id,
        "order_id": order_response.json()["pedido_id"],
        "date": today.isoformat(),
        "suffix": suffix,
    }


def route_payload(resources, *, hora_inicio="10:00", pedido_ids=None):
    return {
        "fecha_planificada": resources["date"],
        "hora_inicio": hora_inicio,
        "conductor_id": resources["driver_id"],
        "vehiculo_id": resources["vehicle_id"],
        "pedido_ids": pedido_ids or [resources["order_id"]],
    }


def test_create_route_assigns_pending_orders(client):
    resources = create_route_resources(client)

    response = client.post("/api/rutas", json=route_payload(resources))

    assert response.status_code == 201, response.text
    route = response.json()
    assert route["estado"] == "PLANIFICADA"
    assert route["conductor_id"] == resources["driver_id"]
    assert route["vehiculo_id"] == resources["vehicle_id"]
    assert route["cantidad_pedidos"] == 1
    assert route["pedido_ids"] == [resources["order_id"]]
    assert float(route["peso_total_kg"]) == pytest.approx(100)

    order_response = client.get(f"/api/pedidos/{resources['order_id']}")
    assert order_response.status_code == 200
    assert order_response.json()["estado"] == "ASIGNADO"


def test_list_routes_includes_created_assignment(client):
    resources = create_route_resources(client)
    create_response = client.post("/api/rutas", json=route_payload(resources))
    assert create_response.status_code == 201, create_response.text

    response = client.get("/api/rutas")

    assert response.status_code == 200
    matching = [item for item in response.json() if item["ruta_id"] == create_response.json()["ruta_id"]]
    assert len(matching) == 1
    assert matching[0]["vehiculo_placa"].startswith("RUT-")


def test_route_rejects_load_over_vehicle_capacity(client):
    resources = create_route_resources(client, capacity=50, weight=100)

    response = client.post("/api/rutas", json=route_payload(resources))

    assert response.status_code == 409
    assert "capacidad" in response.json()["detail"].lower()


def test_route_rejects_driver_outside_availability(client):
    resources = create_route_resources(client)

    response = client.post("/api/rutas", json=route_payload(resources, hora_inicio="18:00"))

    assert response.status_code == 422
    assert "disponibilidad" in response.json()["detail"].lower()


def test_route_rejects_inactive_driver(client):
    resources = create_route_resources(client, driver_state="INACTIVO")

    response = client.post("/api/rutas", json=route_payload(resources))

    assert response.status_code == 409
    assert "activo" in response.json()["detail"].lower()


def test_route_rejects_unknown_order(client):
    resources = create_route_resources(client)

    response = client.post(
        "/api/rutas",
        json=route_payload(resources, pedido_ids=[str(uuid4())]),
    )

    assert response.status_code == 404
    assert "pedidos" in response.json()["detail"].lower()


def test_route_rejects_repeated_order_ids(client):
    resources = create_route_resources(client)

    response = client.post(
        "/api/rutas",
        json=route_payload(resources, pedido_ids=[resources["order_id"], resources["order_id"]]),
    )

    assert response.status_code == 422
    assert "más de una vez" in response.json()["detail"][0]["msg"]


def test_route_rejects_order_that_is_not_pending(client):
    resources = create_route_resources(client)
    from app.db import SessionLocal
    from app.models.order import Order
    from sqlalchemy import select
    from uuid import UUID

    db = SessionLocal()
    try:
        order = db.scalar(select(Order).where(Order.pedido_id == UUID(resources["order_id"])))
        assert order is not None
        order.estado = "ENTREGADO"
        db.commit()
    finally:
        db.close()

    response = client.post("/api/rutas", json=route_payload(resources))

    assert response.status_code == 409
    assert "PENDIENTES" in response.json()["detail"]


def test_route_rejects_unknown_driver(client):
    resources = create_route_resources(client)
    payload = route_payload(resources)
    payload["conductor_id"] = str(uuid4())

    response = client.post("/api/rutas", json=payload)

    assert response.status_code == 404
    assert "conductor" in response.json()["detail"].lower()


def test_route_rejects_unknown_vehicle(client):
    resources = create_route_resources(client)
    payload = route_payload(resources)
    payload["vehiculo_id"] = str(uuid4())

    response = client.post("/api/rutas", json=payload)

    assert response.status_code == 404
    assert "vehículo" in response.json()["detail"].lower()


def test_route_rejects_vehicle_that_is_not_available(client):
    resources = create_route_resources(client, vehicle_state="MANTENIMIENTO")

    response = client.post("/api/rutas", json=route_payload(resources))

    assert response.status_code == 409
    assert "DISPONIBLE" in response.json()["detail"]


def test_route_rejects_conflicting_driver_or_vehicle_schedule(client):
    first = create_route_resources(client)
    first_response = client.post("/api/rutas", json=route_payload(first, hora_inicio="09:00"))
    assert first_response.status_code == 201, first_response.text

    second = create_route_resources(client)
    payload = route_payload(second, hora_inicio="11:00")
    payload["conductor_id"] = first["driver_id"]
    payload["vehiculo_id"] = first["vehicle_id"]

    response = client.post("/api/rutas", json=payload)

    assert response.status_code == 409
    assert "asignación" in response.json()["detail"].lower()


def test_get_missing_route_returns_404(client):
    response = client.get(f"/api/rutas/{uuid4()}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Ruta no encontrada."
