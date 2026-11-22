## Requisito

RF03.4 – El sistema deberá permitir al administrador publicar un aviso previamente registrado como borrador para que los usuarios puedan consultarlo en el espacio destinado a los avisos.

## Caso de uso

| Campo | Descripción |
|---|---|
| **Nombre del Caso de Uso** | Publicar aviso |
| **Código del Caso de Uso** | CU-06 |
| **Actor(es)** | Administrador del sistema |
| **Precondición** | El administrador ha iniciado sesión, cuenta con permisos de publicación y existe un aviso registrado en estado «Borrador». |

### Objetivo

Publicar un aviso previamente guardado como borrador para comunicar información relevante a la comunidad estudiantil.

### Flujo principal

| Acción Actor | Acción Sistema |
|---|---|
| 1. Selecciona un aviso en borrador desde la administración de avisos. | 1. Muestra el título, contenido y la opción «Publicar». |
| 2. Revisa la información y selecciona «Publicar». | 2. Verifica que el aviso continúe en estado «Borrador» y que tenga título y contenido válidos. |
| | 3. Cambia el estado del aviso a «Publicado». |
| | 4. Hace visible el título y contenido en el espacio destinado a los avisos. |
| | 5. Confirma que el aviso se publicó correctamente. |

### Flujos alternativos

| Flujo | Acción Actor | Acción Sistema |
|---|---|---|
| **FA1 – Información incompleta o inválida** | 1) Intenta publicar un aviso que no tiene título o contenido válido. | 2) Informa qué datos requieren corrección y mantiene el aviso en estado «Borrador». |
| **FA2 – Aviso ya publicado** | 1) Intenta publicar un aviso que ya fue publicado anteriormente. | 2) Informa que el aviso ya está publicado y evita duplicar la operación. |
| **FA3 – Error de publicación** | 1) Intenta publicar el aviso. | 2) Si ocurre un error que impide completar la publicación, informa que no se realizó ningún cambio y mantiene el aviso como «Borrador», sin mostrarlo en el espacio público de avisos. |

### Cierre

| Campo | Descripción |
|---|---|
| **Poscondición** | El aviso queda en estado «Publicado» y visible para la comunidad en el espacio de avisos. Si ocurre un error, permanece como «Borrador». |
| **Frecuencia** | Cada vez que un aviso está listo para difundirse. |
| **Importancia** | Permite comunicar información relevante a la comunidad estudiantil. |
| **Comentarios** | La publicación no implica enviar notificaciones. |

## Trazabilidad

- **Requisito(s) relacionado(s):** RF03.4.
- **Pantalla(s) / boceto(s):**
  - Lista administrativa de avisos.
  - Revisar aviso.
  - Aviso publicado.
  - Error de publicación de aviso.
- [x] El caso de uso aparece en el diagrama (`docs/diagramas de casos de uso/`).