## Requisito Funcional 04.1 - Editar actividad o aviso

RF04.1 - El sistema permitirá al administrador autenticado modificar los datos de una actividad o aviso en estado Publicado o Borrador. Los campos editables dependen del tipo de publicación y se validan con las mismas reglas de creación. Los cambios se reflejan de inmediato en la vista pública.

## Historia de usuario

**Como** administrador del DOCE,  
**quiero** editar los datos de una actividad o aviso existente,  
**para** corregir errores o actualizar información sin crear una publicación nueva.

## Criterios de aceptación

**CA1 – Carga del formulario con datos actuales**  
**Dado** que el administrador inició sesión y existe una actividad o aviso en estado Publicado o Borrador,  
**cuando** selecciona la opción Editar,  
**entonces** el sistema muestra el formulario del tipo correspondiente (actividad o aviso) con los campos precargados.

**CA2 – Campos según el tipo**  
**Dado** que se edita una actividad,  
**cuando** se abre el formulario,  
**entonces** se muestran al menos: nombre, descripción, fecha y hora de inicio, fecha y hora de fin (si aplica), modalidad, lugar y/o enlace según modalidad, e institución/organizador.  
**Dado** que se edita un aviso,  
**cuando** se abre el formulario,  
**entonces** se muestran al menos: título, contenido/descripción y fecha de publicación o vigencia (según RF03).

**CA3 – Guardar cambios válidos**  
**Dado** que el administrador modificó uno o más campos con datos válidos,  
**cuando** confirma los cambios,  
**entonces** el sistema guarda la publicación, muestra “Cambios guardados correctamente” y la vista pública refleja la información actualizada.

**CA4 – Cambio de fecha de una actividad**  
**Dado** que el administrador cambió la fecha de una actividad publicada,  
**cuando** guarda los cambios,  
**entonces** la actividad aparece en el día nuevo del calendario y deja de mostrarse en el día anterior.

**CA5 – Validación de campos obligatorios e incoherencias**  
**Dado** que dejó vacío un campo obligatorio o capturó datos incoherentes (por ejemplo, hora de fin anterior a la de inicio, o modalidad presencial sin lugar),  
**cuando** intenta guardar,  
**entonces** el sistema muestra un mensaje de error, no guarda cambios y conserva los datos anteriores.

**CA6 – Cancelar la edición**  
**Dado** que el administrador modificó campos en el formulario,  
**cuando** selecciona “Cancelar” o cierra sin guardar,  
**entonces** los cambios se descartan y la publicación no se modifica.

**CA7 – No se puede editar una publicación cancelada**  
**Dado** que una actividad o aviso está en estado Cancelada,  
**cuando** el administrador intenta editarla,  
**entonces** el sistema no habilita la edición o muestra “No se puede editar una publicación cancelada”.

**CA8 – Solo el administrador autenticado puede editar**  
**Dado** que una persona no ha iniciado sesión como administrador,  
**cuando** consulta una actividad o aviso,  
**entonces** no tiene disponible la opción de editar.
