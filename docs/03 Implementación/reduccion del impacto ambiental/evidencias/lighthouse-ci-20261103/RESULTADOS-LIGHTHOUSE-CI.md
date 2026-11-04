# Auditoría Lighthouse CI — 03/11/2026

## Alcance

- Aplicación: EcoLogistics Huancayo.
- Página evaluada: /login.
- Ejecuciones: 3.
- Herramienta: Lighthouse CI 0.16.x.
- Entorno: compilación de producción local.

## Resultados

| Métrica | Ejecución 1 | Ejecución 2 | Ejecución 3 | Mediana | Objetivo |
|---|---:|---:|---:|---:|---:|
| Performance | 100 | 100 | 100 | 100 | >= 90 |
| FCP (ms) | 244 | 213 | 213 | 213 | <= 1000 |
| LCP (ms) | 375 | 348 | 350 | 350 | <= 1400 |
| TBT (ms) | 0 | 0 | 0 | 0 | <= 85 |
| CLS | 0 | 0 | 0 | 0 | <= 0.02 |
| Transferencia (KB) | 76.99 | 76.99 | 76.99 | 76.99 | <= 1126.4 |

## Conclusión

Las tres ejecuciones cumplen los umbrales de rendimiento establecidos en la rúbrica para la página /login.

La auditoría corresponde únicamente a esta página y a un entorno local de producción. No representa una medición integral de todos los módulos autenticados ni del despliegue público.

## Evidencias

Se adjuntan tres informes HTML, tres informes JSON y el manifiesto generado por Lighthouse CI.
