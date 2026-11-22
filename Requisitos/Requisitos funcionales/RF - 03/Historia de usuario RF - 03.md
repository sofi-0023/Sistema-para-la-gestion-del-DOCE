
# REQUISITO FUNCIONAL 03 – CREAR Y PUBLICAR ACTIVIDADES Y AVISOS

## Descripción del requisito

RF03 – El sistema deberá permitir al administrador registrar actividades y avisos mediante formularios correspondientes a cada tipo de publicación, guardarlos como borradores y publicarlos una vez que la información haya sido revisada y validada.

- Para las actividades, deberá solicitar nombre, descripción, fecha y hora, modalidad, lugar o enlace según corresponda e institución u organizador responsable.
- Para los avisos, deberá solicitar título y contenido.
- Antes de publicar, el sistema deberá validar los campos obligatorios y la coherencia de los datos.
- Una vez publicada una actividad, deberá aparecer en el calendario para que los usuarios puedan consultar su información.
- Una vez publicado un aviso, deberá aparecer en el espacio destinado a los avisos.
- Los registros guardados como borradores no deberán ser visibles para la comunidad estudiantil.

## Descomposición del requisito

| Código | Funcionalidad |
|---|---|
| RF03.1 | Crear una actividad como borrador. |
| RF03.2 | Publicar una actividad. |
| RF03.3 | Crear un aviso como borrador. |
| RF03.4 | Publicar un aviso. |

---

# HISTORIAS DE USUARIO

## Historia de usuario 03-A – Crear y publicar actividades

**Como** administrador del sistema,

**quiero** registrar actividades como borradores, revisarlas y publicarlas cuando estén completas,

**para** mantener actualizado el calendario y dar a conocer las próximas actividades a la comunidad estudiantil.

### Criterios de aceptación

#### Escenario 1 – Guardar actividad como borrador

**Dado** que el administrador ha iniciado sesión y cuenta con permisos para crear actividades.

**Cuando** completa correctamente los campos obligatorios del formulario y selecciona «Guardar borrador».

**Entonces** el sistema deberá validar la información capturada.

**Y** deberá registrar la actividad con estado «Borrador».

**Y** deberá confirmar que el borrador se guardó correctamente sin hacerlo visible para los estudiantes.

#### Escenario 2 – Validar información de la actividad

**Dado** que el administrador se encuentra en el formulario de creación de actividades.

**Cuando** intenta guardar una actividad con campos obligatorios incompletos o datos inválidos.

**Entonces** el sistema deberá señalar los campos que necesitan corrección.

**Y** deberá conservar la información capturada.

**Y** permitirá corregir los datos antes de volver a guardar.

#### Escenario 3 – Validar modalidad presencial

**Dado** que el administrador se encuentra registrando una actividad.

**Cuando** selecciona la modalidad presencial.

**Entonces** el sistema deberá solicitar el lugar como campo obligatorio.

#### Escenario 4 – Validar modalidad virtual

**Dado** que el administrador se encuentra registrando una actividad.

**Cuando** selecciona la modalidad virtual.

**Entonces** el sistema deberá solicitar el enlace de acceso como campo obligatorio.

#### Escenario 5 – Validar modalidad híbrida

**Dado** que el administrador se encuentra registrando una actividad.

**Cuando** selecciona la modalidad híbrida.

**Entonces** el sistema deberá solicitar el lugar como campo obligatorio.

**Y** deberá solicitar el enlace de acceso como campo obligatorio.

#### Escenario 6 – Cancelar registro de actividad

**Dado** que el administrador se encuentra en el formulario de creación de actividades y todavía no ha guardado el registro.

**Cuando** selecciona «Cancelar».

**Entonces** el sistema deberá finalizar el proceso sin registrar la actividad.

#### Escenario 7 – Error al guardar actividad

**Dado** que el administrador ha completado el formulario de una actividad.

**Cuando** ocurre un error durante el almacenamiento.

**Entonces** el sistema deberá informar que no fue posible guardar la actividad.

**Y** deberá conservar la información capturada para permitir reintentar el registro.

#### Escenario 8 – Revisar actividad antes de publicar

**Dado** que existe una actividad guardada como borrador.

**Cuando** el administrador selecciona la opción de revisar.

**Entonces** el sistema deberá mostrar la información completa de la actividad antes de permitir su publicación.

#### Escenario 9 – Publicar actividad correctamente

**Dado** que existe una actividad guardada como borrador y su información cumple con los requisitos establecidos.

**Cuando** el administrador revisa la información y selecciona «Publicar».

**Entonces** el sistema deberá cambiar el estado de la actividad a «Publicado».

