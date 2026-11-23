-- EcoLogistics: consulta de solo lectura para validar los datos demostrativos en Neon.
-- No modifica ni elimina registros. Guardar captura del resultado para evidencia.

SELECT 'roles' AS tabla, COUNT(*) AS registros FROM roles
UNION ALL SELECT 'usuarios', COUNT(*) FROM usuarios
UNION ALL SELECT 'clientes', COUNT(*) FROM clientes
UNION ALL SELECT 'conductores', COUNT(*) FROM conductores
UNION ALL SELECT 'vehiculos', COUNT(*) FROM vehiculos
UNION ALL SELECT 'pedidos', COUNT(*) FROM pedidos
UNION ALL SELECT 'rutas', COUNT(*) FROM rutas
UNION ALL SELECT 'asignaciones_conductor', COUNT(*) FROM asignaciones_conductor
UNION ALL SELECT 'detalle_ruta', COUNT(*) FROM detalle_ruta
ORDER BY tabla;

-- Distribución de cuentas por rol (no muestra hashes ni contraseñas).
SELECT r.nombre AS rol, COUNT(u.usuario_id) AS cantidad_usuarios
FROM roles r
LEFT JOIN usuarios u ON u.rol_id = r.rol_id
GROUP BY r.rol_id, r.nombre
ORDER BY r.nombre;
