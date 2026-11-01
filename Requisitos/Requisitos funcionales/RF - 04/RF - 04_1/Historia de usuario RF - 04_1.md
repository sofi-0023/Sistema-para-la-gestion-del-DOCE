## Requisito Funcional 04.1 - Editar actividad o aviso

RF04.1 - El sistema permitirá al administrador autenticado modificar los datos de una actividad o aviso ya publicado (nombre, descripción, fecha, hora, modalidad, lugar/enlace y organizador).

## Historia de usuario

**Como** administrador del sistema,  
**quiero** editar los datos de una actividad o aviso ya publicado,  
**para** corregir errores o actualizar información de último momento.

## Criterios de aceptación

**CA1 – Formulario con los datos actuales**
**Dado** que el administrador inició sesión y existe una actividad o aviso publicado,
**cuando** lo selecciona para editarlo,
**entonces** se abre el formulario con los datos actuales ya llenados.

**CA2 – Guardar cambios válidos**
**Dado** que el administrador modificó uno o más campos con datos válidos,
**cuando** confirma los cambios,
**entonces** se muestra el mensaje "Cambios guardados correctamente"
**y** el calendario o el espacio de avisos muestra la información nueva.

**CA3 – Cambio de fecha**
**Dado** que el administrador cambió la fecha de una actividad publicada,
**cuando** guarda los cambios,
**entonces** la actividad aparece en el día nuevo del calendario y ya no en el anterior.

**CA4 – Campo obligatorio vacío**
**Dado** que el administrador dejó vacío un campo obligatorio,
**cuando** intenta guardar,
**entonces** se muestra un mensaje de error, no se guarda nada
**y** la publicación conserva sus datos anteriores.

**CA5 – Cancelar la edición**
**Dado** que el administrador modificó campos en el formulario,
**cuando** selecciona "Cancelar",
**entonces** los cambios se descartan, regresa a la vista anterior y la publicación no cambia.

**CA6 – Solo el administrador puede editar**
**Dado** que una persona no ha iniciado sesión como administrador,
**cuando** consulta una actividad o aviso,
**entonces** no tiene disponible la opción de editarlo.