**Y** deberá hacerla visible en el calendario para la comunidad estudiantil.

**Y** deberá confirmar que la publicación se realizó correctamente.

#### Escenario 10 – Información incompleta al publicar

**Dado** que existe una actividad guardada como borrador.

**Cuando** el administrador intenta publicarla y la información no cumple con los requisitos establecidos.

**Entonces** el sistema deberá informar qué datos requieren corrección.

**Y** deberá mantener la actividad en estado «Borrador».

#### Escenario 11 – Actividad ya publicada

**Dado** que una actividad ya se encuentra publicada.

**Cuando** el administrador intenta publicarla nuevamente.

**Entonces** el sistema deberá informar que la actividad ya está publicada.

**Y** deberá evitar duplicar la operación.

#### Escenario 12 – Error al publicar actividad

**Dado** que existe una actividad guardada como borrador.

**Cuando** el administrador intenta publicarla y ocurre un error que impide completar la operación.

**Entonces** el sistema deberá informar que no fue posible realizar la publicación.

**Y** deberá conservar la actividad en estado «Borrador».

**Y** no deberá hacerla visible en el calendario público.

---

## Historia de usuario 03-B – Crear y publicar avisos

**Como** administrador del sistema,

**quiero** registrar avisos como borradores, revisarlos y publicarlos cuando estén completos,

**para** comunicar información importante a la comunidad estudiantil.

### Criterios de aceptación

#### Escenario 1 – Guardar aviso como borrador

**Dado** que el administrador ha iniciado sesión y cuenta con permisos para crear avisos.

**Cuando** captura un título y contenido válidos y selecciona «Guardar borrador».

**Entonces** el sistema deberá validar la información.

**Y** deberá registrar el aviso con estado «Borrador».

**Y** deberá confirmar que el borrador se guardó correctamente sin hacerlo visible para los estudiantes.

#### Escenario 2 – Validar información del aviso

**Dado** que el administrador se encuentra en el formulario de creación de avisos.

**Cuando** intenta guardar un aviso sin título o contenido, o cuando alguno de estos campos contiene únicamente espacios.

**Entonces** el sistema deberá señalar los campos que necesitan corrección.

**Y** deberá conservar la información capturada.

**Y** permitirá corregir los datos antes de volver a guardar.

#### Escenario 3 – Cancelar registro de aviso

**Dado** que el administrador se encuentra en el formulario de creación de avisos y todavía no ha guardado el registro.

**Cuando** selecciona «Cancelar».

**Entonces** el sistema deberá finalizar el proceso sin registrar el aviso.

#### Escenario 4 – Error al guardar aviso

**Dado** que el administrador ha completado el formulario de un aviso.

**Cuando** ocurre un error durante el almacenamiento.

**Entonces** el sistema deberá informar que no fue posible guardar el aviso.

**Y** deberá conservar la información capturada para permitir reintentar el registro.

#### Escenario 5 – Revisar aviso antes de publicar

**Dado** que existe un aviso guardado como borrador.

**Cuando** el administrador selecciona la opción de revisar.

**Entonces** el sistema deberá mostrar el título y contenido del aviso antes de permitir su publicación.

#### Escenario 6 – Publicar aviso correctamente

**Dado** que existe un aviso guardado como borrador y su información es válida.

**Cuando** el administrador revisa la información y selecciona «Publicar».

**Entonces** el sistema deberá cambiar el estado del aviso a «Publicado».

**Y** deberá hacerlo visible en el espacio destinado a los avisos para la comunidad estudiantil.

**Y** deberá confirmar que la publicación se realizó correctamente.

#### Escenario 7 – Información incompleta al publicar

**Dado** que existe un aviso guardado como borrador.

**Cuando** el administrador intenta publicarlo y no tiene título o contenido válido.

**Entonces** el sistema deberá informar qué datos requieren corrección.

**Y** deberá mantener el aviso en estado «Borrador».

#### Escenario 8 – Aviso ya publicado

**Dado** que un aviso ya se encuentra publicado.

**Cuando** el administrador intenta publicarlo nuevamente.

**Entonces** el sistema deberá informar que el aviso ya está publicado.

**Y** deberá evitar duplicar la operación.

#### Escenario 9 – Error al publicar aviso

**Dado** que existe un aviso guardado como borrador.

**Cuando** el administrador intenta publicarlo y ocurre un error que impide completar la operación.

**Entonces** el sistema deberá informar que no fue posible realizar la publicación.

**Y** deberá conservar el aviso en estado «Borrador».

**Y** no deberá hacerlo visible en el espacio público de avisos.
