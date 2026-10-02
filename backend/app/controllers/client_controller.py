from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..schemas.client import ClientCreate, ClientRead
from ..services.client_service import ClientNotFoundError, ClientService


class ClientController:
    """Orquesta HTTP, validación de errores y servicio de clientes."""

    def __init__(self, service: ClientService | None = None) -> None:
        self.service = service or ClientService()

    def list_clients(self, db: Session) -> list[ClientRead]:
        return self.service.list_clients(db)

    def get_client(self, cliente_id: UUID, db: Session) -> ClientRead:
        try:
            return self.service.get_client(db, cliente_id)
        except ClientNotFoundError as exc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cliente no encontrado",
            ) from exc

    def create_client(
        self,
        payload: ClientCreate,
        db: Session,
    ) -> ClientRead:
        return self.service.create_client(db, payload)