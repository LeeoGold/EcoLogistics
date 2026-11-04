from uuid import UUID

from fastapi import APIRouter, Depends, Request, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Query

from ..models.vehicle import Vehicle
from ..pagination import PageResponse, paginate_statement
from ..http_cache import apply_private_etag

from ..controllers.vehicle_controller import VehicleController
from ..db import get_db
from ..security import get_current_user, require_roles
from ..schemas.vehicle import VehicleCreate, VehicleRead, VehicleUpdate

router = APIRouter(prefix="/api/vehiculos", tags=["Vehículos"], dependencies=[Depends(get_current_user)])
controller = VehicleController()


@router.get("", response_model=list[VehicleRead])
def list_vehicles(db: Session = Depends(get_db)) -> list[VehicleRead]:
    return controller.list_vehicles(db)




@router.get("/pagina", response_model=PageResponse[VehicleRead])
def page_vehicles(
    request: Request,
    response: Response,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=12),
    q: str | None = Query(default=None, max_length=80),
    estado: str | None = Query(default=None, max_length=20),
    db: Session = Depends(get_db),
) -> PageResponse[VehicleRead]:
    """Lista de Vehicle paginada para la interfaz de gestión."""
    statement = select(Vehicle).order_by(Vehicle.placa)
    if q:
        statement = statement.where(Vehicle.placa.ilike(f"%{q.strip()}%"))
    if estado:
        statement = statement.where(Vehicle.estado == estado)
    data = paginate_statement(db, statement, page=page, page_size=page_size)
    not_modified = apply_private_etag(request, response, data)
    return not_modified or data

@router.get("/{vehiculo_id}", response_model=VehicleRead)
def get_vehicle(vehiculo_id: UUID, db: Session = Depends(get_db)) -> VehicleRead:
    return controller.get_vehicle(vehiculo_id, db)


@router.post("", response_model=VehicleRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))])
def create_vehicle(
    payload: VehicleCreate, db: Session = Depends(get_db)
) -> VehicleRead:
    return controller.create_vehicle(payload, db)


@router.put("/{vehiculo_id}", response_model=VehicleRead, dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))])
def update_vehicle(
    vehiculo_id: UUID, payload: VehicleUpdate, db: Session = Depends(get_db)
) -> VehicleRead:
    return controller.update_vehicle(vehiculo_id, payload, db)


@router.delete("/{vehiculo_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_roles("ADMINISTRADOR"))])
def delete_vehicle(vehiculo_id: UUID, db: Session = Depends(get_db)) -> None:
    controller.delete_vehicle(vehiculo_id, db)
