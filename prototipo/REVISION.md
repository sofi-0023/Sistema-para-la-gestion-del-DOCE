# Revisión del prototipo

Resumen para revisar el prototipo (issue #76). El detalle por criterio está en [COBERTURA.md](COBERTURA.md) y las decisiones en [DECISIONES.md](DECISIONES.md).

## Resultado

- **Criterios:** los 124 de RF01 a RF11 se cumplen; 19 solo se pueden ver con un estado forzado en la dirección (errores de servidor o cambios de otra persona).
- **Pruebas:** más de 1,100 comprobaciones automáticas por navegador en Chrome y Edge, sin fallos al final: 360 a 1920 px, teclado, contraste, sin internet y 206 direcciones sin enlaces rotos.

## Direcciones

Las que empiezan con `#` se abren con `index.html` delante. Las de `#/admin` piden iniciar sesión (`admin@doce.uady.mx` / `Doce2026`).

| Qué | Dirección |
|---|---|
| Prueba de usabilidad | `prueba.html` |
| Inicio y cierre de sesión | `#/inicio` · `#/inicio?estado=sesion-cerrada` |
| Calendario | `#/calendario` · `#/calendario?vista=lista` · `?mes=2026-12` · `?estado=vacio` · `?estado=error` |
| Detalle | `#/actividad/platica-dormir` · `#/actividad/grupo-apoyo` · `#/actividad/taller-estres` · `#/actividad/cine-debate` · `#/actividad/platica-dormir?estado=no-disponible` |
| Directorio | `#/directorio` · `#/directorio/laura-medina` · `#/directorio?estado=vacio` · `?estado=error` |
| Líneas de ayuda | `#/lineas` · `#/lineas?ambito=local` · `?estado=vacio` · `?estado=error` |
| Material | `#/material` · `#/material/guia-crisis` · `#/material/cuidar-de-ti` · `#/material/hablemos-bienestar` |
| Fotogalería y tutorías | `#/fotogaleria` · `#/fotogaleria?estado=parcial` · `#/tutorias` · `#/tutorias/patricia-canche` |
| Acceso | `#/acceso` · `#/acceso?estado=campos` · `invalidas` · `bloqueada` · `expirada` · `sin-permisos` · `error` |
| Panel | `admin.html` |
| Actividades | `#/admin/actividades` · `#/admin/actividades/nueva` · `.../charla-ayuda/revisar` · `.../pausa-activa/editar` · `.../pausa-activa/cancelar` · `.../cine-debate/editar` |
| Avisos | `#/admin/avisos` · `#/admin/avisos/nuevo` · `#/admin/avisos/horario-extendido/revisar` |
| Líneas (panel) | `#/admin/lineas` · `#/admin/lineas/nueva` · `#/admin/lineas/saptel/editar` · `#/admin/lineas/linea-vida/eliminar` |
| Resto del panel | `#/admin/material` · `#/admin/fotos` · `#/admin/directorio` · `#/admin/tutorias` |
| Otro día como «hoy» | `index.html?hoy=2026-11-14#/calendario` |

## Antes de las pruebas

1. **Tareas T1 y T2.** Inicio y la lista del directorio ya muestran la respuesta. Si alguien pulsa «Terminé» ahí, la barra pregunta el dato y lo comprueba. Las respuestas aceptadas están en `js/tareas.js`.
2. **Límites de T3, T4 y T6.** RNF01 no los fija; se usaron 60 s y 3 clics en T3 y T4, y 120 s en T6.
3. **Vigencia de avisos.** RF04.1 CA2 la pide y RF03 no la tiene; quedó opcional. Conviene corregir el requisito.
4. **Diferencias con las capturas.** La franja queda fija abajo, la fotogalería es cuadrícula y el calendario no lleva avisos, entre otras.

## Lo que no se comprobó

- Firefox, Safari, un celular físico, Lighthouse y lector de pantalla.
- Hash de contraseñas y HTTPS (RNF04): no se demuestran en archivos locales.
- Registro de prompts en `docs/Claude/prompts.md`: pendiente del equipo.
