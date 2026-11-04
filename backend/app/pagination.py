from math import ceil
from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import func, select
from sqlalchemy.orm import Session

T = TypeVar("T")


class PageResponse(BaseModel, Generic[T]):
    """Respuesta uniforme para listados paginados."""

    model_config = ConfigDict(from_attributes=True)

    items: list[T]
    total: int = Field(ge=0)
    page: int = Field(ge=1)
    page_size: int = Field(ge=1)
    total_pages: int = Field(ge=0)


def paginate_statement(
    db: Session,
    statement: Any,
    *,
    page: int,
    page_size: int,
) -> dict[str, Any]:
    """Aplica LIMIT/OFFSET y cuenta el total respetando filtros y orden."""
    count_statement = select(func.count()).select_from(
        statement.order_by(None).subquery()
    )
    total = int(db.scalar(count_statement) or 0)
    items = list(
        db.scalars(
            statement.offset((page - 1) * page_size).limit(page_size)
        ).all()
    )
    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": ceil(total / page_size) if total else 0,
    }
