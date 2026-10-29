## Requisito Funcional 09 - Fotogalería

RF09 - El sistema deberá permitir al administrador gestionar (subir, actualizar y retirar) imágenes y descripciones en la fotogalería de las actividades de salud mental de la Facultad de Matemáticas, así como permitir a los usuarios visualizar dicha galería de forma pública.

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
**cuando** el administrador cambia la imagen o su descripción y confirma,
**entonces** se muestra un mensaje con el resultado
**y** la fotogalería pública muestra el cambio.

**CA3 – Retirar foto**
**Dado** que existe una foto publicada,
**cuando** el administrador confirma la operación "Retirar",
**entonces** la foto y su descripción dejan de aparecer en la fotogalería pública.

**CA4 – Confirmar sin seleccionar foto**
**Dado** que el administrador no seleccionó ninguna foto,
**cuando** confirma la operación,
**entonces** se muestra el mensaje "Se solicita que seleccione al menos una foto" y no se realiza ningún cambio.

**CA5 – Cancelar la operación**
**Dado** que el administrador inició una operación en la fotogalería,
**cuando** la cancela antes de confirmarla,
**entonces** no se aplica ningún cambio.

**CA6 – Foto ya no disponible**
**Dado** que una foto fue retirada mientras el administrador la tenía seleccionada,
**cuando** intenta actualizarla o retirarla,
**entonces** se informa que la foto no está disponible y la fotogalería se actualiza.

### Visualización (usuario)

**CA7 – Ver la fotogalería sin iniciar sesión**
**Dado** que existen fotos publicadas,
**cuando** cualquier usuario, sin iniciar sesión, entra a la sección "Fotogalería",
**entonces** se muestran las fotos con su título y descripción.

**CA8 – Recorrer la galería**
**Dado** que hay más fotos de las que caben en pantalla,
**cuando** el usuario se desplaza horizontalmente,
**entonces** se muestran las fotos siguientes.

**CA9 – Galería vacía**
**Dado** que no hay fotos publicadas,
**cuando** el usuario entra a la sección "Fotogalería",
**entonces** se muestra el mensaje "No hay imágenes disponibles para consultar".

**CA10 – Error al cargar imágenes**
**Dado** que las imágenes no se pueden cargar,
**cuando** el usuario entra a la sección "Fotogalería",
**entonces** se informa que no fue posible mostrar las imágenes.
