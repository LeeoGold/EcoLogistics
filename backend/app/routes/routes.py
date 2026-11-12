from uuid import UUID

from fastapi import APIRouter, Depends, Query, Request, Response, status
from sqlalchemy.orm import Session

from ..controllers.route_controller import RouteController
from ..db import get_db
from ..security import require_roles
from ..schemas.route import RouteCreate, RouteRead
from ..pagination import PageResponse
from ..http_cache import apply_private_etag

router = APIRouter(prefix="/api/rutas", tags=["Rutas"], dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))])
controller = RouteController()


@router.get("", response_model=list[RouteRead])
def list_routes(db: Session = Depends(get_db)) -> list[RouteRead]:
    return controller.list_routes(db)




@router.get("/pagina", response_model=PageResponse[RouteRead])
def page_routes(
    request: Request,
    response: Response,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=12),
    db: Session = Depends(get_db),
) -> PageResponse[RouteRead]:
    data = controller.list_routes_page(db, page=page, page_size=page_size)
    not_modified = apply_private_etag(request, response, data)
    return not_modified or data

@router.get("/{ruta_id}", response_model=RouteRead)
def get_route(ruta_id: UUID, db: Session = Depends(get_db)) -> RouteRead:
    return controller.get_route(ruta_id, db)


@router.post("", response_model=RouteRead, status_code=status.HTTP_201_CREATED)
def create_route(payload: RouteCreate, db: Session = Depends(get_db)) -> RouteRead:
    return controller.create_route(payload, db)
