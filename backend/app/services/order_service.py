from uuid import UUID

from sqlalchemy.orm import Session

from ..models.client import Client
from ..models.order import Order
from ..repositories.order_repository import OrderRepository
from ..schemas.order import OrderCreate


class OrderNotFoundError(Exception):
    pass


class OrderClientNotFoundError(Exception):
    pass


class OrderService:
    """Reglas y coordinación de negocio del módulo de pedidos."""

    def __init__(self, repository: OrderRepository | None = None) -> None:
        self.repository = repository or OrderRepository()

    def list_orders(self, db: Session) -> list[Order]:
        return self.repository.list(db)

    def get_order(self, db: Session, pedido_id: UUID) -> Order:
        order = self.repository.get(db, pedido_id)

        if order is None:
            raise OrderNotFoundError

        return order

    def create_order(self, db: Session, payload: OrderCreate) -> Order:
        client = db.get(Client, payload.cliente_id)

        if client is None:
            raise OrderClientNotFoundError

        order = Order(**payload.model_dump())

        return self.repository.create(db, order)