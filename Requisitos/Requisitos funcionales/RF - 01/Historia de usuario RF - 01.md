## Requisito Funcional 01 - Calendario de actividades

RF01 - El sistema mostrará un calendario de eventos y avisos ya publicados, cuya fecha sea igual o posterior al día actual, indicando nombre, sede, fecha y hora de cada uno.

## Historia de usuario

**Como** usuario del sistema, 
**quiero** ver en un calendario los próximos talleres y eventos de bienestar del DOCEs,
**para** consultar las actividades y su información: nombre, sede, fecha y hora de cada uno y enterarme a tiempo sin depender del correo.

## Criterios de aceptación

**CA1 – Se muestran las actividades próximas**
**Dado** que existen eventos y avisos publicados con fecha igual o posterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** cada uno aparece en el día que le corresponde, con su nombre, sede, fecha y hora.

**CA2 – No se muestran actividades pasadas**
**Dado** que existe un evento publicado con fecha anterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** ese evento no aparece en el calendario.

**CA3 – No se muestran borradores**
**Dado** que existe un evento guardado como borrador (no publicado),
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** ese evento no aparece en el calendario.

**CA4 – Ver el detalle de una actividad**
**Dado** que el calendario muestra al menos una actividad,
**cuando** el usuario hace clic en ella,
**entonces** se abre una ventana con su nombre, sede, fecha y hora,
**y** al presionar "Cerrar" vuelve al calendario.

**CA5 – Calendario sin actividades**
**Dado** que no hay eventos ni avisos publicados con fecha igual o posterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** el calendario aparece vacío y debajo se muestra el mensaje "No hay eventos por mostrar".

**CA6 – Error de conexión**
**Dado** que el sistema no puede conectarse con el servidor,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** permanece en esa pestaña y se muestra el mensaje "No se pudo conectar con los servidores, intenta de nuevo más tarde".

**CA7 – Actividad modificada o eliminada**
**Dado** que una actividad fue editada o eliminada después de que el usuario cargó el calendario,
**cuando** el usuario hace clic en ella,
**entonces** el sistema lo regresa al calendario y muestra el mensaje "La actividad ha sido editada o eliminada, intente de nuevo más tarde".