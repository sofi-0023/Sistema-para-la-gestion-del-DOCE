# Cobertura del prototipo

Revisión de los 124 criterios de aceptación de RF01 a RF11 y de los requisitos no funcionales.
Las direcciones se abren con `index.html` delante (por ejemplo, `index.html#/calendario`). Las de `#/admin` piden iniciar sesión.

**Cumple** = comprobado en el prototipo con el flujo normal. **Cumple (E)** = solo se puede provocar con un estado forzado en la dirección, porque depende de un fallo del servidor o de otra persona.
Todo es una simulación local: no hay servidor.

| RF | Criterios | Cumple | Cumple (E) |
|---|---|---|---|
| RF01 | 8 | 6 | 2 |
| RF02 | 6 | 4 | 2 |
| RF03-A | 12 | 9 | 3 |
| RF03-B | 9 | 6 | 3 |
| RF04.1 | 8 | 8 | 0 |
| RF04.2 | 7 | 7 | 0 |
| RF05 | 7 | 6 | 1 |
| RF06 | 22 | 18 | 4 |
| RF07 | 11 | 9 | 2 |
| RF08 | 7 | 7 | 0 |
| RF09 | 10 | 10 | 0 |
| RF10 | 7 | 6 | 1 |
| RF11 | 10 | 9 | 1 |
| **Total** | **124** | **105** | **19** |

## RF01 - Calendario

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Actividades próximas | P02 `#/calendario?vista=mes` y `?vista=lista` | Cumple |
| CA2 Sin actividades pasadas | `#/calendario` (no aparece «Feria de bienestar») · `index.html?hoy=2026-11-14#/calendario` | Cumple |
| CA3 Sin borradores | `#/calendario` (no aparece «Charla: pedir ayuda...») | Cumple |
| CA4 Abrir una actividad | `#/calendario` → `#/actividad/platica-dormir` | Cumple |
| CA5 Sin actividades | P02b `#/calendario?estado=vacio` · `index.html?hoy=2027-01-01#/calendario` | Cumple |
| CA6 Error de conexión | P02c `#/calendario?estado=error` | Cumple (E) |
| CA7 Cancelada | `#/calendario` (13 de noviembre) | Cumple |
| CA8 No disponible | `#/actividad/platica-dormir?estado=no-disponible` → Volver al calendario | Cumple (E) |

## RF02 - Detalle de actividad

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| E1 Consultar | P03 `#/actividad/platica-dormir` | Cumple |
| E2 Presencial | P03 `#/actividad/platica-dormir` | Cumple |
| E3 Virtual | P03b `#/actividad/grupo-apoyo` | Cumple |
| E4 Híbrida | P03b `#/actividad/taller-estres` | Cumple |
| E5 No disponible | P03c `#/actividad/platica-dormir?estado=no-disponible` | Cumple (E) |
| E6 Error | P03c `#/actividad/platica-dormir?estado=error` | Cumple (E) |

## RF03-A - Crear y publicar actividades

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| E1 Guardar borrador | A04 `#/admin/actividades/nueva` | Cumple |
| E2 Validar | A04 `#/admin/actividades/nueva` (guardar con campos vacíos) | Cumple |
| E3 Presencial | A04, modalidad Presencial | Cumple |
| E4 Virtual | A04, modalidad Virtual | Cumple |
| E5 Híbrida | A04, modalidad Híbrida | Cumple |
| E6 Cancelar registro | A04, botón Cancelar | Cumple |
| E7 Error al guardar | `#/admin/actividades/nueva?estado=error` | Cumple (E) |
| E8 Revisar | A05 `#/admin/actividades/charla-ayuda/revisar` | Cumple |
| E9 Publicar | A05, botón Publicar | Cumple |
| E10 Incompleta | `#/admin/actividades/charla-ayuda/revisar?estado=incompleta` (también pasa con un borrador cuya fecha ya pasó) | Cumple (E) |
| E11 Ya publicada | `#/admin/actividades/platica-dormir/revisar` | Cumple |
| E12 Error al publicar | `#/admin/actividades/charla-ayuda/revisar?estado=error` | Cumple (E) |

