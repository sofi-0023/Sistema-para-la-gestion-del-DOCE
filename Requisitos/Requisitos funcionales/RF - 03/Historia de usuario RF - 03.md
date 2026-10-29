## requisito funcional 03 - Crear y publicar actividades y avisos

El sistema deberá permitir al administrador registrar y publicar actividades y avisos mediante un formulario correspondiente al tipo de publicación.
* Para las actividades, deberá solicitar nombre, descripción, fecha y hora, modalidad, lugar o enlace según la modalidad e institución u organizador responsable.
* Para los avisos, deberá solicitar título y contenido.
* Antes de publicar, el sistema deberá validar los campos obligatorios y la coherencia de los datos. Una vez completada la publicación, las actividades deberán aparecer en el calendario y los avisos en el espacio destinado a su consulta.

## Historia de usuario

**Como** administrador del sistema,
**quiero** crear y publicar actividades y avisos,
**para** mantener informada a la comunidad estudiantil sobre las próximas actividades y los comunicados relevantes.

## Criterios de aceptación

### Actividades

**CA1 – Guardar actividad como borrador**
**Dado** que el administrador inició sesión y llenó el formulario de actividad con todos los campos obligatorios válidos,
**cuando** selecciona "Guardar borrador",
**entonces** la actividad queda registrada con estado Borrador, se muestra un mensaje de confirmación
**y** la actividad no aparece en el calendario público.

**CA2 – Campos obligatorios según la modalidad**
**Dado** que el administrador captura una actividad presencial sin lugar, o una virtual sin enlace, o deja vacío otro campo obligatorio,
**cuando** intenta guardarla,
**entonces** el sistema señala los campos por corregir, conserva los datos ya capturados y no registra la actividad.

**CA3 – Coherencia de fechas**
**Dado** que el administrador captura una fecha y hora de finalización anterior a la de inicio,
**cuando** intenta guardar o publicar la actividad,
**entonces** el sistema señala el error en las fechas y no la registra ni la publica.

**CA4 – Publicar actividad**
**Dado** que existe una actividad en estado Borrador con todos sus datos válidos,
**cuando** el administrador la revisa y selecciona "Publicar",
**entonces** su estado cambia a Publicada, se muestra un mensaje de confirmación
**y** la actividad aparece en el calendario y se puede consultar su detalle (RF02).

### Avisos

**CA5 – Guardar aviso como borrador**
**Dado** que el administrador llenó el título y el contenido del aviso,
**cuando** selecciona "Guardar borrador",
**entonces** el aviso queda registrado con estado Borrador, se muestra un mensaje de confirmación
**y** el aviso no aparece en el espacio público de avisos.

**CA6 – Aviso sin título o contenido**
**Dado** que el título o el contenido del aviso están vacíos o contienen solo espacios,
**cuando** el administrador intenta guardarlo o publicarlo,
**entonces** el sistema señala los campos por corregir, conserva la información capturada y no lo registra ni lo publica.

**CA7 – Publicar aviso**
**Dado** que existe un aviso en estado Borrador con título y contenido válidos,
**cuando** el administrador lo revisa y selecciona "Publicar",
**entonces** su estado cambia a Publicado, se muestra un mensaje de confirmación
**y** el título y el contenido aparecen en el espacio de avisos.

### Ambos

**CA8 – Publicación ya realizada**
**Dado** que una actividad o aviso ya fue publicado,
**cuando** el administrador intenta publicarlo de nuevo,
**entonces** el sistema informa que ya está publicado y no crea un duplicado.

**CA9 – Error al guardar o publicar**
**Dado** que ocurre un error al guardar o publicar una actividad o aviso,
**cuando** el administrador realiza la operación,
**entonces** el sistema informa que no se completó, conserva los datos para reintentar
**y** la publicación no aparece en el calendario ni en el espacio de avisos.

**CA10 – Cancelar la captura**
**Dado** que el administrador está llenando el formulario de una actividad o aviso,
**cuando** selecciona "Cancelar" antes de guardar,
**entonces** el sistema cierra el formulario sin registrar nada.
