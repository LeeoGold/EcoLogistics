from uuid import uuid4


def test_list_drivers_returns_200(client):
    response = client.get("/api/conductores")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_driver_and_get_it(client):
    payload = {
        "nombre_completo": "Conductor Prueba",
        "documento_identidad": f"TST-{uuid4().hex[:8]}",
        "licencia": f"LIC-{uuid4().hex[:8]}",
        "categoria_licencia": "A-IIa",
        "anios_experiencia": 4,
        "disponibilidad_inicio": "08:00:00",
        "disponibilidad_fin": "17:00:00",
        "contacto": "999999999",
        "estado": "ACTIVO",
    }

    create_response = client.post("/api/conductores", json=payload)
    assert create_response.status_code == 201

    created = create_response.json()
    assert created["nombre_completo"] == payload["nombre_completo"]
    assert "conductor_id" in created

    get_response = client.get(f"/api/conductores/{created['conductor_id']}")
    assert get_response.status_code == 200
    assert get_response.json()["licencia"] == payload["licencia"]


def test_invalid_experience_is_rejected(client):
    payload = {
        "nombre_completo": "Conductor Inválido",
        "documento_identidad": f"TST-{uuid4().hex[:8]}",
        "licencia": f"LIC-{uuid4().hex[:8]}",
        "categoria_licencia": "A-IIa",
        "anios_experiencia": -1,
        "disponibilidad_inicio": "08:00:00",
        "disponibilidad_fin": "17:00:00",
        "contacto": "999999999",
        "estado": "ACTIVO",
    }

    response = client.post("/api/conductores", json=payload)
    assert response.status_code == 422


def test_invalid_schedule_is_rejected(client):
    payload = {
        "nombre_completo": "Conductor Horario",
        "documento_identidad": f"TST-{uuid4().hex[:8]}",
        "licencia": f"LIC-{uuid4().hex[:8]}",
        "categoria_licencia": "A-IIa",
        "anios_experiencia": 1,
        "disponibilidad_inicio": "18:00:00",
        "disponibilidad_fin": "08:00:00",
        "contacto": "999999999",
        "estado": "ACTIVO",
    }

    response = client.post("/api/conductores", json=payload)
    assert response.status_code == 422


def test_duplicate_document_is_rejected(client):
    suffix = uuid4().hex[:8]
    payload = {
        "nombre_completo": "Conductor Duplicado",
        "documento_identidad": f"TST-{suffix}",
        "licencia": f"LIC-{suffix}",
        "categoria_licencia": "A-IIa",
        "anios_experiencia": 2,
        "disponibilidad_inicio": "08:00:00",
        "disponibilidad_fin": "17:00:00",
        "contacto": "999999999",
        "estado": "ACTIVO",
    }

    first = client.post("/api/conductores", json=payload)
    second = client.post(
        "/api/conductores",
        json={**payload, "nombre_completo": "Otro Conductor", "licencia": f"LIC2-{suffix}"},
    )

    assert first.status_code == 201
    assert second.status_code == 409
