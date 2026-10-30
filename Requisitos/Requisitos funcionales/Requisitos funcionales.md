## **Requisitos funcionales**

Cada requisito está refinado y tiene su carpeta con **historia de usuario** (con criterios de aceptación) y **casos de uso**. Los requisitos amplios se dividieron en subrequisitos más pequeños y verificables. La prioridad de cada uno está justificada en [Priorización de requisitos](<../Priorización de requisitos.md>).

| ID | Requisito | Prioridad | Casos de uso | Carpeta |
|---|---|---|---|---|
| RF01 | Calendario | Must | CU-01 | [RF - 01](<RF - 01>) |
| RF02 | Consultar detalle de actividad | Must | CU-02 | [RF - 02](<RF - 02>) |
| RF03 | Crear y publicar actividades y avisos | Must | CU-03.1 a CU-03.4 | [RF - 03](<RF - 03>) |
| RF04 | Editar y cancelar actividades y avisos | Must | CU-04.1, CU-04.2 | [RF - 04](<RF - 04>) |
| RF05 | Contactos y horarios | Must | CU-05 | [RF - 05](<RF - 05>) |
| RF06 | Líneas de ayuda | Must | CU-06.1 a CU-06.4 | [RF - 06](<RF - 06>) |
| RF07 | Material informativo | Should | CU-07.1, CU-07.2 | [RF - 07](<RF - 07>) |
| RF08 | Gestionar material | Should | CU-08 | [RF - 08](<RF - 08>) |
| RF09 | Fotogalería | Could | CU-09 | [RF - 09](<RF - 09>) |
| RF10 | Tutorías y guías | Could | CU-13 | [RF - 10](<RF - 10>) |
| RF11 | Inicio y cierre de sesión | Must | CU-14 | [RF - 11](<RF - 11>) |

---

# RF01 - Calendario

El sistema mostrará un calendario de eventos y avisos ya publicados, cuya fecha sea igual o posterior al día actual, indicando nombre, sede, fecha y hora de cada uno.

# RF02 - Consultar detalle de actividad

El sistema deberá permitir al usuario seleccionar una actividad publicada en el calendario para consultar la siguiente información:
* Nombre de la actividad.
* Descripción.
* Fecha y hora de inicio y, cuando corresponda, de finalización.
* Modalidad: presencial, virtual o híbrida.
* Lugar, si es presencial; enlace de acceso, si es virtual; o ambos, si es híbrida.
* Institución u organizador responsable.

# RF03 - Crear y publicar actividades y avisos

El sistema deberá permitir al administrador registrar y publicar actividades y avisos mediante un formulario correspondiente al tipo de publicación. Antes de publicar, el sistema deberá validar los campos obligatorios y la coherencia de los datos. Una vez publicada, cada actividad deberá aparecer en el calendario y cada aviso en el espacio destinado a su consulta.

* **RF03.1 - Crear actividad:** el sistema deberá permitir al administrador registrar una actividad como borrador mediante un formulario con nombre, descripción, fecha y hora, modalidad, lugar o enlace según corresponda, e institución u organizador responsable.
* **RF03.2 - Publicar actividad:** el sistema deberá permitir al administrador publicar una actividad previamente registrada como borrador para que los usuarios puedan consultarla en el calendario.
* **RF03.3 - Crear aviso:** el sistema deberá permitir al administrador registrar un aviso como borrador mediante un formulario con título y contenido.
* **RF03.4 - Publicar aviso:** el sistema deberá permitir al administrador publicar un aviso previamente registrado como borrador para que los usuarios puedan consultarlo en el espacio de avisos.

# RF04 - Editar y cancelar actividades y avisos

* **RF04.1 - Editar actividad o aviso:** el sistema permitirá al administrador autenticado modificar los datos de una actividad o aviso ya publicado (nombre, descripción, fecha, hora, modalidad, lugar o enlace, y organizador).
* **RF04.2 - Cancelar o retirar actividad o aviso:** el sistema permitirá al administrador autenticado marcar una actividad o aviso como cancelado o retirado. Las actividades canceladas seguirán visibles en el calendario con la etiqueta "Cancelada" hasta su fecha original; no se eliminan del sistema.

# RF05 - Contactos y horarios

