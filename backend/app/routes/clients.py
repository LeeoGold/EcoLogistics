from uuid import UUID

from fastapi import APIRouter, Depends, Request, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Query

from ..models.client import Client
from ..pagination import PageResponse, paginate_statement
from ..http_cache import apply_private_etag

from ..controllers.client_controller import ClientController
from ..db import get_db
from ..security import get_current_user, require_roles
from ..schemas.client import ClientCreate, ClientRead

router = APIRouter(prefix="/api/clientes", tags=["Clientes"], dependencies=[Depends(get_current_user)])
controller = ClientController()


@router.get("", response_model=list[ClientRead])
def list_clients(db: Session = Depends(get_db)) -> list[ClientRead]:
    return controller.list_clients(db)




@router.get("/pagina", response_model=PageResponse[ClientRead])
def page_clients(
    request: Request,
    response: Response,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=12),
    q: str | None = Query(default=None, max_length=120),
    db: Session = Depends(get_db),
) -> PageResponse[ClientRead]:
    """Lista de Client paginada para la interfaz de gestión."""
    statement = select(Client).order_by(Client.nombre)
    if q:
        statement = statement.where(Client.nombre.ilike(f"%{q.strip()}%"))
    data = paginate_statement(db, statement, page=page, page_size=page_size)
    not_modified = apply_private_etag(request, response, data)
    return not_modified or data

@router.get("/{cliente_id}", response_model=ClientRead)
def get_client(
    cliente_id: UUID,
    db: Session = Depends(get_db),
) -> ClientRead:
    return controller.get_client(cliente_id, db)


@router.post(
    "",
    response_model=ClientRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))],
)
def create_client(
    payload: ClientCreate,
    db: Session = Depends(get_db),
) -> ClientRead:
    return controller.create_client(payload, db)
