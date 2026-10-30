# Descripción del proceso

Para la segunda entrega el equipo trabajó con **Scrum**, en **dos sprints de una semana** antes de la entrega del 31 de octubre de 2026. Todo lo que aparece aquí sale de las [bitácoras de reunión](#bitácoras-de-reunión), de los [issues](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues?q=is%3Aissue) y del [milestone del Sprint 2](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/milestone/1).

## Roles

Se definieron en el [Sprint Planning del 19 de octubre](<bitácoras/2026-10-19 Sprint Planning.md>).

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
5. quedó registrada en la bitácora y marcada en el [to-do de la entrega](<../roles y metas/to-do-entrega-2.md>).

## Product Backlog

Sale de la rúbrica de la segunda entrega y se priorizó en el Sprint Planning. La priorización de los requisitos del producto está en [Priorización de requisitos](<../../Requisitos/Priorización de requisitos.md>).

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
| Sofía | RF01 | [#13](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/13) | 20/10 |
| Jennyfer | RF02, RF03 | [#14](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/14), [#15](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/15) | 26/10 |
| Daniel | RF04, RF05 | [#16](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/16), [#17](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/17) | 28/10 |
| Gabriel | RF06, RF07 | [#18](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/18), [#19](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/19) | 26/10 |
| Jahzeel | RF08, RF09 | [#20](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/20), [#21](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/21) | 26/10 |
| Rafael | RF10, RF11 | [#22](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/22), [#23](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/23) | 26/10 |

**Resultados:**
- Los 11 requisitos funcionales se refinaron, cada uno con su caso de uso e historia de usuario ([Requisitos funcionales](<../../Requisitos/Requisitos funcionales>)). Los casos de uso se cerraron en el issue [#24](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/24) el 27/10.
- Las reglas del repositorio quedaron listas al arrancar el sprint: la [plantilla de PR](../../.github/pull_request_template.md), las [plantillas de issue](../../.github/ISSUE_TEMPLATE) y el [bot de revisión](../../.github/workflows/revision.yml) se crearon el 18/10, y las plantillas de refinamiento de requisitos y de casos de uso el 20/10.

## Sprint 2 — Diseño (26 al 30 de octubre)

**Objetivo:** prototipo navegable validado, documentación completa y video de avance.

**Backlog día por día** ([milestone](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/milestone/1)):

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
| Sofía | RF01 | [#54](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/54) | 28/10 |
| Jennyfer | RF02, RF03 | [#55](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/55) | 28/10 |
| Daniel | RF04, RF05 | [#56](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/56) | 30/10 |
| Gabriel | RF06, RF07 | [#57](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/57) | 30/10 |
| Jahzeel | RF08, RF09 | [#58](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/58) | 29/10 |
| Rafael | RF10, RF11 | [#59](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues/59) | 30/10 |

**Resultados:**
- **Reunión con Laura (27/10)** ([bitácora](<bitácoras/2026-10-27 Reunión con Laura (clienta).md>)): eligió el logo solo con delineado y pidió corregir la nariz del jaguar; aprobó la paleta "Claro y accesible" (1c); detectó que faltaba la palabra "Departamento" en el nombre; pidió probar un prototipo con al menos una persona para ver la usabilidad; y recomendó revisar la ortografía y la estructura de los casos de uso e historias de usuario.
- **Presentación de bocetos (28/10)** ([bitácora](<bitácoras/2026-10-28 Reunión de Scrum.md>)): cada integrante mostró los bocetos y el flujo de sus requisitos y se resolvieron las dudas de consistencia visual.
- Más de 60 [bocetos](<../../Diseño/Bocetos>), la [guía de diseño](<../../Diseño/Guías y herramientas de diseño.md>), el [diagrama de casos de uso](<../../Requisitos/Diagrama de casos de uso>) y los criterios de aceptación de todas las historias de usuario.

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
| 19/10/2026 | [Sprint Planning de la fase de diseño](<bitácoras/2026-10-19 Sprint Planning.md>) |
| 26/10/2026 | [Reunión de equipo, inicio del Sprint 2](<bitácoras/2026-10-26 Reunión de equipo.md>) |
| 27/10/2026 | [Reunión con Laura (clienta)](<bitácoras/2026-10-27 Reunión con Laura (clienta).md>) |
| 28/10/2026 | [Reunión de Scrum: presentación de bocetos](<bitácoras/2026-10-28 Reunión de Scrum.md>) |
