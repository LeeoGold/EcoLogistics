# EcoLogística Huancayo — configuración de desarrollo

Este repositorio contiene un MVP con API FastAPI, PostgreSQL y una interfaz React/Vite. Los módulos disponibles son flota (vehículos), clientes y pedidos; los conductores cuentan con endpoints en la API.

## 1. Preparar la base de datos local

1. Verifica que el servicio PostgreSQL esté activo.
2. Crea una base de datos llamada `ecologistica` con tu usuario local.
3. Ejecuta `database/schema.sql` sobre esa base.
4. Crea `backend/.env` a partir de `backend/.env.example` solo si todavía no existe. No sobrescribas un `.env` existente porque puede contener tu configuración local.
5. Actualiza `DATABASE_URL` con tu usuario, contraseña, puerto y base reales.

La configuración de ejemplo usa:

`postgresql+psycopg://postgres:postgres@localhost:5432/ecologistica`

## 2. Instalar y arrancar el backend (PowerShell)

```powershell
cd backend
py -3.14 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Arranca la API:

```powershell
python -m uvicorn app.main:app --reload
```

- API: `http://127.0.0.1:8000`
- Documentación interactiva: `http://127.0.0.1:8000/docs`
- Salud: `http://127.0.0.1:8000/health`

Si aparece `ModuleNotFoundError`, comprueba que `(.venv)` esté activo y repite el comando de instalación de requisitos desde la carpeta `backend`.

## 3. Ejecutar pruebas sin tocar tu base real

Las pruebas fuerzan una base SQLite temporal en `backend/tests/.test_ecologistica.db`. No utilizan `backend/.env` para elegir la base y la base temporal se elimina al finalizar correctamente la suite.

```powershell
python -m pip install -r requirements-tests.txt
python -m pytest --cov=app --cov-report=term-missing
```

No apuntes las pruebas automatizadas a la base PostgreSQL con datos de desarrollo.

## 4. Frontend

Abre una segunda terminal:

```powershell
cd frontend
npm ci
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm run dev
```

`npm ci` instala las versiones registradas en `package-lock.json`. Si ya tienes `frontend/.env`, no lo sobrescribas. La aplicación estará en `http://localhost:5173`.

Antes de enviar cambios, ejecuta también:

```powershell
npm run build
```

## 5. Reglas de colaboración y ramas

Consulta [docs/04-desarrollo/GITFLOW.md](docs/04-desarrollo/GITFLOW.md). La regla base es: `main` conserva la versión estable, `develop` integra los avances y cada mejora se desarrolla en su propia rama `feature/*` o `fix/*`.

Los archivos `.env`, las bases de datos locales y los secretos no deben subirse a GitHub.
