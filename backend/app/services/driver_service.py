from uuid import UUID

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models.driver import Driver
from ..repositories.driver_repository import DriverRepository
from ..schemas.driver import DriverCreate


class DriverNotFoundError(Exception):
    pass


class DriverDuplicateError(Exception):
    pass


class DriverService:
    """Reglas y coordinación de negocio del módulo de conductores."""

    def __init__(self, repository: DriverRepository | None = None) -> None:
        self.repository = repository or DriverRepository()

    def list_drivers(self, db: Session) -> list[Driver]:
        return self.repository.list(db)

    def get_driver(self, db: Session, conductor_id: UUID) -> Driver:
        driver = self.repository.get(db, conductor_id)
        if driver is None:
            raise DriverNotFoundError
        return driver

    def create_driver(self, db: Session, payload: DriverCreate) -> Driver:
        driver = Driver(**payload.model_dump())
        try:
            return self.repository.create(db, driver)
        except IntegrityError as exc:
            db.rollback()
            raise DriverDuplicateError from exc
