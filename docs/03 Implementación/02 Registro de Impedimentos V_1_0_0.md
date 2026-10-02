# 02 Registro de Impedimentos V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Sprint | Sprint 2 — Gestión operativa y flota |
| Periodo | 23/09/2026 – 05/10/2026 |
| Corte | 02/10/2026 |

## 2. Registro

| ID | Impedimento | Tipo | Impacto | Prioridad | Estado | Acción de resolución / mitigación | Trazabilidad |
|---|---|---|---|---|---|---|---|
| IMP-001 | Diferencias de entorno entre PCs, principalmente disponibilidad de PostgreSQL local y dependencias | Técnico | Alto | Alta | Mitigado | Centralizar la validación integral en el entorno con PostgreSQL operativo, mantener checklist de instalación y sincronizar el repositorio antes de continuar | DEV_SETUP.md / flujo Git |
| IMP-002 | Acumulación de cambios de backend y frontend durante varias historias | Técnico / operativo | Medio | Media | Mitigado | Separar cambios por historia, mantener estructura modular y ejecutar `compileall` / `npm run build` como verificaciones intermedias | US-003 a US-011 |
| IMP-003 | Las pruebas funcionales finales del Sprint 2 todavía no se han ejecutado al corte | Calidad | Medio | Alta | Abierto | Ejecutar la batería integral al cierre y registrar resultados antes de declarar Done | Definition of Done / tests |

## 3. Seguimiento

IMP-001 e IMP-002 no bloquean actualmente la continuación del desarrollo. IMP-003 permanece abierto porque la validación final forma parte del cierre de calidad del Sprint.

## 4. Criterio de cierre

Un impedimento se considerará cerrado cuando exista evidencia verificable de la resolución o mitigación y no produzca un bloqueo sobre la entrega comprometida.
