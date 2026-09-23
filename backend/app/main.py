from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models  # noqa: F401 - registra los modelos antes de create_all
from .core import settings
from .db import Base, engine
from .routes.vehicles import router as vehicles_router

app = FastAPI(
    title="EcoLogística Huancayo API",
    version="0.1.0",
    description="API inicial para el MVP de EcoLogística Huancayo.",
)

origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Desarrollo inicial: crea las tablas de los modelos registrados si no existen.
# La fuente definitiva del esquema del proyecto también está en database/schema.sql.
Base.metadata.create_all(bind=engine)

app.include_router(vehicles_router)


@app.get("/health", tags=["Sistema"])
def health() -> dict[str, str]:
    return {"status": "ok", "project": "EcoLogística Huancayo"}