El sistema permitirá a cualquier usuario, sin necesidad de iniciar sesión, consultar el directorio del Departamento de Orientación y Consejo Educativo, mostrando para cada persona: nombre completo, cargo o área de atención, ubicación física (edificio y planta), horario de atención, y correo institucional o teléfono.

# RF06 - Líneas de ayuda

El sistema deberá permitir la gestión y visualización de las líneas de ayuda universitarias, así como de las líneas de disposición general locales, estatales y nacionales, organizadas por ámbito de atención.

* **Consulta (usuario):** ver el catálogo de líneas de ayuda organizado por ámbito: universitario, local, estatal y nacional.
* **Gestión (administrador):** registrar, modificar y eliminar líneas de ayuda.

# RF07 - Material informativo

El sistema mostrará a los usuarios, de manera concisa, diferentes tipos de material informativo sobre salud mental (folletos, videos y documentos), y permitirá seleccionar cualquiera de estas publicaciones para consultar su detalle completo.

* **Catálogo:** cada material se muestra con su título, una descripción breve y su tipo.
* **Detalle:** al seleccionar un material se muestra su información completa y, según el tipo, la opción de reproducirlo o descargarlo.

# RF08 - Gestionar material

El sistema deberá permitir al administrador registrar nuevos materiales informativos, modificar los materiales registrados y eliminar de la consulta pública los materiales publicados.

# RF09 - Fotogalería

El sistema deberá permitir al administrador gestionar (subir, actualizar y eliminar) imágenes y sus descripciones en la fotogalería de las actividades de salud mental de la Facultad de Matemáticas, así como permitir a los usuarios visualizar dicha galería de forma pública.

# RF10 - Tutorías y guías

El sistema deberá permitir a los usuarios consultar los contactos de apoyo (tutorías) y descargar las guías de carrera.

# RF11 - Inicio y cierre de sesión

El sistema deberá permitir al administrador iniciar y cerrar sesión con sus credenciales para acceder a las funciones de gestión de contenido.

---

## Cambios respecto a la entrega 1

| Requisito | Entrega 1 | Entrega 2 |
|---|---|---|
| RF01 | "Catálogo/calendario"; el título mezclaba dos vistas | Se definió como **calendario**. Se agregaron caso de uso, flujos alternativos (sin eventos, error de conexión, actividad modificada) y 7 criterios de aceptación |
| RF02 | Lista de datos sin distinguir modalidad | Se especifica fecha de inicio y de finalización, y qué se muestra según la modalidad: lugar, enlace o ambos |
| RF03 | "Crear y publicar actividades y avisos" en una sola frase | Se dividió en **4 subrequisitos** (crear y publicar, para actividades y para avisos), con estado Borrador, campos por tipo y validación antes de publicar |
| RF04 | "Editar, retirar o cancelar" en una sola frase | Se dividió en **RF04.1 Editar** y **RF04.2 Cancelar**; se definió que lo cancelado no se borra y sigue visible con etiqueta hasta su fecha |
| RF05 | "Contactos y horarios" sin datos definidos | Se definen los datos de cada persona (nombre, cargo, edificio y planta, horario, contacto) y que no requiere iniciar sesión |
| RF06 | Solo consulta de dos líneas fijas (Línea de la Vida y Línea Amiga) | Catálogo organizado por cuatro ámbitos y **gestión por el administrador** (registrar, modificar y eliminar), con 4 casos de uso |
| RF07 | "Material informativo fijo" | El material deja de ser fijo: se gestiona desde RF08. Se separan el catálogo y el detalle, con lo que se muestra según el tipo de material |
| RF08 | "Agregar, actualizar y retirar" | Se precisa que eliminar un material lo quita de la consulta pública |
| RF09 | Solo consulta pública de la fotogalería | Se agregó la **gestión por el administrador** (subir, actualizar y eliminar fotos con su descripción) |
| RF10 | Consultar contactos de tutorías y guías | Se precisa que las guías se descargan; se agregaron caso de uso, historia de usuario y criterios de aceptación |
| RF11 | Iniciar y cerrar sesión | Se agregaron caso de uso, historia de usuario y criterios de aceptación (credenciales inválidas, cierre de sesión, panel protegido) |
| Todos | Historia de usuario dentro de la lista, sin criterios de aceptación ni casos de uso | Cada requisito tiene su carpeta con historia de usuario, criterios de aceptación y casos de uso |
