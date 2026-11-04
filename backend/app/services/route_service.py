from datetime import datetime, time
from decimal import Decimal
from uuid import UUID
from zoneinfo import ZoneInfo

from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models.client import Client  # noqa: F401 - garantiza registro de tablas relacionadas
from ..models.driver import Driver
from ..models.order import Order
from ..models.route import DriverAssignment, Route, RouteDetail
from ..models.vehicle import Vehicle
from ..repositories.route_repository import RouteRepository
from ..schemas.route import RouteCreate, RouteRead

LIMA_TZ = ZoneInfo("America/Lima")


class RouteServiceError(Exception):
    """Error de negocio controlado durante una planificación."""


class RouteDriverNotFoundError(RouteServiceError):
    pass


class RouteDriverUnavailableError(RouteServiceError):
    pass


class RouteVehicleNotFoundError(RouteServiceError):
    pass


class RouteVehicleUnavailableError(RouteServiceError):
    pass


class RouteCapacityExceededError(RouteServiceError):
    pass


class RouteOrderNotFoundError(RouteServiceError):
    pass


class RouteOrderNotPendingError(RouteServiceError):
    pass


class RouteOutsideAvailabilityError(RouteServiceError):
    pass


class RouteAssignmentConflictError(RouteServiceError):
    pass


class RouteNotFoundError(RouteServiceError):
    pass


