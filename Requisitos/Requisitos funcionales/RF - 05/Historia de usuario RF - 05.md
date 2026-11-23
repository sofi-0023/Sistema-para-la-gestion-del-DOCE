## Requisito Funcional 05 - Consultar directorio de orientación y psicología

RF05 - El sistema permitirá a cualquier usuario, sin necesidad de iniciar sesión, consultar el directorio del personal de orientación y psicología del DOCE, mostrando para cada persona: nombre completo, cargo o área de atención, ubicación física (edificio y planta), horario de atención y al menos un medio de contacto (correo institucional y/o teléfono).

## Historia de usuario

**Como** estudiante,  
**quiero** consultar el directorio de orientadores y psicólogos con su ubicación, horario y contacto,  
**para** saber a quién dirigirme y en qué momento puedo acercarme o escribir.

## Criterios de aceptación

**CA1 – Acceso sin iniciar sesión**  
**Dado** que el usuario no ha iniciado sesión,  
**cuando** entra a la sección “Directorio” (o “Contactos”),  
**entonces** el sistema muestra el listado del personal de orientación y psicología.

**CA2 – Datos visibles por persona**  
**Dado** que existen personas registradas en el directorio,  
**cuando** el usuario consulta el listado,  
**entonces** para cada persona se muestran: nombre completo, cargo o área de atención, ubicación física (edificio y planta), horario de atención y al menos un medio de contacto.

**CA3 – Medios de contacto sin campos vacíos**  
**Dado** que una persona tiene solo correo, solo teléfono, o ambos,  
**cuando** el usuario consulta su información,  
**entonces** el sistema muestra únicamente los medios registrados (sin dejar espacios vacíos del medio faltante).

**CA4 – Ficha de detalle**  
**Dado** que el usuario está en el listado del directorio,  
**cuando** selecciona a una persona,  
**entonces** el sistema muestra su ficha completa con los mismos datos, de forma legible.

**CA5 – Directorio vacío**  
**Dado** que no hay personas registradas,  
**cuando** el usuario entra a la sección “Directorio”,  
**entonces** se muestra el mensaje “No hay contactos disponibles por el momento”.

**CA6 – Error de conexión**  
**Dado** que el sistema no puede obtener los datos del servidor,  
**cuando** el usuario entra a la sección “Directorio”,  
**entonces** se muestra un mensaje de error de conexión.

**CA7 – Orden de visualización**  
**Dado** que existen varias personas registradas,  
**cuando** se muestra el listado,  
**entonces** las personas se presentan ordenadas alfabéticamente por nombre completo.
