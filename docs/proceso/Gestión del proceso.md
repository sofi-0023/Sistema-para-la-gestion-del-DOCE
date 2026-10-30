# Gestión del proceso

Este documento explica **con qué herramientas** se organiza y se sigue el trabajo, y **cómo recorre una tarea** desde que se asigna hasta que se da por terminada. La forma en que se planean los sprints está en [Descripción del proceso](<Descripción del proceso.md>).

## Herramientas

| Herramienta | Para qué la usamos | Evidencia |
|---|---|---|
| **GitHub Issues** | Una tarea por issue, con responsable asignado. Cada tipo de tarea tiene su plantilla | [Issues](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues?q=is%3Aissue) · [plantillas](../../.github/ISSUE_TEMPLATE) |
| **GitHub Milestones** | Agrupar los issues de un sprint y ver su avance | [Sprint 2 - Diseño](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/milestone/1) |
| **Ramas y Pull Requests** | Cada quien trabaja en su rama `feature/` y entrega por PR a `entrega-2`; otro integrante revisa | [Pull requests](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/pulls?q=is%3Apr) · [plantilla de PR](../../.github/pull_request_template.md) |
| **Bot de revisión** | Bloquea un PR si quedaron marcadores de conflicto sin resolver | [revision.yml](../../.github/workflows/revision.yml) |
| **To-do de la entrega** | Lista de cada punto de la rúbrica para marcar lo terminado | [to-do-entrega-2](<../roles y metas/to-do-entrega-2.md>) |
| **Métrica de contribución** | Registrar metas asignadas y completadas por integrante | [Métrica](<../roles y metas/metrica-contribucion-individual.md>) |
| **Discord** | Servidor del equipo: reuniones de voz en la "Sala de reuniones", avisos en `#anuncios`, agenda en `#planes-para-reuniones` y material en `#recursos` | [Capturas](#evidencia-de-las-reuniones) |
| **Bitácoras** | Acuerdos, asistencia y pendientes de cada reunión | [Bitácoras](bitácoras) |

### Plantillas de issue

| Plantilla | Cuándo se usa |
|---|---|
| [Refinamiento de requisito](../../.github/ISSUE_TEMPLATE/refinamiento-requisito.md) | Refinar un RF o RNF (issues #13 a #23) |
| [Caso de uso](../../.github/ISSUE_TEMPLATE/caso-de-uso.md) | Documentar un caso de uso con el formato de tabla del equipo |
| [Tarea](../../.github/ISSUE_TEMPLATE/tarea.md) | Cualquier otro elemento del Product Backlog o del Sprint Backlog |
| [Información faltante](../../.github/ISSUE_TEMPLATE/informacion-faltante.md) | Reportar un hueco o una duda que bloquea el trabajo |
| [Error](../../.github/ISSUE_TEMPLATE/error.md) | Reportar algo incorrecto en un documento o artefacto |

## Cómo recorre una tarea

1. **Se asigna:** en la planeación, la tarea se convierte en un issue con su plantilla, un responsable y, si es del sprint, su milestone.
2. **Se trabaja:** la persona responsable crea su rama `feature/[nombre-meta]` desde `entrega-2` y hace commits con prefijo `Docs:`, `Fix:` o `Feat:`.
3. **Se entrega:** abre un PR hacia `entrega-2` con la plantilla llena y el issue vinculado (`Closes #número`).
4. **Se revisa:** otro integrante revisa el PR (nadie aprueba el suyo) y el bot comprueba que no haya conflictos sin resolver.
5. **Se integra:** el PR aprobado se une con *squash* y el issue se cierra.
6. **Se registra:** se marca en el to-do de la entrega, se anota en la bitácora y cuenta en la métrica de contribución.

## Cómo se da seguimiento

| Qué se revisa | Dónde | Cuándo |
|---|---|---|
| Qué terminó cada quien, qué hará y qué le bloquea | Daily Scrum en Discord | En cada reunión acordada |
| Issues abiertos y cerrados por sprint | Milestone y lista de issues de GitHub | Durante el sprint |
| Trabajo pendiente de revisión | Pull requests abiertos | Antes de cada integración |
| Avance contra la rúbrica | To-do de la entrega | Al cierre de cada sprint |
| Aceptación de lo terminado | Sprint Review con el PO o con Laura | Al cierre de cada sprint |

## Números de la segunda entrega

Al 30 de octubre de 2026:
- **20 issues de trabajo**, todos cerrados: 11 de refinamiento de requisitos, 6 de bocetos y 3 de casos de uso y otros ajustes.
- **13 pull requests integrados** a `entrega-2`: Jennyfer 5, Rafael 3, Daniel 2, Jahzeel 2 y Gabriel 1.
- **4 reuniones documentadas** en bitácora, incluida una con la clienta.

## Evidencia de las reuniones

**26 de octubre, reunión de equipo** ([bitácora](<bitácoras/2026-10-26 Reunión de equipo.md>)):

![Reunión del 26 de octubre en Discord](<bitácoras/capturas/2026-10-26 reunión de equipo.jpg>)

**28 de octubre, presentación de bocetos** ([bitácora](<bitácoras/2026-10-28 Reunión de Scrum.md>)):

![Presentación de bocetos del 28 de octubre en Discord](<bitácoras/capturas/2026-10-28 presentación de bocetos.jpg>)

**Reunión con los seis integrantes:**

![Reunión con los seis integrantes en Discord](<bitácoras/capturas/reunión con los 6 integrantes.jpg>)

## Mejoras detectadas para la siguiente entrega

- El bot de revisión solo corre en los PR hacia `main`; conviene que también revise los que van a `entrega-2`, que es donde se integra el trabajo del sprint.
- Solo el Sprint 2 tiene milestone; los issues de refinamiento del Sprint 1 no quedaron agrupados.
- Todos los issues usan la etiqueta `documentation`; etiquetas por área (requisitos, diseño, proceso) facilitarían filtrar el avance.
- Las dailies, la Review y la Retro no siempre quedaron en bitácora.
