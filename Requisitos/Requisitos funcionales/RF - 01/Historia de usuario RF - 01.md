## Requisito Funcional 01 - Calendario de actividades

RF01 - El sistema mostrará un calendario de las actividades ya publicadas, cuya fecha sea igual o posterior al día actual, indicando nombre, lugar, fecha y hora de cada una.

## Historia de usuario

**Como** estudiante de la Facultad de Matemáticas,
**quiero** ver en un calendario los próximos talleres y actividades de bienestar del DOCE,
**para** conocer su nombre, fecha, hora y lugar y enterarme a tiempo sin depender del correo.

## Criterios de aceptación

**CA1 – Se muestran las actividades próximas**
**Dado** que existen actividades publicadas con fecha igual o posterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** cada una aparece en el día que le corresponde, con su nombre, hora y lugar (o "Virtual").

**CA2 – No se muestran actividades pasadas**
**Dado** que existe una actividad publicada con fecha anterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** esa actividad no aparece en el calendario.

**CA3 – No se muestran borradores**
**Dado** que existe una actividad guardada como borrador (no publicada),
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** esa actividad no aparece en el calendario.

**CA4 – Abrir una actividad**
**Dado** que el calendario muestra al menos una actividad,
**cuando** el usuario la selecciona,
**entonces** el sistema muestra su detalle según RF02.

**CA5 – Calendario sin actividades**
**Dado** que no hay actividades publicadas con fecha igual o posterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** el calendario aparece vacío y debajo se muestra el mensaje "No hay eventos por mostrar".

**CA6 – Error de conexión**
**Dado** que el sistema no puede conectarse con el servidor,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** permanece en esa pestaña y se muestra el mensaje "No se pudo conectar con los servidores, intenta de nuevo más tarde".

**CA7 – Actividad cancelada**
**Dado** que una actividad publicada fue cancelada y su fecha es igual o posterior al día actual,
**cuando** el usuario entra a la pestaña "Calendario",
**entonces** la actividad aparece en su día con la etiqueta "Cancelada".

**CA8 – Actividad no disponible**
**Dado** que una actividad dejó de estar publicada después de que el usuario cargó el calendario,
**cuando** el usuario la selecciona,
**entonces** el sistema lo regresa al calendario y muestra el mensaje "La actividad ya no está disponible".