## RF03-B - Crear y publicar avisos

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| E1 Guardar borrador | A07 `#/admin/avisos/nuevo` | Cumple |
| E2 Validar (vacío o solo espacios) | A07 `#/admin/avisos/nuevo` | Cumple |
| E3 Cancelar registro | A07, botón Cancelar | Cumple |
| E4 Error al guardar | `#/admin/avisos/nuevo?estado=error` | Cumple (E) |
| E5 Revisar | A11 `#/admin/avisos/horario-extendido/revisar` | Cumple |
| E6 Publicar | A11, botón Publicar; se ve en `#/inicio` | Cumple |
| E7 Incompleto | `#/admin/avisos/horario-extendido/revisar?estado=incompleto` | Cumple (E) |
| E8 Ya publicado | `#/admin/avisos/inscripciones-grupo/revisar` | Cumple |
| E9 Error al publicar | `#/admin/avisos/horario-extendido/revisar?estado=error` | Cumple (E) |

## RF04.1 - Editar

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Datos precargados | A06 `#/admin/actividades/pausa-activa/editar` · borrador `.../charla-ayuda/editar` · aviso `#/admin/avisos/inscripciones-grupo/editar` | Cumple |
| CA2 Campos según el tipo | Las mismas | Cumple |
| CA3 Guardar cambios | Las mismas, «Guardar cambios» | Cumple |
| CA4 Cambio de fecha | A06 y después `#/calendario` | Cumple |
| CA5 Validación | A06, lugar vacío u hora de fin anterior | Cumple |
| CA6 Cancelar la edición | A06, botón Cancelar; avisos, Cancelar, X o Esc | Cumple |
| CA7 Cancelada no se edita | `#/admin/actividades/cine-debate/editar` | Cumple |
| CA8 Solo administrador | `#/actividad/pausa-activa` sin opción de editar; sin sesión `#/admin/...` lleva al acceso | Cumple |

## RF04.2 - Cancelar

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Confirmación | A06b `#/admin/actividades/taller-mindfulness/cancelar` · `#/admin/avisos/inscripciones-grupo/cancelar` | Cumple |
| CA2 Resultado | Confirmar; se ve en `#/calendario?mes=2026-12` | Cumple |
| CA3 Después de la fecha | `index.html?hoy=2026-11-14#/calendario` (ya no está «Cine-debate») | Cumple |
| CA4 Sigue en el panel | `#/admin/actividades?filtro=cancelada` · `#/admin/avisos` | Cumple |
| CA5 Desistir | «No, conservar» | Cumple |
| CA6 Ya cancelada | `#/admin/actividades/cine-debate/cancelar` | Cumple |
| CA7 Solo administrador | Igual que RF04.1 CA8 | Cumple |

## RF05 - Directorio

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Sin iniciar sesión | P04 `#/directorio` | Cumple |
| CA2 Datos visibles | P04 `#/directorio` | Cumple |
| CA3 Solo medios registrados | `#/directorio/carlos-rivas` (solo correo) · `#/directorio/sofia-cauich` (solo teléfono) | Cumple |
| CA4 Ficha | P04b `#/directorio/laura-medina` | Cumple |
| CA5 Vacío | P04b `#/directorio?estado=vacio` | Cumple |
| CA6 Error de conexión | P04b `#/directorio?estado=error` | Cumple (E) |
| CA7 Orden alfabético | P04 `#/directorio` | Cumple |

