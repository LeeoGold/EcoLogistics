from uuid import uuid4

import pytest
from sqlalchemy import delete

from app.db import SessionLocal
from app.models.client import Client


@pytest.fixture()
def client_payload():
    suffix = uuid4().hex[:6].upper()
    return {
        "nombre": f"TEST Cliente {suffix}",
        "contacto": "987654321",
        "direccion_referencia": "Av. Real 123, Huancayo",
        "latitud": -12.0656,
        "longitud": -75.2040,
        "horario_preferido_inicio": "09:00:00",
        "horario_preferido_fin": "12:00:00",
        "restricciones_acceso": "Ingreso por puerta principal",
    }


@pytest.fixture(autouse=True)
def cleanup_test_clients():
    yield
    db = SessionLocal()
    try:
        db.execute(delete(Client).where(Client.nombre.like("TEST Cliente %")))
        db.commit()
    finally:
        db.close()


def test_list_clients_returns_200(client):
    response = client.get("/api/clientes")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_client_and_get_it(client, client_payload):
    create_response = client.post("/api/clientes", json=client_payload)

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["nombre"] == client_payload["nombre"]
    assert "cliente_id" in created

    get_response = client.get(f"/api/clientes/{created['cliente_id']}")

    assert get_response.status_code == 200
    assert get_response.json()["nombre"] == client_payload["nombre"]


def test_invalid_client_without_required_name_is_rejected(client, client_payload):
    client_payload.pop("nombre")

    response = client.post("/api/clientes", json=client_payload)

    assert response.status_code == 422


def test_invalid_coordinates_are_rejected(client, client_payload):
    client_payload["latitud"] = 100

    response = client.post("/api/clientes", json=client_payload)

    assert response.status_code == 422


def test_invalid_preferred_schedule_is_rejected(client, client_payload):
    client_payload["horario_preferido_inicio"] = "14:00:00"
    client_payload["horario_preferido_fin"] = "10:00:00"

    response = client.post("/api/clientes", json=client_payload)

    assert response.status_code == 422


def test_partial_preferred_schedule_is_rejected(client, client_payload):
    client_payload["horario_preferido_inicio"] = "09:00:00"
    client_payload["horario_preferido_fin"] = None

    response = client.post("/api/clientes", json=client_payload)

    assert response.status_code == 422
