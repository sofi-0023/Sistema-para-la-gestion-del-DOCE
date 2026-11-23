## Requisito Funcional 10 - Tutorías y guías

RF10 – El sistema deberá permitir a los usuarios consultar los contactos de apoyo (tutorías) y descargar las guías de carrera.

## Historia de usuario

**Como** estudiante o usuario del sistema,
**quiero** consultar los contactos del programa de tutorías y descargar guías vocacionales y de carrera,
**para** orientar mi desempeño académico y mi desarrollo profesional dentro de la facultad.

## Criterios de aceptación

**CA1 – Acceso público**
**Dado** que una persona no ha iniciado sesión,
**cuando** selecciona «Tutorías y guías» en el menú,
**entonces** puede consultar la sección sin que el sistema le pida credenciales.

**CA2 – Lista de contactos y guías**
**Dado** que existen contactos de tutorías y guías de carrera registrados,
**cuando** el usuario entra a la sección de tutorías y guías,
**entonces** se muestra la lista de contactos de apoyo con su nombre y cargo,
**y** la lista de guías con su título, formato y tamaño del archivo.

**CA3 – Detalle de un contacto**
**Dado** que el usuario está en la lista de contactos,
**cuando** selecciona «Ver detalle» en un contacto,
**entonces** se muestran su nombre, cargo, correo, extensión, ubicación, horario de atención y la orientación que ofrece,
**y** la opción «Volver a la lista» lo regresa a la sección.

**CA4 – Descargar una guía**
**Dado** que el usuario está en la lista de guías,
**cuando** selecciona «Descargar» en una guía,
**entonces** se descarga el archivo de esa guía.

**CA5 – Guía no disponible**
**Dado** que el archivo de una guía ya no está disponible,
**cuando** el usuario selecciona «Descargar»,
**entonces** se muestra un mensaje que indica que la guía no se pudo descargar,
**y** el usuario permanece en la lista.

**CA6 – Sin registros**
**Dado** que no hay contactos ni guías registrados,
**cuando** el usuario entra a la sección,
**entonces** se muestra el mensaje «No hay contactos o guías registradas en este momento».

**CA7 – Error de conexión**
**Dado** que el sistema no puede conectarse con el servidor,
**cuando** el usuario entra a la sección o abre el detalle de un contacto,
**entonces** permanece en la pantalla, se muestra el mensaje «No se pudo conectar con los servidores, intenta de nuevo más tarde»
**y** se ofrece la opción «Reintentar».
