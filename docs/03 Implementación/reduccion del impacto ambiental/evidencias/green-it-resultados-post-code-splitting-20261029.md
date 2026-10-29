# Evidencia Green IT posterior — división de código

**Fecha:** 2026-10-29
**Proyecto:** EcoLogistics
**Ruta:** `http://127.0.0.1:4173/login`
**Build:** producción local servido con Vite Preview
**Lighthouse:** 13.5.0, Desktop, categoría Performance, `throttlingMethod=simulate`, RTT 40 ms, throughput 10,240 kbps, CPU slowdown 1.

## Lighthouse: tres ejecuciones

| Ejecución | Performance | FCP | LCP | TBT | CLS | Speed Index | Bytes transferidos | Solicitudes |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 92 | 343.057 ms | 343.057 ms | 0 ms | 0 | 3230.004 ms | 77,706 B | 3 |
| 2 | 95 | 360.097 ms | 360.097 ms | 0 ms | 0 | 2201.657 ms | 77,706 B | 3 |
| 3 | 98 | 360.199 ms | 360.199 ms | 0 ms | 0 | 1478.960 ms | 77,706 B | 3 |

**Medianas:** Performance 95/100; FCP y LCP 360.097 ms; TBT 0 ms; CLS 0; Speed Index 2201.657 ms; transferencia 77,706 bytes; 3 solicitudes.

## Recursos reportados

| Tipo | Recurso | Tamaño de recurso | Transferencia |
|---|---|---:|---:|
| Documento | `/login` | 407 B | 657 B |
| JavaScript | `index-DHsJT8y4.js` | 235,763 B | 73,556 B |
| CSS | `index-gkJMJ-1U.css` | 11,951 B | 3,493 B |

## Comparación contra la línea base

| Indicador | Antes | Después | Diferencia |
|---|---:|---:|---:|
| Performance (mediana) | 100 | 95 | -5 puntos |
| FCP/LCP (mediana) | 342.954 ms | 360.097 ms | +17.143 ms |
| Transferencia | 83,811 B | 77,706 B | -6,105 B (~7.28 %) |
| JS principal recurso | 272,076 B | 235,763 B | -36,313 B (~13.34 %) |
| JS principal transferido | 79,661 B | 73,556 B | -6,105 B |
| Solicitudes iniciales | 3 | 3 | Sin cambio |

En el build posterior, Vite informó el JS principal como 235.76 kB sin comprimir y 73.91 kB gzip, frente a 272.07 kB y 80.02 kB gzip en la línea base. La salida de compilación posterior fue correcta, con 48 módulos transformados. Frontend: 14/14 pruebas aprobadas.

## Limitación observada

El FCP/LCP principal es de aproximadamente 343–360 ms, pero el desglose de LCP en los informes posteriores refleja una demora de renderizado mucho mayor y el filmstrip presenta cuadros iniciales en blanco. Speed Index también muestra una dispersión notable entre repeticiones. Esto constituye una inconsistencia del conjunto de reportes y evita concluir que el score o la velocidad percibida global mejoraron. No se atribuye una causa concluyente sin una traza reproducible.

**Conclusión técnica respaldada:** la división de código redujo el bundle principal y la transferencia inicial registrada; las pruebas y el build pasaron. **No respaldado:** ahorro energético/CO₂e cuantificado o mejora global de Performance/experiencia percibida.
