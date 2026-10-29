## Requisito Funcional 13 - Tutorías y guías

RF13 - El sistema deberá permitir a los usuarios consultar los contactos de apoyo (tutorías) y guías de carrera.

## Historia de usuario

**Como** estudiante o usuario del sistema,
**quiero** consultar los contactos del programa de tutorías y descargar guías vocacionales/de carrera,
**para** orientar mi desempeño académico y desarrollo profesional dentro de la facultad.

## Criterios de aceptación

**CA1 – Lista de contactos y guías**
**Dado** que existen contactos de tutorías y guías de carrera registrados,
**cuando** el usuario entra a la sección de tutorías y guías,
**entonces** se muestra la lista de contactos de apoyo y la de guías disponibles.

**CA2 – Detalle de un contacto**
**Dado** que el usuario está en la lista de contactos,
**cuando** selecciona un contacto,
**entonces** se muestra su información de contacto y orientación.

**CA3 – Descargar una guía**
**Dado** que el usuario está en la lista de guías,
**cuando** selecciona descargar una guía,
**entonces** se descarga el archivo de esa guía.

**CA4 – Sin registros**
**Dado** que no hay contactos ni guías registrados,
**cuando** el usuario entra a la sección,
**entonces** se muestra el mensaje "No hay contactos o guías registradas en este momento".

**CA5 – Error de conexión**
**Dado** que el sistema no puede conectarse con el servidor,
**cuando** el usuario entra a la sección,
**entonces** permanece en la pantalla y se muestra el mensaje "No se pudo conectar con los servidores, intenta de nuevo más tarde".
