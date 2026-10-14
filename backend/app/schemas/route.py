from datetime import date, datetime, time
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field, field_validator


class RouteCreate(BaseModel):
    fecha_planificada: date
    hora_inicio: time
    conductor_id: UUID
    vehiculo_id: UUID
    pedido_ids: list[UUID] = Field(min_length=1, max_length=30)

    @field_validator("pedido_ids")
    @classmethod
    def pedidos_sin_repetir(cls, value: list[UUID]) -> list[UUID]:
        if len(set(value)) != len(value):
            raise ValueError("No se puede incluir el mismo pedido más de una vez.")
        return value


class RouteRead(BaseModel):
    ruta_id: UUID
    fecha_planificada: date
    estado: str
    creada_en: datetime
    conductor_id: UUID | None = None
    conductor_nombre: str | None = None
    vehiculo_id: UUID | None = None
    vehiculo_placa: str | None = None
    hora_inicio: time | None = None
    cantidad_pedidos: int
    pedido_ids: list[UUID]
    peso_total_kg: Decimal
