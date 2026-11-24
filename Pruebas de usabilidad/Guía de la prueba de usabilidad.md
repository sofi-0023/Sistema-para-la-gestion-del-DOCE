# Guía de la prueba de usabilidad

Todo lo que el equipo necesita para diseñar, enviar y reportar la prueba informal de usabilidad del prototipo del Sistema para la gestión del DOCE (tercera entrega).

**Modalidad:** remota y sin moderador. Cada participante recibe un documento con el enlace al prototipo y las instrucciones, hace la prueba solo cuando le acomode y al final contesta la encuesta.

**Prototipo:** https://prototipo-doce.netlify.app · modo de prueba en `prueba.html` (carpeta `prototipo/`, issue #76)
**Fecha límite de la entrega:** lunes 30 de noviembre

## Contenido

1. [Qué vamos a hacer, en una página](#1-qué-vamos-a-hacer-en-una-página)
2. [Objetivo](#2-objetivo)
3. [Participantes](#3-participantes)
4. [Cómo funciona la prueba remota](#4-cómo-funciona-la-prueba-remota)
5. [Cómo escribir una tarea](#5-cómo-escribir-una-tarea)
6. [Tareas por requisito](#6-tareas-por-requisito)
7. [Plantilla de tarea](#7-plantilla-de-tarea)
8. [Documento para el participante](#8-documento-para-el-participante)
9. [Cómo recolectar los resultados](#9-cómo-recolectar-los-resultados)
10. [Encuesta final: SUS y preguntas abiertas](#10-encuesta-final-sus-y-preguntas-abiertas)
11. [Cómo analizar los resultados](#11-cómo-analizar-los-resultados)
12. [Cómo reportar](#12-cómo-reportar)
13. [Calendario y pendientes por integrante](#13-calendario-y-pendientes-por-integrante)

---

## 1. Qué vamos a hacer, en una página

- Hacemos **dos pruebas**: una con **estudiantes** y otra con **personal del DOCE** (rol administrador).
- La prueba es **remota y sin moderador**: nadie del equipo está presente. Le mandamos al participante un **documento** (sección 8) con el enlace y las instrucciones, y la persona la hace por su cuenta en unos **15 minutos**.
- Cada integrante convierte **sus RF en tareas**. Una tarea es una situación realista que el participante resuelve solo, sin que le digamos dónde dar clic.
- El prototipo ya trae un **modo de prueba** (`prueba.html`) que hace casi todo: muestra cada tarea, mide el tiempo y los clics, guarda por qué pantallas pasó, pregunta qué tan fácil fue, aplica la encuesta **SUS** y las **preguntas abiertas**, y al final genera un **archivo CSV** con todo.
- Al terminar, el participante **descarga el CSV y nos lo manda** por WhatsApp o correo. Eso es todo lo que tiene que regresar.
- **Meta: 5 respuestas completas por perfil**, que es lo que pide RNF01. Como en remoto siempre hay quien no responde, se invita a **7 u 8 por perfil**.
- Solo hay que **agregar las tareas que faltan** en `prototipo/js/tareas.js`.

## 2. Objetivo

> Evaluar la usabilidad del prototipo interactivo del sistema para la gestión del DOCE con estudiantes de la FMAT y con el personal de la coordinación del DOCE, midiendo si completan las tareas clave sin ayuda, en cuánto tiempo y qué tan satisfechos quedan.

Lo que queremos responder:

1. ¿Las personas completan las tareas de cada RF **sin ayuda**?
2. ¿Se cumplen los límites de **RNF01**? (ver abajo)
3. ¿En qué pantallas se confunden?
4. ¿Qué tan usable perciben el sitio? (puntuación SUS)

**Criterios de RNF01 que esta prueba comprueba:**

| Criterio | Meta |
|---|---|
| Encontrar lugar, fecha y hora de la próxima actividad (estudiante) | 80 % sin ayuda, ≤ 3 clics desde inicio, ≤ 60 s |
| Encontrar horario y ubicación de un orientador (estudiante) | 80 % sin ayuda, ≤ 3 clics desde inicio, ≤ 60 s |
| Crear y publicar una actividad completa (personal del DOCE, sin manual) | ≤ 3 minutos |

Estas tres tareas (T1, T2 y T5) **no se quitan** de la prueba. Una ventaja de la prueba remota: como nadie está presente, "sin ayuda" se cumple por diseño.

> **Prueba informal no es lo mismo que verificación.** En la verificación revisamos que el requisito esté bien escrito. Aquí vemos si una persona real logra usar lo que construimos. Por eso las tareas no son "comprueba el CA3", sino situaciones de la vida real.

## 3. Participantes

| Perfil | Quiénes | Invitar | Meta | Cómo reclutar |
|---|---|---|---|---|
| Estudiante | Estudiantes de cualquier licenciatura de la FMAT que **no hayan visto el prototipo** | 7 u 8 | 5 | Compañeros de otros grupos o semestres, por WhatsApp. No vale gente del equipo ni quien ya lo probó |
| Personal del DOCE (administrador) | Idealmente personal de la coordinación del DOCE. Si no se puede, profesores o personal administrativo que no conozcan el sitio | 5 o 6 | 5 (mínimo 3) | Por correo institucional, con el documento adjunto. Si usamos sustitutos, se dice en el reporte |

Reglas:

- **Computadora de preferencia.** El modo de prueba funciona en celular, pero descargar y mandar el CSV es más fácil desde computadora. Si alguien solo tiene celular, que lo haga ahí y use el plan B si no puede mandar el archivo (sección 9).
- Cada participante recibe un **código** que nosotros le asignamos (sección 4). **No guardamos nombres** en ningún registro.
- Una persona solo participa en un perfil.
- Pedirles que **no le cuenten las tareas** a otros participantes.

## 4. Cómo funciona la prueba remota

### Lo que hace el participante

1. Abre el documento que le mandamos y lee la bienvenida.
2. Entra a `https://prototipo-doce.netlify.app/prueba.html` **desde una ventana normal** (no de incógnito, porque ahí se puede perder lo que guarda).
3. Escribe su **código**, elige su **perfil** y su **dispositivo**, y pulsa **«Comenzar sesión»**.
4. Lee cada tarea, pulsa **«Empezar tarea»** y la resuelve en el sitio. Cuando termina, pulsa **«Terminé»**; si no puede, **«No pude terminarla»**.
5. Responde qué tan fácil fue cada tarea, la **encuesta SUS** y las **preguntas abiertas**.
6. En la pantalla de **«¡Muchas gracias!»** pulsa **«Facilitador: ver resumen»** y luego **«Descargar CSV»**.
7. Nos manda el archivo `prueba-doce.csv` por WhatsApp o correo.

### Lo que hace el equipo

| Quién | Qué hace |
|---|---|
| **Sofía** | Carga las tareas finales en `tareas.js`, publica el prototipo y prepara los dos documentos (estudiante y personal) a partir de la plantilla de la sección 8 |
| **Cada integrante** | Invita a sus participantes, les asigna código, les manda el documento, les recuerda si no han respondido y recibe su CSV |
| **Quien junte resultados** | Reúne los CSV en una hoja de cálculo por perfil para el análisis |

### Códigos

El modo de prueba solo acepta códigos con la letra **P y dos números**. Para que no se repitan, cada integrante usa su rango:

| Integrante | Estudiantes | Personal del DOCE |
|---|---|---|
| Sofía | P01 a P03 | P51 a P52 |
| Jennyfer | P04 a P06 | P53 a P54 |
| Daniel | P07 a P09 | P55 a P56 |
| Gabriel | P10 a P12 | P57 a P58 |
| Jahzeel | P13 a P15 | P59 a P60 |
| Rafael | P16 a P18 | P61 a P62 |

Cada quien lleva una lista privada (fuera del repositorio) de a quién le dio cada código, solo para saber a quién recordarle. Esa lista no se sube.

### Antes de mandar el documento

1. **Sesión piloto:** una persona que no sea del equipo hace la prueba completa **sola, desde su casa**, con el documento tal cual. Después le preguntamos qué no entendió. Se corrige y luego se manda a todos.
2. Revisar que `prueba.html` abra en Netlify y que las tareas nuevas ya aparezcan.
3. Revisar que el enlace del documento sea el correcto.

### Lo que perdemos sin moderador, y cómo lo compensamos

| Sin moderador no tenemos... | Lo compensamos con... |
|---|---|
| Ver dónde se trabó | La ruta de pantallas, las pantallas fuera de ruta y los errores de formulario que guarda el CSV |
| Escuchar lo que piensa | La pregunta de facilidad después de cada tarea y las preguntas abiertas |
| Aclarar una tarea confusa | Tareas muy claras y una sesión piloto obligatoria |
| Saber si hizo trampa o se distrajo | El tiempo de cada tarea: un tiempo muy largo se revisa aparte |

**Fecha simulada:** el prototipo toma como "hoy" el **9 de noviembre de 2026**. El documento del participante lo dice, para que "la próxima actividad" sea la misma para todos.

## 5. Cómo escribir una tarea

Una buena tarea:

- Es una **situación realista** con un motivo ("quieres", "necesitas", "te pidieron").
- Dice **qué** lograr, no **cómo** ni **dónde**.
- **No usa las palabras de la interfaz** (si el menú dice "Calendario", la tarea no dice "calendario").
- Tiene un **final claro**: el participante sabe cuándo terminó y nosotros podemos comprobarlo.
- Se resuelve en **1 a 3 minutos**.

### Ejemplo con RF01 (calendario)

| | Tarea |
|---|---|
| ❌ Mala | "Entra al sistema y visualiza el calendario de actividades; después abre la actividad '___' y ve su información." |
| ❌ Mala | "Da clic en Calendario y luego en la actividad del 12 de noviembre." |
| ❌ Mala | "¿Te parece fácil usar el calendario?" (es una opinión, no una tarea) |
| ✅ Buena | "Quieres ir a la próxima actividad del DOCE. Averigua dónde es, qué día y a qué hora." |
| ✅ Buena | "Esta semana tienes tiempo libre el viernes por la tarde. ¿Hay alguna actividad del DOCE ese día? ¿Sigue en pie?" |

Por qué la primera es mala: le dice al participante que existe un calendario y que hay que abrir la actividad. Si le damos los pasos, solo estamos probando que sabe leer instrucciones, no que el diseño se entiende.

**Cómo pasar de un RF a una tarea:**

1. Lee la historia de usuario: **¿para qué** lo quiere el usuario? Ese "para qué" es el escenario.
2. Elige **el resultado** que debería obtener (un dato, una acción hecha). Ese es el final de la tarea.
3. Escribe la situación en segunda persona, sin nombres de botones ni menús.
4. Define **cómo sabremos que lo logró**: llegó a una pantalla, dijo el dato correcto o el registro quedó guardado.
5. Dásela a leer a alguien del equipo. Si pregunta "¿y dónde le pico?", está bien. Si pregunta "¿qué tengo que hacer?", hay que reescribirla.

> **En la prueba remota nadie puede aclarar dudas.** La tarea tiene que entenderse sola, a la primera. Si una tarea necesita explicación, está mal escrita. Por eso la sesión piloto es obligatoria.

## 6. Tareas por requisito

Las tareas T1 a T6 **ya están cargadas** en el modo de prueba. Las marcadas como **propuesta** son ejemplos para que cada responsable las ajuste o las cambie. Revisa que la tarea funcione en el prototipo antes de proponerla.

Para que la sesión dure 15 a 20 minutos, cada perfil tiene **como máximo 6 tareas**. Si sobran propuestas, el equipo elige las más importantes (prioridad Must primero).

### Prueba con estudiantes

| ID | RF | Responsable | Tarea (lo que lee el participante) | Se logra cuando | Estado |
|---|---|---|---|---|---|
| T1 | RF01, RF02, RNF01 | Sofía, Jennyfer | Quieres ir a la próxima actividad del DOCE. Averigua dónde es, qué día y a qué hora. | Abre el detalle de «Plática: dormir bien también es estudiar» o responde Aula Magna, 12 de noviembre, 16:00 | Cargada |
| T2 | RF05, RNF01 | Daniel | Necesitas hablar con Andrea Mena Canul. Averigua en qué edificio está y en qué horario atiende. | Abre su ficha o responde el edificio y el horario | Cargada |
| T3 | RF06.2 | Gabriel | Una amiga está pasando por un momento muy difícil y necesitas un número al que llamar ahora mismo. | Llega a las líneas de ayuda o pulsa un número destacado | Cargada |
| T4 | RF07 | Gabriel | Busca un video sobre manejo del estrés y ábrelo. | Abre «Manejo del estrés: respira y organízate» | Cargada |
| E1 | RF01 | Sofía | Tienes libre la tarde del viernes 13 de noviembre. ¿Hay alguna actividad del DOCE ese día? ¿Puedes ir? | Responde que el cine-debate de ese día está **cancelado** | Propuesta |
| E2 | RF02 | Jennyfer | Quieres entrar al grupo de apoyo sobre ansiedad, pero no puedes ir a la facultad ese día. Averigua cómo te conectas. | Abre el detalle del grupo de apoyo y ubica el enlace | Propuesta |
| E3 | RF09 | Jahzeel | Un amigo te contó que el DOCE hizo un taller de manejo del estrés en octubre. Busca fotos de ese taller. | Abre la foto del taller en la fotogalería | Propuesta |
| E4 | RF10 | Rafael | Estudias Ingeniería de Software y quieres revisar qué materias y opciones tiene tu carrera. Consigue la guía de tu carrera. | Descarga la guía de Ingeniería de Software | Propuesta |

### Prueba con personal del DOCE (administrador)

| ID | RF | Responsable | Tarea (lo que lee el participante) | Se logra cuando | Estado |
|---|---|---|---|---|---|
| T5 | RF11, RF03.1, RF03.2, RNF01 | Rafael, Jennyfer | Eres parte del DOCE. Entra al sistema y publica la plática «Higiene del sueño» del 4 de diciembre a las 11:00 en el Auditorio, presencial, organizada por el DOCE. Usa el usuario y la contraseña que vienen en las instrucciones. | La actividad queda publicada con esos datos | Cargada |
| T6 | RF04.2 | Daniel | La actividad «Taller de mindfulness» se canceló. Indícalo en el sistema. | La actividad queda cancelada | Cargada |
| A1 | RF04.1 | Daniel | La «Pausa activa entre exámenes» del 25 de noviembre se movió a las 12:00. Actualiza la información para que los estudiantes no lleguen a la hora equivocada. | La actividad queda con hora 12:00 | Propuesta |
| A2 | RF03.3, RF03.4 | Jennyfer | Durante exámenes el DOCE atenderá hasta las 19:00. Avisa a los estudiantes. | Queda publicado un aviso con ese horario | Propuesta |
| A3 | RF06.3 | Gabriel | Te pasaron el número de una nueva línea estatal de atención en crisis. Agrégala para que los estudiantes la encuentren. (Los datos vienen en las instrucciones.) | La línea queda registrada en el ámbito estatal | Propuesta |
| A4 | RF08 | Jahzeel | El «Protocolo de atención del DOCE (versión 2025)» ya no está vigente. Haz que los estudiantes ya no lo vean. | El material deja de estar en la consulta pública | Propuesta |
| A5 | RF09 | Jahzeel | Ayer fue la plática de sueño y estudio. Sube una foto de la actividad con una descripción corta. | Hay una foto nueva en la fotogalería | Propuesta |
| A6 | RF11 | Rafael | Terminaste por hoy. Asegúrate de que nadie más pueda entrar con tu cuenta desde esta computadora. | Cierra sesión | Propuesta |

**Datos para capturar:** cuando una tarea pide capturar información (T5, A3, A5), los datos van en el documento del participante, en un recuadro aparte, no en la instrucción. Así no tiene que memorizarlos y la instrucción sigue siendo corta. La imagen de A5 se adjunta al mensaje.

**Cambio pendiente en `tareas.js`:** la instrucción de T5 dice "Usa las credenciales que te dieron en papel". Para la prueba remota hay que cambiarla por "Usa el usuario y la contraseña que vienen en las instrucciones".

**Orden:** de lo más fácil a lo más difícil, y las tareas de RNF01 primero (T1, T2 y T5), para que no se vean afectadas por el cansancio.

### Cómo se cargan en el prototipo

Las tareas viven en `prototipo/js/tareas.js`. Cada una tiene `id`, `perfil` (`'estudiante'` o `'personal'`), `objetivo` (solo para el equipo), `instruccion` (lo que lee el participante), `limiteSegundos`, `limiteClics`, `rutaEsperada` y `meta` (cuándo se marca lograda). El archivo explica cada campo al inicio. Cada responsable entrega su tarea con la plantilla de la sección 7 y Sofía las carga. Después de cargarlas hay que volver a publicar el prototipo en Netlify.

## 7. Plantilla de tarea

Cada integrante llena una por tarea y la pega en su issue.

```markdown
### Tarea [ID] · [RF]

- **Responsable:**
- **Perfil:** estudiante / personal del DOCE
- **Historia de usuario (el "para qué"):**
- **Instrucción para el participante:**
  > (situación realista, en segunda persona, sin nombres de botones ni menús)
- **Datos que van en el documento del participante (si aplica):**
- **Se logra cuando:** (llega a la pantalla ___ / responde ___ / queda guardado ___)
- **Ruta esperada:** (pantallas por las que es normal pasar, de inicio a la meta)
- **Límite de tiempo:** ___ s · **Límite de clics:** ___ (o "no se mide")
- **Criterios de aceptación que toca:** CA__, CA__
- **Qué podría confundir:** (lo que sospechas que va a fallar)
- **¿La probé en el prototipo?** sí / no
```


## 8. Documento para el participante

Es lo único que recibe el participante, así que tiene que bastar por sí solo. Se hacen **dos versiones**: estudiante y personal del DOCE. Se puede mandar como PDF, documento de Word o Google Docs, o pegado en el correo.

**Importante:** el documento **no lleva la lista de tareas**. Las tareas aparecen una por una dentro de `prueba.html`. Si el participante las lee antes, ya sabe qué buscar y la prueba pierde valor. El documento solo trae lo que necesita para empezar, los datos para capturar y cómo mandar el resultado.

Lo que está entre corchetes se cambia para cada participante.

```markdown
# Prueba del sitio del DOCE

Hola, [nombre]. Gracias por ayudarnos.

Somos un equipo de la Facultad de Matemáticas y estamos diseñando un sitio para el
Departamento de Orientación y Consejo Educativo (DOCE). Lo que vas a usar es un
**prototipo**: parece real, pero la información es de ejemplo y nada de lo que hagas
se guarda de verdad.

**Estamos evaluando el sitio, no a ti.** No hay respuestas buenas ni malas. Si algo no te
sale, es justo lo que necesitamos saber para mejorarlo.

- **Tiempo:** unos 15 minutos. Hazlo de una sola vez, en un lugar tranquilo.
- **Dispositivo:** de preferencia una computadora.
- **Fecha límite:** [día y hora].

## Antes de empezar

- No vamos a guardar tu nombre. Solo un código: **tu código es [P__]**.
- El sitio registra cuánto tardas, por qué pantallas pasas y tus respuestas a la encuesta.
  Nada más. Solo lo verá el equipo y se usa únicamente para este proyecto escolar.
- Puedes dejar la prueba en cualquier momento sin dar explicaciones.

**Al empezar la prueba, aceptas participar en estas condiciones.**

## Cómo hacer la prueba

1. Abre este enlace en una ventana normal del navegador (no de incógnito):
   **https://prototipo-doce.netlify.app/prueba.html**
2. Escribe tu código **[P__]**, elige el perfil **[Estudiante / Personal del DOCE]** y tu
   dispositivo, y pulsa **«Comenzar sesión»**.
3. El sitio te mostrará unas tareas, una por una. Lee cada una, pulsa **«Empezar tarea»**
   y resuélvela como lo harías normalmente.
   - Cuando termines, pulsa **«Terminé»**.
   - Si te atoras, pulsa **«No pude terminarla»** y sigue con la siguiente. Eso también nos sirve.
4. Toma en cuenta que en el sitio **hoy es 9 de noviembre de 2026**.
5. Al final contesta la encuesta corta. Si algo te confundió, cuéntanos en las preguntas abiertas.

[Solo para el perfil de personal del DOCE]
## Datos que vas a necesitar

Úsalos cuando una tarea te los pida. No los necesitas antes.

| Para entrar al sistema | |
|---|---|
| Correo | admin@doce.uady.mx |
| Contraseña | Doce2026 |

| Nueva línea de ayuda | |
|---|---|
| [datos de la tarea A3: nombre, institución, teléfono, horario, ámbito] | |

[Foto para la tarea A5: va adjunta a este mensaje.]

## Al terminar: mándanos tu resultado

1. En la pantalla de **«¡Muchas gracias!»**, pulsa **«Facilitador: ver resumen»**.
2. Pulsa **«Descargar CSV»**. Se descarga un archivo llamado `prueba-doce.csv`.
3. Mándanos ese archivo por [WhatsApp / correo] a [nombre del integrante].

Si no puedes descargarlo o mandarlo, avísanos y te pasamos un formulario corto.

¡Muchas gracias por tu tiempo! Por favor no le cuentes las tareas a otras personas que
vayan a participar.
```

**Mensaje corto para invitar** (antes de mandar el documento):

> Hola, [nombre]. Estamos haciendo un proyecto de la facultad sobre un sitio para el DOCE y buscamos personas que lo prueben. Son unos 15 minutos, desde tu computadora, cuando te acomode antes del [fecha]. ¿Nos ayudas? Si sí, te mando las instrucciones.

**Recordatorio** (un día antes de la fecha límite, solo a quien no ha mandado su archivo):

> Hola, [nombre]. Te recuerdo la prueba del sitio del DOCE; la fecha es [fecha]. Son unos 15 minutos. ¡Gracias!

## 9. Cómo recolectar los resultados

### Plan A (recomendado): el CSV del modo de prueba

Es lo que describe el documento del participante. Cada CSV trae, por cada tarea: código, perfil, dispositivo, si la logró, tiempo, clics, ruta de pantallas, pantallas fuera de ruta, errores de formulario, facilidad, respuesta y la puntuación SUS ya calculada.

1. Cada integrante guarda los CSV que recibe con el nombre del código: `P04.csv`, `P53.csv`.
2. Los sube a `Pruebas de usabilidad/Resultados/` (sección 12).
3. Quien junte resultados los pega en una hoja de cálculo, una hoja por perfil. Todos tienen las mismas columnas, así que basta con copiar las filas debajo.

**Cosas que pueden fallar y qué hacer:**

| Problema | Solución |
|---|---|
| Cerró la página a la mitad | Que vuelva a abrir `prueba.html` en el mismo navegador: aparece «Continuar» |
| Lo hizo en incógnito y cerró la ventana | Se perdió. Si quiere, que lo repita en una ventana normal con el mismo código |
| No encuentra el archivo descargado | Está en la carpeta de Descargas, con el nombre `prueba-doce.csv` |
| Lo hizo en celular y no puede mandar el archivo | Plan B |
| El CSV trae dos sesiones | Lo hizo dos veces. Solo se usa la primera |

### Plan B: formulario

Para quien no pueda mandar el CSV. Se arma un Google Forms o Microsoft Forms con:

1. Código del participante.
2. Por cada tarea: **¿Pudiste completarla?** (Sí / No) y **¿Qué tan fácil fue?** (1 = muy difícil a 7 = muy fácil).
3. Las 10 preguntas del SUS (sección 10), en el mismo orden, con escala del 1 al 5.
4. Las 3 preguntas abiertas.

El participante abre el formulario al terminar, sin cerrar el prototipo. El formulario **no mide tiempo ni clics**, así que esas respuestas no cuentan para los límites de RNF01. En el reporte se dice cuántas respuestas vinieron por cada plan.

> **¿Y si preferimos hacer toda la encuesta en el formulario?** Se puede, pero el SUS se contestaría dos veces, porque ya viene en `prueba.html`. Para no cansar al participante, mejor dejar el formulario solo como plan B.

## 10. Encuesta final: SUS y preguntas abiertas

Ya viene en el modo de prueba. Se incluye aquí para el formulario del plan B (sección 9) y para que todos sepan cómo se calcula.

### SUS (System Usability Scale)

Escala de 1 (**totalmente en desacuerdo**) a 5 (**totalmente de acuerdo**).

| # | Afirmación |
|---|---|
| 1 | Creo que me gustaría usar este sitio con frecuencia. |
| 2 | Encontré el sitio innecesariamente complejo. |
| 3 | Pensé que el sitio era fácil de usar. |
| 4 | Creo que necesitaría ayuda de una persona con conocimientos técnicos para usar este sitio. |
| 5 | Encontré que las distintas funciones del sitio estaban bien integradas. |
| 6 | Pensé que había demasiada inconsistencia en el sitio. |
| 7 | Imagino que la mayoría de las personas aprendería a usar este sitio muy rápido. |
| 8 | Encontré el sitio muy difícil de usar. |
| 9 | Me sentí con confianza al usar el sitio. |
| 10 | Necesité aprender muchas cosas antes de poder usar el sitio. |

No se cambia el orden ni la redacción: el puntaje solo es comparable si se usa igual.

### Cómo se calcula

1. Preguntas **impares** (1, 3, 5, 7, 9): respuesta **− 1**.
2. Preguntas **pares** (2, 4, 6, 8, 10): **5 −** respuesta.
3. Suma los 10 resultados (da entre 0 y 40).
4. Multiplica por **2.5**. El resultado va de 0 a 100.

**Ejemplo:** respuestas 4, 2, 5, 1, 4, 2, 4, 1, 4, 2
Impares: (4−1) + (5−1) + (4−1) + (4−1) + (4−1) = 3 + 4 + 3 + 3 + 3 = 16
Pares: (5−2) + (5−1) + (5−2) + (5−1) + (5−2) = 3 + 4 + 3 + 4 + 3 = 17
Total: (16 + 17) × 2.5 = **82.5**

> El puntaje SUS **no es un porcentaje**. Un 70 no significa "70 % satisfecho".

**Cómo interpretarlo:**

| SUS | Lectura |
|---|---|
| 80.3 o más | Excelente |
| 68 a 80.2 | Bueno, arriba del promedio |
| 68 | Promedio de muchos estudios |
| 51 a 67.9 | Aceptable, con problemas que atender |
| Menos de 51 | Problemas serios de usabilidad |

Se reporta el **promedio por perfil** (estudiantes y personal por separado), y también el mínimo y el máximo.

### Pregunta después de cada tarea

El modo de prueba pregunta al terminar cada tarea: *"En general, ¿qué tan fácil o difícil fue esta tarea?"* (1 = muy difícil, 7 = muy fácil). Sirve para ver **qué tarea** se sintió más pesada, cosa que el SUS no dice.

### Preguntas abiertas

1. ¿Qué fue lo más fácil de hacer?
2. ¿Qué fue lo más difícil o confuso?
3. ¿Qué cambiarías o agregarías?

## 11. Cómo analizar los resultados

Puede ser en una videollamada corta o repartido por chat. Antes, alguien junta todos los CSV en una sola hoja de cálculo (una hoja por perfil).

### Paso 1. Números por tarea

El resumen del facilitador ya calcula esto por tarea. Si se juntan varios CSV, se hace en una hoja de cálculo:

| Tarea | Éxito sin ayuda | Tiempo (mediana) | Clics (mediana) | Facilidad (promedio) | ¿Cumple RNF01? |
|---|---|---|---|---|---|
| T1 | 4 de 5 (80 %) | 38 s | 2 | 6.2 | Sí |
| ... | | | | | |

- **Éxito sin ayuda** = participantes con `lograda = sí` ÷ total. En la prueba remota nadie ayuda, así que todo lo logrado cuenta como sin ayuda.
- Una tarea marcada como lograda pero con respuesta equivocada (columna `respuesta`) **no** cuenta como éxito.
- Usamos la **mediana** del tiempo, no el promedio, porque una sola persona muy lenta distorsiona el promedio.
- Con 5 personas, cada una vale 20 %. Hay que decirlo así: "4 de 5", no solo "80 %".

### Paso 2. Lista de problemas

Como nadie observó las sesiones, los problemas se deducen de los datos. Señales de que alguien se trabó:

- Pulsó **«No pude terminarla»**, o respondió mal la pregunta de la tarea.
- Se pasó del **tiempo** o de los **clics** límite.
- La columna `ruta` muestra que entró a secciones que no tenían que ver (`fuera_de_ruta` mayor a 0).
- Tuvo **errores de validación** en un formulario (`errores_validacion`).
- Calificó la tarea con **facilidad de 1 a 3**.
- Lo mencionó en las **preguntas abiertas**.

1. Cada quien revisa los CSV de sus participantes y anota un problema por nota: qué pasó y en qué pantalla.
2. Se agrupan los que son el mismo problema.
3. Por cada problema: **cuántos participantes** lo tuvieron, **severidad** (la más alta observada), **pantalla** y **RF**.

| Severidad | Significa | Ejemplo |
|---|---|---|
| **Alta** | Le impidió terminar la tarea | No encontró dónde publicar la actividad |
| **Media** | Terminó, pero con errores, rodeos o mucho tiempo | Pasó por tres secciones equivocadas antes de llegar |
| **Baja** | Detalle que molesta pero no frena | Dijo que un icono no se entendía, pero lo usó |

4. Se ordena por severidad y luego por frecuencia.

| # | Problema | Pantalla | RF | Participantes | Severidad | Propuesta de cambio |
|---|---|---|---|---|---|---|
| 1 | No relacionan "Acceso DOCE" con iniciar sesión | Inicio | RF11 | 3 de 5 | Alta | Cambiar el texto a "Iniciar sesión (personal DOCE)" |

**Regla práctica:** un problema que tuvieron 2 o más personas, o uno de severidad alta aunque sea de 1 persona, se atiende.

### Paso 3. Lo que dijeron

Se juntan las respuestas abiertas por tema (lo más fácil, lo confuso, lo que cambiarían) y se eligen **2 o 3 frases textuales** que representen cada tema.

### Paso 4. Conclusión

Responder las cuatro preguntas del objetivo (sección 2) en una o dos frases cada una.


## 12. Cómo reportar

Todo va en esta carpeta, `Pruebas de usabilidad/`, en la rama `entrega-3`:

```text
Pruebas de usabilidad/
├── Guía de la prueba de usabilidad.md   (este documento)
├── Tareas.md                            (tareas finales de los dos perfiles)
├── Documento para el participante.md    (versión final que se mandó, sin códigos)
├── Resultados/
│   ├── P01.csv, P02.csv...              (un CSV por participante)
│   ├── estudiantes.csv                  (todos los de estudiantes, juntos)
│   ├── personal.csv
│   └── formulario.csv                   (respuestas del plan B, si hubo)
└── Reporte de la prueba de usabilidad.md
```

Los CSV no traen nombres, solo códigos, así que se pueden subir. La lista de quién tiene cada código **no se sube**.

**Estructura del reporte:**

1. **Resumen** (3 a 5 líneas): con cuántas personas se probó, qué tan bien les fue y los 3 problemas principales.
2. **Objetivo y método:** objetivo, perfiles, prueba remota sin moderador, número de invitados y de respuestas completas, fechas, dispositivos, cuántas respuestas vinieron por CSV y cuántas por formulario. Si en el perfil de administración no fue personal real del DOCE, decirlo aquí.
3. **Tareas:** la tabla de tareas con su RF.
4. **Resultados por tarea:** tabla del paso 1, marcando qué criterios de RNF01 se cumplen.
5. **SUS:** promedio, mínimo y máximo por perfil, con su lectura.
6. **Problemas encontrados:** tabla del paso 2.
7. **Comentarios de los participantes:** frases textuales por tema.
8. **Cambios propuestos:** qué se cambiará en el prototipo o en los requisitos, con el RF y el issue.
9. **Limitaciones:** pocas personas, prototipo con datos de ejemplo, sin moderador (no sabemos qué pensaban, solo lo que hicieron), sustitutos en el perfil de administración, etc.

Para la presentación basta con: objetivo, una tabla de resultados, el puntaje SUS y los 3 problemas principales con su cambio propuesto.

## 13. Calendario y pendientes por integrante

| Día | Qué se hace |
|---|---|
| **Martes 24 nov** | Se comparte esta guía. Cada quien empieza a escribir sus tareas y **manda la invitación corta** a sus participantes. |
| **Miércoles 25 nov** | Cada quien entrega sus tareas con la plantilla de la sección 7 (antes de las 8 p. m.). |
| **Jueves 26 nov** | Sofía carga las tareas finales en `tareas.js`, publica el prototipo y arma los dos documentos. **Sesión piloto** por la tarde. En la noche se mandan los documentos. |
| **Viernes 27 a domingo 29 nov, 12 p. m.** | Los participantes hacen la prueba cuando les acomode. El sábado se manda el recordatorio a quien falte. |
| **Domingo 29 nov, tarde** | Se juntan los CSV, se analiza y se escribe el reporte. |
| **Lunes 30 nov** | Entrega. |

### Checklist por integrante

**Todos**

- [ ] Leer esta guía completa.
- [ ] Escribir las tareas de mis RF con la plantilla (sección 7) y probarlas en el prototipo.
- [ ] Invitar a **3 estudiantes** y, si puedo, a **1 o 2 personas** del perfil de personal, y darles un código de mi rango.
- [ ] Mandarles el documento, recordarles el sábado y recibir su CSV.
- [ ] Subir mis CSV a `Pruebas de usabilidad/Resultados/`.
- [ ] Revisar los CSV de mis participantes y anotar los problemas (sección 11, paso 2).

**Por requisito**

| Integrante | RF | Tareas a revisar o escribir | Extra |
|---|---|---|---|
| Sofía | RF01 | T1 (con Jennyfer), E1 | Cargar las tareas en `tareas.js` y cambiar el texto de T5; publicar en Netlify; armar los dos documentos; integrar el reporte |
| Jennyfer | RF02, RF03 | T1, T5 (con Rafael), E2, A2 | |
| Daniel | RF04, RF05 | T2, T6, A1 | |
| Gabriel | RF06, RF07 | T3, T4, A3 | Escribir los datos de la línea para A3 |
| Jahzeel | RF08, RF09 | E3, A4, A5 | Conseguir la foto para A5 |
| Rafael | RF10, RF11 | E4, T5 (con Jennyfer), A6 | |

**Pendientes de equipo (asignar hoy)**

- [ ] Contactar a la coordinación del DOCE para conseguir participantes del perfil de personal.
- [ ] Conseguir a la persona de la sesión piloto.
- [ ] Armar el formulario del plan B.
- [ ] Juntar los CSV y calcular resultados por tarea.
- [ ] Escribir el reporte (sección 12).
