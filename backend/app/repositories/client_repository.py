from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.client import Client


class ClientRepository:
    """Acceso a datos del módulo de clientes."""

    def list(self, db: Session) -> list[Client]:
        return list(db.scalars(select(Client).order_by(Client.nombre)).all())

    def get(self, db: Session, cliente_id) -> Client | None:
        return db.get(Client, cliente_id)

    def create(self, db: Session, client: Client) -> Client:
        db.add(client)
        db.commit()
        db.refresh(client)
        return client