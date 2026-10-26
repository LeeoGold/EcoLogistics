from datetime import date
from decimal import Decimal

import pytest
from pydantic import ValidationError

from app.schemas.vehicle import VehicleCreate


def datos_vehiculo(anio: int) -> dict[str, object]:
    return {
        "placa": "TEST-001",
        "tipo": "CAMION",
        "capacidad_kg": Decimal("1000"),
        "consumo_km_gal": Decimal("20"),
        "factor_co2_kg_km": Decimal("0.5"),
        "anio_fabricacion": anio,
    }


def test_vehiculo_acepta_anio_actual():
    anio = date.today().year
    vehiculo = VehicleCreate(**datos_vehiculo(anio))
    assert vehiculo.anio_fabricacion == anio


def test_vehiculo_acepta_anio_siguiente():
    anio = date.today().year + 1
    vehiculo = VehicleCreate(**datos_vehiculo(anio))
    assert vehiculo.anio_fabricacion == anio


def test_vehiculo_rechaza_anio_demasiado_futuro():
    anio = date.today().year + 2
    with pytest.raises(ValidationError):
        VehicleCreate(**datos_vehiculo(anio))


def test_vehiculo_rechaza_anio_anterior_al_minimo():
    with pytest.raises(ValidationError):
        VehicleCreate(**datos_vehiculo(1899))
