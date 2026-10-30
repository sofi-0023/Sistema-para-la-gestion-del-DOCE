## **Priorización de requisitos**

## Método: MoSCoW

Cada requisito se clasificó según qué tanto contribuye a los **objetivos de la [propuesta](<../docs/propuesta.md>)** y si el producto tiene sentido sin él.

| Categoría | Significado | Regla que usamos |
|---|---|---|
| **Must** (debe tener) | Sin esto el producto no resuelve el problema | Atiende directamente el objetivo general (que la información deje de perderse en el correo) o es necesario para que otro *Must* funcione |
| **Should** (debería tener) | Importante, pero el producto ya sirve sin él | Cubre un objetivo específico, pero puede llegar en un segundo incremento |
| **Could** (podría tener) | Deseable si hay tiempo | Aporta valor, pero no está entre los objetivos centrales de la propuesta |
| **Won't** (no en esta versión) | Fuera del alcance de este semestre | Se documenta para que la decisión quede explícita |

### Objetivos de la propuesta (referencia)

| Clave | Objetivo |
|---|---|
| **O1** | Centralizar la difusión de actividades, convocatorias y material de bienestar |
| **O2** | Directorio de apoyo y contactos (ubicación, contacto, horarios) |
| **O3** | Optimizar la solicitud de orientación con un canal directo y confidencial |
| **O4** | Gestionar contenidos informativos de forma sencilla por el personal del DOCE |
| **O5** | Sección "Nuestros terapeutas / Orientadores" con nombres, horarios y ubicación |
| **O6** | Calendario visual de próximas actividades sin depender de correos masivos |

---

## Requisitos funcionales

| Prioridad | Requisito | Objetivo | Justificación |
|---|---|---|---|
| **Must** | RF01 - Calendario | O1, O6 | Es la respuesta directa al problema: las actividades dejan de perderse en el correo |
| **Must** | RF02 - Consultar detalle de actividad | O1, O6 | Sin el detalle (lugar, hora, modalidad) el estudiante no puede decidir si asiste |
| **Must** | RF03 - Crear y publicar actividades y avisos | O1, O4 | Sin esto el calendario estaría vacío; es la fuente de todo el contenido de RF01 |
| **Must** | RF04 - Editar y cancelar actividades y avisos | O4 | Una fecha o lugar equivocado sin poder corregirse lleva a estudiantes al lugar incorrecto. Sus casos de uso ya la marcan como "Alta (Must)" |
| **Must** | RF05 - Directorio de orientación y psicología | O2, O5 | Saber a quién acudir y dónde es el segundo objetivo central. Su caso de uso ya lo marca como "Alta (Must)" |
| **Must** | RF06 - Líneas de ayuda | O2 | En un sitio de salud mental, alguien en crisis necesita un número de inmediato, y la paleta 1c ya lo coloca en la pantalla principal. Es poco trabajo y mucho valor |
| **Must** | RF11 - Inicio y cierre de sesión | O4 | No aporta valor por sí solo, pero RF03, RF04 y toda la gestión dependen de él (RNF04) |
| **Should** | RF07 - Material informativo | O1 | Cubre el material de bienestar del objetivo O1, pero el producto ya resuelve el problema principal sin él |
| **Should** | RF08 - Gestionar material | O4 | Va con RF07: si se construye RF07, RF08 es necesario para mantenerlo |
| **Could** | RF09 - Fotogalería | — | Muestra las actividades realizadas y da confianza, pero no está entre los objetivos de la propuesta |
| **Could** | RF10 - Tutorías y guías de carrera | — | Útil para el estudiantado, pero es orientación académica y vocacional, no salud mental; tampoco está en los objetivos |
| **Won't** | Canal de solicitud de orientación | O3 | Está en los objetivos, pero ningún RF lo cubre. Un canal "confidencial" implica manejar datos personales sensibles, que requiere acuerdos con el DOCE fuera del alcance de este semestre |

## Requisitos no funcionales

| Prioridad | Requisito | Justificación |
|---|---|---|
| **Must** | RNF01 - Usabilidad | Si el estudiantado no encuentra la información más rápido que en el correo, el producto no resuelve el problema |
| **Must** | RNF02 - Compatibilidad | La mayoría del estudiantado consultará desde el celular |
| **Must** | RNF03 - Mantenibilidad | El DOCE debe poder actualizar el sitio sin el equipo de desarrollo (objetivo O4) |
| **Must** | RNF04 - Seguridad | Sin control de acceso cualquiera podría publicar o borrar avisos |
| **Should** | RNF05 - Rendimiento | Afecta la experiencia, pero un sitio informativo ligero suele cumplirlo sin trabajo extra |
| **Should** | RNF06 - Accesibilidad | La paleta 1c ya resuelve el contraste; falta verificar el uso con teclado y el texto alternativo |

---

## Dependencias entre requisitos

| Requisito | Depende de | Consecuencia |
|---|---|---|
| RF02 | RF01 | El detalle se abre desde el calendario |
| RF03, RF04 | RF11 | La gestión exige sesión iniciada |
| RF01 | RF03 | El calendario solo muestra lo que se publicó |
| RF08 | RF07, RF11 | Se construyen juntos |
| Gestión de líneas de ayuda (CU-06.2 a CU-06.4) | RF11 | Exige sesión iniciada |
| Gestión de fotogalería (RF09) | RF11 | Exige sesión iniciada |
