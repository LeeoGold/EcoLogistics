from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Vehicle
from ..schemas import VehicleCreate, VehicleRead, VehicleUpdate

router = APIRouter(prefix="/api/vehiculos", tags=["Vehículos"])


@router.get("", response_model=list[VehicleRead])
def list_vehicles(db: Session = Depends(get_db)) -> list[Vehicle]:
    return list(db.scalars(select(Vehicle).order_by(Vehicle.placa)).all())


@router.get("/{vehiculo_id}", response_model=VehicleRead)
def get_vehicle(vehiculo_id: UUID, db: Session = Depends(get_db)) -> Vehicle:
    vehicle = db.get(Vehicle, vehiculo_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    return vehicle


@router.post("", response_model=VehicleRead, status_code=status.HTTP_201_CREATED)
def create_vehicle(payload: VehicleCreate, db: Session = Depends(get_db)) -> Vehicle:
    vehicle = Vehicle(**payload.model_dump())
    db.add(vehicle)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="La placa ya está registrada")
    db.refresh(vehicle)
    return vehicle


@router.put("/{vehiculo_id}", response_model=VehicleRead)
def update_vehicle(vehiculo_id: UUID, payload: VehicleUpdate, db: Session = Depends(get_db)) -> Vehicle:
    vehicle = db.get(Vehicle, vehiculo_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    for key, value in payload.model_dump().items():
        setattr(vehicle, key, value)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="La placa ya está registrada")
    db.refresh(vehicle)
    return vehicle


@router.delete("/{vehiculo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(vehiculo_id: UUID, db: Session = Depends(get_db)) -> None:
    vehicle = db.get(Vehicle, vehiculo_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    db.delete(vehicle)
    db.commit()
