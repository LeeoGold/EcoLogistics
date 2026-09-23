from decimal import Decimal
from uuid import uuid4


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "project": "EcoLogística Huancayo",
    }


def test_list_vehicles_returns_200(client):
    response = client.get("/api/vehiculos")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_vehicle_and_get_it(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["placa"] == vehicle_payload["placa"]
    assert "vehiculo_id" in created

    get_response = client.get(f"/api/vehiculos/{created['vehiculo_id']}")

    assert get_response.status_code == 200
    assert get_response.json()["placa"] == vehicle_payload["placa"]


def test_list_contains_created_vehicle(client, vehicle_payload):
    client.post("/api/vehiculos", json=vehicle_payload)

    response = client.get("/api/vehiculos")
    vehicles = response.json()

    assert any(item["placa"] == vehicle_payload["placa"] for item in vehicles)


def test_duplicate_plate_is_rejected(client, vehicle_payload):
    first = client.post("/api/vehiculos", json=vehicle_payload)
    second = client.post("/api/vehiculos", json=vehicle_payload)

    assert first.status_code == 201
    assert second.status_code == 409
    assert second.json()["detail"] == "La placa ya está registrada"


def test_invalid_capacity_is_rejected(client, vehicle_payload):
    vehicle_payload["capacidad_kg"] = 0

    response = client.post("/api/vehiculos", json=vehicle_payload)

    assert response.status_code == 422


def test_get_missing_vehicle_returns_404(client):
    response = client.get(f"/api/vehiculos/{uuid4()}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehículo no encontrado"


def test_update_vehicle(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)
    created = create_response.json()
    updated_plate = vehicle_payload["placa"].replace("TST-", "TSTU-")

    update_payload = {**vehicle_payload, "placa": updated_plate, "capacidad_kg": 1500}
    response = client.put(
        f"/api/vehiculos/{created['vehiculo_id']}",
        json=update_payload,
    )

    assert response.status_code == 200
    assert response.json()["placa"] == updated_plate
    assert Decimal(str(response.json()["capacidad_kg"])) == Decimal("1500")


def test_update_to_duplicate_plate_is_rejected(client):
    first_payload = {"placa": "TST-AAAAAA", "tipo": "CAMIONETA", "capacidad_kg": 1000,
                     "consumo_km_l": 10, "factor_co2_kg_km": 0.25, "anio_fabricacion": 2024,
                     "estado": "DISPONIBLE"}
    second_payload = {**first_payload, "placa": "TST-BBBBBB"}

    first = client.post("/api/vehiculos", json=first_payload)
    second = client.post("/api/vehiculos", json=second_payload)

    assert first.status_code == 201
    assert second.status_code == 201

    update_response = client.put(
        f"/api/vehiculos/{second.json()['vehiculo_id']}",
        json=first_payload,
    )

    assert update_response.status_code == 409


def test_delete_vehicle(client, vehicle_payload):
    create_response = client.post("/api/vehiculos", json=vehicle_payload)
    vehicle_id = create_response.json()["vehiculo_id"]

    delete_response = client.delete(f"/api/vehiculos/{vehicle_id}")
    assert delete_response.status_code == 204

    get_response = client.get(f"/api/vehiculos/{vehicle_id}")
    assert get_response.status_code == 404


def test_delete_missing_vehicle_returns_404(client):
    response = client.delete(f"/api/vehiculos/{uuid4()}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehículo no encontrado"
