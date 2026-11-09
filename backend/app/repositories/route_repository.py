from __future__ import annotations

from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..models.route import Route


class RouteRepository:
    """Acceso a datos de las rutas planificadas."""

    def list(self, db: Session) -> list[Route]:
        statement = select(Route).order_by(Route.fecha_planificada.desc(), Route.creada_en.desc())
        return list(db.scalars(statement).all())

    def list_page(self, db: Session, *, offset: int, limit: int) -> tuple[list[Route], int]:
        statement = select(Route).order_by(
            Route.fecha_planificada.desc(), Route.creada_en.desc()
        )
        total = int(db.scalar(select(func.count()).select_from(Route)) or 0)
        items = list(db.scalars(statement.offset(offset).limit(limit)).all())
        return items, total

    def get(self, db: Session, ruta_id: UUID) -> Route | None:
        return db.get(Route, ruta_id)
