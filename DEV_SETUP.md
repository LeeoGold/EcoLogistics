# EcoLogística Huancayo — configuración inicial de desarrollo

Este paquete contiene el primer corte funcional del MVP: API FastAPI + PostgreSQL + interfaz React para registrar y consultar vehículos.

## 1. Base de datos

Crear una base de datos PostgreSQL llamada `ecologistica`.

Después ejecutar `database/schema.sql` sobre esa base.

La conexión utilizada por defecto es:

`postgresql+psycopg://postgres:postgres@localhost:5432/ecologistica`

Si tu usuario, contraseña o puerto son diferentes, cambia `backend/.env`.

## 2. Backend

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
fastapi dev app/main.py
```

La API queda en `http://127.0.0.1:8000`.

Documentación interactiva: `http://127.0.0.1:8000/docs`.

Salud: `http://127.0.0.1:8000/health`.

## 3. Datos de ejemplo

Con el backend virtual activado:

```powershell
python seed.py
```

## 4. Frontend

En otra terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Abrir `http://localhost:5173`.

## 5. Trabajo en dos computadoras

- El repositorio GitHub es la fuente de código.
- `backend/.env` y `frontend/.env` son locales y no se suben a Git.
- Antes de comenzar en una computadora existente: `git pull`.
- Después de terminar un avance: `git add .`, `git commit -m "..."`, `git push`.
- Cada PC crea su propia base PostgreSQL local. El mismo `database/schema.sql` permite reproducir su estructura.
