## Requisito Funcional 04.2 - Cancelar actividad o aviso

RF04.2 - El sistema permitirá al administrador autenticado marcar una actividad o aviso en estado Publicado como Cancelada. La publicación no se elimina: permanece visible en la vista pública con la etiqueta “Cancelada” hasta su fecha de referencia; después de esa fecha deja de mostrarse públicamente, pero sigue registrada en el panel administrativo.

## Historia de usuario

**Como** administrador del DOCE,  
**quiero** marcar una actividad o aviso como cancelado,  
**para** que el estudiantado sepa que ya no se realizará, sin borrar el registro del sistema.

## Criterios de aceptación

**CA1 – Confirmación antes de cancelar**  
**Dado** que el administrador inició sesión y seleccionó una actividad o aviso en estado Publicado,  
**cuando** elige la opción “Cancelar”,  
**entonces** el sistema solicita confirmación antes de aplicar el cambio.

**CA2 – Resultado de la cancelación**  
**Dado** que el administrador confirmó la cancelación,  
**cuando** el sistema termina la operación,  
**entonces** la publicación cambia a estado Cancelada, se muestra “Publicación cancelada correctamente” y, si es una actividad, permanece visible en el calendario en su fecha original con la etiqueta “Cancelada”.

**CA3 – Visibilidad después de la fecha de referencia**  
**Dado** que una publicación cancelada ya superó su fecha de referencia,  
**cuando** un usuario consulta la vista pública,  
**entonces** esa publicación ya no se muestra.

**CA4 – Conservación en el panel administrativo**  
**Dado** que una publicación fue cancelada,  
**cuando** el administrador consulta el listado administrativo,  
**entonces** la publicación sigue registrada con estado “Cancelada”.

**CA5 – Desistir de la cancelación**  
**Dado** que el sistema pidió confirmación,  
**cuando** el administrador cancela la operación,  
**entonces** no se realiza ningún cambio y regresa a la vista anterior.

**CA6 – Publicación ya cancelada**  
**Dado** que una publicación ya está en estado Cancelada,  
**cuando** el administrador intenta cancelarla de nuevo,  
**entonces** el sistema muestra “Esta publicación ya está cancelada” y no realiza cambios.

**CA7 – Solo el administrador autenticado puede cancelar**  
**Dado** que una persona no ha iniciado sesión como administrador,  
**cuando** consulta una actividad o aviso,  
**entonces** no tiene disponible la opción de cancelar.
