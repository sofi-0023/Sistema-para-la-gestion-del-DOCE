# Decisiones del prototipo

Decisiones tomadas al construir cuando los documentos no eran claros (se eligió la opción más simple) y diferencias con las capturas. Cuando una captura contradice un criterio de aceptación, manda el criterio.

## Generales

| # | Decisión | Por qué |
|---|---|---|
| 1 | "Hoy" es el lunes 9 de noviembre de 2026; se cambia con `?hoy=AAAA-MM-DD` | Coincide con las capturas y todos los participantes ven lo mismo |
| 2 | La franja de ayuda queda pegada al borde inferior en todas las páginas públicas | RF06.2 la pide visible desde cualquier parte; en las capturas va al final y falta en algunas |
| 3 | La franja no dice «confidencial» | RF06.1 no registra ese dato |
| 4 | Hay dos líneas destacadas (Línea de la Vida y SAPTEL) | Lo pide la guía del prototipo |
| 5 | Foco dorado con un anillo azul | El dorado solo da 2.8:1 sobre blanco |
| 6 | Barra de administración azul-295 | Lo dice el documento de estilo; la captura es blanca |
| 7 | Se conservan correos y teléfonos de las capturas | Son de ejemplo; en la prueba se interceptan |
| 8 | Un solo `index.html` para público y administración; `admin.html` solo redirige al panel | Mismas rutas y sesión sin duplicar código. La guía propone `estilos.css` y `estados.js`; aquí el CSS se separa por zona y los estados los maneja `rutas.js` |
| 9 | Restablecer datos no cierra la sesión | Solo cambia el contenido |
| 10 | El texto de lectura mide 16 px o más y el de 14 px se limita a etiquetas | RNF06; varias capturas usan 14 px |
| 11 | No hay hash de contraseñas ni HTTPS | No se pueden demostrar en archivos locales (RNF04). La sesión es una simulación en el navegador |

## Inicio, calendario y detalle (RF01, RF02)

| # | Decisión | Por qué |
|---|---|---|
| 12 | El calendario no muestra avisos | RF01 habla solo de actividades; los avisos tienen su espacio en Inicio (RF03-B E6) |
| 13 | «De hoy en adelante» usa la fecha de inicio, sin hora | RF01 habla de fecha |
| 14 | Inicio muestra las actividades canceladas con su etiqueta | RF04.2. Nunca aparecen como «Próxima actividad» |
| 15 | Actividad no disponible: diálogo sobre el calendario y, al volver, el mensaje en el calendario | Concilia RF01 CA8 con RF02 E5 |
| 16 | Al cerrar un detalle abierto desde Inicio se llega al calendario | CU-02 paso 3 |
| 17 | En pantallas angostas, la vista Mes marca los días y sus actividades salen debajo; en celular se abre en Lista | RNF02: todas las funciones disponibles |

## Directorio, líneas y acceso (RF05, RF06, RF11)

| # | Decisión | Por qué |
|---|---|---|
| 18 | El orden alfabético no cuenta el grado académico (Mtra., Psic.) | RF05 CA7 dice «por nombre completo» |
| 19 | Los cuatro ámbitos van separados y en orden universitario, local, estatal, nacional | RF06 CA1 y CA3; las capturas juntan locales y estatales |
| 20 | Una línea con `[Número]` no tiene botón Llamar, y va después de las confirmadas | No hay a dónde llamar |
| 21 | Se puede eliminar una línea destacada, con advertencia | RF06.5 y RF06 CA16; CU-06.4 FA04 («esencial») lo impide |
| 22 | Una línea parecida nunca se guarda hasta cambiar nombre o teléfono | RF06 CA8: no crear duplicados automáticamente |
| 23 | Parecida = mismo nombre, mismo teléfono, o un nombre dentro de otro en el mismo ámbito | El criterio no define «similar» |
| 24 | RF06 CA21 se muestra al abrir una operación de líneas sin sesión | Solo existe un rol |
| 25 | El teléfono lleva 10 dígitos con extensión opcional | A12 pide 10 dígitos y A08 usa extensión |
| 26 | Cerrar sesión lleva a Inicio con el mensaje «Cerraste sesión» | RF11 CA6; la captura A18 lleva al acceso |
| 27 | Textos del acceso como en las capturas («Acceso DOCE», «Acceso para el personal del DOCE») | CU-14 usa otros, pero ningún criterio los exige |
| 28 | El quinto intento fallido ya muestra el bloqueo | RF11 CA4 |

## Actividades y avisos (RF03, RF04)

