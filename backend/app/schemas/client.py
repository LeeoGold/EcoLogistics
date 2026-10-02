from datetime import time
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator


class ClientBase(BaseModel):
    nombre: str = Field(min_length=1, max_length=150)
    contacto: str | None = Field(default=None, max_length=30)
    direccion_referencia: str = Field(min_length=1, max_length=255)

    latitud: Decimal = Field(
        ge=Decimal("-90"),
        le=Decimal("90"),
        description="Latitud geográfica del cliente.",
    )

    longitud: Decimal = Field(
        ge=Decimal("-180"),
        le=Decimal("180"),
        description="Longitud geográfica del cliente.",
    )

    horario_preferido_inicio: time | None = None
    horario_preferido_fin: time | None = None

    restricciones_acceso: str | None = Field(
        default=None,
        max_length=255,
    )

    @model_validator(mode="after")
    def validar_horario_preferido(self) -> "ClientBase":
        inicio = self.horario_preferido_inicio
        fin = self.horario_preferido_fin

        if (inicio is None) != (fin is None):
            raise ValueError(
                "El horario preferido debe indicar inicio y fin."
            )

        if inicio is not None and fin is not None and inicio >= fin:
            raise ValueError(
                "El horario preferido de inicio debe ser menor que el horario de fin."
            )

        return self


class ClientCreate(ClientBase):
    pass


class ClientRead(ClientBase):
    model_config = ConfigDict(from_attributes=True)

    cliente_id: UUID