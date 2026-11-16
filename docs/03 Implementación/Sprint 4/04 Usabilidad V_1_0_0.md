# Evaluación cuantitativa de usabilidad — SUS

[← Volver al README principal](../../../README.md) · [Índice del Sprint 4](README.md)

## 1. Objetivo

Evaluar la usabilidad percibida de EcoLogística Huancayo mediante la escala System Usability Scale (SUS), utilizando diez afirmaciones con respuesta Likert de 1 a 5. La rúbrica de Sprint 4 exige una muestra mínima de cinco usuarios, respuestas individuales, cálculo matemático y comparación con el umbral de aceptación de 68 puntos.

**Estado de este documento:** el instrumento y el procedimiento están definidos. No se declaran resultados cuantitativos porque todavía no se han aportado respuestas reales de participantes. El apartado de resultados debe completarse después de aplicar el cuestionario; no se deben inventar, completar ni sustituir respuestas.

## 2. Ficha técnica de la evaluación

| Campo | Definición del estudio |
|---|---|
| Sistema evaluado | EcoLogística Huancayo (EcoLogistics) |
| Instrumento | System Usability Scale (SUS), diez ítems |
| Escala | Likert de cinco opciones: 1 = totalmente en desacuerdo; 5 = totalmente de acuerdo |
| Participantes requeridos | Mínimo cinco usuarios reales |
| Identificación | Códigos anónimos P01, P02, P03…; no registrar nombres ni contraseñas |
| Perfil | Registrar únicamente perfil funcional (por ejemplo, usuario con experiencia administrativa, operador o usuario no técnico) y familiaridad general con sistemas web |
| Entorno | Registrar si la evaluación se realizó en ambiente local o desplegado; no presentar un ambiente local como producción |
| Tareas | Completar las tareas del apartado 3 antes de contestar las diez afirmaciones |
| Fecha de aplicación | Registrar la fecha real de cada sesión al completar la evaluación |

## 3. Tareas realizadas antes del cuestionario

Cada participante debe intentar completar las mismas tareas, con una breve explicación inicial y sin que el facilitador le indique dónde hacer clic:

1. Desde la página pública, identificar qué módulos ofrece EcoLogística y dónde se inicia sesión.
2. Acceder con una cuenta de prueba facilitada para la sesión y reconocer el panel principal y sus indicadores.
3. Navegar a Flota y localizar un vehículo mediante la búsqueda por placa o los filtros.
4. Encontrar las secciones de Clientes, Conductores y Pedidos y explicar para qué sirve cada una.
5. Abrir Rutas e identificar la información que se utiliza para organizar una asignación.
6. Identificar las opciones disponibles para el perfil de acceso y cerrar la sesión.

El facilitador debe registrar si cada tarea se completó, si necesitó ayuda y cualquier dificultad observada. No debe pedir al participante que realice cambios destructivos ni que elimine registros reales.

## 4. Cuestionario SUS

Indicar al participante que responda pensando en la experiencia que acaba de tener. Cada afirmación debe recibir una sola respuesta de 1 a 5.

| N.º | Afirmación | 1 | 2 | 3 | 4 | 5 |
|---:|---|:---:|:---:|:---:|:---:|:---:|
| 1 | Creo que me gustaría utilizar este sistema con frecuencia. | ○ | ○ | ○ | ○ | ○ |
| 2 | Encontré el sistema innecesariamente complejo. | ○ | ○ | ○ | ○ | ○ |
| 3 | Me pareció que el sistema era fácil de utilizar. | ○ | ○ | ○ | ○ | ○ |
| 4 | Creo que necesitaría el apoyo de una persona técnica para poder utilizar este sistema. | ○ | ○ | ○ | ○ | ○ |
| 5 | Encontré que las distintas funciones del sistema estaban bien integradas. | ○ | ○ | ○ | ○ | ○ |
| 6 | Me pareció que había demasiadas inconsistencias en el sistema. | ○ | ○ | ○ | ○ | ○ |
| 7 | Imagino que la mayoría de las personas aprendería a utilizar este sistema rápidamente. | ○ | ○ | ○ | ○ | ○ |
| 8 | Encontré el sistema complicado de utilizar. | ○ | ○ | ○ | ○ | ○ |
| 9 | Me sentí seguro al utilizar el sistema. | ○ | ○ | ○ | ○ | ○ |
| 10 | Necesité aprender muchas cosas antes de poder empezar a utilizar el sistema. | ○ | ○ | ○ | ○ | ○ |

**Opciones de respuesta:** 1 = Totalmente en desacuerdo; 2 = En desacuerdo; 3 = Ni de acuerdo ni en desacuerdo; 4 = De acuerdo; 5 = Totalmente de acuerdo.

