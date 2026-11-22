
# RF02 – Consultar detalle de actividad

## Descripción del requisito

El sistema deberá permitir al estudiante o usuario seleccionar una actividad publicada en el calendario para consultar la siguiente información:

- Nombre de la actividad.
- Descripción.
- Fecha y hora de inicio y, cuando corresponda, de finalización.
- Modalidad: presencial, virtual o híbrida.
- Lugar, si es presencial.
- Enlace de acceso, si es virtual.
- Lugar y enlace de acceso, si es híbrida.
- Institución u organizador responsable.

## Historia de usuario

**Como:** estudiante o usuario del sistema.

**Quiero:** consultar la información detallada de una actividad publicada en el calendario.

**Para:** conocer sus características y decidir si puedo y deseo asistir.

## Criterios de aceptación

### Escenario 1 – Consultar una actividad publicada

**Dado** que el usuario se encuentra en el calendario y existe una actividad publicada.

**Cuando** selecciona una actividad.

**Entonces** el sistema deberá mostrar su nombre, descripción, fecha, horario, modalidad e institución u organizador responsable.

**Y** deberá mostrar la información correspondiente al lugar o enlace de acceso según la modalidad de la actividad.

### Escenario 2 – Consultar una actividad presencial

**Dado** que existe una actividad publicada con modalidad presencial.

**Cuando** el usuario consulta su detalle.

**Entonces** el sistema deberá mostrar el lugar donde se realizará la actividad.

### Escenario 3 – Consultar una actividad virtual

**Dado** que existe una actividad publicada con modalidad virtual.

**Cuando** el usuario consulta su detalle.

**Entonces** el sistema deberá mostrar el enlace de acceso a la actividad.

### Escenario 4 – Consultar una actividad híbrida

**Dado** que existe una actividad publicada con modalidad híbrida.

**Cuando** el usuario consulta su detalle.

**Entonces** el sistema deberá mostrar el lugar donde se realizará la actividad.

**Y** deberá mostrar el enlace de acceso virtual.

### Escenario 5 – Actividad no disponible

**Dado** que el usuario intenta consultar una actividad que dejó de estar publicada.

**Cuando** selecciona dicha actividad.

**Entonces** el sistema deberá informar que la actividad ya no está disponible.

**Y** deberá ofrecer la opción de regresar al calendario.

### Escenario 6 – Error al consultar una actividad

**Dado** que el usuario selecciona una actividad publicada.

**Cuando** ocurre un error al recuperar su información.

**Entonces** el sistema deberá mostrar un mensaje indicando que no fue posible consultar el detalle.

**Y** deberá ofrecer las opciones de reintentar la consulta o regresar al calendario.


## Casos de excepción

- **Actividad no disponible:** el sistema informa que la actividad ya no se encuentra publicada.
- **Error de consulta:** el sistema informa que no fue posible recuperar la información y ofrece la opción de reintentar.

