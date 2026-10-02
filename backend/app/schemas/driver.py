from datetime import time
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator


class DriverBase(BaseModel):
    usuario_id: UUID | None = None
    nombre_completo: str = Field(min_length=1, max_length=150)
    documento_identidad: str = Field(min_length=1, max_length=20)
    licencia: str = Field(min_length=1, max_length=30)
    categoria_licencia: str = Field(min_length=1, max_length=20)
    anios_experiencia: int = Field(ge=0)
    disponibilidad_inicio: time
    disponibilidad_fin: time
    contacto: str = Field(min_length=1, max_length=30)
    estado: str = Field(default="ACTIVO", min_length=1, max_length=20)

    @model_validator(mode="after")
    def validar_disponibilidad(self) -> "DriverBase":
        if self.disponibilidad_inicio >= self.disponibilidad_fin:
            raise ValueError(
                "La hora de inicio debe ser menor que la hora de fin."
            )
        return self


class DriverCreate(DriverBase):
    pass


class DriverRead(DriverBase):
    model_config = ConfigDict(from_attributes=True)
    conductor_id: UUID