## 5. Registro de respuestas brutas

Se deben copiar las diez respuestas originales de cada participante. Utilizar solo valores enteros de 1 a 5. La muestra mínima es de cinco respuestas completas.

| Participante | Perfil funcional | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| P01 | Por registrar | — | — | — | — | — | — | — | — | — | — |
| P02 | Por registrar | — | — | — | — | — | — | — | — | — | — |
| P03 | Por registrar | — | — | — | — | — | — | — | — | — | — |
| P04 | Por registrar | — | — | — | — | — | — | — | — | — | — |
| P05 | Por registrar | — | — | — | — | — | — | — | — | — | — |

Los guiones indican que la aplicación aún no se ha registrado; no son respuestas. El informe no estará finalizado hasta reemplazarlos por datos obtenidos de participantes reales y ampliar la tabla si el tamaño de muestra supera cinco.

## 6. Cálculo del puntaje SUS

Para cada participante se transforman las diez respuestas en contribuciones de 0 a 4:

- Ítems impares (1, 3, 5, 7 y 9): contribución = respuesta − 1.
- Ítems pares (2, 4, 6, 8 y 10): contribución = 5 − respuesta.
- Se suman las diez contribuciones y el total se multiplica por 2,5.

\[
SUS_i = 2.5 \times \sum_{j=1}^{10} c_{ij}
\]

Donde `c` es la contribución ajustada del ítem y el resultado individual se encuentra entre 0 y 100. El promedio global se calcula así:

\[
SUS_{promedio} = \frac{\sum_{i=1}^{n} SUS_i}{n}
\]

**Comprobación aritmética:** una respuesta completa debe generar un puntaje múltiplo de 2,5. No se deben calcular resultados con respuestas omitidas.

## 7. Interpretación de resultados

El criterio explícito de la rúbrica de esta actividad es un promedio SUS global **igual o superior a 68**. El valor 68 se utiliza como referencia de promedio general en estudios de SUS; no significa que el resultado sea un porcentaje.

Para informar la calificación complementaria, se puede utilizar la escala curva Sauro–Lewis:

| Grado | Puntaje SUS |
|---|---:|
| A+ | 84,1–100 |
| A | 80,8–84,0 |
| A− | 78,9–80,7 |
| B+ | 77,2–78,8 |
| B | 74,1–77,1 |
| B− | 72,6–74,0 |
| C+ | 71,1–72,5 |
| C | 65,0–71,0 |
| C− | 62,7–64,9 |
| D | 51,7–62,6 |
| F | 0–51,6 |

La clasificación por adjetivos se reportará de forma independiente: Best imaginable (84,1–100), Excellent (80,8–84,0), Good (71,1–80,7), Fair (51,7–71,0), Poor (25,1–51,6) y Worst imaginable (0–25,0). El umbral de 68 solicitado por la rúbrica se informará por separado de la categoría de aceptabilidad de otras escalas.

## 8. Resultados cuantitativos e interpretación

Este apartado se completará después de recibir las respuestas reales. Debe incluir:

1. La tabla de puntaje ajustado y SUS individual para cada participante.
2. La suma de puntajes individuales, el número efectivo de participantes y el promedio SUS global.
3. La comparación del promedio con el umbral de 68 solicitado por la rúbrica.
4. La calificación A+–F y el descriptor adjetival correspondiente.
5. Observaciones que se repitan entre participantes y cuellos de botella identificados durante las tareas.
6. Mejoras aplicadas o propuestas, distinguiendo entre correcciones ya implementadas y recomendaciones futuras.

No se registra aún un promedio, grado, adjetivo ni cuello de botella cuantitativo porque no existe una matriz de respuestas poblada. La interpretación se añadirá únicamente a partir de los datos de campo.

## 9. Referencias metodológicas

- Sauro, J. y Lewis, J. R. (2016). *Quantifying the User Experience: Practical Statistics for User Research*, capítulo sobre cuestionarios estandarizados. El texto presenta el promedio global SUS de referencia de 68 y la escala curva de calificación.
- GitLab Handbook. *System Usability Scale*. Resume el cálculo, la interpretación y la escala de calificación Sauro–Lewis: https://handbook.gitlab.com/handbook/product/ux/performance-indicators/system-usability-scale/
- MeasuringU / Sauro & Lewis. *Usability and User Experience Design and Evaluation* (2021, preprint), tabla de escala curva SUS: https://measuringu.com/wp-content/uploads/2023/10/2021_UsabilityAndUserExperienceDesignAndEvaluation_Chapter38_Preprint.pdf

---

**Versión:** V_1_0_0<br>
**Sprint:** 4<br>
**Proyecto:** EcoLogística Huancayo (EcoLogistics)
