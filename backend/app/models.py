import uuid

from sqlalchemy import Numeric, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from .db import Base


class Vehicle(Base):
    __tablename__ = "vehiculos"

    vehiculo_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    placa: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)
    tipo: Mapped[str] = mapped_column(String(30), nullable=False)
    capacidad_kg: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    consumo_km_l: Mapped[float] = mapped_column(Numeric(10, 3), nullable=False)
    factor_co2_kg_km: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    anio_fabricacion: Mapped[int] = mapped_column(nullable=False)
    estado: Mapped[str] = mapped_column(String(20), nullable=False, default="DISPONIBLE")
