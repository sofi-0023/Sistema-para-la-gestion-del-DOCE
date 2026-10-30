# Reunión de planificación SCRUM – Fase de diseño (19 de octubre de 2026)

> Transcripción del documento original de la reunión. El contenido no se modificó.


## Datos de la reunión y agenda

Al salir de esta reunión deben quedar tres cosas: requisitos refinados, Product Backlog priorizado y los dos sprints repartidos con responsable y fecha límite.

**Fecha:** 19/10/2026 · **Hora inicio:** 12.04 · **Hora fin:** \_\_\_ · **Lugar/plataforma:** Discord ·

| Rol SCRUM             | Integrante                   | Responsabilidad hoy                                           | ¿Asistió?               |
|-----------------------|------------------------------|---------------------------------------------------------------|-------------------------|
| SCRUM master          | Gabriel                      | Modera, cuida el tiempo, registra acuerdos                    | SI                      |
| Product owner         | Sofia                        | Representa a Laura, prioriza el backlog y acepta lo terminado | SI                      |
| Developer             | Rafael                       | Propone tareas y estima                                       | NO                      |
| Developer             | Jahzeel                      | Propone tareas y estima                                       | SI                      |
| Developer             | Jennyfer                     | Propone tareas y estima                                       | SI                      |
| Developer             | Daniel                       | Propone tareas y estima                                       | SI                      |
| Stakeholder (clienta) | Laura, coordinadora del DOCE | Da las necesidades y valida avances en las Sprint Review      | No asiste a los sprints |

Laura es la clienta (stakeholder), no la Product Owner: en SCRUM el PO debe estar disponible para el equipo durante todo el sprint. El PO del equipo traduce lo que pide Laura al backlog y le muestra avances en cada Review. Si el PO también es developer, conviene que tenga menos carga de tareas.

**Agenda (90 min)**

1.  Apertura, elección del Product Owner y objetivo de la reunión — 5 min (Sofía)

2.  Repaso rápido de SCRUM — 10 min (Sofía)

3.  Refinamiento de requisitos funcionales y no funcionales — 25 min (PO conduce)

4.  Product Backlog: priorizar y estimar — 15 min (PO)

5.  Sprint Planning: objetivo y tareas del Sprint 1 y Sprint 2 — 25 min (todos)

6.  Acuerdos de repositorio, daily y cierre — 10 min (Sofía)

## Guía rápida de SCRUM para conducir la reunión

19/10/26 Se lleva a cabo el **Sprint Planning**: el Product Owner dice qué es lo más importante, el equipo decide cuánto cabe en cada sprint y cómo lo va a construir.

**Eventos de SCRUM aplicados a nuestro proyecto**

| Evento               | Cuándo                                                    | Duración | Quién                  | Qué sale de ahí                                                             |
|----------------------|-----------------------------------------------------------|----------|------------------------|-----------------------------------------------------------------------------|
| Sprint Planning      | 19/10/26 para ambos sprints; ajuste breve el lun 26/10/26 | 45 min   | Todos                  | Objetivo del sprint + Sprint Backlog con responsables                       |
| Daily Scrum          | Diario, a la hora acordada                                | 15 min   | Developers (SM modera) | Avance, plan del día, bloqueos                                              |
| Sprint Review        | Al cierre de cada sprint (dom 25/10 y vie 30/10)          | 30 min   | Todos                  | Qué se terminó; Laura (o el PO en su nombre) lo acepta; backlog actualizado |
| Sprint Retrospective | Justo después de la Review                                | 15 min   | Todos                  | Qué mejorar en el siguiente sprint                                          |

**Pasos del Sprint Planning (sección 5)**

1.  El PO presenta los elementos más prioritarios del Product Backlog, según lo que necesita Laura.

2.  El equipo redacta el **objetivo del sprint** en una frase.

3.  Se eligen los elementos que caben en una semana.

4.  Cada elemento se divide en tareas pequeñas (máx. 2–3 días cada una).

5.  Cada tarea recibe responsable, rama feature/\[nombre-meta\], estimación y fecha límite.

