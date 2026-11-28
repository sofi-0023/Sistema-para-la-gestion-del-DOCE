# Prototipo HTML

Prototipo navegable del Sistema para la gestión del DOCE (issue #76), para pruebas informales de usabilidad.
Se abre con doble clic: no necesita servidor ni instalación. Sin internet usa fuentes del sistema.

| Entrada | Archivo |
|---|---|
| Sitio público | `index.html` |
| Administración (`admin@doce.uady.mx` / `Doce2026`) | `admin.html` o «Acceso DOCE» |
| Prueba de usabilidad | `prueba.html` |

- [REVISION.md](REVISION.md): direcciones para revisar y pendientes.
- [COBERTURA.md](COBERTURA.md): cada criterio de aceptación con su dirección.
- [DECISIONES.md](DECISIONES.md): decisiones y diferencias con los wireframes.

## Estados por dirección

| Para qué | Ejemplo |
|---|---|
| Estado vacío o error de una sección | `index.html#/calendario?estado=vacio` · `index.html#/directorio?estado=error` |
| Error al guardar, publicar o eliminar | `index.html#/admin/actividades/nueva?estado=error` |
| Cambiar el día que se toma como "hoy" (9 de noviembre de 2026) | `index.html?hoy=2026-11-14#/calendario` |
| Acortar el cierre por inactividad, en segundos | `index.html?inactividad=10#/acceso` |
| Catálogo de componentes | `index.html#/componentes` |

Todos los estados están en COBERTURA.md. «Reintentar» quita el estado forzado.
Los cambios se guardan en el navegador (`localStorage`); **Restablecer datos de ejemplo** los descarta.

## Cómo correr una prueba

1. Abre `prueba.html`, escribe el código (P01, P02...), elige perfil y dispositivo, y «Comenzar sesión». Los datos se restablecen solos.
2. Entrega el equipo al participante: bienvenida, tareas y pregunta de facilidad. La encuesta de satisfacción se aplica aparte, en Microsoft Forms.
3. Al terminar, «Facilitador: ver resumen» para marcar si hubo ayuda y anotar.
4. En la pantalla del facilitador, **Descargar CSV** o **Descargar JSON** antes de cerrar. Los resultados solo están en ese navegador.

Para el perfil de personal, entrega las credenciales en papel. Si alguien cierra la página, al volver a abrir `prueba.html` la sesión se puede continuar.
Las llamadas, correos y enlaces externos no salen del prototipo durante la prueba.

**Tareas:** se editan solo en `js/tareas.js`.

## Estructura

| Carpeta | Contenido |
|---|---|
| `css/tokens.css` | Única fuente de colores y tipografía |
| `css/` | Base, componentes, público, administración y prueba |
| `js/` | Configuración, datos, almacenamiento, sesión, reglas, navegación y prueba |
| `js/publico/`, `js/admin/` | Una sección por archivo |

Si se agrega un script, hay que incluirlo en `index.html` y en `prueba.html`.
