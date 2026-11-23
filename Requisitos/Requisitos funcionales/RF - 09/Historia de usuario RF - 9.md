## Requisito Funcional 09 - Fotogalería

RF09 - El sistema deberá permitir al administrador gestionar (subir, actualizar y eliminar) imágenes y descripciones en la fotogalería de las actividades de salud mental de la Facultad de Matemáticas, así como permitir a los usuarios visualizar dicha galería de forma pública.

## Historia de usuario

Gestión: **Como** administrador del sistema, **quiero** subir, editar y eliminar fotos con sus descripciones, **para** mantener actualizado el repositorio de actividades de salud mental de la Facultad de Matemáticas.

Visualización: **Como** estudiante o usuario de la plataforma, **quiero** explorar la fotogalería de actividades de salud mental, **para** conocer las dinámicas pasadas e iniciativas realizadas en la facultad.

## Criterios de aceptación

### Gestión (administrador)

**CA1 – Subir fotos**
**Dado** que el administrador inició sesión y seleccionó una o más fotos con su título y descripción,
**cuando** confirma la operación "Agregar",
**entonces** se muestra un mensaje con el resultado
**y** las fotos aparecen en la fotogalería pública con su título y descripción.

**CA2 – Editar foto o descripción**
**Dado** que existe una foto publicada,
**cuando** el administrador modifica la imagen, el título o la descripción y confirma,
**entonces** se muestra un mensaje con el resultado
**y** la fotogalería pública refleja los cambios realizados.

**CA3 – eliminar foto**
**Dado** que existe una fotografía publicada o varias,
**cuando** el administrador confirma su eliminación,
**entonces** la fotografía y sus datos asociados desaparecen permanentemente de la fotogalería.

**CA4 – Confirmar sin seleccionar foto**
**Dado** que el administrador se encuentra en la sección de gestión de la fotogalería,
**cuando** intenta actualizar o eliminar una fotografía sin haber seleccionado alguna,
**entonces** el sistema deberá impedir la operacíon y mostrar el mensaje: "Se solicita que seleccione al menos una foto", sin realizar ningún cambio.

**CA5 – Cancelar la operación**
**Dado** que el administrador inició una operación en la fotogalería,
**cuando** la cancela antes de confirmarla,
**entonces** no se aplica ningún cambio.

**CA6 – Foto ya no disponible**
**Dado** que una foto fue eliminada mientras el administrador la tenía seleccionada,
**cuando** intenta actualizarla o eliminarla,
**entonces** se informa que la foto no está disponible y la fotogalería se actualiza.

### Visualización (usuario)

**CA7 – Ver la fotogalería sin iniciar sesión**
**Dado** que existen fotos publicadas,
**cuando** cualquier usuario, sin iniciar sesión, entra a la sección "Fotogalería",
**entonces** se muestran las fotos con su título y descripción.

**CA8 – Visualización de la fotogalería**
**Dado** que el usuario accede a la fotogalería desde un dispositivo móvil, tableta o computadora.
**Cuando** la cantidad de fotografías supera el espacio disponible en la pantalla.
**Entonces** el sistema deberá adaptar la distribución de las fotografías al tamaño de la pantalla y permitir consultar todas las imágenes mediante el desplazamiento de la página.

**CA9 – Galería vacía**
**Dado** que no hay fotos publicadas,
**cuando** el usuario entra a la sección "Fotogalería",
**entonces** se muestra el mensaje "No hay imágenes disponibles para consultar".

**CA10 – Error al cargar imágenes**
**Dado** que el usuario accede a la fotogalería.
**Cuando** ocurre un error que impide cargar las imágenes.
**Entonces** el sistema deberá mostrar un mensaje indicando que no fue posible cargar las imágenes.
