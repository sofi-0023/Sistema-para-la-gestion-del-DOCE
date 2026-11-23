## Requisito Funcional 11 - Inicio y cierre de sesión

RF11 – El sistema deberá permitir al administrador iniciar y cerrar sesión con sus credenciales para acceder a las funciones de gestión de contenido.

## Historia de usuario

**Como** administrador del sistema (personal del DOCE),
**quiero** iniciar y cerrar sesión con mis credenciales,
**para** gestionar el contenido de manera segura y que nadie sin autorización pueda modificarlo.

## Criterios de aceptación

**CA1 – Inicio de sesión correcto**
**Dado** que el administrador está registrado y su cuenta no está bloqueada,
**cuando** ingresa su usuario y contraseña correctos,
**entonces** accede al panel de administración.

**CA2 – Credenciales incorrectas**
**Dado** que una persona ingresa un usuario o una contraseña incorrectos,
**cuando** intenta iniciar sesión,
**entonces** se muestra el mensaje «Credenciales inválidas, intente de nuevo», sin indicar cuál de los dos datos es incorrecto,
**y** permanece en la pantalla de inicio de sesión.

**CA3 – Campos vacíos**
**Dado** que una persona deja vacío el usuario, la contraseña o ambos,
**cuando** selecciona «Iniciar sesión»,
**entonces** el sistema no envía los datos e indica qué campo falta llenar.

**CA4 – Bloqueo por intentos fallidos**
**Dado** que se han hecho 5 intentos fallidos seguidos con la misma cuenta,
**cuando** se intenta iniciar sesión otra vez,
**entonces** la cuenta queda bloqueada durante 15 minutos
**y** el sistema informa que podrá intentarlo de nuevo cuando termine ese tiempo.

**CA5 – Cancelar el inicio de sesión**
**Dado** que el administrador está en la pantalla de inicio de sesión,
**cuando** hace clic en «Cancelar»,
**entonces** se limpian los campos y regresa al inicio público.

**CA6 – Cerrar sesión**
**Dado** que el administrador tiene una sesión activa,
**cuando** selecciona «Cerrar sesión» en la barra lateral,
**entonces** la sesión se cierra y el sistema lo lleva al inicio público.

**CA7 – Cierre por inactividad**
**Dado** que el administrador tiene una sesión activa,
**cuando** pasan 30 minutos sin actividad,
**entonces** la sesión se cierra sola
**y** en su siguiente acción el sistema lo lleva a la pantalla de inicio de sesión.

**CA8 – Sin acceso después de cerrar sesión**
**Dado** que el administrador cerró su sesión,
**cuando** intenta volver al panel (por ejemplo, con el botón «Atrás» del navegador),
**entonces** el sistema no le muestra el panel y le pide iniciar sesión.

**CA9 – Panel protegido**
**Dado** que una persona no ha iniciado sesión,
**cuando** intenta entrar directamente a la dirección del panel de administración,
**entonces** el sistema la lleva a la pantalla de inicio de sesión.

**CA10 – Error de conexión**
**Dado** que el sistema no puede conectarse con el servidor,
**cuando** el administrador intenta iniciar sesión,
**entonces** permanece en la pantalla y se muestra el mensaje «No se pudo conectar con los servidores, intenta de nuevo más tarde».
