## Requisito Funcional 04.2 - Cancelar / retirar actividad o aviso

RF04.2 - El sistema permitirá al administrador autenticado marcar una actividad o aviso como cancelada/retirada. Las actividades canceladas seguirán visibles en el calendario con la etiqueta “Cancelada” hasta la fecha original (no se eliminan del sistema).

## Historia de usuario

**Como** administrador del sistema,  
**quiero** marcar una actividad o aviso como cancelada,  
**para** que el estudiantado sepa que ya no se realizará sin que desaparezca del historial.

## Criterios de aceptación

**CA1 – Confirmación antes de cancelar**
**Dado** que el administrador inició sesión y seleccionó una actividad o aviso publicado,
**cuando** elige la opción "Cancelar" o "Retirar",
**entonces** el sistema le pide confirmar la acción antes de aplicarla.

**CA2 – Actividad cancelada visible con etiqueta**
**Dado** que el administrador confirmó la cancelación de una actividad,
**cuando** el sistema termina la operación,
**entonces** se muestra el mensaje "Actividad cancelada correctamente"
**y** la actividad sigue en el calendario, en su día original, con la etiqueta "Cancelada".

**CA3 – Después de la fecha original**
**Dado** que una actividad cancelada ya pasó su fecha original,
**cuando** un usuario abre el calendario,
**entonces** la actividad ya no aparece.

**CA4 – No se elimina del sistema**
**Dado** que una actividad o aviso fue cancelado,
**cuando** el administrador consulta la lista administrativa,
**entonces** la publicación sigue registrada con estado "Cancelada".

**CA5 – Desistir de la cancelación**
**Dado** que el sistema pidió confirmar la cancelación,
**cuando** el administrador cancela la operación,
**entonces** no se realiza ningún cambio y regresa a la vista anterior.

**CA6 – Actividad ya cancelada**
**Dado** que una actividad ya está marcada como "Cancelada",
**cuando** el administrador intenta cancelarla de nuevo,
**entonces** se muestra el mensaje "Esta actividad ya está cancelada" y no se realiza ningún cambio.
