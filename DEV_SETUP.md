# EcoLogística Huancayo — configuración de desarrollo

Guía para ejecutar localmente la versión del repositorio. La arquitectura utiliza FastAPI/Python, SQLAlchemy, PostgreSQL y React/Vite. La interfaz incluye Inicio/Dashboard, Flota, Clientes, Conductores, Pedidos y Rutas.

## 1. Requisitos

- PostgreSQL en ejecución.
- Python 3.13 recomendado para reproducir el entorno del workflow CI (`.github/workflows/ci.yml`).
- Node.js 24 y npm, utilizados por los workflows de GitHub Actions.
- Git.

El proyecto puede funcionar con versiones locales compatibles, pero se recomienda comenzar con las versiones utilizadas por CI para reducir diferencias de entorno.

## 2. Preparar PostgreSQL

1. Inicia el servicio PostgreSQL.
2. Crea una base de datos llamada `ecologistica` con tu usuario local.
3. Ejecuta `database/schema.sql` sobre esa base.
4. Crea `backend/.env` a partir de `backend/.env.example` solo si todavía no existe. No sobrescribas un `.env` existente.
5. Ajusta `DATABASE_URL` según tu usuario, contraseña, puerto y base de datos.
6. Cambia `ACCESS_TOKEN_SECRET` por un secreto local propio si vas a compartir o exponer el entorno. El valor de ejemplo es únicamente para desarrollo y no debe usarse en producción.

Ejemplo de cadena local:

```text
postgresql+psycopg://postgres:postgres@localhost:5432/ecologistica
```

No subas archivos `.env`, contraseñas, tokens ni datos reales de usuarios al repositorio.

## 3. Instalar y ejecutar el backend (PowerShell)

```powershell
Set-Location backend
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt -r requirements-tests.txt
```

Si tu equipo no dispone de Python 3.13, utiliza una versión compatible con las dependencias del proyecto y con la que puedas ejecutar la suite. Python 3.13 es la referencia utilizada en CI; Python 3.14 también se utilizó en las ejecuciones locales comunicadas para este proyecto. En ese caso, cambia el primer comando por `py -3.14 -m venv .venv` si esa versión es la que tienes instalada.

Inicia la API desde la carpeta `backend`:

```powershell
python -m uvicorn app.main:app --reload
```

- API: `http://127.0.0.1:8000`
- Documentación interactiva: `http://127.0.0.1:8000/docs`
- Estado de salud: `http://127.0.0.1:8000/health`

La aplicación registra los modelos y crea tablas que falten al iniciar; `database/schema.sql` continúa siendo el esquema de referencia del repositorio. Verifica que la base de datos local esté preparada antes de iniciar la API.

## 4. Ejecutar pruebas del backend

Las pruebas usan una base SQLite temporal configurada por los fixtures de `backend/tests`; no apuntes la suite a tu base PostgreSQL con información de desarrollo.

Desde la carpeta `backend` y con el entorno virtual activo:

```powershell
python -m pytest -q
```

Para generar cobertura local:

```powershell
python -m pytest --cov=app --cov-report=term-missing
```

El workflow de CI utiliza `pytest-cov` y exporta cobertura en XML para su análisis. Los valores de cobertura pueden variar según la versión de código y el comando ejecutado; no mezcles resultados de distintas ejecuciones.

## 5. Instalar y ejecutar el frontend

Abre una segunda terminal PowerShell:

```powershell
Set-Location frontend
npm ci
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm run dev
```

La interfaz estará disponible en `http://localhost:5173`. Comprueba que `VITE_API_URL` apunte a la API local si tu configuración no utiliza el valor predeterminado.

Pruebas y compilación:

```powershell
npm run test
npm run build
```

Para generar cobertura de Vitest:

```powershell
npm run test:coverage
```

`npm ci` respeta las versiones fijadas en `package-lock.json`; no reemplaces el lockfile por una instalación no reproducible sin revisar el cambio.

## 6. Consideraciones funcionales y de seguridad

- La API incluye autenticación mediante token JWT y almacenamiento de contraseñas con Argon2.
- Las rutas protegidas requieren usuario autenticado; algunas operaciones de escritura exigen roles concretos.
- El proyecto no debe presentarse como si MFA/TOTP estuviera implementado: esa capacidad está documentada como evolución.
- `US-013` permite planificación manual de rutas; no existe cálculo automático de trayectos reales ni de emisiones por ruta.
- Las pruebas automatizadas no reemplazan una verificación funcional manual de todos los flujos antes de una demostración.

## 7. Flujo de colaboración

Consulta [`docs/04-desarrollo/GITFLOW.md`](docs/04-desarrollo/GITFLOW.md). Como regla general, utiliza ramas `feature/*` o `fix/*` para cambios aislados, integra los avances según el flujo acordado por el equipo y conserva `main` para versiones estables.

## 8. Seguridad del entorno local

- No publiques `.env`, secretos ni bases de datos locales.
- No uses el secreto de ejemplo en un entorno público.
- No introduzcas datos personales reales en las capturas o evidencias de entrega.
- Revisa `git status --short` antes de cada commit para detectar archivos temporales, `coverage`, `dist`, bases SQLite y credenciales.
