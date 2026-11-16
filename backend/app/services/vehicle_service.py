from uuid import UUID

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models.route import DriverAssignment
from ..models.vehicle import Vehicle
from ..repositories.vehicle_repository import VehicleRepository
from ..schemas.vehicle import VehicleCreate, VehicleUpdate


class VehicleNotFoundError(Exception):
    pass


class VehicleDuplicatePlateError(Exception):
    pass


class VehicleInUseError(Exception):
    pass


class VehicleService:
    """Reglas y coordinación de negocio del módulo de vehículos."""

    def __init__(self, repository: VehicleRepository | None = None) -> None:
        self.repository = repository or VehicleRepository()

    def list_vehicles(self, db: Session) -> list[Vehicle]:
        return self.repository.list(db)

    def get_vehicle(self, db: Session, vehiculo_id: UUID) -> Vehicle:
        vehicle = self.repository.get(db, vehiculo_id)
        if vehicle is None:
            raise VehicleNotFoundError
        return vehicle

    def create_vehicle(self, db: Session, payload: VehicleCreate) -> Vehicle:
        vehicle = Vehicle(**payload.model_dump())
        try:
            return self.repository.create(db, vehicle)
        except IntegrityError as exc:
            db.rollback()
            raise VehicleDuplicatePlateError from exc

    def update_vehicle(
        self, db: Session, vehiculo_id: UUID, payload: VehicleUpdate
    ) -> Vehicle:
        vehicle = self.get_vehicle(db, vehiculo_id)
        for key, value in payload.model_dump().items():
            setattr(vehicle, key, value)

        try:
            return self.repository.update(db, vehicle)
        except IntegrityError as exc:
            db.rollback()
            raise VehicleDuplicatePlateError from exc

    def delete_vehicle(self, db: Session, vehiculo_id: UUID) -> None:
        vehicle = self.get_vehicle(db, vehiculo_id)
        assignment_id = db.scalar(
            select(DriverAssignment.asignacion_id)
            .where(DriverAssignment.vehiculo_id == vehiculo_id)
            .limit(1)
        )
        if assignment_id is not None:
            raise VehicleInUseError

        try:
            self.repository.delete(db, vehicle)
        except IntegrityError as exc:
            db.rollback()
            raise VehicleInUseError from exc
