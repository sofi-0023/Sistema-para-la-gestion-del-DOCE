# Requisito funcional - Calendario

## Requisito Asociado
* **RF01:** El sistema mostrará un calendario de eventos y avisos ya publicados, cuya fecha sea igual o posterior al día actual, indicando nombre, sede, fecha y hora de cada uno.

---

## Información General
| Campo | Descripción |
| :--- | :--- |
| **Nombre del Caso de Uso** | Calendario |
| **Código del Caso de Uso** | CU-01 |
| **Actor(es)** | Usuario principal |
| **Precondición** | El usuario debe haber entrado correctamente a la página de inicio del sistema, posteriormente debió entrar a la pestaña llamada "calendario". |

## Objetivo
El usuario debe poder acceder al calendario y visualizar todas las actividades disponibles, así como sus datos; nombre, cede, fecha y hora de cada uno.

---

## Flujo Principal
| Acción Actor | Acción Sistema |
| :--- | :--- |
| 1. El usuario selecciona la pestaña de "calendario". | 1. El sistema muestra el calendario con todas las actividades y su información. |
| 2. El usuario hace click en alguna actividad disponible. | 2. El sistema despliega una pestaña con toda la información de dicha actividad, filtrando o mostrando únicamente las actividades cuya fecha sea igual o posterior al día actual; nombre, sede, fecha y hora. |
| 3. El usuario cierra la pestaña con la información haciendo click en el botón de "cerrar". | 3. El sistema automáticamente cierra la pestaña y muestra el calendario de nuevo. |
| 4. El administrador quiere ingresar actividades. | El sistema despliega un menú para que el administrador pueda ingresar toda la información solicitada; nombre, cede, fecha y hora. |

---

## Flujos Alternativos
* **Flujo Alternativo 1:** 
  * *No hay eventos para mostrar* -> 1) El calendario aparecerá vacío. 2) Debajo del calendario aparecerá el mensaje "No hay eventos para mostrar".
* **Flujo Alternativo 2:** 
  * *El servidor no se pudo conectar* -> 1) El usuario se mantiene en la pestaña de "calendario". 2) En la pantalla se muestra el mensaje "no se pudo conectar con los servidores, intenta de nuevo más tarde".
* **Flujo Alternativo 3:** 
  * *El usuario hace click en una actividad editada o eliminada* -> 1) El sistema cierra el menú de la actividad y regresa al usuario a la pestaña de "calendario". 2) El sistema muestra el mensaje "La actividad ha sido editada o eliminada, intente de nuevo más tarde".
* **Flujo Alternativo 4:** 
  * *El administrador ha editado la fecha de la actividad* -> 1) El sistema pregunta que es lo que se va a editar y abre el menú de edición. 2) posterior al cambio, el sistema mueve de cuadro la actividad al cuadro del día que le corresponda a la edición.
* **Flujo Alternativo 5:** 
  * *El administrador quiere eliminar una actividad* -> 1) El sistema despliega un menú para la edición/ eliminación de la actividad, el administrador hace click en "eliminar actividad". 2) El sistema elimina la actividad y muestra el mensaje "Actividad eliminada con éxito".

---

## Cierre
| Campo | Descripción |
| :--- | :--- |
| **Poscondición** | El usuario consultó todas las actividades disponibles y sus datos; indicando nombre, sede, fecha y hora de cada uno. |
| **Frecuencia** | Siempre |
| **Importancia** | Proceso indispensable para la consulta de actividades propuestas por el DOCE. |

## Trazabilidad
* **Requisito(s) relacionado(s):** RF01
* El caso de uso aparece en el diagrama (`docs/diagramas de casos de uso`)
