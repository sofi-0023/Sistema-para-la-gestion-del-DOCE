# Prototipo HTML

Prototipo navegable del Sistema para la gestión del DOCE (issue #76). Sirve para pruebas informales de usabilidad.

## Cómo abrirlo

Doble clic en `index.html`. No necesita servidor ni instalación. Sin internet usa fuentes del sistema.

## Direcciones útiles

| Para qué | Dirección |
|---|---|
| Cambiar el día que se toma como "hoy" (por omisión, 9 de noviembre de 2026) | `index.html?hoy=2026-11-14#/calendario` |
| Forzar un estado de pantalla | `index.html#/calendario?estado=vacio` o `index.html?estado=vacio#/calendario` |
| Acortar el cierre por inactividad (segundos) | `index.html?inactividad=10#/acceso` |
| Catálogo de componentes (solo revisión) | `index.html#/componentes` |

Los cambios se guardan en `localStorage`. El botón **Restablecer datos de ejemplo** (pie de página y barra lateral) los descarta.

Credenciales de ejemplo: `admin@doce.uady.mx` / `Doce2026`.

## Estructura

| Carpeta | Contenido |
|---|---|
| `css/` | `tokens.css` es la única fuente de colores y tipografía |
| `js/` | Configuración, datos de ejemplo, almacenamiento, sesión, componentes y navegación |
| `js/publico/`, `js/admin/` | Una pantalla o sección por archivo |
| `img/` | Copias del logotipo de `Diseño/Logotipo/` |
