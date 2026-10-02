from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..schemas.driver import DriverCreate, DriverRead
from ..services.driver_service import (
    DriverDuplicateError,
    DriverNotFoundError,
    DriverService,
)


class DriverController:
    """Orquesta HTTP, validación de errores y servicio de conductores."""

    def __init__(self, service: DriverService | None = None) -> None:
        self.service = service or DriverService()

    def list_drivers(self, db: Session) -> list[DriverRead]:
        return self.service.list_drivers(db)

    def get_driver(self, conductor_id: UUID, db: Session) -> DriverRead:
        try:
            return self.service.get_driver(db, conductor_id)
        except DriverNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conductor no encontrado",
            ) from exc

    def create_driver(self, payload: DriverCreate, db: Session) -> DriverRead:
        try:
            return self.service.create_driver(db, payload)
        except DriverDuplicateError as exc:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="El documento de identidad o la licencia ya está registrada",
            ) from exc
