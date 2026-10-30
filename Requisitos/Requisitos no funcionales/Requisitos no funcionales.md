## **Requisitos no funcionales**

Cada requisito no funcional indica su categoría según el modelo de calidad **ISO/IEC 25010:2023**, un **criterio medible** y **cómo se verifica**. Si no se puede medir, no es un requisito sino un deseo, así que cada uno tiene un número o una condición que se cumple o no se cumple.

La prioridad de cada uno está justificada en [Priorización de requisitos](<../Priorización de requisitos.md>).

| ID | Nombre | Categoría ISO/IEC 25010 | Prioridad |
|---|---|---|---|
| RNF01 | Usabilidad | Capacidad de interacción | Must |
| RNF02 | Compatibilidad | Compatibilidad · Flexibilidad | Must |
| RNF03 | Mantenibilidad | Mantenibilidad | Must |
| RNF04 | Seguridad | Seguridad | Must |
| RNF05 | Rendimiento | Eficiencia de desempeño | Should |
| RNF06 | Accesibilidad | Capacidad de interacción (inclusividad) | Should |

---

# RNF01 - Usabilidad

**Categoría:** Capacidad de interacción (aprendibilidad y operabilidad).

**Descripción:** El sistema deberá poder usarse sin capacitación previa, tanto por el estudiantado como por el personal del DOCE.

**Criterio de aceptación:**
- En una prueba con al menos **5 estudiantes** que no conocen el sitio, al menos el **80 %** completa sin ayuda estas tareas:
  - encontrar el detalle (lugar, fecha y hora) de la próxima actividad;
  - encontrar el horario y la ubicación de un orientador o psicólogo.
- Cada tarea se completa en **3 clics o toques como máximo** desde la página de inicio y en **60 segundos o menos**.
- Una persona del DOCE, sin manual, crea y publica una actividad completa en **3 minutos o menos**.

**Cómo se verifica:** prueba de usabilidad con tareas cronometradas (ver punto 3.5 de la entrega, simulación de una tarea).

# RNF02 - Compatibilidad

**Categoría:** Compatibilidad · Flexibilidad (adaptabilidad).

**Descripción:** El sitio deberá verse y funcionar correctamente en los navegadores y dispositivos que usa el estudiantado.

**Criterio de aceptación:**
- Funciona en las **dos versiones estables más recientes** de Google Chrome, Mozilla Firefox, Apple Safari y Microsoft Edge. Opera y Brave quedan cubiertos porque usan el mismo motor que Chrome.
- En cualquier ancho de pantalla entre **360 px (celular) y 1920 px (escritorio)**:
  - no aparece desplazamiento horizontal;
  - ningún texto, botón o imagen queda cortado o encimado;
  - todas las funciones están disponibles, no solo en escritorio.

**Cómo se verifica:** lista de cotejo que recorre cada página en los 4 navegadores y en tres anchos: 360 px, 768 px y 1366 px.

# RNF03 - Mantenibilidad

**Categoría:** Mantenibilidad (modificabilidad).

**Descripción:** El personal del DOCE deberá poder mantener actualizado todo el contenido del sitio sin modificar el código fuente.

**Criterio de aceptación:**
- Desde el panel de administración se puede **crear, editar y retirar** cada tipo de contenido: actividades, avisos, directorio del DOCE y sus horarios, líneas de ayuda, material informativo, fotogalería, y contactos de tutorías y guías de carrera.
- Ningún cambio de contenido requiere editar código, desplegar de nuevo el sitio ni pedir ayuda a un desarrollador.
- Un cambio publicado desde el panel es visible para el público en **1 minuto o menos**.

**Cómo se verifica:** lista de cotejo con un caso de prueba por tipo de contenido (crear, editar y retirar), cronometrando cuánto tarda en verse el cambio.

> **Pendiente del equipo:** hoy ningún requisito funcional cubre la edición del **directorio (RF05)** ni de los **contactos de tutorías y guías (RF10)** desde el panel. Para cumplir este RNF hay que agregar esa gestión a los requisitos funcionales.

# RNF04 - Seguridad

**Categoría:** Seguridad (confidencialidad, integridad y autenticidad).

**Descripción:** Solo los administradores autenticados podrán crear, editar o retirar contenido.