**Cómo estimar rápido:** tallas S (≤ 2 h), M (medio día), L (1–2 días). Si algo es más grande que L, se divide.

**Preguntas del Daily Scrum (máx. 3 min por persona)**

1.  ¿Qué terminé desde la última daily?

2.  ¿Qué haré hoy?

3.  ¿Tengo algún bloqueo?, algo que se necesite hablar

**Definition of Done — una tarea está "hecha" cuando:**

- [ ] Cumple el criterio de aceptación acordado

- [ ] Está en su rama feature/... con commits Docs:, Fix: o Feat:

- [ ] Tiene PR con la plantilla llena y su issue vinculado

- [ ] Otro integrante revisó y aprobó el PR, y se integró con squash

- [ ] Quedó registrada en la bitácora y marcada en el to do list

## Refinamiento de requisitos

Cada requisito sale de aquí con decisión, prioridad MoSCoW y un criterio de aceptación verificable. Las observaciones previas salen de revisar el repo hoy.

**Preguntas para cada requisito:**

- ¿se puede verificar?

- ¿tiene historia de usuario completa?

- ¿qué pantalla lo cubre?

- ¿cómo sabremos que está terminado?

**Requisitos funcionales**

<table>
<colgroup>
<col style="width: 8%" />
<col style="width: 22%" />
<col style="width: 23%" />
<col style="width: 23%" />
<col style="width: 23%" />
</colgroup>
<thead>
<tr class="header">
<th>ID</th>
<th><p>Requisito</p>
<p>No solo refinarlo sino también la historia de usuario</p></th>
<th><p>Cambio acordado, información de como se esta trabajando.</p>
<p>Si se deja o se cambia, o se elimina</p></th>
<th>Criterio de aceptation que se tiene que cumplir para que este correcto</th>
<th>Se acabó</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RF01</td>
<td>Catálogo/calendario</td>
<td><p>Reescribir y dividir el requisito, dividiéndolo en 2, definir como se van a mostrar las fechas del calendario, palabra interactiva puede mejorar ya que difiere a otra cosa.</p>
<p>Catalogo: listas de actividades, que no muestre las fechas anteriores (no tiene caso)</p>
<p>Calendario: distribuir esas actividades por fechas</p>
<p>En revisión:</p>
<p>RF1. El sistema desplegará un calendario de eventos y avisos ya publicados, cuya fecha sea igual o posterior al día actual, indicando nombre, fecha y hora de cada uno.</p></td>
<td></td>
<td>LISTO</td>
</tr>
<tr class="even">
<td>RF02</td>
<td>Detalle de actividad</td>
<td>JENNY</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>RF03</td>
<td>Crear/publicar</td>
<td>JENNY</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>RF04</td>
<td>Editar/retirar</td>
<td>DANIEL</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>RF05</td>
<td>Contactos y horarios</td>
<td>DANIEL</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>RF06</td>
<td>Líneas de ayuda</td>
<td>GABRIEL</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>RF07</td>
<td>Material informativo</td>
<td>GABRIEL</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>RF08</td>
<td>Gestionar material</td>
<td>JACIEL</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>RF09</td>
<td>Fotogalería</td>
<td>JACIEL</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>RF10</td>
<td>Tutorías y guías</td>
<td>RAFA</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>RF11</td>
<td>Inicio/cierre de sesión</td>
<td>RAFA</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

**Requisitos no funcionales**

| ID    | Requisito      | Cambio acordado | Cómo se verifica | Se acabó |
|-------|----------------|-----------------|------------------|----------|
| RNF01 | Usabilidad     |                 |                  |          |
| RNF02 | Compatibilidad |                 |                  |          |
| RNF03 | Mantenibilidad |                 |                  |          |
| RNF04 | Seguridad      |                 |                  |          |
| RNF05 | Rendimiento    |                 |                  |          |

## Product Backlog

El backlog sale de la rúbrica de la segunda entrega; la columna "Sprint propuesto" es una sugerencia para que el PO la confirme o mueva.

