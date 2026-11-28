# Descripción del proceso

El equipo trabaja con **Scrum**. Para la segunda entrega hubo **dos sprints de una semana** antes de la entrega del 31 de octubre de 2026 (Sprints 1 y 2), y para la tercera entrega **un sprint de una semana** antes del 30 de noviembre de 2026 (Sprint 3). Todo lo que aparece aquí sale de las bitácoras de reunión, de los issues, de los pull requests y de los milestones de cada sprint.

## Roles

Se definieron en el Sprint Planning del 19 de octubre.

| Rol Scrum | Integrante | Responsabilidad |
|---|---|---|
| Scrum Master | Gabriel | Modera las reuniones, cuida el tiempo y registra acuerdos |
| Product Owner | Sofía | Representa a Laura, prioriza el backlog y acepta lo terminado. También gestiona el repositorio |
| Developers | Jennyfer, Daniel, Jahzeel, Rafael, Gabriel y Sofía | Refinan requisitos, hacen casos de uso y bocetos, y estiman sus tareas |
| Stakeholder (clienta) | Laura, coordinadora del DOCE | Da las necesidades y valida los avances. No asiste a los sprints |

Laura es la clienta, no la Product Owner: en Scrum el PO debe estar disponible para el equipo todo el sprint, así que Sofía traduce lo que pide Laura al backlog y le muestra los avances.

## Eventos

| Evento | Cuándo | Duración | Qué sale de ahí |
|---|---|---|---|
| Sprint Planning | 19/10 para ambos sprints; ajuste el lunes 26/10 | 45 min | Objetivo del sprint y Sprint Backlog con responsables |
| Daily Scrum | Se acuerda al final de cada reunión | 15 min | Qué terminé, qué haré hoy y qué me bloquea |
| Sprint Review | Al cierre de cada sprint (25/10 y 30/10) | 30 min | Qué se terminó y qué acepta Laura (o el PO en su nombre) |
| Sprint Retrospective | Justo después de la Review | 15 min | Qué mejorar en el siguiente sprint |

## Cómo se planea y cuándo algo está terminado

**Estimación por tallas:** S (2 horas o menos), M (medio día) y L (1 a 2 días). Lo que es más grande que L se divide. Cada developer tiene al menos una tarea por sprint y nadie más de dos tareas L.

**Definition of Done.** Una tarea está terminada cuando:
1. cumple el criterio de aceptación acordado;
2. está en su rama `feature/...` con commits `Docs:`, `Fix:` o `Feat:`;
3. tiene un PR con la plantilla llena y su issue vinculado;
4. otro integrante revisó y aprobó el PR, y se integró con *squash*;
5. quedó registrada en la bitácora y marcada en el to-do de la entrega.

## Product Backlog

Sale de la rúbrica de la segunda entrega y se priorizó en el Sprint Planning. La priorización de los requisitos del producto está en Priorización de requisitos.

| # | Elemento | Área | Sprint planeado |
|---|---|---|---|
| 1 | Refinar requisitos funcionales (historias y criterios de aceptación) | Requisitos | 1 |
| 2 | Refinar requisitos no funcionales (hacerlos medibles) | Requisitos | 1 |
| 3 | Actualizar el diagrama de casos de uso y otros artefactos | Requisitos | 1 |
| 4 | Bocetos de las vistas del estudiante | Diseño | 1 |
| 5 | Bocetos del panel de administración | Diseño | 1 |
| 6 | Prototipo navegable | Diseño | 2 |
| 7 | Matriz de correspondencia entre pantallas y requisitos | Diseño | 2 |
| 8 | Validación de interfaces | Diseño | 2 |
| 9 | Descripción del proceso | Proceso | 1 |
| 10 | Gestión del proceso: tablero, issues y seguimiento | Proceso | 1 |
| 11 | Bitácoras de reuniones | Proceso | 1 y 2 |
| 12 | Métrica de contribución individual | Proceso | 2 |
| 13 | Repositorio: proteger `main`, plantillas, bot y README | Proceso | 1 |
| 14 | Video de avance | Presentación | 2 |
| 15 | Competencias genéricas y específicas | Competencias | 2 |

