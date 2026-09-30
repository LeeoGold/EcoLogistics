from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str

    cors_origins: str = "http://localhost:5173"

    app_env: str = "development"

    access_token_secret: str
    access_token_expire_min: int = 15
    refresh_token_expire_days: int = 30
    mfa_challenge_ttl_min: int = 5
    mfa_max_attempts: int = 5
    mfa_challenge_block_min: int = 30

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()