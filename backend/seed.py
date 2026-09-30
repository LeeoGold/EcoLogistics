from decimal import Decimal

from app.db import SessionLocal
from app.models import Vehicle


SAMPLE_VEHICLES = [
    {
        "placa": "HYO-401",
        "tipo": "CAMIONETA",
        "capacidad_kg": Decimal("900"),
        "consumo_km_gal": Decimal("42.500"),
        "factor_co2_kg_km": Decimal("0.2150"),
        "anio_fabricacion": 2023,
        "estado": "DISPONIBLE",
    },
    {
        "placa": "HYO-402",
        "tipo": "FURGON",
        "capacidad_kg": Decimal("1800"),
        "consumo_km_gal": Decimal("33.200"),
        "factor_co2_kg_km": Decimal("0.2950"),
        "anio_fabricacion": 2022,
        "estado": "DISPONIBLE",
    },
    {
        "placa": "HYO-403",
        "tipo": "MOTO",
        "capacidad_kg": Decimal("150"),
        "consumo_km_gal": Decimal("118.000"),
        "factor_co2_kg_km": Decimal("0.0650"),
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
