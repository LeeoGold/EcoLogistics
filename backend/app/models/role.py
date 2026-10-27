import uuid

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..db import Base


class Role(Base):
    __tablename__ = "roles"

    rol_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    nombre: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True,
    )
    descripcion: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )
