from uuid import UUID

from pydantic import BaseModel, Field, field_validator


class LoginRequest(BaseModel):
    nombre_usuario: str = Field(min_length=3, max_length=80)
    password: str = Field(min_length=1, max_length=128)

    @field_validator("nombre_usuario")
    @classmethod
    def normalize_username(cls, value: str) -> str:
        normalized = value.strip().lower()
        if not normalized:
            raise ValueError("El nombre de usuario es obligatorio.")
        return normalized


class AuthenticatedUser(BaseModel):
    usuario_id: UUID
    nombre_usuario: str
    rol: str
    estado: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    user: AuthenticatedUser
