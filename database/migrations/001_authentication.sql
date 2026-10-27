BEGIN;

-- Agrega el nombre de usuario sin eliminar datos existentes.
ALTER TABLE usuarios
    ADD COLUMN IF NOT EXISTS nombre_usuario VARCHAR(80);

UPDATE usuarios
SET nombre_usuario = 'usuario_' || replace(usuario_id::text, '-', '')
WHERE nombre_usuario IS NULL OR btrim(nombre_usuario) = '';

-- Crea un índice único solo si aún no existe uno equivalente.
DO $migration$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_index i
        JOIN pg_class t ON t.oid = i.indrelid
        JOIN pg_namespace n ON n.oid = t.relnamespace
        JOIN pg_attribute a
          ON a.attrelid = t.oid
         AND a.attnum = ANY(i.indkey)
        WHERE n.nspname = current_schema()
          AND t.relname = 'usuarios'
          AND i.indisunique
          AND i.indnkeyatts = 1
          AND a.attname = 'nombre_usuario'
    ) THEN
        CREATE UNIQUE INDEX uq_usuarios_nombre_usuario
            ON usuarios(nombre_usuario);
    END IF;
END
$migration$;

ALTER TABLE usuarios
    ALTER COLUMN nombre_usuario SET NOT NULL;

ALTER TABLE usuarios
    ADD COLUMN IF NOT EXISTS intentos_fallidos INTEGER NOT NULL DEFAULT 0;

ALTER TABLE usuarios
    ADD COLUMN IF NOT EXISTS bloqueado_hasta TIMESTAMPTZ;

-- Compatibilidad con bases antiguas que todavía tienen la columna email.
DO $migration$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = current_schema()
          AND table_name = 'usuarios'
          AND column_name = 'email'
    ) THEN
        ALTER TABLE usuarios ALTER COLUMN email DROP NOT NULL;
    END IF;
END
$migration$;

COMMIT;
