# Wireframes y prototipo

Wireframes de alta fidelidad y prototipo navegable del sistema, hechos en Figma a partir de los requisitos funcionales y no funcionales refinados, sus casos de uso, historias de usuario y criterios de aceptación, y de los [bocetos](<../Bocetos/Bocetos.md>) del equipo. Se usa la paleta 1c elegida por Laura.

| Recurso | Liga |
|---|---|
| Archivo de Figma (sistema de diseño y wireframes) | [Abrir en Figma](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo) |
| Prototipo: estudiante en escritorio | [Iniciar](<https://www.figma.com/proto/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?page-id=43%3A48&node-id=43-49&starting-point-node-id=43%3A49>) |
| Prototipo: estudiante en celular | [Iniciar](<https://www.figma.com/proto/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?page-id=43%3A48&node-id=43-2171&starting-point-node-id=43%3A2171>) |
| Prototipo: personal del DOCE (administración) | [Iniciar](<https://www.figma.com/proto/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?page-id=43%3A48&node-id=43-2464&starting-point-node-id=43%3A2464>) |

El archivo tiene tres páginas:

| Página | Contenido |
|---|---|
| **Sistema** | Variables de color, estilos de texto, íconos y componentes |
| **Wireframes** | Sección **Público** (P01 a P09) y sección **Administración** (A01 a A18), con los estados que piden los criterios de aceptación |
| **Prototipo** | Copias de las pantallas conectadas entre sí, con tres puntos de inicio |

## Estilo definido

Cada integrante bocetó con su propio estilo, así que para los wireframes se definió un solo estilo y se aplicó a todas las funcionalidades.

### Color (paleta 1c y tonos de apoyo)

| Grupo | Token | Valor | Uso |
|---|---|---|---|
| Texto | tinta | `#0B1526` | Texto principal |
| | tinta-2 | `#3A4352` | Texto secundario |
| | tinta-3 | `#5E6878` | Notas y metadatos |
| Marca | azul-295 | `#002855` | Títulos, botón principal, barra de administración |
| | azul-70 | `#1F4E8C` | Enlaces y acciones secundarias |
| | azul-bruma | `#E8EEF6` | Fondo de elementos seleccionados |
| | dorado | `#C69214` | Indicador de foco del teclado |
| | dorado-20 | `#F4E9CF` | Franja de ayuda y avisos |
| | dorado-texto | `#5C4409` | Texto sobre dorado |
| Superficie | papel | `#FFFFFF` | Tarjetas, paneles |
| | lienzo | `#F6F7F9` | Fondo de página |
| | apagado | `#F1F3F6` | Campos de formulario |
| Borde | linea / suave | `#D6DBE3` / `#E7EAF0` | Bordes y divisores |
| Estado | exito / exito-20 | `#1E6B4F` / `#E3F1EA` | Confirmaciones, "Publicado" |
| | error / error-20 | `#A3261E` / `#FBEAE8` | Errores, acciones de eliminar |

Los tonos de estado se agregaron a la paleta 1c para los mensajes de éxito y error. Todos los pares de texto y fondo cumplen contraste AA.

### Tipografía

| Estilo | Fuente | Tamaño |
|---|---|---|
| Display, Título 1 a 3 | Newsreader | 48, 39, 31, 25 |
| Título 4, cuerpo y etiquetas | Atkinson Hyperlegible Next | 20, 18, 16, 14 |

El texto de lectura mide 16 px o más.

### Componentes

Botón (primario, secundario, fantasma, peligro), insignia, sello de fecha, campo, área de texto, selector, alerta (éxito, error, aviso, información), estado vacío, encabezado público (escritorio y celular), pie, barra lateral de administración, franja de ayuda y 39 íconos de línea.

### Decisiones de diseño

- **Sello de fecha.** La fecha de cada actividad se muestra como un sello con mes y día, igual en el calendario, en el inicio y en el panel de administración.
- **Franja de ayuda siempre visible.** La Línea de la Vida aparece en el inicio y en las secciones públicas, con botón para llamar.
- **Una tarea por pantalla.** Los formularios de gestión se abren en un panel lateral sobre la lista, para no perder el contexto.
- **Las acciones que no se pueden deshacer piden confirmación**, con los datos del elemento afectado.
- **Lo cancelado no desaparece.** Las actividades canceladas siguen en el calendario con la insignia "Cancelada" hasta su fecha (RF04.2).
- **Cada operación muestra su resultado**: mensaje de éxito, de error o de elemento no disponible.
- **Profundidad con bordes.** Las sombras se reservan para paneles y diálogos.

## Correspondencia con los requisitos funcionales

| RF01 - Calendario | CU-01 | [P02 Calendario](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=11-44)<br>[P02b Sin actividades](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=11-321)<br>[P02c Error de conexión](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=11-557)<br>[P09b Calendario (celular)](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=17-121) |
| RF02 - Consultar detalle de actividad | CU-02 | [P03 Detalle presencial](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=12-44)<br>[P03b Virtual e híbrida](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=12-319)<br>[P03c No disponible y error](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=12-449)<br>[P09c Detalle (celular)](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=17-227) |
| RF03.1 - Crear actividad | CU-03.1 | [A04 Crear actividad con validación](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=19-300) |
| RF03.2 - Publicar actividad | CU-03.2 | [A05 Revisar y publicar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=26-381) |
| RF03.3 - Crear aviso | CU-03.3 | [A07 Crear aviso con validación](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=26-663) |
| RF03.4 - Publicar aviso | CU-03.4 | [A11 Revisar y publicar aviso](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=33-894) |
| RF04.1 - Editar actividad o aviso | CU-04.1 | [A06 Editar actividad](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=26-537) |
| RF04.2 - Cancelar o retirar | CU-04.2 | [A06b Confirmar cancelación](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=26-663)<br>[A03 Lista con actividad cancelada](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=19-67) |
| RF05 - Contactos y horarios | CU-05 | [P04 Directorio](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=13-44)<br>[P04b Ficha, sin contactos y error](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=13-308) |
| RF06 - Líneas de ayuda (consulta) | CU-06.1 | [P05 Líneas de ayuda](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=13-392)<br>[P01 Franja de ayuda en inicio](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=10-44) |
| RF06 - Líneas de ayuda (gestión) | CU-06.2 a CU-06.4 | [A08 Registrar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=28-576)<br>[A12 Modificar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=33-1114)<br>[A13 Eliminar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=33-1296)<br>[A13b Resultado](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=33-1439) |
| RF07 - Material informativo | CU-07.1, CU-07.2 | [P06 Catálogo](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=14-44)<br>[P06b Detalle](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=14-223)<br>[P06c Video, retirado y enlace roto](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=14-337) |
| RF08 - Gestionar material | CU-08 | [A09 Agregar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=28-780)<br>[A14 Actualizar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-1265)<br>[A15 Retirar](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-1447)<br>[A15b Resultado y no disponible](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-1596) |
| RF09 - Fotogalería (consulta) | CU-09 | [P07 Fotogalería](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=15-44)<br>[P07b Sin imágenes e imagen rota](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=15-175) |
| RF09 - Fotogalería (gestión) | CU-09 | [A16 Subir fotos](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-1775)<br>[A17 Editar foto](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-1973)<br>[A10 Eliminar foto](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=28-978)<br>[A17b Resultado y no disponible](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-2145) |
| RF10 - Tutorías y guías | CU-13 | [P08 Tutorías y guías](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=15-216)<br>[P08b Sin registros y error](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=15-390) |
| RF11 - Inicio y cierre de sesión | CU-14 | [A01 Iniciar sesión](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=18-44)<br>[A01b Credenciales inválidas](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=18-85)<br>[A18 Sesión cerrada](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=34-2348)<br>[A02 Panel](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo?node-id=18-154) |

## Correspondencia con los requisitos no funcionales

| RNF | Cómo lo atienden los wireframes |
|---|---|
| RNF01 - Usabilidad | Menú con las mismas secciones en todas las pantallas públicas; acciones con texto (no solo íconos); mensajes de error que dicen qué pasó y cómo corregirlo |
| RNF02 - Compatibilidad | Versión de escritorio (1440 px) y de celular (390 px) |
| RNF03 - Mantenibilidad | El personal del DOCE gestiona actividades, avisos, líneas de ayuda, material y fotos desde el panel, sin el equipo de desarrollo |
| RNF04 - Seguridad | La gestión solo es accesible después de iniciar sesión; cierre de sesión visible en la barra lateral |
| RNF05 - Rendimiento | Calendario por mes, material paginado y fotogalería en carrusel, para no cargar todo a la vez |
| RNF06 - Accesibilidad | Contraste AA, texto de 16 px o más, indicador de foco dorado, áreas de toque de 44 px o más y fuente diseñada para baja visión |

## Prototipo

El prototipo está en la página **Prototipo**. Al abrirlo se elige uno de los tres puntos de inicio.

| Flujo | Qué se puede hacer |
|---|---|
| 1. Estudiante (escritorio) | Navegar por todas las secciones del menú; abrir el detalle de una actividad desde el inicio o el calendario; abrir un material; ir a líneas de ayuda desde el botón de llamar; ir al acceso del personal |
| 2. Estudiante (celular) | Inicio, menú, calendario en lista y detalle de una actividad |
| 3. Personal del DOCE | Iniciar sesión; crear una actividad (al guardar la primera vez aparecen los errores de validación y al guardar de nuevo se pasa a revisar y publicar); publicar; editar y cancelar una actividad; publicar un aviso; registrar, modificar y eliminar líneas de ayuda; agregar, actualizar y retirar material; subir, editar y eliminar fotos; cerrar sesión |

Figma no valida formularios, así que los errores se simulan con pantallas: el primer intento de guardar lleva a la pantalla con el error y el segundo continúa el flujo.

Los nombres de personas, las actividades y los datos de contacto son de ejemplo. Las líneas de ayuda locales y estatales aparecen como `[Número]` hasta confirmar los datos con el DOCE.
