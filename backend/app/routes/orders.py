from uuid import UUID

from fastapi import APIRouter, Depends, Request, Response, status
from sqlalchemy.orm import Session
from datetime import date, datetime, time, timedelta
from zoneinfo import ZoneInfo

from sqlalchemy import select
from fastapi import Query

from ..models.order import Order
from ..pagination import PageResponse, paginate_statement
from ..http_cache import apply_private_etag

from ..controllers.order_controller import OrderController
from ..db import get_db
from ..security import require_roles
from ..schemas.order import OrderCreate, OrderRead

router = APIRouter(prefix="/api/pedidos", tags=["Pedidos"], dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))])
controller = OrderController()


@router.get("", response_model=list[OrderRead])
def list_orders(db: Session = Depends(get_db)) -> list[OrderRead]:
    return controller.list_orders(db)




@router.get("/pagina", response_model=PageResponse[OrderRead])
def page_orders(
    request: Request,
    response: Response,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=12),
    estado: str | None = Query(default=None, max_length=20),
    prioridad: str | None = Query(default=None, max_length=20),
    fecha: date | None = Query(default=None),
    db: Session = Depends(get_db),
) -> PageResponse[OrderRead]:
    """Lista de Order paginada para la interfaz de gestión."""
    statement = select(Order).order_by(Order.creado_en.desc())
    if estado:
        statement = statement.where(Order.estado == estado)
    if prioridad:
        statement = statement.where(Order.prioridad == prioridad)
    if fecha:
        start = datetime.combine(fecha, time.min, tzinfo=ZoneInfo("America/Lima"))
        end = start + timedelta(days=1)
        statement = statement.where(
            Order.ventana_inicio >= start,
            Order.ventana_inicio < end,
        )
    data = paginate_statement(db, statement, page=page, page_size=page_size)
    not_modified = apply_private_etag(request, response, data)
    return not_modified or data

@router.get("/{pedido_id}", response_model=OrderRead)
def get_order(pedido_id: UUID, db: Session = Depends(get_db)) -> OrderRead:
    return controller.get_order(pedido_id, db)


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(
    payload: OrderCreate, db: Session = Depends(get_db)
) -> OrderRead:
    return controller.create_order(payload, db)
