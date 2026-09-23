from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..controllers.vehicle_controller import VehicleController
from ..db import get_db
from ..schemas.vehicle import VehicleCreate, VehicleRead, VehicleUpdate

router = APIRouter(prefix="/api/vehiculos", tags=["Vehículos"])
controller = VehicleController()


@router.get("", response_model=list[VehicleRead])
def list_vehicles(db: Session = Depends(get_db)) -> list[VehicleRead]:
    return controller.list_vehicles(db)


@router.get("/{vehiculo_id}", response_model=VehicleRead)
def get_vehicle(vehiculo_id: UUID, db: Session = Depends(get_db)) -> VehicleRead:
    return controller.get_vehicle(vehiculo_id, db)


@router.post("", response_model=VehicleRead, status_code=status.HTTP_201_CREATED)
def create_vehicle(
    payload: VehicleCreate, db: Session = Depends(get_db)
) -> VehicleRead:
    return controller.create_vehicle(payload, db)


@router.put("/{vehiculo_id}", response_model=VehicleRead)
def update_vehicle(
    vehiculo_id: UUID, payload: VehicleUpdate, db: Session = Depends(get_db)
) -> VehicleRead:
    return controller.update_vehicle(vehiculo_id, payload, db)


@router.delete("/{vehiculo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(vehiculo_id: UUID, db: Session = Depends(get_db)) -> None:
    controller.delete_vehicle(vehiculo_id, db)
