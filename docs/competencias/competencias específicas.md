## Competencias específicas

Cada competencia se argumenta con **actividades concretas del desarrollo del producto**, con su evidencia en el repositorio.

---

### Ingeniería de requisitos

Entender, analizar, especificar y validar las necesidades de la clienta para traducirlas en requisitos claros.

**Entrega 1:** se identificaron los requisitos funcionales y no funcionales a partir de la problemática del DOCE.

**Entrega 2:**
- **Especificación:** cada requisito funcional se refinó y se acompañó de su caso de uso, con flujo principal, flujos alternativos y excepciones (por ejemplo, CU-01 y CU-03.1).
- **Validación:** cada historia de usuario tiene criterios de aceptación verificables, incluidos los casos vacíos y de error (por ejemplo, RF03 y RF11).
- **Requisitos no funcionales medibles:** se reescribieron con su categoría ISO/IEC 25010, un criterio con números y un método de verificación; se agregó RNF06 de accesibilidad.
- **Priorización:** se aplicó MoSCoW contra los objetivos de la propuesta. Al hacerlo se detectó un objetivo sin requisito (el canal de solicitud de orientación) y dos contenidos que no se pueden gestionar desde el panel.

### Diseño y modelado de software

**Entrega 1:** se elaboró un primer diagrama de casos de uso con los actores Estudiante y Administrador.

**Entrega 2:**
- Se rehízo el diagrama de casos de uso en notación UML: límite del sistema, 20 casos de uso con el código de su archivo, asociaciones sin flecha y relaciones `«extend»` para las consultas de detalle.
- Se elaboraron más de 60 bocetos de interfaz a partir de los casos de uso, incluidos los estados vacíos y de error (por ejemplo, "Calendario sin actividades" o "Error de conexión" en RF01).
- Se definió una guía visual (paleta 1c "Claro y accesible", con Newsreader y Atkinson Hyperlegible), aplicada ya en el README.

### Comprensión y aplicación de la Ingeniería de Software

Aplicar principios de proceso, análisis y gestión de la configuración a un problema real.

**Entrega 1:** se definieron el alcance y los artefactos técnicos para resolver un problema real de comunicación del DOCE.

**Entrega 2:**
- **Proceso iterativo:** el trabajo se organizó en sprints con backlog, revisión y retrospectiva, registrados en el milestone "Sprint 2 - Diseño".
- **Gestión de la configuración:** se trabajó con una rama por entrega (`entrega-2`), ramas `feature/` por integrante, pull requests con revisión de otro integrante y un flujo automático que bloquea los PR con conflictos sin resolver.
- **Trazabilidad:** cada caso de uso indica el requisito del que sale y cada boceto está en la carpeta de su requisito, de modo que se puede seguir un requisito desde su definición hasta su pantalla.
