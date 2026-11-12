from uuid import UUID

from fastapi import APIRouter, Depends, Request, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, select
from fastapi import Query

from ..models.driver import Driver
from ..pagination import PageResponse, paginate_statement
from ..http_cache import apply_private_etag

from ..controllers.driver_controller import DriverController
from ..db import get_db
from ..security import require_roles
from ..schemas.driver import DriverCreate, DriverRead

router = APIRouter(prefix="/api/conductores", tags=["Conductores"], dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))])
controller = DriverController()


@router.get("", response_model=list[DriverRead])
def list_drivers(db: Session = Depends(get_db)) -> list[DriverRead]:
    return controller.list_drivers(db)




@router.get("/pagina", response_model=PageResponse[DriverRead])
def page_drivers(
    request: Request,
    response: Response,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=12),
    q: str | None = Query(default=None, max_length=120),
    estado: str | None = Query(default=None, max_length=20),
    db: Session = Depends(get_db),
) -> PageResponse[DriverRead]:
    """Lista de Driver paginada para la interfaz de gestión."""
    statement = select(Driver).order_by(Driver.nombre_completo)
    if q:
        term = f"%{q.strip()}%"
        statement = statement.where(
            or_(
                Driver.nombre_completo.ilike(term),
                Driver.documento_identidad.ilike(term),
                Driver.licencia.ilike(term),
                Driver.contacto.ilike(term),
            )
        )
    if estado:
        statement = statement.where(Driver.estado == estado)
    data = paginate_statement(db, statement, page=page, page_size=page_size)
    not_modified = apply_private_etag(request, response, data)
    return not_modified or data

@router.get("/{conductor_id}", response_model=DriverRead)
def get_driver(conductor_id: UUID, db: Session = Depends(get_db)) -> DriverRead:
    return controller.get_driver(conductor_id, db)


@router.post("", response_model=DriverRead, status_code=status.HTTP_201_CREATED)
def create_driver(
    payload: DriverCreate, db: Session = Depends(get_db)
) -> DriverRead:
    return controller.create_driver(payload, db)