| \#  | Elemento                                                                                                              | Área         | Sprint |
|-----|-----------------------------------------------------------------------------------------------------------------------|--------------|--------|
| 1   | Refinar requisitos funcionales (historias + criterios de aceptación)                                                  | Requisitos   | 1      |
| 2   | Refinar requisitos no funcionales (hacerlos medibles)                                                                 | Requisitos   | 1      |
| 3   | Actualizar diagrama de casos de uso y otros artefactos                                                                | Requisitos   | 1      |
| 4   | Bocetos UI/UX — vistas del estudiante (calendario, detalle, directorio, líneas de ayuda, material, galería, tutorías) | Diseño       | 1      |
| 5   | Bocetos UI/UX — panel de administración (login, crear/editar actividad, gestionar material)                           | Diseño       | 1      |
| 6   | Prototipo navegable (Figma u otra herramienta)                                                                        | Diseño       | 2      |
| 7   | Matriz de correspondencia pantallas ↔ requisitos                                                                      | Diseño       | 2      |
| 8   | Validación de interfaces (prueba con usuarios o checklist)                                                            | Diseño       | 2      |
| 9   | Descripción del proceso (SCRUM, roles, sprints)                                                                       | Proceso      | 1      |
| 10  | Gestión del proceso: tablero, issues y herramientas de seguimiento                                                    | Proceso      | 1      |
| 11  | Bitácoras de reuniones (dailies, reviews, retros)                                                                     | Proceso      | 1 y 2  |
| 12  | Métrica de contribución individual actualizada                                                                        | Proceso      | 2      |
| 13  | Repo: proteger main, plantillas PR/issues, bot, README actualizado                                                    | Proceso      | 1      |
| 14  | Video de avance: guion, grabación y edición                                                                           | Presentación | 2      |
| 15  | Competencias genéricas y específicas actualizadas                                                                     | Competencias | 2      |

##  Sprint 1 y Sprint 2

Dos sprints de una semana antes del 1 de noviembre: el primero deja requisitos y bocetos listos, el segundo convierte eso en prototipo validado y entregable.

|                    | Sprint 1                                                                          | Sprint 2                                                               |
|--------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Fechas             | lun 19/10 – dom 25/10                                                             | lun 26/10 – vie 30/10                                                  |
| Objetivo propuesto | Requisitos refinados, proceso y repo listos, bocetos UI/UX de todas las pantallas | Prototipo navegable validado, documentación completa y video de avance |
| Objetivo acordado  |                                                                                   |                                                                        |
| Review + Retro     | dom 25/10, hora: 11:00 a.m                                                        | vie 30/10, hora: \_\_\_                                                |
| Entrega final      | --                                                                                | sáb 31/10                                                              |

**Sprint Backlog — Sprint 1**

| \# Backlog | Tarea                                                | Responsable | Rama                       | Fecha límite | Estado    |
|------------|------------------------------------------------------|-------------|----------------------------|--------------|-----------|
| 1          | Refinar RF01–RF11 y redactar criterios de aceptación |             | feature/refinar-rf         |              | Pendiente |
| 2          | Refinar RNF01–RNF05 con métricas verificables        |             | feature/refinar-rnf        |              | Pendiente |
| 3          | Actualizar diagrama de casos de uso                  |             | feature/casos-de-uso       |              | Pendiente |
| 4          | Bocetos de vistas del estudiante                     |             | feature/bocetos-estudiante |              | Pendiente |
| 5          | Bocetos del panel de administración                  |             | feature/bocetos-admin      |              | Pendiente |
| 9          | Documentar proceso SCRUM y sprints                   |             | feature/proceso-scrum      |              | Pendiente |
| 10, 13     | Tablero de seguimiento, issues y README actualizado  |             | feature/gestion-repo       |              | Pendiente |
| 11         | Bitácoras de dailies del Sprint 1                    |             | feature/bitacoras          |              | Pendiente |

**Sprint Backlog — Sprint 2**

