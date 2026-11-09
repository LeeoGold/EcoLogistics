# Anexo de validación posterior a Green IT `v1.0.0`

**Proyecto:** EcoLogística Huancayo (EcoLogistics)  
**Fecha de revisión:** 08 de noviembre de 2026  
**Código base revisado:** commit [`6041fe83`](https://github.com/LeeoGold/EcoLogistics/commit/6041fe83d54367afd7a00139c1366d9f4c90c2fa)  
**Estado:** correcciones posteriores a la Release `v1.0.0`; pendientes de integrar y validar en GitHub.

[← Índice Green IT](./README.md) · [Matriz de trazabilidad](./03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md) · [Evidencias](./evidencias/README.md)

## 1. Propósito

Durante una revisión complementaria se comprobó el código de la Release con la misma versión principal de Python configurada en `.github/workflows/ci.yml` (Python 3.13). Se encontró un problema de evaluación de anotaciones de tipos en `RouteRepository` que no se manifestaba en el entorno de desarrollo Python 3.14 utilizado anteriormente. También se incorporó una prueba automatizada permanente de compresión GZip.

Estos cambios no modifican las reglas funcionales del negocio. Son un ajuste de compatibilidad y una mejora de verificabilidad de una optimización Green IT ya implementada.

## 2. Compatibilidad de `RouteRepository` con Python 3.13

### Situación anterior

En `backend/app/repositories/route_repository.py`, la clase declara un método llamado `list` y, después, utiliza `list[Route]` en la anotación de retorno de `list_page`:

```python
class RouteRepository:
    def list(self, db: Session) -> list[Route]:
        ...

    def list_page(
        self, db: Session, *, offset: int, limit: int
    ) -> tuple[list[Route], int]:
        ...
```

En Python 3.13, las anotaciones se evaluaban durante la definición de la clase. En ese ámbito, el nombre `list` ya estaba asociado al método de la clase y no al tipo incorporado, por lo que se producía `TypeError: 'function' object is not subscriptable` al importar el módulo.

### Corrección aplicada

Se añadió la directiva de anotaciones diferidas al inicio del archivo:

```python
from __future__ import annotations
```

Las anotaciones dejan de evaluarse inmediatamente al definir la clase. Se conserva la firma tipada y el comportamiento del repositorio, sin alterar las consultas ni el modelo de datos.

**Relación con CI:** `.github/workflows/ci.yml` instala Python 3.13; por eso este ajuste permite que el entorno automatizado importe y pruebe el módulo en la misma línea de versión que declara el workflow.

## 3. Prueba automatizada de compresión GZip

### Situación anterior

La aplicación ya incorporaba `GZipMiddleware` en `backend/app/main.py` con `minimum_size=500` y `compresslevel=5`. La verificación de compresión estaba descrita como una comprobación local; no existía una prueba de regresión permanente para comprobar la cabecera de compresión.

### Prueba añadida

Se agregó `test_vehicle_list_uses_gzip_when_response_exceeds_threshold` en `backend/tests/test_vehicle_api.py`. La prueba registra varios vehículos de prueba para generar una respuesta mayor al umbral y consulta el listado con `Accept-Encoding: gzip`:

```python
response = client.get(
    "/api/vehiculos",
    headers={"Accept-Encoding": "gzip"},
)

assert response.status_code == 200
assert response.headers.get("content-encoding") == "gzip"
assert "accept-encoding" in response.headers.get("vary", "").lower()
assert isinstance(response.json(), list)
```

La prueba verifica que GZip se aplique a una respuesta suficientemente grande y que la respuesta varíe según la capacidad de compresión del cliente. No cambia el umbral ni el nivel configurados en producción.

## 4. Resultado de la suite backend

Después de ambas correcciones se ejecutó la suite completa desde `backend`:

```text
python -m pytest --cov=app --cov-report=term-missing --cov-report=xml:coverage.xml
81 passed in 17.11s
TOTAL: 1186 statements, 46 missed, 96% coverage
```

La ejecución de revisión se realizó con Python 3.13.5 y pytest 9.0.2. El archivo `backend/requirements-tests.txt` declara `pytest>=8,<9`, por lo que el entorno de revisión no coincide exactamente con la restricción de dependencia que instala CI. El resultado demuestra que la suite pasa en esta ejecución, pero el workflow remoto debe confirmar los 81 tests y la cobertura con la versión admitida por el proyecto. No debe presentarse como resultado de un workflow remoto de GitHub ni como parte del artefacto original `v1.0.0`.

## 5. Validaciones pendientes antes de publicar el parche

1. En el equipo de desarrollo, activar el entorno virtual del backend y ejecutar `python -m pytest -q`.
2. En `frontend`, ejecutar `npm ci`, `npm run test` y `npm run build` con Node.js 24.16.0. No se modificó el código del frontend en esta revisión.
3. Publicar los cambios en una rama y comprobar por separado los workflows `CI` y `Green IT Audit` en GitHub Actions.
4. Comprobar que los jobs de backend, frontend y Lighthouse terminen correctamente. Revisar también el resultado de SonarQube si forma parte del workflow ejecutado.

La Release y etiqueta `v1.0.0` se mantienen como registro de la entrega original. Si todas las validaciones posteriores terminan correctamente y se decide publicar estas correcciones, corresponden a una versión de parche posterior (`v1.0.1`); no se debe mover ni sobrescribir la etiqueta anterior.

## 6. Alcance y límites

- Esta revisión no convierte el proyecto en una aplicación MERN; la arquitectura continúa siendo React, FastAPI, SQLAlchemy y PostgreSQL.
- No se afirma que las dos áreas sin activos aplicables (WebP/AVIF y SVG inline) hayan sido implementadas.
- La prueba GZip demuestra el comportamiento del middleware en el backend de pruebas; no mide por sí sola el ahorro real de transferencia en producción.
- La validación frontend y los workflows remotos deben registrarse con sus resultados reales antes de publicar la siguiente versión.