## RF06 - Líneas de ayuda

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Catálogo por ámbito | P05 `#/lineas` | Cumple |
| CA2 Sin registros | `#/lineas?estado=vacio` | Cumple |
| CA3 Por clasificación | `#/lineas?ambito=universitario` · `local` · `estatal` · `nacional` | Cumple |
| CA4 Error al cargar | `#/lineas?estado=error` | Cumple (E) |
| CA5 Registro | A08 `#/admin/lineas/nueva` | Cumple |
| CA6 Campos incompletos | A08, guardar vacío | Cumple |
| CA7 Formato incorrecto | A08, teléfono «123» | Cumple |
| CA8 Duplicado | A08, nombre «Línea de la Vida» | Cumple |
| CA9 Cancelar con confirmación | A08, botón Cancelar | Cumple |
| CA10 Error al registrar | `#/admin/lineas/nueva?estado=error` | Cumple (E) |
| CA11 Modificación | A12 `#/admin/lineas/saptel/editar` | Cumple |
| CA12 Conserva lo no modificado | A12 | Cumple |
| CA13 Ya no existe | `#/admin/lineas/saptel/editar?estado=no-disponible` (o eliminarla en otra pestaña) | Cumple |
| CA14 Cancelar modificación | A12, botón Cancelar | Cumple |
| CA15 Error al modificar | `#/admin/lineas/saptel/editar?estado=error` | Cumple (E) |
| CA16 Confirmación | A13 `#/admin/lineas/linea-vida/eliminar` | Cumple |
| CA17 Eliminación | A13 y A13b | Cumple |
| CA18 Cancelar eliminación | A13, botón Cancelar | Cumple |
| CA19 Ya retirada | `#/admin/lineas/x/eliminar` (o eliminarla en otra pestaña) | Cumple |
| CA20 Error al eliminar | `#/admin/lineas/saptel/eliminar?estado=error` | Cumple (E) |
| CA21 Sin permisos | Sin sesión: `#/admin/lineas/saptel/editar` · `#/acceso?estado=sin-permisos` | Cumple |
| CA22 Sesión expirada | `index.html?inactividad=10#/acceso` y esperar · `#/acceso?estado=expirada` | Cumple |

RF06.2 (acceso rápido): franja en todas las páginas públicas. RF06.5 (advertencia de destacada): A13 de `linea-vida`.

## RF07 - Material informativo

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Catálogo | P06 `#/material` | Cumple |
| CA2 Sin descripción | `#/material` («Dormir bien también es estudiar») | Cumple |
| CA3 Muchos materiales | `#/material?pagina=2` · `?pagina=3` | Cumple |
| CA4 Vacío | `#/material?estado=vacio` | Cumple |
| CA5 Detalle | P06b `#/material/guia-crisis` | Cumple |
| CA6 Video | P06c `#/material/hablemos-bienestar` (reproducción simulada) | Cumple |
| CA7 Documento o folleto | `#/material/guia-crisis` · `#/material/cuidar-de-ti` | Cumple |
| CA8 Regresar | Botón Regresar del detalle | Cumple |
| CA9 Retirado | `#/material/hablemos-bienestar?estado=retirado` (o retirarlo en otra pestaña) · `#/material/protocolo-2025` | Cumple |
| CA10 Error de carga | `#/material?estado=error` · `#/material/guia-crisis?estado=error` | Cumple (E) |
| CA11 Enlace no disponible | `#/material/hablemos-bienestar?estado=enlace` | Cumple (E) |

## RF08 - Gestionar material

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Agregar | A09 `#/admin/material/nuevo` | Cumple |
| CA2 Actualizar | A14 `#/admin/material/hablemos-bienestar/editar` | Cumple |
| CA3 Eliminar | A15 `#/admin/material/guia-crisis/eliminar` | Cumple |
| CA4 Sin seleccionar | `#/admin/material`, Actualizar o Eliminar de la barra | Cumple |
| CA5 Cancelar | Cancelar en las tres | Cumple |
| CA6 Ya no disponible | `#/admin/material/duelo/editar?estado=no-disponible` (o retirarlo en otra pestaña) | Cumple |
| CA7 Solo administrador | Sin sesión: `#/admin/material` | Cumple |

