from uuid import uuid4

import pytest
from sqlalchemy import delete

from app.db import SessionLocal
from app.models.client import Client
from app.models.order import Order


@pytest.fixture()
def order_client_payload():
    suffix = uuid4().hex[:6].upper()
    return {
        "nombre": f"TEST Pedido Cliente {suffix}",
        "contacto": "987654321",
        "direccion_referencia": "Av. Real 456, Huancayo",
        "latitud": -12.0656,
        "longitud": -75.2040,
        "horario_preferido_inicio": "09:00:00",
        "horario_preferido_fin": "12:00:00",
        "restricciones_acceso": None,
    }


@pytest.fixture()
def order_payload(client, order_client_payload):
    client_response = client.post("/api/clientes", json=order_client_payload)
    assert client_response.status_code == 201

    return {
        "cliente_id": client_response.json()["cliente_id"],
        "peso_kg": 25.5,
        "volumen_m3": 0.45,
        "ventana_inicio": "2026-09-30T09:00:00-05:00",
        "ventana_fin": "2026-09-30T12:00:00-05:00",
        "prioridad": "EXPRESS",
        "tipo_producto": "PERECEDERO",
        "estado": "PENDIENTE",
        "referencia_entrega": "Puerta lateral, referencia al almacén.",
    }


@pytest.fixture(autouse=True)
def cleanup_test_orders():
    yield
    db = SessionLocal()
    try:
        test_client_ids = db.query(Client.cliente_id).filter(
            Client.nombre.like("TEST Pedido Cliente %")
        ).subquery()
        db.query(Order).filter(Order.cliente_id.in_(test_client_ids)).delete(
            synchronize_session=False
        )
        db.query(Client).filter(Client.nombre.like("TEST Pedido Cliente %")).delete(
            synchronize_session=False
        )
        db.commit()
    finally:
        db.close()


def test_list_orders_returns_200(client):
    response = client.get("/api/pedidos")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_order_and_get_it(client, order_payload):
    create_response = client.post("/api/pedidos", json=order_payload)

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["cliente_id"] == order_payload["cliente_id"]
    assert "pedido_id" in created

    get_response = client.get(f"/api/pedidos/{created['pedido_id']}")

    assert get_response.status_code == 200
    assert get_response.json()["pedido_id"] == created["pedido_id"]


def test_invalid_required_data_is_rejected(client, order_payload):
    order_payload.pop("cliente_id")

    response = client.post("/api/pedidos", json=order_payload)

    assert response.status_code == 422


def test_invalid_time_window_is_rejected(client, order_payload):
    order_payload["ventana_inicio"] = "2026-09-30T14:00:00-05:00"
    order_payload["ventana_fin"] = "2026-09-30T10:00:00-05:00"

    response = client.post("/api/pedidos", json=order_payload)

    assert response.status_code == 422


def test_invalid_weight_is_rejected(client, order_payload):
    order_payload["peso_kg"] = 0

    response = client.post("/api/pedidos", json=order_payload)

    assert response.status_code == 422


def test_invalid_product_type_is_rejected(client, order_payload):
    order_payload["tipo_producto"] = "TOXICO"

    response = client.post("/api/pedidos", json=order_payload)

    assert response.status_code == 422


def test_missing_client_is_rejected(client, order_payload):
    order_payload["cliente_id"] = str(uuid4())

    response = client.post("/api/pedidos", json=order_payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "El cliente indicado no existe"


def test_get_missing_order_returns_404(client):
    response = client.get(f"/api/pedidos/{uuid4()}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Pedido no encontrado"
