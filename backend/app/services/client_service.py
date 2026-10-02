from uuid import UUID

from sqlalchemy.orm import Session

from ..models.client import Client
from ..repositories.client_repository import ClientRepository
from ..schemas.client import ClientCreate


class ClientService:
    """Reglas y coordinación de negocio del módulo de clientes."""

    def __init__(self, repository: ClientRepository | None = None) -> None:
        self.repository = repository or ClientRepository()

    def list_clients(self, db: Session) -> list[Client]:
        return self.repository.list(db)

    def get_client(self, db: Session, cliente_id: UUID) -> Client:
        client = self.repository.get(db, cliente_id)

        if client is None:
            raise ClientNotFoundError

        return client

    def create_client(self, db: Session, payload: ClientCreate) -> Client:
        client = Client(**payload.model_dump())
        return self.repository.create(db, client)


class ClientNotFoundError(Exception):
    pass