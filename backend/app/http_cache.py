"""HTTP cache validation for authenticated, paginated JSON responses."""

import hashlib
import json
from typing import Any

from fastapi import Request, Response
from fastapi.encoders import jsonable_encoder


def apply_private_etag(
    request: Request,
    response: Response,
    payload: Any,
) -> Response | None:
    """Set a stable ETag and return 304 when the client's copy is current.

    Responses remain private because the API requires authentication. The
    ``no-cache`` directive allows browser storage but requires revalidation
    before reuse. Varying on Authorization prevents cross-user cache reuse.
    """
    encoded = jsonable_encoder(payload)
    representation = json.dumps(
        encoded,
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=False,
    ).encode("utf-8")
    etag = f'W/"{hashlib.sha256(representation).hexdigest()}"'

    response.headers["ETag"] = etag
    response.headers["Cache-Control"] = "private, no-cache"

    vary = [
        value.strip()
        for value in response.headers.get("Vary", "").split(",")
        if value.strip()
    ]
    if not any(value.lower() == "authorization" for value in vary):
        vary.append("Authorization")
    response.headers["Vary"] = ", ".join(vary)

    requested_tags = {
        value.strip()
        for value in request.headers.get("if-none-match", "").split(",")
        if value.strip()
    }
    def normalize_tag(value: str) -> str:
        return value[2:] if value.startswith("W/") else value

    normalized_requested_tags = {normalize_tag(value) for value in requested_tags}

    if "*" in requested_tags or normalize_tag(etag) in normalized_requested_tags:
        return Response(
            status_code=304,
            headers={
                "ETag": etag,
                "Cache-Control": "private, no-cache",
                "Vary": response.headers["Vary"],
            },
        )

    return None
