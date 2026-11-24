## Requisito Funcional 07 - Consultar material informativo

RF07 - El sistema mostrará a cualquier usuario, sin necesidad de iniciar sesión, el material informativo sobre salud mental que esté publicado, y permitirá seleccionar cualquiera de ellos para consultar sus detalles completos.

## Historia de usuario

**Como** usuario del sistema, 
**quiero** visualizar y/o descargar materiales informativos sobre salud mental, como folletos, videos y documentos, 
**para** conocer información de mi interés relativa a la salud mental, aprender sobre ella y acceder a los detalles de cada publicación del sitio.

## Criterios de aceptación

### Catálogo

**CA1 – Catálogo de materiales**<br>
**Dado** que existen materiales informativos publicados,
**cuando** el usuario entra a "Materiales informativos",
**entonces** cada material aparece con su título, una descripción breve y su tipo (folleto, video o documento).

**CA2 – Material sin descripción**<br>
**Dado** que un material publicado no tiene descripción,
**cuando** aparece en el catálogo,
**entonces** se indica que no cuenta con descripción.

**CA3 – Muchos materiales**<br>
**Dado** que hay más materiales de los que caben en una página,
**cuando** el usuario recorre el catálogo,
**entonces** puede ver todos mediante páginas o desplazamiento, sin que se omita ninguno.

**CA4 – Catálogo vacío**<br>
**Dado** que no hay materiales publicados,
**cuando** el usuario entra a "Materiales informativos",
**entonces** se muestra un mensaje que informa que no hay materiales disponibles.

### Detalle

**CA5 – Detalle de un material**<br>
**Dado** que el usuario está en el catálogo,
**cuando** selecciona un material,
**entonces** se muestran su título, su descripción detallada y su tipo.

**CA6 – Video**<br>
**Dado** que el material seleccionado es un video,
**cuando** el usuario consulta su detalle,
**entonces** se muestran su duración, su descripción y la plataforma donde se reproduce.

**CA7 – Documento o folleto**<br>
**Dado** que el material seleccionado es un documento o un folleto,
**cuando** el usuario consulta su detalle,
**entonces** se muestra una vista previa y la opción de descargar el archivo
**y**, si es un documento, también su formato y tamaño.

**CA8 – Regresar al catálogo**<br>
**Dado** que el usuario está en el detalle de un material,
**cuando** selecciona "Regresar",
**entonces** vuelve al catálogo.

### Errores

**CA9 – Material retirado**<br>
**Dado** que un material fue retirado después de que el usuario cargó el catálogo,
**cuando** lo selecciona,
**entonces** se informa que el material ya no está disponible y se ofrece regresar al catálogo actualizado.

**CA10 – Error de carga o de conexión**<br>
**Dado** que el sistema no puede recuperar los materiales o se pierde la conexión con el servidor,
**cuando** el usuario intenta ver el catálogo o un detalle,
**entonces** se muestra un mensaje que indica que no fue posible cargar la información.

**CA11 – Enlace externo no disponible**<br>
**Dado** que un material enlaza a un recurso externo que no está disponible,
**cuando** el usuario intenta abrirlo,
**entonces** se informa que el contenido no está disponible.
