## Competencias genéricas

Cada competencia se argumenta con **actividades concretas del desarrollo del producto** y un enlace a su evidencia en el repositorio.

---

### Capacidad de abstracción, análisis y síntesis

**Entrega 1:** se descompuso la problemática del DOCE (los avisos se pierden en el correo) en requisitos funcionales y no funcionales, que dieron estructura a los módulos de la plataforma.

**Entrega 2:**
- Se dividieron requisitos amplios en casos de uso más pequeños y verificables: RF03 se separó en crear y publicar, tanto para actividades como para avisos ([CU-03.1 a CU-03.4](<../../Requisitos/Requisitos funcionales/RF - 03/casos de uso>)); RF04 se separó en editar y cancelar ([RF - 04](<../../Requisitos/Requisitos funcionales/RF - 04>)); RF06 se separó en consultar, registrar, modificar y eliminar líneas de ayuda ([RF - 06](<../../Requisitos/Requisitos funcionales/RF - 06>)).
- Cada historia de usuario se tradujo en criterios de aceptación con el formato *Dado / Cuando / Entonces*, que separan el caso normal de los casos vacíos y de error (por ejemplo, [RF01](<../../Requisitos/Requisitos funcionales/RF - 01/Historia de usuario RF - 01.md>)).
- Los 20 casos de uso se sintetizaron en un solo [diagrama de casos de uso](<../../Requisitos/Diagrama de casos de uso>), agrupados en consulta pública y panel de administración.

### Trabajo en equipo y colaboración

**Entrega 1:** se coordinó el trabajo con control de versiones en Git y GitHub, con metas claras para cada integrante.

**Entrega 2:**
- El trabajo se repartió en **issues con responsable**: uno por cada requisito a refinar ([#13 a #23](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues?q=is%3Aissue+Refinar)) y uno por cada par de requisitos a bocetar ([#54 a #59](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/issues?q=is%3Aissue+Boceto)).
- Cada integrante trabajó en su propia rama `feature/` y entregó por **pull request** a la rama `entrega-2`; la [plantilla de PR](../../.github/pull_request_template.md) exige asignar a otro integrante como revisor, porque nadie aprueba su propio trabajo.
- Las reglas del equipo quedaron escritas en [AGENTS.md](../../AGENTS.md) y en las [plantillas de issue](../../.github/ISSUE_TEMPLATE) para que todos trabajen igual.

### Habilidades de investigación y gestión de la información

**Entrega 1:** se analizaron las necesidades de difusión del DOCE para proponer una solución centralizada.

**Entrega 2:**
- La [paleta y los pares tipográficos](<../../Diseño/Paletas DOCE.pdf>) se basaron en el [Manual de Identidad UADY](<../bibliografía/Referencias Bibliográficas.md>) (azul Pantone 295 C y dorado 1245 C) y en criterios de contraste AA para baja visión. El equipo eligió la opción 1c, "Claro y accesible".
- Para refinar los requisitos no funcionales se usó el modelo de calidad ISO/IEC 25010 y métricas reconocidas (Lighthouse, WCAG 2.1), lo que permitió convertir frases como "intuitivo" o "seguro" en criterios medibles ([Requisitos no funcionales](<../../Requisitos/Requisitos no funcionales/Requisitos no funcionales.md>)).

### Gestión del tiempo y priorización

**Entrega 1:** se fijaron tiempos y fechas límite internas para cubrir todos los requisitos.

**Entrega 2:**
- El [Sprint 2 - Diseño](https://github.com/sofi-0023/Sistema-para-la-gestion-del-DOCE/milestone/1) se planeó con un backlog día por día del 26 al 30 de octubre: planeación, reunión con la clienta, guía de estilo, wireframes, prototipo, revisión y retrospectiva.
- Las tareas de la entrega se siguieron en el [to-do de la entrega 2](<../roles y metas/to-do-entrega-2.md>).
- Los requisitos se priorizaron con MoSCoW según los objetivos de la propuesta, y de ahí salió un orden de construcción por incrementos ([Priorización de requisitos](<../../Requisitos/Priorización de requisitos.md>)).

### Comunicación efectiva

**Entrega 1:** la documentación se planteó para ser precisa, concisa y fácil de entender.

**Entrega 2:**
- Los criterios de aceptación dan al equipo y a la clienta un lenguaje común para decidir cuándo una función está terminada.
- Las plantillas de issue [refinamiento de requisito](../../.github/ISSUE_TEMPLATE/refinamiento-requisito.md) e [información faltante](../../.github/ISSUE_TEMPLATE/informacion-faltante.md) estandarizan cómo se piden cambios y cómo se reportan dudas.
- El [README](../../README.md) se rediseñó con la identidad del DOCE para que cualquier visitante entienda el proyecto en segundos.
