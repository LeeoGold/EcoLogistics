import uuid
from datetime import datetime, time
from decimal import Decimal

from sqlalchemy import DateTime, Numeric, String, Time
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class Client(Base):
    __tablename__ = "clientes"

    cliente_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    nombre: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    contacto: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    direccion_referencia: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    latitud: Mapped[Decimal] = mapped_column(
        Numeric(10, 7),
        nullable=False,
    )

    longitud: Mapped[Decimal] = mapped_column(
        Numeric(10, 7),
        nullable=False,
    )

    horario_preferido_inicio: Mapped[time | None] = mapped_column(
        Time,
        nullable=True,
    )

    horario_preferido_fin: Mapped[time | None] = mapped_column(
        Time,
        nullable=True,
    )

    restricciones_acceso: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    creado_en: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now().astimezone(),
    )