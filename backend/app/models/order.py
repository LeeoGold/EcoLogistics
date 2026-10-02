import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class Order(Base):
    __tablename__ = "pedidos"

    pedido_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    cliente_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("clientes.cliente_id"),
        nullable=False,
        index=True,
    )
    peso_kg: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    volumen_m3: Mapped[Decimal] = mapped_column(Numeric(10, 4), nullable=False)
    ventana_inicio: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    ventana_fin: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    prioridad: Mapped[str] = mapped_column(String(20), nullable=False)
    tipo_producto: Mapped[str] = mapped_column(String(30), nullable=False)
    estado: Mapped[str] = mapped_column(String(20), nullable=False, default="PENDIENTE")
    referencia_entrega: Mapped[str | None] = mapped_column(String(255), nullable=True)
    creado_en: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
