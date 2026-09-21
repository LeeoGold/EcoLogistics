CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS roles (
    rol_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rol_id UUID NOT NULL REFERENCES roles(rol_id),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conductores (
    conductor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID UNIQUE REFERENCES usuarios(usuario_id),
    nombre_completo VARCHAR(150) NOT NULL,
    documento_identidad VARCHAR(20) NOT NULL UNIQUE,
    licencia VARCHAR(30) NOT NULL UNIQUE,
    categoria_licencia VARCHAR(20) NOT NULL,
    anios_experiencia INTEGER NOT NULL CHECK (anios_experiencia >= 0),
    disponibilidad_inicio TIME NOT NULL,
    disponibilidad_fin TIME NOT NULL,
    contacto VARCHAR(30) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CHECK (disponibilidad_inicio < disponibilidad_fin)
);

CREATE TABLE IF NOT EXISTS vehiculos (
    vehiculo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placa VARCHAR(15) NOT NULL UNIQUE,
    tipo VARCHAR(30) NOT NULL,
    capacidad_kg NUMERIC(10,2) NOT NULL CHECK (capacidad_kg > 0),
    consumo_km_l NUMERIC(10,3) NOT NULL CHECK (consumo_km_l > 0),
    factor_co2_kg_km NUMERIC(10,4) NOT NULL CHECK (factor_co2_kg_km >= 0),
    anio_fabricacion INTEGER NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE'
);

CREATE TABLE IF NOT EXISTS clientes (
    cliente_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(30),
    direccion_referencia VARCHAR(255) NOT NULL,
    latitud NUMERIC(10,7) NOT NULL,
    longitud NUMERIC(10,7) NOT NULL,
    horario_preferido_inicio TIME,
    horario_preferido_fin TIME,
    restricciones_acceso VARCHAR(255),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (horario_preferido_inicio IS NULL AND horario_preferido_fin IS NULL)
        OR (horario_preferido_inicio < horario_preferido_fin)
    )
);

CREATE TABLE IF NOT EXISTS pedidos (
    pedido_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES clientes(cliente_id),
    peso_kg NUMERIC(10,2) NOT NULL CHECK (peso_kg > 0),
    volumen_m3 NUMERIC(10,4) NOT NULL CHECK (volumen_m3 > 0),
    ventana_inicio TIMESTAMPTZ NOT NULL,
    ventana_fin TIMESTAMPTZ NOT NULL,
    prioridad VARCHAR(20) NOT NULL CHECK (prioridad IN ('EXPRESS', 'ESTANDAR', 'ECONOMICO')),
    tipo_producto VARCHAR(30) NOT NULL CHECK (tipo_producto IN ('PERECEDERO', 'NO_PERECEDERO')),
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    referencia_entrega VARCHAR(255),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (ventana_inicio < ventana_fin)
);

CREATE TABLE IF NOT EXISTS rutas (
    ruta_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha_planificada DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PLANIFICADA',
    distancia_km NUMERIC(12,3),
    tiempo_total_min NUMERIC(12,2),
    combustible_l NUMERIC(12,3),
    emisiones_co2_kg NUMERIC(12,3),
    penalizacion_total NUMERIC(12,3),
    creada_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS asignaciones_conductor (
    asignacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ruta_id UUID NOT NULL REFERENCES rutas(ruta_id),
    conductor_id UUID NOT NULL REFERENCES conductores(conductor_id),
    vehiculo_id UUID NOT NULL REFERENCES vehiculos(vehiculo_id),
    hora_inicio TIMESTAMPTZ NOT NULL,
    hora_fin TIMESTAMPTZ,
    CHECK (hora_fin IS NULL OR hora_inicio < hora_fin)
);

CREATE TABLE IF NOT EXISTS detalle_ruta (
    detalle_ruta_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ruta_id UUID NOT NULL REFERENCES rutas(ruta_id),
    pedido_id UUID NOT NULL REFERENCES pedidos(pedido_id),
    secuencia INTEGER NOT NULL CHECK (secuencia > 0),
    llegada_estimada TIMESTAMPTZ,
    salida_estimada TIMESTAMPTZ,
    distancia_tramo_km NUMERIC(12,3),
    UNIQUE (ruta_id, secuencia),
    UNIQUE (ruta_id, pedido_id)
);

CREATE TABLE IF NOT EXISTS entregas (
    entrega_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID NOT NULL REFERENCES pedidos(pedido_id),
    ruta_id UUID NOT NULL REFERENCES rutas(ruta_id),
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    hora_entrega TIMESTAMPTZ,
    observacion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS incidencias (
    incidencia_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID REFERENCES pedidos(pedido_id),
    ruta_id UUID REFERENCES rutas(ruta_id),
    usuario_id UUID REFERENCES usuarios(usuario_id),
    tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    registrada_en TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'ABIERTA'
);

CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios(rol_id);
CREATE INDEX IF NOT EXISTS idx_conductores_estado ON conductores(estado);
CREATE INDEX IF NOT EXISTS idx_vehiculos_estado ON vehiculos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_ventana ON pedidos(ventana_inicio, ventana_fin);
CREATE INDEX IF NOT EXISTS idx_rutas_fecha ON rutas(fecha_planificada);
CREATE INDEX IF NOT EXISTS idx_rutas_estado ON rutas(estado);
CREATE INDEX IF NOT EXISTS idx_asignaciones_ruta ON asignaciones_conductor(ruta_id);
CREATE INDEX IF NOT EXISTS idx_asignaciones_conductor ON asignaciones_conductor(conductor_id);
CREATE INDEX IF NOT EXISTS idx_detalle_ruta_pedido ON detalle_ruta(pedido_id);
CREATE INDEX IF NOT EXISTS idx_entregas_pedido ON entregas(pedido_id);
CREATE INDEX IF NOT EXISTS idx_incidencias_ruta ON incidencias(ruta_id);
CREATE INDEX IF NOT EXISTS idx_incidencias_pedido ON incidencias(pedido_id);
