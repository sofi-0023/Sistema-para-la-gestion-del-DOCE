## Requisito Funcional 14 - Inicio/cierre de sesión

RF14 - El sistema deberá permitir al administrador iniciar y cerrar sesión para acceder a las funciones de gestión de contenido.

## Historia de usuario

**Como** administrador del sistema,
**quiero** iniciar y cerrar sesión con mis credenciales,
**para** gestionar el contenido de manera segura.

## Criterios de aceptación

**CA1 – Inicio de sesión correcto**
**Dado** que el administrador está registrado,
**cuando** ingresa su usuario y contraseña correctos,
**entonces** accede al panel de administración.

**CA2 – Credenciales incorrectas**
**Dado** que una persona ingresa un usuario o una contraseña incorrectos,
**cuando** intenta iniciar sesión,
**entonces** se muestra el mensaje "Credenciales inválidas, intente de nuevo", sin indicar cuál de los dos datos es incorrecto,
**y** permanece en la pantalla de inicio de sesión.

**CA3 – Cancelar el inicio de sesión**
**Dado** que el administrador está en la pantalla de inicio de sesión,
**cuando** hace clic en "Cancelar",
**entonces** se limpian los campos y regresa a la pantalla principal.

**CA4 – Cerrar sesión**
**Dado** que el administrador tiene una sesión activa,
**cuando** selecciona "Cerrar sesión",
**entonces** la sesión se cierra y el sistema lo lleva al inicio público.

**CA5 – Sin acceso después de cerrar sesión**
**Dado** que el administrador cerró su sesión,
**cuando** intenta volver al panel (por ejemplo, con el botón "Atrás" del navegador),
**entonces** el sistema no le muestra el panel y le pide iniciar sesión.

**CA6 – Panel protegido**
**Dado** que una persona no ha iniciado sesión,
**cuando** intenta entrar directamente a la dirección del panel de administración,
**entonces** el sistema la lleva a la pantalla de inicio de sesión.
