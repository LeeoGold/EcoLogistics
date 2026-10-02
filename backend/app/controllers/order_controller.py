from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..schemas.order import OrderCreate, OrderRead
from ..services.order_service import (
    OrderClientNotFoundError,
    OrderNotFoundError,
    OrderService,
)


class OrderController:
    """Orquesta HTTP, validación de errores y servicio de pedidos."""

    def __init__(self, service: OrderService | None = None) -> None:
        self.service = service or OrderService()

    def list_orders(self, db: Session) -> list[OrderRead]:
        return self.service.list_orders(db)

    def get_order(self, pedido_id: UUID, db: Session) -> OrderRead:
        try:
            return self.service.get_order(db, pedido_id)
        except OrderNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Pedido no encontrado",
            ) from exc

    def create_order(self, payload: OrderCreate, db: Session) -> OrderRead:
        try:
            return self.service.create_order(db, payload)
        except OrderClientNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El cliente indicado no existe",
            ) from exc
