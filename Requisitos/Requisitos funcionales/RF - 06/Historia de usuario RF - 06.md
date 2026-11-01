## Requisito funcional 06 - Líneas de ayuda

RF06 - El sistema deberá permitir la gestión y visualización de las líneas de ayuda universitarias, así también las de disposición general locales, estatales y nacionales para los usuarios.

## Historia de usuario

**Como** usuario del sistema,
**quiero** consultar las líneas de ayuda universitarias, locales, estatales y nacionales,
**para** encontrar su información de contacto, acceder a los servicios de apoyo que necesite y/o solicitar ayuda profesional inmediata durante las 24 horas del día.

## Criterios de aceptación

### Catálogo

**CA1 – Visualización del catálogo**
**Dado** que existen líneas de ayuda registradas en el sistema,
**cuando** el usuario accede a la sección “Líneas de ayuda”,
**entonces** se muestra un catálogo con las líneas disponibles, organizadas según su ámbito de atención: universitario, local, estatal y nacional.

**CA2 – Catálogo sin registros**
**Dado** que no existen líneas de ayuda registradas en el sistema,
**cuando** el usuario accede a la sección “Líneas de ayuda”,
**entonces** se muestra un mensaje que informa que no hay líneas de ayuda disponibles.

**CA3 – Consulta por clasificación**
**Dado** que existen líneas de ayuda registradas en diferentes ámbitos de atención,
**cuando** el usuario selecciona un ámbito específico,
**entonces** el sistema muestra las líneas de ayuda correspondientes a dicho ámbito.

**CA4 – Error al cargar el catálogo**
**Dado** que ocurra un error al recuperar la información o se pierde la conexión con el servidor,
**cuando** el usuario intente consultar las líneas de ayuda,
**entonces** se muestra un mensaje que informa del error y no fue posible cargar la información.

### Registro de líneas de ayuda

**CA5 – Registro de una nueva línea de ayuda**
**Dado** que el administrador haya iniciado sesión y cuente con los permisos necesarios,
**cuando** acceda al módulo de gestión, selecciona la opción para registrar una línea de ayuda y completa los campos requeridos,
**entonces** el sistema valida los datos, almacena el registro y muestra un mensaje de confirmación.

**CA6 – Campos obligatorios incompletos**
**Dado** que el administrador esté registrando una línea de ayuda,
**cuando** intente guardar el registro sin completar alguno de los campos requeridos,
**entonces** el sistema identifica los campos incompletos, muestra un mensaje de validación y no guarda el registro.

**CA7 – Datos con formato incorrecto**
**Dado** que el administrador introduzca información con un formato inválido,
**cuando** intente guardar una nueva línea de ayuda,
**entonces** el sistema señala los campos que presentan errores e indica el formato esperado.

**CA8 – Posible registro duplicado**
**Dado** que exista una línea de ayuda con información que coincide o es similar a la que se intenta registrar,
**cuando** el administrador solicite guardar el nuevo registro,
**entonces** el sistema informa sobre la posible duplicidad y permite revisar la información sin crear automáticamente un registro duplicado.

**CA9 – Cancelación del registro**
**Dado** que el administrador se encuentre registrando una línea de ayuda,
**cuando** decide cancelar la operación y confirma la cancelación,
**entonces** el sistema interrumpe el proceso y no almacena el nuevo registro.

**CA10 – Error durante el registro**
**Dado** que ocurra un error de conexión o de almacenamiento,
**cuando** el administrador intente registrar una línea de ayuda,
**entonces** el sistema informa que no fue posible completar la operación y cancela el proceso del registro.

### Modificación de líneas de ayuda

**CA11 – Modificación de una línea existente**
**Dado** que el administrador ha iniciado sesión, cuenta con los permisos necesarios y existe una línea de ayuda registrada,
**cuando** selecciona la línea que desea modificar, actualiza sus datos y guarda los cambios,
**entonces** el sistema valida la información, almacena los cambios y muestra un mensaje de confirmación con los datos actualizados.

**CA12 – Conservación de campos sin modificar**
**Dado** que el administrador desee actualizar únicamente algunos datos de una línea de ayuda,
**cuando** modifica los campos seleccionados y guarda los cambios,
**entonces** el sistema conserva los valores originales de los campos que no fueron modificados.

**CA13 – Línea de ayuda no existe para modificación**
**Dado** que el administrador intente modificar una línea de ayuda que ya no existe,
**cuando** el sistema busca recuperar el registro seleccionado,
**entonces** se informa que la línea de ayuda no está disponible y se impide guardar cambios sobre ese registro.

**CA14 – Cancelación de la modificación**
**Dado** que el administrador esté modificando una línea de ayuda,
**cuando** decide cancelar la operación,
**entonces** el sistema interrumpe el proceso y conserva los datos que estaban almacenados antes de iniciar la modificación.

**CA15 – Error durante la modificación**
**Dado** que ocurra un error de conexión o de almacenamiento,
**cuando** el administrador intente guardar los cambios de una línea de ayuda,
**entonces** el sistema informa que no fue posible completar la modificación, informa que los cambios no fueron exitosos y continúa en la pestaña de modificación.

### Eliminación de líneas de ayuda

**CA16 – Confirmación de eliminación**
**Dado** que el administrador ha iniciado sesión, cuenta con los permisos necesarios y existe una línea de ayuda registrada,
**cuando** selecciona la opción para eliminarla,
**entonces** el sistema muestra un mensaje de confirmación con información suficiente para identificar la línea y advertir sobre las consecuencias de la operación.

**CA17 – Eliminación confirmada**
**Dado** que el administrador ha seleccionado una línea de ayuda y revisado el aviso de confirmación,
**cuando** confirma la eliminación,
**entonces** el sistema retira la línea de ayuda del catálogo, actualiza la información y muestra un mensaje de eliminación exitosa.

**CA18 – Cancelación de la eliminación**
**Dado** que el administrador se encuentra en la pantalla de confirmación de eliminación,
**cuando** decide cancelar la operación,
**entonces** el sistema cancela el proceso de eliminación y conserva el registro sin modificaciones.

**CA19 – Línea de ayuda previamente retirada**
**Dado** que la línea de ayuda seleccionada ya fue eliminada o retirada,
**cuando** el administrador intenta eliminarla nuevamente,
**entonces** el sistema informa de su estado actual y actualiza la página.

**CA20 – Error durante la eliminación**
**Dado** que ocurre un error de conexión o del sistema durante la eliminación,
**cuando** el administrador quiera confirmar la sustracción,
**entonces** el sistema informa que no fue posible completarla y cierra la pestaña de eliminación.

### Permisos y sesión

**CA21 – Acceso sin permisos suficientes**
**Dado** que un usuario no cuenta con permisos administrativos para gestionar las líneas de ayuda,
**cuando** intenta registrar, modificar o eliminar una línea,
**entonces** el sistema deniega la operación y muestra un mensaje que informa que no tiene los permisos correspondientes.

**CA22 – Sesión administrativa expirada**
**Dado** que la sesión del administrador ha expirado,
**cuando** intente registrar, modificar o eliminar una línea de ayuda,
**entonces** el sistema solicita que vuelva a autenticarse antes de continuar con la operación.