from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import (
    InvalidHashError,
    VerificationError,
    VerifyMismatchError,
)
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from .core import settings
from .db import get_db
from .models.role import Role
from .models.user import User

_password_hasher = PasswordHasher()

# Se usa para evitar respuestas demasiado rápidas cuando el usuario no existe.
_DUMMY_PASSWORD_HASH = _password_hasher.hash(
    "placeholder-password-for-nonexistent-account"
)

_bearer_scheme = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    """Genera un hash Argon2 de la contraseña."""
    return _password_hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    """Verifica una contraseña sin propagar errores de hashes inválidos."""
    try:
        return _password_hasher.verify(password_hash, password)
    except (
        VerifyMismatchError,
        InvalidHashError,
        VerificationError,
    ):
        return False


def verify_unknown_user_password(password: str) -> None:
    """Realiza una verificación equivalente si la cuenta no existe."""
    verify_password(password, _DUMMY_PASSWORD_HASH)


def create_access_token(user_id: UUID) -> str:
    """Crea un token de acceso firmado con expiración."""
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=settings.access_token_expire_min)

    claims = {
        "sub": str(user_id),
        "iat": now,
        "exp": expires_at,
        "jti": str(uuid4()),
        "token_type": "access",
    }

    return jwt.encode(
        claims,
        settings.access_token_secret,
        algorithm="HS256",
    )


def _unauthorized() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas o cuenta no disponible.",
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Valida el token y recupera una cuenta activa."""
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise _unauthorized()

    try:
        claims = jwt.decode(
            credentials.credentials,
            settings.access_token_secret,
            algorithms=["HS256"],
            options={
                "require": ["sub", "iat", "exp", "jti", "token_type"],
            },
        )

        if claims.get("token_type") != "access":
            raise _unauthorized()

        user_id = UUID(claims["sub"])
    except (jwt.InvalidTokenError, ValueError, TypeError, KeyError):
        raise _unauthorized() from None

    user = db.get(User, user_id)

    if user is None or user.estado.upper() != "ACTIVO":
        raise _unauthorized()

    return user

def require_roles(*allowed_roles: str):
    """Exige que el usuario autenticado tenga uno de los roles permitidos."""
    allowed = {
        role.strip().upper()
        for role in allowed_roles
        if role.strip()
    }

    if not allowed:
        raise ValueError("Debe especificarse al menos un rol permitido.")

    def role_dependency(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
    ) -> User:
        role = db.get(Role, current_user.rol_id)

        if role is None or role.nombre.strip().upper() not in allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para realizar esta operación.",
            )

        return current_user

    return role_dependency
