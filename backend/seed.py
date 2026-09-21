from decimal import Decimal

from app.db import SessionLocal
from app.models import Vehicle


SAMPLE_VEHICLES = [
    {
        "placa": "HYO-101",
        "tipo": "CAMIONETA",
        "capacidad_kg": Decimal("800"),
        "consumo_km_l": Decimal("12.000"),
        "factor_co2_kg_km": Decimal("0.2200"),
        "anio_fabricacion": 2022,
        "estado": "DISPONIBLE",
    },
    {
        "placa": "HYO-202",
        "tipo": "FURGON",
        "capacidad_kg": Decimal("1500"),
        "consumo_km_l": Decimal("9.500"),
        "factor_co2_kg_km": Decimal("0.2800"),
        "anio_fabricacion": 2021,
        "estado": "DISPONIBLE",
    },
    {
        "placa": "HYO-303",
        "tipo": "MOTO",
        "capacidad_kg": Decimal("120"),
        "consumo_km_l": Decimal("32.000"),
        "factor_co2_kg_km": Decimal("0.0700"),
        "anio_fabricacion": 2024,
        "estado": "DISPONIBLE",
    },
]

with SessionLocal() as db:
    for item in SAMPLE_VEHICLES:
        exists = db.query(Vehicle).filter(Vehicle.placa == item["placa"]).first()
        if not exists:
            db.add(Vehicle(**item))
    db.commit()

print("Datos de ejemplo cargados correctamente.")
