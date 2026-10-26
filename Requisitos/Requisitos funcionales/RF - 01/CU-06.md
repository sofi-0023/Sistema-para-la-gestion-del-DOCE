## requisito

RF06 - El sistema deberá permitir al administrador publicar un aviso previamente registrado como borrador para que los usuarios puedan consultarlo en el espacio de avisos.

## caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | publicar aviso |
| **Código del Caso de Uso** | CU-06 |
| **Actor(es)** | Administrador del sistema |
| **Precondición** | El administrador ha iniciado sesión, tiene permisos de publicación y existe un aviso en estado Borrador. |

### Objetivo

Publicar un aviso previamente guardado como borrador para comunicar información a la comunidad estudiantil.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1.Selecciona un aviso en borrador desde la administración de avisos.| 1.Muestra su información y la opción «Publicar». |
| 2.Revisa la información y selecciona «Publicar». | 2.Verifica que el aviso continúe en estado Borrador y tenga título y contenido válidos; Cambia el estado del aviso a Publicado; Hace visible el título y el contenido en el espacio de avisos; Confirma que el aviso se publicó correctamente. Todo en ese orden |

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 — Información incompleta o inválida** | El aviso no tiene título o contenido válido. | Informa qué datos requieren corrección y mantiene el aviso como Borrador. |
| **FA2 — Aviso ya publicado** | El aviso fue publicado antes de completar la operación. | Informa que ya está publicado y evita duplicarlo. |
| **FA3 — Error de publicación** | Ocurre un error que impide completar la publicación. | Informa el error y mantiene el aviso como Borrador, sin mostrarlo en el espacio público de avisos. |


### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** |El aviso queda en estado Publicado y visible para la comunidad en el espacio de avisos. |
| **Frecuencia** | Cada vez que un aviso está listo para difundirse. |
| **Importancia** | Permite comunicar información relevante a la comunidad estudiantil.> |
| **Comentarios** | la publicacion no implica enviar notificaciones |

## Trazabilidad

- **Requisito(s) relacionado(s):** RF03
- [ - ] El caso de uso aparece en el diagrama (`docs/diagramas de casos de uso/`)