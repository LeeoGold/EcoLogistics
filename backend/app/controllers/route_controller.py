from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..schemas.route import RouteCreate, RouteRead
from ..services.route_service import (
    RouteAssignmentConflictError,
    RouteCapacityExceededError,
    RouteDriverNotFoundError,
    RouteDriverUnavailableError,
    RouteNotFoundError,
    RouteOrderNotFoundError,
    RouteOrderNotPendingError,
    RouteOutsideAvailabilityError,
    RouteService,
    RouteVehicleNotFoundError,
    RouteVehicleUnavailableError,
)


class RouteController:
    """Traduce los resultados de planificación a respuestas HTTP."""

    def __init__(self, service: RouteService | None = None) -> None:
        self.service = service or RouteService()

    def list_routes(self, db: Session) -> list[RouteRead]:
        return self.service.list_routes(db)

    def get_route(self, ruta_id: UUID, db: Session) -> RouteRead:
        try:
            return self.service.get_route(db, ruta_id)
        except RouteNotFoundError as exc:
            raise HTTPException(status_code=404, detail="Ruta no encontrada.") from exc

    def create_route(self, payload: RouteCreate, db: Session) -> RouteRead:
        try:
            return self.service.create_route(db, payload)
        except RouteDriverNotFoundError as exc:
            raise HTTPException(status_code=404, detail="Conductor no encontrado.") from exc
        except RouteDriverUnavailableError as exc:
            raise HTTPException(status_code=409, detail="El conductor debe estar ACTIVO.") from exc
        except RouteVehicleNotFoundError as exc:
            raise HTTPException(status_code=404, detail="Vehículo no encontrado.") from exc
        except RouteVehicleUnavailableError as exc:
            raise HTTPException(status_code=409, detail="El vehículo debe estar DISPONIBLE.") from exc
        except RouteOrderNotFoundError as exc:
            raise HTTPException(status_code=404, detail="Uno o más pedidos no existen.") from exc
        except RouteOrderNotPendingError as exc:
            raise HTTPException(status_code=409, detail="Todos los pedidos deben estar PENDIENTES.") from exc
        except RouteCapacityExceededError as exc:
            raise HTTPException(status_code=409, detail="La carga seleccionada supera la capacidad del vehículo.") from exc
        except RouteOutsideAvailabilityError as exc:
            raise HTTPException(status_code=422, detail="La hora de inicio no está dentro de la disponibilidad del conductor.") from exc
        except RouteAssignmentConflictError as exc:
            raise HTTPException(status_code=409, detail="El conductor o vehículo ya tiene una asignación incompatible para esa fecha.") from exc
