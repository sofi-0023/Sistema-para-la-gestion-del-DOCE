# CLAUDE.md · Prototipo HTML del Sistema para la gestión del DOCE

## Qué es esto
Repositorio de documentación del proyecto integrador de FIS. La tarea actual es el issue #76:
un prototipo HTML navegable en `prototipo/` que sirve para pruebas informales de usabilidad.
Ignora `AGENTS.md`: es una plantilla de otro proyecto y no describe este repositorio.

## Fuentes de verdad (en este orden)
1. Criterios de aceptación de cada historia de usuario: `Requisitos/Requisitos funcionales/RF - XX/Historia de usuario RF - XX.md`
2. Casos de uso de cada carpeta `RF - XX` (flujos alternativos y excepciones = estados de pantalla).
   El caso de uso de RF05 está en `RF - 05/RF - 05.md`.
3. Requisitos: `Requisitos/Requisitos funcionales/Requisitos funcionales.md` y `Requisitos/Requisitos no funcionales/Requisitos no funcionales.md`
4. Estilo: `Diseño/Wireframes/Wireframes y prototipo.md` (tokens de color, tipografía, componentes, decisiones)
5. Pantallas: capturas en `Diseño/Wireframes/` (P = público, A = administración)
Las capturas son de la entrega 2. Si una captura contradice un criterio de aceptación, manda el criterio
y dímelo en tu respuesta.

## Reglas técnicas
- Solo HTML, CSS y JavaScript sin frameworks, sin paso de compilación y sin npm.
  Debe abrir con doble clic en `prototipo/index.html` (protocolo file://).
- Única dependencia externa permitida: Google Fonts (Newsreader y Atkinson Hyperlegible Next),
  con fuentes de respaldo del sistema si no hay internet.
- No uses `fetch` a archivos locales ni módulos ES (`type="module"`): fallan en file://.
  Carga los scripts con `<script src>` en orden.
- Navegación con hash (`#/calendario`). Cada pantalla y cada estado tiene su dirección.
- Estados forzables por URL: `?estado=vacio` y `?estado=error` en las secciones que los tienen.
- Persistencia solo en `localStorage`, con un botón para restablecer los datos de ejemplo.
- Colores y tipografía solo desde variables de `css/tokens.css`, con los valores de
  "Wireframes y prototipo.md". Nada de colores sueltos.
- Responsivo de 360 px a 1920 px sin desplazamiento horizontal (RNF02).
- Accesibilidad (RNF06): contraste AA, foco visible dorado (#C69214), todo usable con teclado,
  texto de lectura de 16 px o más, áreas de toque de 44 px o más, `alt` en imágenes, HTML semántico,
  etiquetas `<label>` en todos los campos, mensajes de error asociados al campo.
- El panel de administración no es accesible sin sesión: redirige al inicio de sesión (RNF04).
  Credenciales de ejemplo: admin@doce.uady.mx / Doce2026. El error no dice si falló el usuario o la contraseña.
- Textos de la interfaz en español, iguales a los de los wireframes y criterios de aceptación.
- Datos de ejemplo ficticios. Líneas de ayuda locales y estatales no confirmadas se muestran como `[Número]`.

## Modo de prueba de usabilidad
- Vive en `prueba.html`, `js/prueba.js` y `js/tareas.js`. No debe cambiar el comportamiento del prototipo
  cuando se abre sin modo de prueba.
- Las tareas se configuran solo en `js/tareas.js`. La encuesta de satisfacción va aparte, en Microsoft Forms.
- No se guardan nombres ni datos personales del participante, solo un código (P01, P02...).

## Cómo trabajar conmigo
- Antes de construir una pantalla, lista sus criterios de aceptación y di cómo cubrirás cada uno.
- Trabaja un bloque de pantallas a la vez. Al terminar, dime qué direcciones abrir para revisarlo.
- No hagas commit ni push. Yo reviso y hago commit.
- Escribe en español.