| \# Backlog | Tarea                                       | Responsable | Rama                      | Fecha límite | Estado    |
|------------|---------------------------------------------|-------------|---------------------------|--------------|-----------|
| 6          | Prototipo navegable a partir de los bocetos |             | feature/prototipo         |              | Pendiente |
| 7          | Matriz pantallas ↔ requisitos               |             | feature/matriz-requisitos |              | Pendiente |
| 8          | Validación de interfaces y ajustes          |             | feature/validacion-ui     |              | Pendiente |
| 11         | Bitácoras de dailies, review y retro        |             | feature/bitacoras         |              | Pendiente |
| 12         | Métrica de contribución de la entrega       |             | feature/metrica           |              | Pendiente |
| 14         | Guion, grabación y edición del video        |             | feature/video             |              | Pendiente |
| 15         | Competencias genéricas y específicas        |             | feature/competencias      |              | Pendiente |
|            |                                             |             |                           |              | Pendiente |

**Regla de reparto:** cada developer debe tener al menos una tarea por sprint y ninguna persona más de dos tareas L.

## Acuerdos de trabajo, bitácora y seguimiento

Estas reglas se leen en voz alta y se confirman al final; lo que se acuerde aquí es la bitácora oficial de esta reunión.

**Reglas del repositorio (confirmar que todos las entienden)**

- [ ] main protegida: todo cambio entra por Pull Request con la plantilla llena

- [ ] Cada quien trabaja en su rama feature/\[nombre-meta\]

- [ ] Commits con prefijo Docs:, Fix: o Feat:

- [ ] Otro integrante revisa el PR (y el bot de revisión); se integra con squash

- [ ] No borrar la rama salvo que el autor lo indique

- [ ] Errores, huecos o información faltante → issue con su plantilla y responsable

- [ ] Revisor asignado para cada developer: \_\_\_

**Daily Scrum**

- Se acuerda después de cada scrum

  - Lun 19/10, se acordó que la siguiente reunión será el martes 20/10/26 a las 5:00

- Si alguien no puede asistir, deja sus 3 respuestas por escrito antes de las \_\_\_

**Bitácora de esta reunión**

| Tema               | Acuerdo / resolución | Responsable | Producto resultante | Fecha límite |
|--------------------|----------------------|-------------|---------------------|--------------|
| Requisitos         |                      |             |                     |              |
| Backlog            |                      |             |                     |              |
| Sprint 1           |                      |             |                     |              |
| Sprint 2           | --                   |             |                     |              |
| Repositorio        |                      |             |                     |              |
| Conflictos / dudas |                      |             |                     |              |

**Métrica de contribución por sprint**

Se va estar llenando cada vez que se le asigne una tarea nueva a la person

| Integrante | Tareas asignadas S1 | Completadas S1 | Tareas asignadas S2 | Completadas S2 | PRs aprobados | Dailies asistidas | % contribución |
|------------|---------------------|----------------|---------------------|----------------|---------------|-------------------|----------------|
| Sofía      | RF 1                | EN PROCESO     |                     |                |               |                   |                |
| Gabriel    | RF 6, 7             | EN PROCESO     |                     |                |               |                   |                |
| Rafael     | RF 10, 11           | EN PROCESO     |                     |                |               |                   |                |
| Jahzeel    | RF 8, 9             | EN PROCESO     |                     |                |               |                   |                |
| Jennyfer   | RF 2, 3             | EN PROCESO     |                     |                |               |                   |                |
| Daniel     | RF 4, 5             | EN PROCESO     |                     |                |               |                   |                |

| **INTEGRANTE** | **REUNIONES ASISTIDAS** |     |     |     |
|----------------|-------------------------|-----|-----|-----|
|                | **LUNES 19/10/2026**    |     |     |     |
| Sofía          | **SI**                  |     |     |     |
| Gabriel        | **SI**                  |     |     |     |
| Rafael         | **NO**                  |     |     |     |
| Jahzeel        | **SI**                  |     |     |     |
| Jennyfer       | **SI**                  |     |     |     |
| Daniel         | **SI**                  |     |     |     |

**Pendientes al cerrar la reunión**

**Checar refinamiento de requisitos, casos de uso.**