| # | Decisión | Por qué |
|---|---|---|
| 29 | Aviso con «Vigente hasta» opcional al crear y editar; sin vigencia, la fecha de referencia es la de publicación | RF04.1 CA2 la pide «según RF03», que solo tiene título y contenido |
| 30 | Un aviso publicado con vigencia vencida deja de mostrarse; sin vigencia se muestra hasta cancelarlo | Igual que el anterior |
| 31 | La fecha de inicio no puede ser anterior a hoy, y la finalización debe ser posterior al inicio | «Coherencia de los datos» |
| 32 | Crear y editar actividad son páginas completas; los demás formularios, paneles laterales | Capturas A04 y A06; el formulario es largo |
| 33 | Después de guardar un borrador de actividad se abre «Revisar» | Como en el prototipo de Figma; ayuda a la meta de 3 minutos |
| 34 | Mensajes «Publicación cancelada…» y «Esta publicación ya está cancelada» | RF04.2; CU-04.2 dice «Actividad» |
| 35 | Los borradores también tienen «Editar», y al editar hay fecha de finalización | RF04.1 CA1 y CA2; faltan en A03 y A06 |
| 36 | Un borrador no se cancela | RF04.2 habla de publicaciones en estado Publicado |

## Material, fotos y tutorías (RF07 a RF10)

| # | Decisión | Por qué |
|---|---|---|
| 37 | Selección con barra Actualizar / Eliminar, y los botones por elemento como atajo | RF08 CA4 y RF09 CA4; las capturas solo tienen botones por fila |
| 38 | Botones «Agregar», «Actualizar» y «Eliminar» | RF08 CA1 a CA3 y RF09 CA1 |
| 39 | Eliminar un material lo borra del sistema, tras confirmar «¿Eliminar permanentemente este material?». No hay estado «Retirado» ni «Volver a publicar» | Ni RF08 ni su caso de uso ni su historia de usuario mencionan retirar o volver a publicar (acordado con el responsable de RF08) |
| 40 | Fotogalería en cuadrícula | RF09 CA8; la captura es un carrusel |
| 41 | La descripción de la foto es obligatoria y sirve de texto alternativo | RF09 CA1 y RNF06 |
| 42 | De los archivos subidos (material y guías) se guardan nombre, formato y tamaño; las descargas son PDF de ejemplo | El navegador no tiene espacio para el contenido |
| 43 | Las fotos se reducen a 800 px | Igual que el anterior |
| 44 | El video es un reproductor simulado | Google Fonts es la única dependencia externa permitida |
| 45 | Directorio y tutorías se gestionan en el panel, sin captura | RNF03; ningún RF lo describe |
| 46 | Las fotos son recuadros con su texto alternativo | No hay fotografías de ejemplo |

## Modo de prueba

| # | Decisión | Por qué |
|---|---|---|
| 47 | T1, T2 y T3 preguntan el dato al pulsar «Terminé» sin haber llegado a la meta, y lo comprueban | Inicio y la lista del directorio ya muestran esos datos: sin la pregunta, T1 y T2 contarían como fallo aunque la persona los encontrara |
| 48 | El cronómetro se detiene al pulsar «Terminé», no al responder | Escribir la respuesta no es parte de la tarea |
| 49 | Al lograr la meta la barra lo indica y la persona pulsa «Continuar» | Puede leer la pantalla; el tiempo ya se detuvo |
| 50 | Cambiar de filtro o de mes no cuenta como otra pantalla en la ruta | Es la misma pantalla |
| 51 | La sesión del panel sigue abierta entre T5 y T6 | Es la misma persona; se cierra al empezar otra sesión |
| 52 | El límite de T6 (120 s) es una referencia del equipo | RNF01 solo fija límites para T1, T2 y T5; el de T3 y T4 usa 60 s y 3 clics |
| 53 | En celular, el encabezado se desplaza con la página durante la prueba | La barra de la tarea ya ocupa la parte superior |

## Lo que no se puede ver con el flujo normal

- Ninguna función «despublica» una actividad, así que RF01 CA8 y RF02 E5 se ven con `?estado=no-disponible` o con un identificador que no existe.
- RF05 CA5, RF06 CA2, RF07 CA4, RF09 CA9 y RF10 CA6 se ven con `?estado=vacio` o retirando todos los registros.
- Los errores de conexión y de guardado se ven con `?estado=error`.

## Numeración vieja en los nombres de las capturas

P03c (ahora RF02 E5 y E6), A04 (03-A E2 y E3), A05 (03-A E8), A07 (03-B E2), P08b (RF10 CA6 y CA7). El documento de wireframes menciona P09, que no existe como captura.