---

## Sprint 1 — Requisitos (19 al 25 de octubre)

**Objetivo:** requisitos refinados, proceso y repositorio listos, y bocetos de todas las pantallas.

**Reparto del refinamiento** (un issue por requisito, todos abiertos el 20/10):

| Responsable | Requisitos | Issues | Cerrados |
|---|---|---|---|
| Sofía | RF01 | #13 | 20/10 |
| Jennyfer | RF02, RF03 | #14, #15 | 26/10 |
| Daniel | RF04, RF05 | #16, #17 | 28/10 |
| Gabriel | RF06, RF07 | #18, #19 | 26/10 |
| Jahzeel | RF08, RF09 | #20, #21 | 26/10 |
| Rafael | RF10, RF11 | #22, #23 | 26/10 |

**Resultados:**
- Los 11 requisitos funcionales se refinaron, cada uno con su caso de uso e historia de usuario (Requisitos funcionales). Los casos de uso se cerraron en el issue #24 el 27/10.
- Las reglas del repositorio quedaron listas al arrancar el sprint: la plantilla de PR, las plantillas de issue y el bot de revisión se crearon el 18/10, y las plantillas de refinamiento de requisitos y de casos de uso el 20/10.

## Sprint 2 — Diseño (26 al 30 de octubre)

**Objetivo:** prototipo navegable validado, documentación completa y video de avance.

**Backlog día por día** (milestone):

| Día | Plan |
|---|---|
| Lun 26 | Sprint Planning; bocetos de los wireframes y propuestas de paleta y tipografía |
| Mar 27 | Reunión con Laura a las 12:00 para acordar cómo se verá el sistema |
| Mié 28 | Guía de estilo y plantillas de diseño finales, con los ajustes de Laura |
| Jue 29 | Wireframes de todas las pantallas; estructura y guion del video |
| Vie 30 | Prototipo navegable y material del video listos; Review y Retro |

**Reparto de bocetos** (un issue por par de requisitos, abiertos el 27/10):

| Responsable | Requisitos | Issue | Cerrado |
|---|---|---|---|
| Sofía | RF01 | #54 | 28/10 |
| Jennyfer | RF02, RF03 | #55 | 28/10 |
| Daniel | RF04, RF05 | #56 | 30/10 |
| Gabriel | RF06, RF07 | #57 | 30/10 |
| Jahzeel | RF08, RF09 | #58 | 29/10 |
| Rafael | RF10, RF11 | #59 | 30/10 |

**Resultados:**
- **Reunión con Laura (27/10)** (bitácora): eligió el logo solo con delineado y pidió corregir la nariz del jaguar; aprobó la paleta "Claro y accesible" (1c); detectó que faltaba la palabra "Departamento" en el nombre; pidió probar un prototipo con al menos una persona para ver la usabilidad; y recomendó revisar la ortografía y la estructura de los casos de uso e historias de usuario.
- **Presentación de bocetos (28/10)** (bitácora): cada integrante mostró los bocetos y el flujo de sus requisitos y se resolvieron las dudas de consistencia visual.
- Más de 60 bocetos, la guía de diseño, el diagrama de casos de uso y los criterios de aceptación de todas las historias de usuario.

---

## Lo planeado frente a lo real

