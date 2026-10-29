# Evidencias Green IT — EcoLogistics

Esta carpeta conserva los artefactos de comparación del escenario `/login` en build de producción local.

## Línea base (antes)
- `lighthouse-antes-desktop-1.html`
- `lighthouse-antes-desktop-2.html`
- `lighthouse-antes-desktop-3.html`
- `network-antes.png`
- `green-it-baseline-chrome-20261029.md`

## Después de la división de código
- `lighthouse-despues-desktop-1.html`
- `lighthouse-despues-desktop-2.html`
- `lighthouse-despues-desktop-3.html`
- `green-it-resultados-post-code-splitting-20261029.md`
- `green-it-code-splitting.patch` (parche de revisión; no volver a aplicar si el cambio ya está en el árbol de trabajo).

Los informes Lighthouse contienen sus diagnósticos y filmstrips. La captura Network disponible es solo de la línea base; no se ha incluido una captura Network posterior comparable. La reducción medida en transferencia procede de los reportes Lighthouse en ambos estados.

No se calculan emisiones de CO₂e ni se afirma una mejora global del score Performance. En la medición posterior, el bundle JS principal y bytes transferidos disminuyeron, pero la mediana de Performance fue 95 frente a 100 y los diagnósticos presentan inconsistencias de renderizado descritas en el informe.
