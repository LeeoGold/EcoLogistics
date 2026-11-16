def test_dashboard_summary_returns_aggregate_counts(client):
    response = client.get("/api/dashboard/resumen")
    assert response.status_code == 200
    payload = response.json()
    assert payload["vehiculos_disponibles"] >= 0
    assert payload["vehiculos_total"] >= payload["vehiculos_disponibles"]
    assert payload["clientes_total"] >= 0
    assert payload["pedidos_pendientes"] >= 0
    assert payload["conductores_activos"] >= 0
    assert payload["conductores_total"] >= payload["conductores_activos"]
