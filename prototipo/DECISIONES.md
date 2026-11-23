# Decisiones del prototipo

Decisiones tomadas al construir cuando los documentos no eran claros. Se eligió la opción más simple.

## Generales

| # | Decisión | Por qué |
|---|---|---|
| 1 | "Hoy" es el lunes 9 de noviembre de 2026; se cambia con `?hoy=AAAA-MM-DD` | Coincide con las capturas y todos los participantes ven lo mismo |
| 2 | La franja de ayuda queda pegada al borde inferior en todas las páginas públicas | RF06.2 la pide visible desde cualquier parte; en las capturas queda al final de la página |
| 3 | La franja no dice «confidencial» | RF06.1 no registra ese dato |
| 4 | Hay dos líneas destacadas (Línea de la Vida y SAPTEL) | Lo pide la guía del prototipo |
| 5 | Foco dorado con un anillo azul | El dorado solo da 2.8:1 sobre blanco |
| 6 | Barra de administración azul-295 | Lo dice el documento de estilo; la captura es blanca |
| 7 | Se conservan correos y teléfonos de las capturas | Son de ejemplo; en el modo de prueba se interceptan para no llamar ni escribir a nadie |
| 8 | Un solo `index.html` para público y administración, separado en archivos por pantalla; `admin.html` solo redirige al panel | Mismas rutas y sesión sin duplicar código. La guía propone otros nombres de archivo |
| 9 | La confirmación para restablecer datos no cierra la sesión | Solo cambia el contenido |

## Inicio, calendario y detalle (RF01, RF02)

| # | Decisión | Por qué |
|---|---|---|
| 10 | El calendario no muestra avisos | RF01 habla solo de actividades; los avisos tienen su espacio en Inicio (RF03-B E6) |
| 11 | El filtro «de hoy en adelante» usa la fecha de inicio y no la hora | RF01 habla de fecha |
| 12 | Inicio muestra también las actividades canceladas, con su etiqueta | RF04.2: visibles en la vista pública. Nunca aparecen como «Próxima actividad» |
| 13 | Actividad no disponible: diálogo sobre el calendario y, al volver, el mensaje en el calendario | Concilia RF01 CA8 con RF02 E5 |
| 14 | Al cerrar un detalle abierto desde Inicio se llega al calendario | CU-02 paso 3 |
| 15 | Un aviso con vigencia vencida deja de mostrarse; sin vigencia se muestra hasta que se cancele | RF04.1 CA2 menciona la vigencia sin definirla |
