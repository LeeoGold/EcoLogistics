import uuid

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete

from app.db import SessionLocal
from app.main import app
from app.models.vehicle import Vehicle


@pytest.fixture()
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def vehicle_payload():
    suffix = uuid.uuid4().hex[:6].upper()
    return {
        "placa": f"TST-{suffix}",
        "tipo": "CAMIONETA",
        "capacidad_kg": 1000,
        "consumo_km_l": 10,
        "factor_co2_kg_km": 0.25,
        "anio_fabricacion": 2024,
        "estado": "DISPONIBLE",
    }


@pytest.fixture(autouse=True)
def cleanup_test_vehicles():
    yield
    db = SessionLocal()
    try:
        db.execute(delete(Vehicle).where(Vehicle.placa.like("TST-%")))
        db.commit()
    finally:
        db.close()
