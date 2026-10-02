from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class OrderBase(BaseModel):
    cliente_id: UUID
    peso_kg: Decimal = Field(gt=0)
    volumen_m3: Decimal = Field(gt=0)
    ventana_inicio: datetime
    ventana_fin: datetime
    prioridad: str = Field(min_length=1, max_length=20)
    tipo_producto: str = Field(min_length=1, max_length=30)
    estado: str = Field(default="PENDIENTE", min_length=1, max_length=20)
    referencia_entrega: str | None = Field(default=None, max_length=255)

    @field_validator("prioridad")
    @classmethod
    def validar_prioridad(cls, value: str) -> str:
        normalized = value.strip().upper()
        allowed = {"EXPRESS", "ESTANDAR", "ECONOMICO"}
        if normalized not in allowed:
            raise ValueError("La prioridad debe ser EXPRESS, ESTANDAR o ECONOMICO.")
        return normalized

    @field_validator("tipo_producto")
    @classmethod
    def validar_tipo_producto(cls, value: str) -> str:
        normalized = value.strip().upper()
        allowed = {"PERECEDERO", "NO_PERECEDERO"}
        if normalized not in allowed:
            raise ValueError("El tipo de producto debe ser PERECEDERO o NO_PERECEDERO.")
        return normalized

    @field_validator("estado")
    @classmethod
    def validar_estado(cls, value: str) -> str:
        normalized = value.strip().upper()
        if not normalized:
            raise ValueError("El estado es obligatorio.")
        return normalized

    @model_validator(mode="after")
    def validar_ventana_tiempo(self) -> "OrderBase":
        if self.ventana_inicio >= self.ventana_fin:
            raise ValueError("La ventana de entrega de inicio debe ser menor que la de fin.")
        return self


class OrderCreate(OrderBase):
    pass


class OrderRead(OrderBase):
    model_config = ConfigDict(from_attributes=True)
    pedido_id: UUID
    creado_en: datetime