class RouteService:
    """Planificación manual inicial: asigna pedidos a conductor y vehículo."""

    def __init__(self, repository: RouteRepository | None = None) -> None:
        self.repository = repository or RouteRepository()

    def list_routes(self, db: Session) -> list[RouteRead]:
        return self._map_routes(db, self.repository.list(db))

    def list_routes_page(self, db: Session, *, page: int, page_size: int) -> dict:
        routes, total = self.repository.list_page(
            db,
            offset=(page - 1) * page_size,
            limit=page_size,
        )
        return {
            "items": self._map_routes(db, routes),
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": (total + page_size - 1) // page_size if total else 0,
        }

    def _map_routes(self, db: Session, routes: list[Route]) -> list[RouteRead]:
        """Convierte un conjunto de rutas consultando relaciones en bloque."""
        if not routes:
            return []

        route_ids = [route.ruta_id for route in routes]

        assignments = db.scalars(
            select(DriverAssignment)
            .where(DriverAssignment.ruta_id.in_(route_ids))
            .order_by(DriverAssignment.ruta_id, DriverAssignment.hora_inicio)
        ).all()
        assignments_by_route = {}
        for assignment in assignments:
            assignments_by_route.setdefault(assignment.ruta_id, assignment)

        detail_rows = db.scalars(
            select(RouteDetail)
            .where(RouteDetail.ruta_id.in_(route_ids))
            .order_by(RouteDetail.ruta_id, RouteDetail.secuencia)
        ).all()
        details_by_route = {}
        for detail in detail_rows:
            details_by_route.setdefault(detail.ruta_id, []).append(detail)

        order_ids = {detail.pedido_id for detail in detail_rows}
        orders = (
            db.scalars(select(Order).where(Order.pedido_id.in_(order_ids))).all()
            if order_ids
            else []
        )
        orders_by_id = {order.pedido_id: order for order in orders}

        driver_ids = {item.conductor_id for item in assignments}
        drivers = (
            db.scalars(select(Driver).where(Driver.conductor_id.in_(driver_ids))).all()
            if driver_ids
            else []
        )
        drivers_by_id = {driver.conductor_id: driver for driver in drivers}

        vehicle_ids = {item.vehiculo_id for item in assignments}
        vehicles = (
            db.scalars(select(Vehicle).where(Vehicle.vehiculo_id.in_(vehicle_ids))).all()
            if vehicle_ids
            else []
        )
        vehicles_by_id = {vehicle.vehiculo_id: vehicle for vehicle in vehicles}

        return [
            self._build_route_read(
                route,
                assignments_by_route.get(route.ruta_id),
                details_by_route.get(route.ruta_id, []),
                orders_by_id,
                drivers_by_id,
                vehicles_by_id,
            )
            for route in routes
        ]

    def get_route(self, db: Session, ruta_id: UUID) -> RouteRead:
        route = self.repository.get(db, ruta_id)
        if route is None:
            raise RouteNotFoundError
        return self._to_read(db, route)

    def create_route(self, db: Session, payload: RouteCreate) -> RouteRead:
        driver = db.get(Driver, payload.conductor_id)
        if driver is None:
            raise RouteDriverNotFoundError
        if driver.estado.strip().upper() != "ACTIVO":
            raise RouteDriverUnavailableError
        if not (driver.disponibilidad_inicio <= payload.hora_inicio < driver.disponibilidad_fin):
            raise RouteOutsideAvailabilityError

        vehicle = db.get(Vehicle, payload.vehiculo_id)
        if vehicle is None:
            raise RouteVehicleNotFoundError
        if vehicle.estado.strip().upper() != "DISPONIBLE":
            raise RouteVehicleUnavailableError

        orders_by_id = {
            order.pedido_id: order
            for order in db.scalars(
                select(Order).where(Order.pedido_id.in_(payload.pedido_ids))
            ).all()
        }
        if len(orders_by_id) != len(payload.pedido_ids):
            raise RouteOrderNotFoundError

        ordered_orders = [orders_by_id[pedido_id] for pedido_id in payload.pedido_ids]
        if any(order.estado.strip().upper() != "PENDIENTE" for order in ordered_orders):
            raise RouteOrderNotPendingError

        total_weight = sum((Decimal(order.peso_kg) for order in ordered_orders), Decimal("0"))
        if total_weight > Decimal(vehicle.capacidad_kg):
            raise RouteCapacityExceededError

        starts_at = datetime.combine(payload.fecha_planificada, payload.hora_inicio, tzinfo=LIMA_TZ)
        self._validate_no_schedule_conflict(db, payload, starts_at)

        route = Route(fecha_planificada=payload.fecha_planificada, estado="PLANIFICADA")
        try:
            db.add(route)
            db.flush()
            db.add(
                DriverAssignment(
                    ruta_id=route.ruta_id,
                    conductor_id=driver.conductor_id,
                    vehiculo_id=vehicle.vehiculo_id,
                    hora_inicio=starts_at,
                )
            )
            for sequence, order in enumerate(ordered_orders, start=1):
                db.add(
                    RouteDetail(
                        ruta_id=route.ruta_id,
                        pedido_id=order.pedido_id,
                        secuencia=sequence,
                    )
                )
                order.estado = "ASIGNADO"
            db.commit()
            db.refresh(route)
        except IntegrityError as exc:
            db.rollback()
            raise RouteAssignmentConflictError from exc
        except Exception:
            db.rollback()
            raise

        return self._to_read(db, route)

    def _validate_no_schedule_conflict(
        self, db: Session, payload: RouteCreate, starts_at: datetime
    ) -> None:
        assignments = db.scalars(
            select(DriverAssignment)
            .join(Route, DriverAssignment.ruta_id == Route.ruta_id)
            .where(
                Route.fecha_planificada == payload.fecha_planificada,
                or_(
                    DriverAssignment.conductor_id == payload.conductor_id,
                    DriverAssignment.vehiculo_id == payload.vehiculo_id,
                ),
            )
        ).all()

        requested_time = starts_at.astimezone(LIMA_TZ).time().replace(tzinfo=None)
        for assignment in assignments:
            previous_start = assignment.hora_inicio
            if previous_start.tzinfo is not None:
                previous_start_time = previous_start.astimezone(LIMA_TZ).time().replace(tzinfo=None)
            else:
                previous_start_time = previous_start.time().replace(tzinfo=None)

            previous_end = assignment.hora_fin
            if previous_end is None:
                # No se conoce cuánto durará la ruta anterior; no arriesgar dobles asignaciones.
                raise RouteAssignmentConflictError
            if previous_end.tzinfo is not None:
                previous_end_time = previous_end.astimezone(LIMA_TZ).time().replace(tzinfo=None)
            else:
                previous_end_time = previous_end.time().replace(tzinfo=None)

            if previous_start_time >= requested_time or previous_end_time > requested_time:
                raise RouteAssignmentConflictError

    def _to_read(self, db: Session, route: Route) -> RouteRead:
        assignment = db.scalar(
            select(DriverAssignment)
            .where(DriverAssignment.ruta_id == route.ruta_id)
            .order_by(DriverAssignment.hora_inicio)
        )
        detail_rows = db.scalars(
            select(RouteDetail)
            .where(RouteDetail.ruta_id == route.ruta_id)
            .order_by(RouteDetail.secuencia)
        ).all()
        order_ids = {detail.pedido_id for detail in detail_rows}
        orders = (
            db.scalars(select(Order).where(Order.pedido_id.in_(order_ids))).all()
            if order_ids
            else []
        )
        orders_by_id = {order.pedido_id: order for order in orders}

        driver = db.get(Driver, assignment.conductor_id) if assignment else None
        vehicle = db.get(Vehicle, assignment.vehiculo_id) if assignment else None
        drivers_by_id = {driver.conductor_id: driver} if driver else {}
        vehicles_by_id = {vehicle.vehiculo_id: vehicle} if vehicle else {}

        return self._build_route_read(
            route,
            assignment,
            detail_rows,
            orders_by_id,
            drivers_by_id,
            vehicles_by_id,
        )

    def _build_route_read(
        self,
        route: Route,
        assignment: DriverAssignment | None,
        detail_rows: list[RouteDetail],
        orders_by_id: dict,
        drivers_by_id: dict,
        vehicles_by_id: dict,
    ) -> RouteRead:
        order_ids = [detail.pedido_id for detail in detail_rows]
        total_weight = sum(
            (
                Decimal(orders_by_id[pedido_id].peso_kg)
                for pedido_id in order_ids
                if pedido_id in orders_by_id
            ),
            Decimal("0"),
        )

        driver = drivers_by_id.get(assignment.conductor_id) if assignment else None
        vehicle = vehicles_by_id.get(assignment.vehiculo_id) if assignment else None
        local_start = None
        if assignment:
            starts_at = assignment.hora_inicio
            if starts_at.tzinfo is not None:
                starts_at = starts_at.astimezone(LIMA_TZ)
            local_start = starts_at.time().replace(tzinfo=None)

        return RouteRead(
            ruta_id=route.ruta_id,
            fecha_planificada=route.fecha_planificada,
            estado=route.estado,
            creada_en=route.creada_en,
            conductor_id=driver.conductor_id if driver else None,
            conductor_nombre=driver.nombre_completo if driver else None,
            vehiculo_id=vehicle.vehiculo_id if vehicle else None,
            vehiculo_placa=vehicle.placa if vehicle else None,
            hora_inicio=local_start,
            cantidad_pedidos=len(order_ids),
            pedido_ids=order_ids,
            peso_total_kg=total_weight,
        )
