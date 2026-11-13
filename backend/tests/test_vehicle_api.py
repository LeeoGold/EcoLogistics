from datetime import date, datetime, time
from decimal import Decimal
from uuid import UUID, uuid4
from zoneinfo import ZoneInfo

from app.db import SessionLocal
from app.models.driver import Driver
from app.models.route import DriverAssignment, Route


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "project": "EcoLogística Huancayo",
    }


def test_list_vehicles_returns_200(client):
    response = client.get("/api/vehiculos")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_vehicle_and_get_it(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["placa"] == vehicle_payload["placa"]
    assert "vehiculo_id" in created

    get_response = client.get(f"/api/vehiculos/{created['vehiculo_id']}")

    assert get_response.status_code == 200
    assert get_response.json()["placa"] == vehicle_payload["placa"]


def test_list_contains_created_vehicle(client, vehicle_payload):
    client.post("/api/vehiculos", json=vehicle_payload)

    response = client.get("/api/vehiculos")
    vehicles = response.json()

    assert any(item["placa"] == vehicle_payload["placa"] for item in vehicles)


def test_duplicate_plate_is_rejected(client, vehicle_payload):
    first = client.post("/api/vehiculos", json=vehicle_payload)
    second = client.post("/api/vehiculos", json=vehicle_payload)

    assert first.status_code == 201
    assert second.status_code == 409
    assert second.json()["detail"] == "La placa ya está registrada"


def test_invalid_capacity_is_rejected(client, vehicle_payload):
    vehicle_payload["capacidad_kg"] = 0

    response = client.post("/api/vehiculos", json=vehicle_payload)

    assert response.status_code == 422


def test_get_missing_vehicle_returns_404(client):
    response = client.get(f"/api/vehiculos/{uuid4()}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehículo no encontrado"


def test_update_vehicle(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)
    created = create_response.json()
    updated_plate = vehicle_payload["placa"].replace("TST-", "TSTU-")

    update_payload = {**vehicle_payload, "placa": updated_plate, "capacidad_kg": 1500}
    response = client.put(
        f"/api/vehiculos/{created['vehiculo_id']}",
        json=update_payload,
    )

    assert response.status_code == 200
    assert response.json()["placa"] == updated_plate
    assert Decimal(str(response.json()["capacidad_kg"])) == Decimal("1500")


def test_update_to_duplicate_plate_is_rejected(client):
    first_payload = {"placa": "TST-AAAAAA", "tipo": "CAMIONETA", "capacidad_kg": 1000,
                     "consumo_km_gal": 10, "factor_co2_kg_km": 0.25, "anio_fabricacion": 2024,
                     "estado": "DISPONIBLE"}
    second_payload = {**first_payload, "placa": "TST-BBBBBB"}

    first = client.post("/api/vehiculos", json=first_payload)
    second = client.post("/api/vehiculos", json=second_payload)

    assert first.status_code == 201
    assert second.status_code == 201

    update_response = client.put(
        f"/api/vehiculos/{second.json()['vehiculo_id']}",
        json=first_payload,
    )

    assert update_response.status_code == 409


def test_delete_vehicle(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)
    vehicle_id = create_response.json()["vehiculo_id"]

    delete_response = client.delete(f"/api/vehiculos/{vehicle_id}")
    assert delete_response.status_code == 204

    get_response = client.get(f"/api/vehiculos/{vehicle_id}")
    assert get_response.status_code == 404


def test_delete_vehicle_assigned_to_route_returns_conflict(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)
    assert create_response.status_code == 201
    vehicle_id = create_response.json()["vehiculo_id"]

    suffix = uuid4().hex[:10]
    driver = Driver(
        nombre_completo="Conductor de prueba",
        documento_identidad=f"DOC-{suffix}",
        licencia=f"LIC-{suffix}",
        categoria_licencia="A-IIa",
        anios_experiencia=3,
        disponibilidad_inicio=time(7, 0),
        disponibilidad_fin=time(18, 0),
        contacto="999999999",
        estado="ACTIVO",
    )

    with SessionLocal() as db:
        db.add(driver)
        route = Route(fecha_planificada=date.today(), estado="PLANIFICADA")
        db.add(route)
        db.flush()
        assignment = DriverAssignment(
            ruta_id=route.ruta_id,
            conductor_id=driver.conductor_id,
            vehiculo_id=UUID(vehicle_id),
            hora_inicio=datetime.now(ZoneInfo("America/Lima")),
        )
        db.add(assignment)
        db.commit()
        route_id = route.ruta_id
        driver_id = driver.conductor_id
        assignment_id = assignment.asignacion_id

    try:
        response = client.delete(f"/api/vehiculos/{vehicle_id}")
        assert response.status_code == 409
        assert response.json()["detail"] == (
            "No se puede eliminar el vehículo porque está asociado a una ruta."
        )
        assert client.get(f"/api/vehiculos/{vehicle_id}").status_code == 200
    finally:
        with SessionLocal() as db:
            assignment = db.get(DriverAssignment, assignment_id)
            route = db.get(Route, route_id)
            driver_record = db.get(Driver, driver_id)
            if assignment is not None:
                db.delete(assignment)
            if route is not None:
                db.delete(route)
            if driver_record is not None:
                db.delete(driver_record)
            db.commit()


def test_delete_missing_vehicle_returns_404(client):
    response = client.delete(f"/api/vehiculos/{uuid4()}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehículo no encontrado"


def test_paginated_vehicles_returns_metadata(client):
    response = client.get("/api/vehiculos/pagina?page=1&page_size=12")
    assert response.status_code == 200
    payload = response.json()
    assert payload["page"] == 1
    assert payload["page_size"] == 12
    assert len(payload["items"]) <= 12


def test_paginated_vehicle_list_supports_private_etag_revalidation(client):
    first = client.get("/api/vehiculos/pagina?page=1&page_size=12")

    assert first.status_code == 200
    etag = first.headers.get("etag")
    assert etag
    assert first.headers.get("cache-control") == "private, no-cache"
    assert "authorization" in first.headers.get("vary", "").lower()

    second = client.get(
        "/api/vehiculos/pagina?page=1&page_size=12",
        headers={"If-None-Match": etag},
    )

    assert second.status_code == 304
    assert second.content == b""
    assert second.headers.get("etag") == etag


def test_operator_can_create_but_cannot_update_or_delete_vehicle(
    operator_client, vehicle_payload
):
    create_response = operator_client.post("/api/vehiculos", json=vehicle_payload)
    assert create_response.status_code == 201
    vehicle_id = create_response.json()["vehiculo_id"]

    update_payload = {**vehicle_payload, "capacidad_kg": 1500}
    update_response = operator_client.put(
        f"/api/vehiculos/{vehicle_id}",
        json=update_payload,
    )
    assert update_response.status_code == 403

    delete_response = operator_client.delete(f"/api/vehiculos/{vehicle_id}")
    assert delete_response.status_code == 403

    get_response = operator_client.get(f"/api/vehiculos/{vehicle_id}")
    assert get_response.status_code == 200
    assert Decimal(str(get_response.json()["capacidad_kg"])) == Decimal("1000")


def test_vehicle_list_uses_gzip_when_response_exceeds_threshold(client, vehicle_payload):
    suffix = vehicle_payload["placa"].removeprefix("TST-")

    for index in range(5):
        payload = {**vehicle_payload, "placa": f"TST-{suffix}-{index}"}
        created = client.post("/api/vehiculos", json=payload)
        assert created.status_code == 201

    response = client.get(
        "/api/vehiculos",
        headers={"Accept-Encoding": "gzip"},
    )

    assert response.status_code == 200
    assert response.headers.get("content-encoding") == "gzip"
    assert "accept-encoding" in response.headers.get("vary", "").lower()
    assert isinstance(response.json(), list)
