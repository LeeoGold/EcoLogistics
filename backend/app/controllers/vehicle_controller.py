from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..schemas.vehicle import VehicleCreate, VehicleRead, VehicleUpdate
from ..services.vehicle_service import (
    VehicleDuplicatePlateError,
    VehicleNotFoundError,
    VehicleService,
)


class VehicleController:
    """Orquesta HTTP, validación de errores y servicio de vehículos."""

    def __init__(self, service: VehicleService | None = None) -> None:
        self.service = service or VehicleService()

    def list_vehicles(self, db: Session) -> list[VehicleRead]:
        return self.service.list_vehicles(db)

    def get_vehicle(self, vehiculo_id: UUID, db: Session) -> VehicleRead:
        try:
            return self.service.get_vehicle(db, vehiculo_id)
        except VehicleNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado",
            ) from exc

    def create_vehicle(self, payload: VehicleCreate, db: Session) -> VehicleRead:
        try:
            return self.service.create_vehicle(db, payload)
        except VehicleDuplicatePlateError as exc:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="La placa ya está registrada",
            ) from exc

    def update_vehicle(
        self, vehiculo_id: UUID, payload: VehicleUpdate, db: Session
    ) -> VehicleRead:
        try:
            return self.service.update_vehicle(db, vehiculo_id, payload)
        except VehicleNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado",
            ) from exc
        except VehicleDuplicatePlateError as exc:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="La placa ya está registrada",
            ) from exc

    def delete_vehicle(self, vehiculo_id: UUID, db: Session) -> None:
        try:
            self.service.delete_vehicle(db, vehiculo_id)
        except VehicleNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado",
            ) from exc
