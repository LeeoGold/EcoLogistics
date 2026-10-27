from uuid import uuid4

import pytest
from fastapi.testclient import TestClient

from app.core import settings
from app.main import app
from app.db import SessionLocal
from app.models.role import Role
from app.models.user import User
from app.security import create_access_token, hash_password


@pytest.fixture
def auth_user(client):
    suffix = uuid4().hex[:10]
    username = f"test_{suffix}"
    password = "Temporal-Segura-2026!"

    with SessionLocal() as db:
        role = Role(
            nombre=f"TEST_ROLE_{suffix}",
            descripcion="Rol temporal para pruebas",
        )
        db.add(role)
        db.flush()

        user = User(
            nombre_usuario=username,
            rol_id=role.rol_id,
            password_hash=hash_password(password),
            estado="ACTIVO",
        )
        db.add(user)
        db.commit()

        user_id = user.usuario_id
        role_id = role.rol_id
        role_name = role.nombre

    yield {
        "username": username,
        "password": password,
        "user_id": user_id,
        "role_id": role_id,
        "role_name": role_name,
    }

    with SessionLocal() as db:
        user = db.get(User, user_id)
        if user is not None:
            db.delete(user)
            db.commit()

        role = db.get(Role, role_id)
        if role is not None:
            db.delete(role)
            db.commit()


def test_login_success_returns_token_and_me(client, auth_user):
    response = client.post(
        "/api/auth/login",
        json={
            "nombre_usuario": auth_user["username"],
            "password": auth_user["password"],
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["access_token"]
    assert data["expires_in"] == settings.access_token_expire_min * 60
    assert data["user"]["nombre_usuario"] == auth_user["username"]
    assert data["user"]["rol"] == auth_user["role_name"]

    me_response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {data['access_token']}"},
    )

    assert me_response.status_code == 200
    assert me_response.json()["usuario_id"] == str(auth_user["user_id"])


def test_login_rejects_incorrect_password_and_counts_attempt(client, auth_user):
    response = client.post(
        "/api/auth/login",
        json={
            "nombre_usuario": auth_user["username"],
            "password": "Contraseña-incorrecta",
        },
    )

    assert response.status_code == 401

    with SessionLocal() as db:
        user = db.get(User, auth_user["user_id"])
        assert user is not None
        assert user.intentos_fallidos == 1


def test_login_rejects_unknown_username(client):
    response = client.post(
        "/api/auth/login",
        json={
            "nombre_usuario": f"no_existe_{uuid4().hex[:10]}",
            "password": "Contraseña-incorrecta",
        },
    )

    assert response.status_code == 401


def test_me_rejects_missing_token(anonymous_client):
    response = anonymous_client.get("/api/auth/me")
    assert response.status_code == 401


def test_me_rejects_invalid_token(anonymous_client):
    response = anonymous_client.get(
        "/api/auth/me",
        headers={"Authorization": "Bearer token-invalido"},
    )
    assert response.status_code == 401


def test_login_blocks_account_after_failed_attempt_limit(client, auth_user):
    for _ in range(settings.auth_max_attempts):
        response = client.post(
            "/api/auth/login",
            json={
                "nombre_usuario": auth_user["username"],
                "password": "Contraseña-incorrecta",
            },
        )
        assert response.status_code == 401

    correct_password_response = client.post(
        "/api/auth/login",
        json={
            "nombre_usuario": auth_user["username"],
            "password": auth_user["password"],
        },
    )

    assert correct_password_response.status_code == 401

    with SessionLocal() as db:
        user = db.get(User, auth_user["user_id"])
        assert user is not None
        assert user.bloqueado_hasta is not None
def test_business_api_rejects_missing_credentials(anonymous_client, vehicle_payload):
    list_response = anonymous_client.get("/api/vehiculos")
    assert list_response.status_code == 401

    create_response = anonymous_client.post(
        "/api/vehiculos",
        json=vehicle_payload,
    )
    assert create_response.status_code == 401


def test_authenticated_user_without_operational_role_cannot_write(
    auth_user,
    vehicle_payload,
):
    token = create_access_token(auth_user["user_id"])

    with TestClient(
        app,
        headers={"Authorization": f"Bearer {token}"},
    ) as restricted_client:
        read_response = restricted_client.get("/api/vehiculos")
        assert read_response.status_code == 200

        write_response = restricted_client.post(
            "/api/vehiculos",
            json=vehicle_payload,
        )
        assert write_response.status_code == 403
@pytest.mark.parametrize(
    "endpoint",
    [
        "/api/clientes",
        "/api/conductores",
        "/api/pedidos",
        "/api/rutas",
        "/api/vehiculos",
    ],
)
def test_all_business_apis_reject_anonymous_requests(
    anonymous_client,
    endpoint,
):
    response = anonymous_client.get(endpoint)
    assert response.status_code == 401, (
        f"{endpoint} debería rechazar solicitudes sin token"
    )


@pytest.mark.parametrize(
    "endpoint",
    [
        "/api/clientes",
        "/api/conductores",
        "/api/pedidos",
        "/api/rutas",
        "/api/vehiculos",
    ],
)
def test_all_business_apis_reject_anonymous_writes(
    anonymous_client,
    endpoint,
):
    response = anonymous_client.post(endpoint, json={})
    assert response.status_code == 401, (
        f"{endpoint} debería rechazar registros sin token"
    )
@pytest.mark.parametrize(
    "endpoint",
    [
        "/api/clientes",
        "/api/conductores",
        "/api/pedidos",
        "/api/rutas",
        "/api/vehiculos",
    ],
)
def test_non_operational_role_cannot_create_records(auth_user, endpoint):
    token = create_access_token(auth_user["user_id"])

    with TestClient(
        app,
        headers={"Authorization": f"Bearer {token}"},
    ) as restricted_client:
        response = restricted_client.post(endpoint, json={})

    assert response.status_code == 403, (
        f"El rol de prueba no debería poder crear registros en {endpoint}"
    )


def test_non_admin_cannot_update_vehicle(client, auth_user, vehicle_payload):
    created = client.post("/api/vehiculos", json=vehicle_payload)
    assert created.status_code == 201

    vehicle_id = created.json()["vehiculo_id"]
    update_payload = {**vehicle_payload, "capacidad_kg": 1500}
    token = create_access_token(auth_user["user_id"])

    with TestClient(
        app,
        headers={"Authorization": f"Bearer {token}"},
    ) as restricted_client:
        response = restricted_client.put(
            f"/api/vehiculos/{vehicle_id}",
            json=update_payload,
        )

    assert response.status_code == 403


def test_non_admin_cannot_delete_vehicle(client, auth_user, vehicle_payload):
    created = client.post("/api/vehiculos", json=vehicle_payload)
    assert created.status_code == 201

    vehicle_id = created.json()["vehiculo_id"]
    token = create_access_token(auth_user["user_id"])

    with TestClient(
        app,
        headers={"Authorization": f"Bearer {token}"},
    ) as restricted_client:
        response = restricted_client.delete(
            f"/api/vehiculos/{vehicle_id}"
        )

    assert response.status_code == 403

    # Verificar que la operación rechazada no haya eliminado el vehículo.
    verification = client.get(f"/api/vehiculos/{vehicle_id}")
    assert verification.status_code == 200
