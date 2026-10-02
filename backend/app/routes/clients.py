from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..controllers.client_controller import ClientController
from ..db import get_db
from ..schemas.client import ClientCreate, ClientRead

router = APIRouter(prefix="/api/clientes", tags=["Clientes"])
controller = ClientController()


@router.get("", response_model=list[ClientRead])
def list_clients(db: Session = Depends(get_db)) -> list[ClientRead]:
    return controller.list_clients(db)


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
)
def create_client(
    payload: ClientCreate,
    db: Session = Depends(get_db),
) -> ClientRead:
    return controller.create_client(payload, db)