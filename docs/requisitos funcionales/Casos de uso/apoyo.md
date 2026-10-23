# RF02 - Detalle de actividad

El sistema deberá permitir al usuario seleccionar una actividad publicada en el calendario para consultar la siguiente información:
* **Nombre de la actividad.**
* **Descripción.**
* **Fecha y hora de inicio y, cuando corresponda, de finalización.**
* **Modalidad: presencial, virtual o híbrida.**
* **Lugar, si es presencial; enlace de acceso, si es virtual; o ambos, si es híbrida.**
* **Institución u organizador responsable.**

## Historia de usuario

**Como** estudiante o usuario del sistema,
**quiero** consultar la información detallada de una actividad del calendario,
**para** conocer sus características y decidir si puedo y deseo asistir.

## caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | Consultar detalle de actividad |
| **Código del Caso de Uso** | CU-02 |
| **Actor(es)** | Estudiante o usuario del sistema |
| **Precondición** | El usuario se encuentra en el calendario y existe al menos una actividad publicada. |

### Objetivo

Consultar la información detallada de una actividad del calendario para decidir si asistir.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1.Selecciona una actividad del calendario. | 1.Recupera la información de la actividad seleccionada. |
|2.Consulta el detalle. | 2.Muestra el nombre, descripción, fecha, hora, modalidad, lugar o enlace y organizador. |
|3.Cierra el detalle o selecciona la opción de regresar. | 3.Muestra nuevamente el calendario. |

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 — Actividad no disponible** | Selecciona una actividad que dejó de estar publicada. | Informa que la actividad ya no está disponible y permite regresar al calendario.|
| **FA2 — Error de consulta** | Intenta consultar el detalle. | Si no puede recuperar la información, muestra un mensaje y permite reintentar.|

### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** | El usuario visualiza la información detallada de la actividad seleccionada. |
| **Frecuencia** | Cada vez que el usuario consulta una actividad. |
| **Importancia** | Permite conocer la información necesaria para decidir la asistencia. |
| **Comentarios** | <!-- Opcional --> |



## requisito funcional 3 más refinado:
este se convirtio en 4 requisitos funcionales más

# RF03 - crear actividad

El sistema deberá permitir al administrador registrar una actividad como borrador mediante un formulario con nombre, descripción, fecha y hora, modalidad, lugar o enlace según corresponda e institución u organizador responsable.

## Historia de usuario:

**Como** administrador del sistema,
**quiero** registrar una actividad como borrador,
**para** preparar su información antes de hacerla visible a la comunidad.

## caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | crear actividad |
| **Código del Caso de Uso** | CU-03 |
| **Actor(es)** | Administrador del sistema |
| **Precondición** | El administrador ha iniciado sesión y cuenta con permisos para crear actividades|

### Objetivo

Registrar los datos de una actividad y guardarla como borrador para preparar su publicación.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1. Selecciona «Crear actividad» | 1.Muestra el formulario de registro. |
|2. Captura nombre, descripción, fecha y hora, modalidad, lugar o enlace e institución u organizador. | 2.Permite ingresar los datos y señala los campos obligatorios según la modalidad. |
|3. Selecciona «Guardar borrador». | 3.Valida los campos obligatorios, sus formatos y la coherencia de los datos; Registra la actividad con estado Borrador; Confirma que el borrador se guardó correctamente. Todo en ese orden. |


### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 — Datos incompletos o inválidos** | Intenta guardar con datos faltantes o incorrectos. | Señala los campos por corregir, conserva los datos capturados y permite retomar el paso 2. |
| **FA2 — Cancelación** |Selecciona «Cancelar» antes de guardar. | Finaliza el proceso sin registrar la actividad. |
|**FA3 — Error de almacenamiento**| ocurre un error al guardar | Informa que no se completó el registro y conserva los datos para reintentar. |

### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** | La actividad queda registrada como Borrador y disponible para su consulta administrativa. |
| **Frecuencia** | Cada vez que el administrador necesita registrar una actividad. |
| **Importancia** | Permite preparar la información de las actividades del calendario. |
| **Comentarios** | Guardar el borrador no hace visible la actividad para la comunidad. |


# RF04 - publicar actividad

El sistema deberá permitir al administrador publicar una actividad previamente registrada como borrador para que los usuarios puedan consultarla en el calendario.

## Historia de usuario:

**Como** administrador del sistema,
**quiero** publicar una actividad registrada como borrador,
**para** que la comunidad estudiantil pueda conocerla y consultar sus detalles.

##  caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | publicar actividad |
| **Código del Caso de Uso** | CU-04 |
| **Actor(es)** | Administrador del sistema |
| **Precondición** | El administrador ha iniciado sesión, tiene permisos de publicación y existe una actividad en estado Borrador. |

### Objetivo

