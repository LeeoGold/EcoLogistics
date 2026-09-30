from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class VehicleBase(BaseModel):
    placa: str = Field(min_length=1, max_length=15)
    tipo: str = Field(min_length=1, max_length=30)
    capacidad_kg: Decimal = Field(gt=0)
    consumo_km_gal: Decimal = Field(
        gt=0,
        description="Distancia estimada que el vehículo recorre por galón estadounidense.",
    )
    factor_co2_kg_km: Decimal = Field(
        ge=0,
        description="Kilogramos de CO₂ estimados emitidos por cada kilómetro recorrido.",
    )
    anio_fabricacion: int = Field(ge=1900, le=date.today().year + 1)
    estado: str = Field(default="DISPONIBLE", min_length=1, max_length=20)


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(VehicleBase):
    pass


class VehicleRead(VehicleBase):
    model_config = ConfigDict(from_attributes=True)
    vehiculo_id: UUID