| Qué pasó | Ajuste |
|---|---|
| Los bocetos estaban planeados para el Sprint 1, pero el refinamiento tomó toda la semana | Se movieron al Sprint 2 en el ajuste de planeación del 26/10 (issues #54 a #59) |
| El refinamiento de RF04 y RF05 se cerró el 28/10, ya en el Sprint 2 | Se integró antes de terminar los bocetos de esos requisitos |

## Asistencia registrada

| Integrante | 19/10 Sprint Planning | 26/10 Reunión de equipo | 28/10 Reunión de Scrum |
|---|---|---|---|
| Sofía | Sí | Sí | Sí |
| Gabriel | Sí | Sí (llegó 8:24) | Sí |
| Jennyfer | Sí | Sí | Sí |
| Daniel | Sí | Sí | Sí |
| Jahzeel | Sí | Sí | Sí |
| Rafael | No | No | No |

La asistencia a la reunión con Laura (27/10) no quedó registrada en la bitácora.

## Bitácoras de reunión

| Fecha | Reunión |
|---|---|
| 19/10/2026 | Sprint Planning de la fase de diseño |
| 26/10/2026 | Reunión de equipo, inicio del Sprint 2 |
| 27/10/2026 | Reunión con Laura (clienta) |
| 28/10/2026 | Reunión de Scrum: presentación de bocetos |

---

## Sprint 3 — Pruebas (23 al 30 de noviembre)

**Objetivo:** verificar que cada requisito funcional, su historia de usuario y sus casos de uso estén completos y correctos, aplicar los cambios necesarios y construir el prototipo HTML a partir de los requisitos verificados para hacer la prueba de usabilidad.

El backlog completo, con el detalle de cada issue, está en [Backlog Sprint 3](<Backlog Sprint 3.md>). Milestone: **Sprint 3 - Pruebas**.

**Reparto** (cada integrante verificó los requisitos que refinó en la entrega 2):

| Responsable | Tarea | Issue | PR integrado |
|---|---|---|---|
| Sofía | Verificar y ajustar RF01 | #70 | Commit directo, 22/11 |
| Jennyfer | Verificar y ajustar RF02 y RF03 | #71 | #77, 22/11 |
| Daniel | Verificar y ajustar RF04 y RF05 | #72 | Commits directos, 23/11 |
| Gabriel | Verificar y ajustar RF06 y RF07 | #73 | #80 y #83, 23/11 |
| Jahzeel | Verificar y ajustar RF08 y RF09 | #74 | #79, 23/11 |
| Rafael | Verificar y ajustar RF10 y RF11 | #75 | #78, 22/11 |
| Sofía | Prototipo HTML | #76 | #82 y #85, 27/11 |
| Sofía | Guía de la prueba de usabilidad | — | #84, 27/11 |

**Resultados:**
- Los 11 requisitos funcionales quedaron verificados contra sus historias de usuario, criterios de aceptación y casos de uso.
- Prototipo HTML navegable en [`prototipo/`](<../../prototipo/README.md>), con vistas de estudiante y de administración. Su [cobertura](<../../prototipo/COBERTURA.md>) revisa los 124 criterios de aceptación de RF01 a RF11.
- [Guía de la prueba de usabilidad](<../../Pruebas de usabilidad/Guía de la prueba de usabilidad.md>) y materiales para estudiantes y para la Coordinación del DOCE. La encuesta en Microsoft Forms quedó abierta hasta el domingo 29 de noviembre.

## Cambios del proceso respecto a la entrega 2

| Entrega 2 | Entrega 3 | Por qué |
|---|---|---|
| Dos sprints: uno de requisitos y otro de diseño | Un sprint de una semana con un objetivo único: verificar y probar | El alcance de la entrega era más corto y los requisitos ya estaban refinados |
| Un issue por requisito y otro por boceto | Un issue por par de requisitos, con el mismo responsable de la entrega 2 | Quien refinó un requisito es quien mejor sabe qué revisar |
| Las tareas se describían en el issue | Todas las tareas usan la plantilla "Tarea", con entregable y condición de "terminado" escritos | Para que la Product Owner pudiera aceptar cada tarea sin ambigüedad |
| Validación de interfaces solo con Figma | Prototipo HTML y prueba de usabilidad remota con estudiantes y con la Coordinación | Laura pidió en la reunión del 27/10 probar un prototipo con usuarios |
| Los PR iban a `entrega-2` | Los PR van a `entrega-3` | Una rama por entrega |