Publicar una actividad previamente guardada como borrador para que la comunidad pueda consultarla en el calendario.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1.Selecciona una actividad en borrador desde la administración de actividades. | 1. Muestra su información y la opción «Publicar». |
| 2.Revisa la información y selecciona «Publicar».| 2. Verifica que la actividad continúe en estado Borrador y cumpla las reglas de datos obligatorios; Cambia el estado de la actividad a Publicada; Hace visible la actividad en el calendario y permite consultar su detalle mediante RF02; Confirma que la actividad se publicó correctamente. Todo en ese orden|

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 — Información incompleta o inválida** | La actividad no cumple las reglas necesarias para publicarse. | Informa qué datos requieren corrección y mantiene la actividad como Borrador. |
| **FA2 — Actividad ya publicada** | La actividad fue publicada antes de completar la operación. | Informa que ya está publicada y evita duplicarla. |
| **FA3 — Error de publicación** | Ocurre un error que impide completar la publicación. | Informa el error y mantiene la actividad como Borrador, sin mostrarla en el calendario público. |

### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** | La actividad queda en estado Publicada y visible en el calendario para la comunidad. |
| **Frecuencia** | Cada vez que una actividad está lista para difundirse. |
| **Importancia** | Permite que los usuarios conozcan las actividades y consulten sus detalles. |
| **Comentarios** | La publicación no implica enviar notificaciones. |


# RF05 - crear aviso 

El sistema deberá permitir al administrador registrar un aviso como borrador mediante un formulario con título y contenido.

## Historia de usuario:

Como administrador del sistema,
quiero registrar un aviso como borrador,
para preparar un comunicado antes de hacerlo visible a la comunidad.

## caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | crear aviso |
| **Código del Caso de Uso** | CU-05 |
| **Actor(es)** | Administrador del sistema |
| **Precondición** | El administrador ha iniciado sesión y cuenta con permisos para crear avisos. |

### Objetivo

Registrar el título y contenido de un aviso y guardarlo como borrador para preparar su publicación.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1. Selecciona «Crear aviso».| 1. Muestra el formulario de registro.|
| 2. Captura el título y el contenido. | 2. Permite ingresar la información del aviso.|
| 3. Selecciona «Guardar borrador». | 3. Valida que el título y el contenido no estén vacíos ni contengan únicamente espacios; Registra el aviso con estado Borrador; Confirma que el borrador se guardó correctamente. Todo en ese orden|

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 — Campos obligatorios vacíos** | Intenta guardar sin título o contenido válido. | Señala los campos por corregir, conserva la información y permite retomar el paso 2. |
| **FA2 — Cancelación** | Selecciona «Cancelar» antes de guardar. | Finaliza el proceso sin registrar el aviso. |
| **FA3 — Error de almacenamiento** | Ocurre un error al guardar. | Informa que no se completó el registro y conserva los datos para reintentar. |

### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** | El aviso queda registrado como Borrador y disponible para su consulta administrativa. |
| **Frecuencia** | Cada vez que el administrador necesita preparar un comunicado. |
| **Importancia** | Permite preparar información relevante para la comunidad estudiantil. |
| **Comentarios** | El aviso requiere título y contenido. Guardarlo no lo hace visible para la comunidad. |


# RF06 - publicar aviso 

El sistema deberá permitir al administrador publicar un aviso previamente registrado como borrador para que los usuarios puedan consultarlo en el espacio de avisos.

## Historia de usuario:
Como administrador del sistema,
quiero publicar un aviso registrado como borrador,
para comunicar información relevante a la comunidad estudiantil.

## caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | publicar aviso |
| **Código del Caso de Uso** | CU-06 |
| **Actor(es)** | Administrador del sistema |
| **Precondición** | El administrador ha iniciado sesión, tiene permisos de publicación y existe un aviso en estado Borrador. |

### Objetivo

Publicar un aviso previamente guardado como borrador para comunicar información a la comunidad estudiantil.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1.Selecciona un aviso en borrador desde la administración de avisos.| 1.Muestra su información y la opción «Publicar». |
| 2.Revisa la información y selecciona «Publicar». | 2.Verifica que el aviso continúe en estado Borrador y tenga título y contenido válidos; Cambia el estado del aviso a Publicado; Hace visible el título y el contenido en el espacio de avisos; Confirma que el aviso se publicó correctamente. Todo en ese orden |

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 — Información incompleta o inválida** | El aviso no tiene título o contenido válido. | Informa qué datos requieren corrección y mantiene el aviso como Borrador. |
| **FA2 — Aviso ya publicado** | El aviso fue publicado antes de completar la operación. | Informa que ya está publicado y evita duplicarlo. |
| **FA3 — Error de publicación** | Ocurre un error que impide completar la publicación. | Informa el error y mantiene el aviso como Borrador, sin mostrarlo en el espacio público de avisos. |


### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** |El aviso queda en estado Publicado y visible para la comunidad en el espacio de avisos. |
| **Frecuencia** | Cada vez que un aviso está listo para difundirse. |
| **Importancia** | Permite comunicar información relevante a la comunidad estudiantil.> |
| **Comentarios** | la publicacion no implica enviar notificaciones |
hola 