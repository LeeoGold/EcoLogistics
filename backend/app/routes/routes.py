from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..controllers.route_controller import RouteController
from ..db import get_db
from ..security import get_current_user, require_roles
from ..schemas.route import RouteCreate, RouteRead

router = APIRouter(prefix="/api/rutas", tags=["Rutas"], dependencies=[Depends(get_current_user)])
controller = RouteController()


@router.get("", response_model=list[RouteRead])
def list_routes(db: Session = Depends(get_db)) -> list[RouteRead]:
    return controller.list_routes(db)


@router.get("/{ruta_id}", response_model=RouteRead)
def get_route(ruta_id: UUID, db: Session = Depends(get_db)) -> RouteRead:
    return controller.get_route(ruta_id, db)


@router.post("", response_model=RouteRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))])
def create_route(payload: RouteCreate, db: Session = Depends(get_db)) -> RouteRead:
    return controller.create_route(payload, db)
