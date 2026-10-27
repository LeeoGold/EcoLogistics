"""Fixtures compartidos y base aislada para pruebas de API.

Las pruebas SIEMPRE apuntan a una base SQLite desechable. No reutilizan
backend/.env ni la base PostgreSQL del desarrollador.
"""
import os
from pathlib import Path
import uuid

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete, select

TEST_DB_PATH = Path(__file__).resolve().parent / ".test_ecologistica.db"
# Asignación intencional (no setdefault): las pruebas nunca deben heredar la DB local.
os.environ["DATABASE_URL"] = f"sqlite:///{TEST_DB_PATH.as_posix()}"
os.environ["ACCESS_TOKEN_SECRET"] = "pytest-only-secret-not-for-production"
os.environ["APP_ENV"] = "testing"
os.environ["CORS_ORIGINS"] = "http://testserver"

from app.db import Base, SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.models.vehicle import Vehicle
from app.models.role import Role
from app.models.user import User
from app.security import create_access_token, hash_password  # noqa: E402


@pytest.fixture(scope="session", autouse=True)
def isolated_test_database():
    """Recrea y elimina la base SQLite temporal al iniciar/finalizar la suite."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    if TEST_DB_PATH.exists():
        TEST_DB_PATH.unlink()


@pytest.fixture()
def client():
    username = f"test_admin_{uuid.uuid4().hex[:10]}"
    role_created = False

    with SessionLocal() as db:
        role = db.scalar(
            select(Role).where(Role.nombre == "ADMINISTRADOR")
        )

        if role is None:
            role = Role(
                nombre="ADMINISTRADOR",
                descripcion="Rol temporal de pruebas",
            )
            db.add(role)
            db.flush()
            role_created = True

        user = User(
            nombre_usuario=username,
            rol_id=role.rol_id,
            password_hash=hash_password("pytest-only-temporary-password"),
            estado="ACTIVO",
        )
        db.add(user)
        db.commit()

        user_id = user.usuario_id
        role_id = role.rol_id
        token = create_access_token(user_id)

    try:
        with TestClient(
            app,
            headers={"Authorization": f"Bearer {token}"},
        ) as test_client:
            yield test_client
    finally:
        with SessionLocal() as db:
            user = db.get(User, user_id)
            if user is not None:
                db.delete(user)
                db.commit()

            if role_created:
                role = db.get(Role, role_id)
                if role is not None:
                    remaining = db.scalar(
                        select(User)
                        .where(User.rol_id == role_id)
                        .limit(1)
                    )
                    if remaining is None:
                        db.delete(role)
                        db.commit()


@pytest.fixture()
def anonymous_client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def vehicle_payload():
    suffix = uuid.uuid4().hex[:6].upper()
    return {
        "placa": f"TST-{suffix}",
        "tipo": "CAMIONETA",
        "capacidad_kg": 1000,
        "consumo_km_gal": 10,
        "factor_co2_kg_km": 0.25,
        "anio_fabricacion": 2024,
        "estado": "DISPONIBLE",
    }


@pytest.fixture(autouse=True)
def cleanup_test_vehicles():
    yield
    db = SessionLocal()
    try:
        db.execute(delete(Vehicle).where(Vehicle.placa.like("TST-%")))
        db.commit()
    finally:
        db.close()
