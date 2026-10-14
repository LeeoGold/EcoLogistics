from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.route import Route


class RouteRepository:
    """Acceso a datos de las rutas planificadas."""

    def list(self, db: Session) -> list[Route]:
        statement = select(Route).order_by(Route.fecha_planificada.desc(), Route.creada_en.desc())
        return list(db.scalars(statement).all())

    def get(self, db: Session, ruta_id: UUID) -> Route | None:
        return db.get(Route, ruta_id)
