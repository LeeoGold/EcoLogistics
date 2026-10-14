import uuid
from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, Integer, Numeric, String, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class Route(Base):
    __tablename__ = "rutas"

    ruta_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    fecha_planificada: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    estado: Mapped[str] = mapped_column(String(20), nullable=False, default="PLANIFICADA")
    distancia_km: Mapped[Decimal | None] = mapped_column(Numeric(12, 3), nullable=True)
    tiempo_total_min: Mapped[Decimal | None] = mapped_column(Numeric(12, 2), nullable=True)
    combustible_l: Mapped[Decimal | None] = mapped_column(Numeric(12, 3), nullable=True)
    emisiones_co2_kg: Mapped[Decimal | None] = mapped_column(Numeric(12, 3), nullable=True)
    penalizacion_total: Mapped[Decimal | None] = mapped_column(Numeric(12, 3), nullable=True)
    creada_en: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )


class DriverAssignment(Base):
    __tablename__ = "asignaciones_conductor"

    asignacion_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    ruta_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("rutas.ruta_id"), nullable=False, index=True
    )
    conductor_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("conductores.conductor_id"), nullable=False, index=True
    )
    vehiculo_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("vehiculos.vehiculo_id"), nullable=False
    )
    hora_inicio: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    hora_fin: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class RouteDetail(Base):
    __tablename__ = "detalle_ruta"
    __table_args__ = (
        UniqueConstraint("ruta_id", "secuencia", name="uq_detalle_ruta_secuencia"),
        UniqueConstraint("ruta_id", "pedido_id", name="uq_detalle_ruta_pedido"),
    )

    detalle_ruta_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    ruta_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("rutas.ruta_id"), nullable=False, index=True
    )
    pedido_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pedidos.pedido_id"), nullable=False, index=True
    )
    secuencia: Mapped[int] = mapped_column(Integer, nullable=False)
    llegada_estimada: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    salida_estimada: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    distancia_tramo_km: Mapped[Decimal | None] = mapped_column(Numeric(12, 3), nullable=True)
