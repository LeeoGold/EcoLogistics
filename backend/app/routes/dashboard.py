from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models.client import Client
from ..models.driver import Driver
from ..models.order import Order
from ..models.vehicle import Vehicle
from ..security import require_roles
from ..http_cache import apply_private_etag

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
    dependencies=[Depends(require_roles("ADMINISTRADOR", "OPERADOR"))],
)


def _count(db: Session, model, *conditions) -> int:
    statement = select(func.count()).select_from(model)
    if conditions:
        statement = statement.where(*conditions)
    return int(db.scalar(statement) or 0)


@router.get("/resumen", response_model=None)
def dashboard_summary(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
) -> dict[str, int] | Response:
    data = {
        "vehiculos_disponibles": _count(db, Vehicle, Vehicle.estado == "DISPONIBLE"),
        "vehiculos_total": _count(db, Vehicle),
        "clientes_total": _count(db, Client),
        "pedidos_pendientes": _count(db, Order, Order.estado == "PENDIENTE"),
        "conductores_activos": _count(db, Driver, Driver.estado == "ACTIVO"),
        "conductores_total": _count(db, Driver),
    }
    not_modified = apply_private_etag(request, response, data)
    return not_modified or data
