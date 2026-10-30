# Guías y herramientas de diseño

## Guías de diseño que seguimos

### 1. Manual de Identidad UADY

La base institucional del diseño sale del [Manual de Identidad UADY](<../docs/bibliografía/Referencias Bibliográficas.md>):
- **Colores:** azul Pantone 295 C y dorado Pantone 1245 C. El manual permite usar el dorado como tinta suave al 20 %.
- **Tipografía institucional:** Lucida Bright, reservada a la firma institucional; para la interfaz se eligieron tipografías web con buena lectura.

### 2. Accesibilidad (WCAG 2.1, nivel AA)

Como el sitio trata de salud mental y debe usarse sin capacitación ([RNF01](<../Requisitos/Requisitos no funcionales/Requisitos no funcionales.md>)), todas las opciones de paleta se diseñaron para cumplir **contraste AA**. La paleta elegida supera ese mínimo con amplitud: tinta sobre blanco tiene un contraste de **18:1** y azul sobre blanco de **14.8:1**, cuando AA pide 4.5:1. El requisito que lo exige es [RNF06](<../Requisitos/Requisitos no funcionales/Requisitos no funcionales.md>).

### 3. Paleta y tipografía del DOCE

En el documento [Paletas y pares tipográficos](<Paletas DOCE.pdf>) se propusieron tres opciones (1a "Institucional sereno", 1b "Bienestar" y 1c "Claro y accesible"). **Laura eligió la 1c**, que en sus notas aparece como "V3. Claro y accesible", en la [reunión del 27 de octubre](<../docs/proceso/bitácoras/2026-10-27 Reunión con Laura (clienta).md>).

| Token | Color | Uso |
|---|---|---|
| `--background` | `#FFFFFF` | Fondo de las páginas |
| `--foreground` | `#0B1526` (tinta) | Texto principal |
| `--primary` | `#002855` (azul 295 C) | Barra superior, botones principales y títulos |
| `--secondary` | `#1F4E8C` (azul 70 %) | Elementos secundarios y enlaces |
| `--accent` | `#F4E9CF` (dorado 20 %), texto `#5C4409` | Avisos destacados, como la línea de ayuda |
| `--muted` | `#F1F3F6`, texto `#3A4352` | Fondos y textos de apoyo |
| `--border` | `#D6DBE3` | Bordes y divisores |
| `--ring` | `#C69214` (dorado) | Indicador de foco al navegar con teclado |

| Uso | Tipografía | Por qué |
|---|---|---|
| Títulos | Newsreader | Serif con carácter institucional |
| Texto e interfaz | Atkinson Hyperlegible | Diseñada para baja visión; máxima legibilidad en celular |

### 4. Logotipo

En la misma reunión, Laura eligió la versión del logo **solo con el delineado**, sin relleno, y pidió corregir la nariz del jaguar con una línea que termine de formarla. También detectó que en el nombre faltaba la palabra "Departamento": el nombre correcto es **Departamento de Orientación y Consejo Educativo**.

### 5. Guías de diseño de interfaz para el trabajo con IA

Para los bocetos hechos con apoyo de Claude se usaron guías de diseño de interfaz cargadas como *skills*, guardadas en [docs/Claude/SKILLS](../docs/Claude/SKILLS): `interface-design`, `ui-ux-pro-max`, `frontend-design`, `ui-styling` y `logo-design`. El historial de instrucciones está en [prompts.md](../docs/Claude/prompts.md).

## Herramientas

| Herramienta | Para qué se usó | Evidencia |
|---|---|---|
| **Figma** | Bocetos de RF01, RF08, RF09, RF10 y RF11 | Archivos SVG exportados de Figma en [Bocetos](Bocetos) |
| **SVG escrito con código** | Bocetos de RF02, RF03, RF04 y RF05 | Archivos SVG en [Bocetos](Bocetos) |
| **Claude** | Asistente para proponer pantallas a partir de la paleta y los casos de uso | [Historial de prompts](../docs/Claude/prompts.md) |
| **FigJam** | Diagrama de casos de uso | [Diagrama de casos de uso](<../Requisitos/Diagrama de casos de uso>) |
| **Discord** | Presentar y revisar los bocetos con el equipo | [Bitácora del 28 de octubre](<../docs/proceso/bitácoras/2026-10-28 Reunión de Scrum.md>) |

## Convenciones de los bocetos

- **Una carpeta por requisito** (`Bocetos/RF - 01`, `Bocetos/RF - 02`…), para que cada pantalla se rastree hasta su requisito.
- **Un archivo por pantalla y por estado:** además de la pantalla normal, se bocetan los estados que piden los casos de uso y los criterios de aceptación: vacío, error, confirmación y resultado. Por ejemplo, RF01 tiene "Calendario sin actividades", "Error de conexión" y "Actividad no disponible al abrirla".
- **Tamaños:** la mayoría de las pantallas de escritorio miden 1440 px de ancho; la vista de celular de la fotogalería mide 390 px.

## Pendientes

- Los bocetos de **RF06 y RF07** están en la rama `feature/gabo-integrante` y faltan en `entrega-2`.
- En `Bocetos/RF - 05` hay 6 archivos idénticos a los de RF04; solo `P02-A-directorio-publico` corresponde a RF05.
