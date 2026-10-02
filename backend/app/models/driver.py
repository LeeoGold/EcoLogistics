import uuid
from datetime import time

from sqlalchemy import String, Time
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class Driver(Base):
    __tablename__ = "conductores"

    conductor_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    usuario_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), unique=True, nullable=True
    )
    nombre_completo: Mapped[str] = mapped_column(String(150), nullable=False)
    documento_identidad: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False
    )
    licencia: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    categoria_licencia: Mapped[str] = mapped_column(String(20), nullable=False)
    anios_experiencia: Mapped[int] = mapped_column(nullable=False)
    disponibilidad_inicio: Mapped[time] = mapped_column(Time, nullable=False)
    disponibilidad_fin: Mapped[time] = mapped_column(Time, nullable=False)
    contacto: Mapped[str] = mapped_column(String(30), nullable=False)
    estado: Mapped[str] = mapped_column(String(20), nullable=False, default="ACTIVO")
