## Requisito Funcional 05 - Consultar directorio de orientación y psicología

RF05 - El sistema permitirá a cualquier usuario (sin necesidad de iniciar sesión) consultar el directorio del Departamento de Orientación y Consejo Educativo, mostrando para cada persona: nombre completo, cargo/área de atención, ubicación física (edificio y planta), horario de atención y correo institucional y/o teléfono.

## Historia de usuario

**Como** estudiante,  
**quiero** ver el directorio de orientadores y psicólogos con su ubicación, horario y contacto,  
**para** saber exactamente a quién dirigirme y en qué horario puedo acercarme.

## Criterios de aceptación

**CA1 – Acceso sin iniciar sesión**
**Dado** que el usuario no ha iniciado sesión,
**cuando** entra a la sección "Directorio",
**entonces** se muestra el listado de orientadores y psicólogos.

**CA2 – Datos de cada persona**
**Dado** que existen personas registradas en el directorio,
**cuando** el usuario consulta el listado,
**entonces** para cada persona se muestran su nombre completo, cargo o área de atención, ubicación física (edificio y planta), horario de atención y al menos un medio de contacto (correo institucional o teléfono).

**CA3 – Persona con un solo medio de contacto**
**Dado** que una persona tiene registrado solo correo o solo teléfono,
**cuando** el usuario consulta su información,
**entonces** se muestra el medio registrado, sin un campo vacío para el otro.

**CA4 – Ficha completa**
**Dado** que el usuario está en el listado del directorio,
**cuando** selecciona a una persona,
**entonces** se muestra su ficha completa.

**CA5 – Directorio vacío**
**Dado** que no hay contactos registrados,
**cuando** el usuario entra a la sección "Directorio",
**entonces** se muestra el mensaje "No hay contactos disponibles por el momento".

**CA6 – Error de conexión**
**Dado** que el sistema no puede conectarse con el servidor,
**cuando** el usuario entra a la sección "Directorio",
**entonces** se muestra un mensaje de error de conexión.