**Criterio de aceptación:**
- Ninguna página ni acción del panel de administración es accesible sin una sesión iniciada. Al intentarlo, el sistema lleva a la pantalla de inicio de sesión.
- Las contraseñas se guardan **cifradas con una función de hash** (por ejemplo, bcrypt), nunca en texto plano.
- Toda la comunicación con el sitio usa **HTTPS**.
- La sesión se cierra sola después de **30 minutos sin actividad**.
- Después de **5 intentos fallidos** de inicio de sesión seguidos, la cuenta se bloquea **15 minutos**.
- El mensaje de error de inicio de sesión no revela si lo incorrecto fue el usuario o la contraseña.

**Cómo se verifica:** pruebas de acceso directo a las direcciones del panel sin sesión, revisión de cómo se guardan las contraseñas, y pruebas de expiración de sesión y de intentos fallidos.

# RNF05 - Rendimiento

**Categoría:** Eficiencia de desempeño (comportamiento temporal).

**Descripción:** Las páginas públicas deberán cargar rápido en un celular con datos móviles.

**Criterio de aceptación:**
- En las páginas de **inicio, calendario y directorio**, el contenido principal se muestra en **2.5 segundos o menos** (métrica *Largest Contentful Paint*, LCP).
- La medición se hace en modo celular con la red **4G simulada** de Lighthouse, tomando la **mediana de 3 mediciones** por página.
- Cada una de esas páginas obtiene **80 puntos o más** en la categoría de rendimiento de Lighthouse.

**Cómo se verifica:** Lighthouse (herramientas de desarrollador de Chrome o PageSpeed Insights) en las tres páginas, con el resultado guardado como evidencia.

# RNF06 - Accesibilidad

**Categoría:** Capacidad de interacción (inclusividad).

**Descripción:** El sitio deberá poder usarse por personas con baja visión o que navegan solo con teclado, en línea con las decisiones de la paleta 1c "Claro y accesible".

**Criterio de aceptación:**
- El contraste entre texto y fondo es de al menos **4.5:1** en texto normal y **3:1** en texto grande, según el nivel AA de WCAG 2.1.
- Todas las funciones se pueden usar **solo con teclado** y el elemento seleccionado siempre se ve resaltado.
- Todas las imágenes informativas, incluidas las de la fotogalería, tienen **texto alternativo**.
- El texto de lectura usa un tamaño de **16 px o más**.

**Cómo se verifica:** categoría de accesibilidad de Lighthouse con **90 puntos o más** en cada página, revisión del contraste de la paleta y un recorrido completo usando solo el teclado.

---

## Cambios respecto a la entrega 1

| Requisito | Entrega 1 | Entrega 2 | Por qué cambió |
|---|---|---|---|
| RNF01 | "Interfaz simple, clara e intuitiva", sin forma de medirlo | Tareas concretas con porcentaje de éxito, número de clics y tiempo máximo | "Intuitivo" no se puede comprobar; ahora se verifica con una prueba de usabilidad |
| RNF02 | Lista de navegadores sin versiones; "diseño responsivo" sin definir | Dos versiones más recientes por navegador y anchos de 360 px a 1920 px con condiciones verificables | Sin versiones ni anchos no hay forma de decir si se cumple |
| RNF03 | "De manera efectiva y eficiente" | Lista de cada tipo de contenido editable desde el panel y tiempo máximo para verse publicado | Se volvió verificable con un caso de prueba por tipo de contenido |
| RNF04 | "Iniciar sesión de forma segura" | Acceso solo con sesión, contraseñas cifradas, HTTPS, expiración de sesión y bloqueo por intentos | "De forma segura" no decía qué medidas se esperan |
| RNF05 | "Tiempo de carga del dominio web" ≤ 3 s en "condiciones habituales" de 4G | LCP ≤ 2.5 s medido con Lighthouse en tres páginas concretas | Un dominio no "carga"; "condiciones habituales" era ambiguo; ahora hay métrica, herramienta y páginas definidas |
| RNF06 | No existía | Contraste AA, uso con teclado, texto alternativo y tamaño de letra | La paleta 1c se eligió por accesibilidad; hacía falta un requisito que lo exija y lo verifique |