## RF09 - Fotogalería

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Subir | A16 `#/admin/fotos/subir` | Cumple |
| CA2 Editar | A17 `#/admin/fotos/feria/editar` | Cumple |
| CA3 Eliminar una o varias | A10 `#/admin/fotos/eliminar?ids=feria,bienvenida` | Cumple |
| CA4 Sin seleccionar | `#/admin/fotos`, Actualizar o Eliminar de la barra | Cumple |
| CA5 Cancelar | Cancelar en las tres | Cumple |
| CA6 Ya no disponible | `#/admin/fotos/feria/editar?estado=no-disponible` (o eliminarla en otra pestaña) | Cumple |
| CA7 Sin iniciar sesión | P07 `#/fotogaleria` | Cumple |
| CA8 Se adapta a la pantalla | P07 `#/fotogaleria` a 360, 768 y 1366 px | Cumple |
| CA9 Vacía | P07b `#/fotogaleria?estado=vacio` | Cumple |
| CA10 Error al cargar | `#/fotogaleria?estado=error` · `?estado=parcial` (una imagen dañada lo provoca) | Cumple |

## RF10 - Tutorías y guías

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Acceso público | P08 `#/tutorias` | Cumple |
| CA2 Contactos y guías | P08 `#/tutorias` | Cumple |
| CA3 Detalle | `#/tutorias/patricia-canche` | Cumple |
| CA4 Descargar | `#/tutorias`, Descargar (PDF de ejemplo) | Cumple |
| CA5 Guía no disponible | `#/tutorias`, «Guía para elegir optativas» · `?estado=guia` | Cumple |
| CA6 Sin registros | P08b `#/tutorias?estado=vacio` | Cumple |
| CA7 Error de conexión | P08b `#/tutorias?estado=error` · `#/tutorias/patricia-canche?estado=error` | Cumple (E) |

## RF11 - Inicio y cierre de sesión

| Criterio | Pantalla y dirección | Estado |
|---|---|---|
| CA1 Inicio correcto | A01 `#/acceso` → A02 `#/admin` | Cumple |
| CA2 Credenciales incorrectas | A01b `#/acceso` · `?estado=invalidas` | Cumple |
| CA3 Campos vacíos | `#/acceso`, Iniciar sesión vacío · `?estado=campos` | Cumple |
| CA4 Bloqueo | 5 intentos fallidos · `#/acceso?estado=bloqueada` | Cumple |
| CA5 Cancelar | `#/acceso`, Cancelar | Cumple |
| CA6 Cerrar sesión | A18 `#/inicio?estado=sesion-cerrada` | Cumple |
| CA7 Inactividad | `index.html?inactividad=10#/acceso` | Cumple |
| CA8 Sin acceso después de cerrar | Cerrar sesión y «Atrás» | Cumple |
| CA9 Panel protegido | Sin sesión: `#/admin/actividades` | Cumple |
| CA10 Error de conexión | `#/acceso?estado=error` | Cumple (E) |

## Requisitos no funcionales

| RNF | Qué se comprobó | Falta |
|---|---|---|
| RNF01 | Detalle de la próxima actividad y directorio a 1 clic de Inicio; modo de prueba que mide éxito, tiempo y clics | Las pruebas con 5 estudiantes y con personal del DOCE |
| RNF02 | Todas las pantallas sin desplazamiento horizontal ni texto cortado a 360, 768, 1024, 1366 y 1920 px, en Chrome y Edge | Firefox y Safari |
| RNF03 | Crear, editar y retirar actividades, avisos, líneas, material, fotos, directorio, tutorías y guías; el cambio se ve de inmediato | Directorio y tutorías no tienen RF ni wireframe |
| RNF04 | Panel protegido, mensaje genérico, 5 intentos y 15 minutos, 30 minutos de inactividad | Hash de contraseñas y HTTPS: no se demuestran en un prototipo local |
| RNF05 | Sin librerías; catálogo paginado e imágenes con carga diferida | Lighthouse con 4G simulada |
| RNF06 | Contraste AA calculado, recorrido con teclado con foco visible y sin quedar tapado, textos alternativos, etiquetas, 16 px y áreas de 44 px | Lighthouse y prueba con lector de pantalla |

## Cómo se revisó

Recorrido automático con Chrome y Edge abriendo los archivos directamente (`file://`): cada criterio de la tabla, todos los enlaces internos, errores de consola, uso sin internet y captura de texto con HTML. Los scripts no forman parte del repositorio.
