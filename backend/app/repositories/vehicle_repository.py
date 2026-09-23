from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.vehicle import Vehicle


class VehicleRepository:
    """Acceso a datos del módulo de vehículos."""

    def list(self, db: Session) -> list[Vehicle]:
        return list(db.scalars(select(Vehicle).order_by(Vehicle.placa)).all())

    def get(self, db: Session, vehiculo_id: UUID) -> Vehicle | None:
        return db.get(Vehicle, vehiculo_id)

    def create(self, db: Session, vehicle: Vehicle) -> Vehicle:
        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)
        return vehicle

    def update(self, db: Session, vehicle: Vehicle) -> Vehicle:
        db.commit()
        db.refresh(vehicle)
        return vehicle

    def delete(self, db: Session, vehicle: Vehicle) -> None:
        db.delete(vehicle)
        db.commit()
