from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..core import settings
from ..db import get_db
from ..models.role import Role
from ..models.user import User
from ..schemas.auth import AuthenticatedUser, LoginRequest, TokenResponse
from ..security import (
    create_access_token,
    get_current_user,
    verify_password,
    verify_unknown_user_password,
)

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])


def _invalid_login() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas o cuenta no disponible.",
        headers={"WWW-Authenticate": "Bearer"},
    )


def _user_summary(user: User, role: Role) -> AuthenticatedUser:
    return AuthenticatedUser(
        usuario_id=user.usuario_id,
        nombre_usuario=user.nombre_usuario,
        rol=role.nombre,
        estado=user.estado,
    )


@router.post("/login", response_model=TokenResponse)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
) -> TokenResponse:
    statement = (
        select(User)
        .where(User.nombre_usuario == payload.nombre_usuario)
        .with_for_update()
    )
    user = db.scalar(statement)

    if user is None:
        verify_unknown_user_password(payload.password)
        raise _invalid_login()

    now = datetime.now(timezone.utc)

    if user.bloqueado_hasta is not None:
        blocked_until = user.bloqueado_hasta

        # SQLite puede devolver datetimes sin zona horaria en las pruebas.
        if blocked_until.tzinfo is None:
            blocked_until = blocked_until.replace(tzinfo=timezone.utc)

        if blocked_until > now:
            verify_password(payload.password, user.password_hash)
            raise _invalid_login()

        user.bloqueado_hasta = None
        user.intentos_fallidos = 0

    if user.estado.upper() != "ACTIVO":
        verify_password(payload.password, user.password_hash)
        raise _invalid_login()

    if not verify_password(payload.password, user.password_hash):
        user.intentos_fallidos += 1

        if user.intentos_fallidos >= settings.auth_max_attempts:
            user.bloqueado_hasta = now + timedelta(
                minutes=settings.auth_block_min
            )

        db.commit()
        raise _invalid_login()

    role = db.get(Role, user.rol_id)

    if role is None:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="La cuenta no tiene un rol válido.",
        )

    user.intentos_fallidos = 0
    user.bloqueado_hasta = None
    db.commit()

    return TokenResponse(
        access_token=create_access_token(user.usuario_id),
        token_type="bearer",
        expires_in=settings.access_token_expire_min * 60,
        user=_user_summary(user, role),
    )


@router.get("/me", response_model=AuthenticatedUser)
def get_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AuthenticatedUser:
    role = db.get(Role, current_user.rol_id)

    if role is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="La cuenta no tiene un rol válido.",
        )

    return _user_summary(current_user, role)
