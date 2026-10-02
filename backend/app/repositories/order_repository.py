from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.order import Order


class OrderRepository:
    """Acceso a datos del módulo de pedidos."""

    def list(self, db: Session) -> list[Order]:
        statement = select(Order).order_by(Order.creado_en.desc())
        return list(db.scalars(statement).all())

    def get(self, db: Session, pedido_id: UUID) -> Order | None:
        return db.get(Order, pedido_id)

    def create(self, db: Session, order: Order) -> Order:
        db.add(order)
        db.commit()
        db.refresh(order)
        return order
