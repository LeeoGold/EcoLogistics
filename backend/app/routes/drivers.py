from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..controllers.driver_controller import DriverController
from ..db import get_db
from ..schemas.driver import DriverCreate, DriverRead

router = APIRouter(prefix="/api/conductores", tags=["Conductores"])
controller = DriverController()


@router.get("", response_model=list[DriverRead])
def list_drivers(db: Session = Depends(get_db)) -> list[DriverRead]:
    return controller.list_drivers(db)


@router.get("/{conductor_id}", response_model=DriverRead)
def get_driver(conductor_id: UUID, db: Session = Depends(get_db)) -> DriverRead:
    return controller.get_driver(conductor_id, db)


@router.post("", response_model=DriverRead, status_code=status.HTTP_201_CREATED)
def create_driver(
    payload: DriverCreate, db: Session = Depends(get_db)
) -> DriverRead:
    return controller.create_driver(payload, db)
