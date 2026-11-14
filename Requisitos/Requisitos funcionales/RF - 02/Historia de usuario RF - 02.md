## Requisito funcional 02 - Consultar detalle de actividad

RF02 - El sistema deberá permitir al usuario seleccionar una actividad publicada en el calendario para consultar la siguiente información:
* **Nombre de la actividad.**
* **Descripción.**
* **Fecha y hora de inicio y, cuando corresponda, de finalización.**
* **Modalidad: presencial, virtual o híbrida.**
* **Lugar, si es presencial; enlace de acceso, si es virtual; o ambos, si es híbrida.**
* **Institución u organizador responsable.**

## Historia de usuario:

**Como** estudiante o usuario del sistema,
**quiero** consultar la información detallada de una actividad del calendario,
**para** conocer sus características y decidir si puedo y deseo asistir.

## Criterios de aceptación

**CA1 – Detalle completo de una actividad presencial**
**Dado** que existe una actividad publicada con modalidad presencial,
**cuando** el usuario la selecciona en el calendario,
**entonces** se muestran su nombre, descripción, fecha y hora de inicio, modalidad "Presencial", lugar e institución u organizador responsable.

**CA2 – Fecha y hora de finalización**
**Dado** que una actividad publicada tiene fecha y hora de finalización registradas,
**cuando** el usuario consulta su detalle,
**entonces** se muestran la fecha y hora de inicio y las de finalización;
**y** si la actividad no tiene finalización registrada, solo se muestran las de inicio, sin campos vacíos.

**CA3 – Actividad virtual**
**Dado** que una actividad publicada tiene modalidad virtual,
**cuando** el usuario consulta su detalle,
**entonces** se muestra el enlace de acceso y no se muestra un lugar físico.

**CA4 – Actividad híbrida**
**Dado** que una actividad publicada tiene modalidad híbrida,
**cuando** el usuario consulta su detalle,
**entonces** se muestran tanto el lugar como el enlace de acceso.

**CA5 – Regresar al calendario**
**Dado** que el usuario está viendo el detalle de una actividad,
**cuando** selecciona "Cerrar" o "Regresar",
**entonces** el sistema vuelve a mostrar el calendario.

**CA6 – Actividad no disponible**
**Dado** que una actividad dejó de estar publicada después de que el usuario cargó el calendario,
**cuando** el usuario la selecciona,
**entonces** el sistema informa que la actividad ya no está disponible y le permite regresar al calendario.

**CA7 – Error de consulta**
**Dado** que el sistema no puede recuperar la información de la actividad,
**cuando** el usuario intenta consultar su detalle,
**entonces** se muestra un mensaje de error con la opción de reintentar.
