# Anexo de validación posterior a Green IT `v1.0.0`



**Proyecto:** EcoLogística Huancayo (EcoLogistics)

**Fecha de revisión:** 10 de noviembre de 2026

**Código base revisado:** Release `v1.0.0` más merge commit [`1e802404`](https://github.com/LeeoGold/EcoLogistics/commit/1e802404c1171ecaf279807b686911728a3cb468)

**Estado:** PR #13 integrado en `main`; CI y Green IT Audit aprobados.



[← Índice Green IT](./README.md) · [Matriz de trazabilidad](./03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_2.md) · [Evidencias](./evidencias/README.md)



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



## 5. Validación remota posterior al merge



Los cambios se integraron en `main` mediante el [PR #13](https://github.com/LeeoGold/EcoLogistics/pull/13), con merge commit [`1e802404`](https://github.com/LeeoGold/EcoLogistics/commit/1e802404c1171ecaf279807b686911728a3cb468).



| Validación | Ejecución | Resultado |

|---|---|---|

| CI general | [GitHub Actions #26](https://github.com/LeeoGold/EcoLogistics/actions/runs/42551297248) | Correcto: 81 pruebas backend aprobadas, 14 pruebas frontend en cuatro archivos y build correcto. |

| SonarQube Cloud | Análisis asociado a PR #13 | Quality Gate aprobado; 0 issues nuevas y 0 hotspots nuevos. |

| Green IT Audit | [GitHub Actions #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/42551297294) | Correcto; Lighthouse CI ejecutado sobre la URL configurada (`/login`). |



La Release y etiqueta `v1.0.0` se mantienen como registro de la entrega original. La corrección está integrada en `main`, pero no se creó ni se asignó una nueva etiqueta de versión; no se debe afirmar que la Release `v1.0.0` incluye el merge commit posterior.



## 6. Alcance y límites



- Esta revisión no convierte el proyecto en una aplicación MERN; la arquitectura continúa siendo React, FastAPI, SQLAlchemy y PostgreSQL.

- No se afirma que las dos áreas sin activos aplicables (WebP/AVIF y SVG inline) hayan sido implementadas.

- La prueba GZip demuestra el comportamiento del middleware en el backend de pruebas; no mide por sí sola el ahorro real de transferencia en producción.

- La ejecución remota de CI y Green IT Audit para el merge de PR #13 está registrada en la sección 5. La Release `v1.0.0` sigue siendo el artefacto original, anterior a esa corrección.
