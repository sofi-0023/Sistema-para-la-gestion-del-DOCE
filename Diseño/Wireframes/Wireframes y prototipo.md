# Wireframes y prototipo

Wireframes de alta fidelidad y prototipo navegable del sistema, hechos en Figma a partir de los requisitos funcionales y no funcionales refinados, sus casos de uso, historias de usuario y criterios de aceptación, y de los bocetos del equipo. Se usa la paleta 1c elegida por Laura.

| Recurso | Liga |
|---|---|
| Archivo de Figma (sistema de diseño y wireframes) | [Abrir en Figma](https://www.figma.com/design/qplL37YMxA1qUtEYYCtmRH/Wireframe-definitivo) |

El archivo tiene tres páginas:

| Página | Contenido |
|---|---|
| **Sistema** | Variables de color, estilos de texto, íconos y componentes |
| **Wireframes** | Sección **Público** (P01 a P09) y sección **Administración** (A01 a A18), con los estados que piden los criterios de aceptación |
| **Prototipo** | Copias de las pantallas conectadas entre sí, con tres puntos de inicio: estudiante en escritorio, estudiante en celular y personal del DOCE |

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
