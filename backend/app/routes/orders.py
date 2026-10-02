from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..controllers.order_controller import OrderController
from ..db import get_db
from ..schemas.order import OrderCreate, OrderRead

router = APIRouter(prefix="/api/pedidos", tags=["Pedidos"])
controller = OrderController()


@router.get("", response_model=list[OrderRead])
def list_orders(db: Session = Depends(get_db)) -> list[OrderRead]:
    return controller.list_orders(db)


@router.get("/{pedido_id}", response_model=OrderRead)
def get_order(pedido_id: UUID, db: Session = Depends(get_db)) -> OrderRead:
    return controller.get_order(pedido_id, db)


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(
    payload: OrderCreate, db: Session = Depends(get_db)
) -> OrderRead:
    return controller.create_order(payload, db)
