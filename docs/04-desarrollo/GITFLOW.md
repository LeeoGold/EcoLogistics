# Flujo de trabajo Git/Gitflow — EcoLogística Huancayo

## Objetivo

Mantener el código de `main` estable, integrar mejoras en `develop` y aislar cada funcionalidad o corrección en una rama propia. Es una aplicación sencilla de los comandos Git y de las ramas `main`, `develop`, `feature`, `release` y `hotfix` descritos en los materiales del curso.

## Ramas que utilizaremos

| Rama | Uso |
|---|---|
| `main` | Versión estable y presentable. No desarrollar directamente aquí. |
| `develop` | Integración de funcionalidades comprobadas. |
| `feature/<nombre>` | Nueva funcionalidad, por ejemplo `feature/registro-pedidos`. |
| `fix/<nombre>` | Corrección técnica, por ejemplo `fix/dependencias-backend`. |
| `release/<version>` | Preparación y validación de una versión entregable, cuando corresponda. |
| `hotfix/<version>` | Corrección urgente de un fallo de la versión estable. |

Para este proyecto individual no necesitamos crear todas las ramas de soporte en cada avance. Usaremos principalmente `develop` y `feature/*`/`fix/*`; `release` y `hotfix` se reservan para cuando sean necesarios.

## Inicio de una sesión

```powershell
git status --short --branch
git switch develop
git pull --ff-only origin develop
```

Si `git status` muestra cambios que todavía no quieres guardar, no cambies de rama hasta decidir qué hacer con ellos.

## Empezar una funcionalidad

```powershell
git switch develop
git pull --ff-only origin develop
git switch -c feature/registro-pedidos
```

Usa un nombre breve y descriptivo. Para una corrección se puede usar `fix/<nombre>`.

## Revisar y guardar el avance

```powershell
git status
git diff
git add frontend/src backend
git diff --cached
git commit -m "feat: registrar pedidos desde la interfaz"
git push -u origin feature/registro-pedidos
```

Sustituye las rutas de `git add` y el mensaje por los archivos y propósito reales de cada cambio. No añadas `.env`, contraseñas, bases locales ni archivos generados.

## Integrar a develop

Después de comprobar el programa y sus pruebas, integra la rama mediante Pull Request hacia `develop` (recomendado) o, si el flujo del curso permite integración local:

```powershell
git switch develop
git pull --ff-only origin develop
git merge --no-ff feature/registro-pedidos
git push origin develop
git branch -d feature/registro-pedidos
git push origin --delete feature/registro-pedidos
```

Elimina la rama solo después de comprobar que la integración se completó correctamente.

## Preparar una versión estable

Cuando `develop` esté probado y listo para presentar, revisa los cambios y abre un Pull Request de `develop` hacia `main`. Para una entrega formal también se puede preparar una rama `release/1.0.0`, validar el incremento y etiquetar la versión:

```powershell
git switch develop
git switch -c release/1.0.0
# Ejecutar pruebas y revisar la documentación
git switch main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Versión 1.0.0"
git push origin main --tags
git switch develop
git merge --no-ff release/1.0.0
git push origin develop
git branch -d release/1.0.0
git push origin --delete release/1.0.0
```

No crees una etiqueta de versión si todavía no es una entrega aprobada.

## Comandos de consulta que debemos dominar

```powershell
git status --short --branch
git branch -vv
git log --oneline --graph --decorate --all -20
git diff
git diff --cached
git fetch origin
git pull --ff-only origin develop
git push
```

- `git fetch origin`: actualiza referencias remotas sin integrar automáticamente.
- `git pull`: obtiene y combina cambios; para actualizar `develop`, preferimos `git pull --ff-only` para evitar crear un merge accidental.
- `git diff`: muestra cambios aún no preparados; `git diff --cached` muestra lo que entrará en el próximo commit.
- `git log --graph`: permite examinar las relaciones entre ramas y commits.

## Reglas de seguridad

- No usar `git push -f` para corregir un flujo cotidiano: puede sobrescribir historia remota.
- No usar `git reset --hard` sin confirmar el commit objetivo y respaldar cualquier trabajo que quieras conservar.
- No mezclar una funcionalidad no probada directamente en `main`.
- Cada commit debe describir el cambio real; ejecutar pruebas antes de integrar.
- Mantener `.env` local y excluido del repositorio.
