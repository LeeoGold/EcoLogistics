-- Migración de Sprint 2: cambio de unidad para el consumo de vehículos.
-- La versión anterior almacenaba km/L.
-- La nueva unidad es km/galón estadounidense (US).
-- 1 galón estadounidense = 3.785411784 litros.

BEGIN;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'vehiculos'
          AND column_name = 'consumo_km_l'
    )
    AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'vehiculos'
          AND column_name = 'consumo_km_gal'
    ) THEN
        ALTER TABLE vehiculos
            RENAME COLUMN consumo_km_l TO consumo_km_gal;

        UPDATE vehiculos
        SET consumo_km_gal = ROUND(consumo_km_gal * 3.785411784, 3);
    END IF;
END
$$;

COMMENT ON COLUMN vehiculos.consumo_km_gal IS
    'Rendimiento del vehículo en kilómetros por galón estadounidense (US).';

COMMENT ON COLUMN vehiculos.factor_co2_kg_km IS
    'Factor de emisión estimado en kilogramos de CO2 por kilómetro recorrido.';

COMMIT;