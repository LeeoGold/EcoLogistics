from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.driver import Driver


class DriverRepository:
    """Acceso a datos del módulo de conductores."""

    def list(self, db: Session) -> list[Driver]:
        return list(db.scalars(select(Driver).order_by(Driver.nombre_completo)).all())

    def get(self, db: Session, conductor_id: UUID) -> Driver | None:
        return db.get(Driver, conductor_id)

    def create(self, db: Session, driver: Driver) -> Driver:
        db.add(driver)
        db.commit()
        db.refresh(driver)
        return driver
