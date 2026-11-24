# Guía de la prueba de usabilidad

Todo lo que el equipo necesita para diseñar, correr y reportar la prueba informal de usabilidad del prototipo del Sistema para la gestión del DOCE (tercera entrega).

**Prototipo:** https://prototipo-doce.netlify.app · modo de prueba en `prueba.html` (carpeta `prototipo/`, issue #76)
**Fecha límite de la entrega:** lunes 30 de noviembre

## Contenido

1. [Qué vamos a hacer, en una página](#1-qué-vamos-a-hacer-en-una-página)
2. [Objetivo](#2-objetivo)
3. [Participantes](#3-participantes)
4. [Logística y roles](#4-logística-y-roles)
5. [Cómo escribir una tarea](#5-cómo-escribir-una-tarea)
6. [Tareas por requisito](#6-tareas-por-requisito)
7. [Plantilla de tarea](#7-plantilla-de-tarea)
8. [Guion del moderador](#8-guion-del-moderador)
9. [Hoja de registro](#9-hoja-de-registro)
10. [Encuesta final: SUS y preguntas abiertas](#10-encuesta-final-sus-y-preguntas-abiertas)
11. [Cómo analizar los resultados](#11-cómo-analizar-los-resultados)
12. [Cómo reportar](#12-cómo-reportar)
13. [Calendario y pendientes por integrante](#13-calendario-y-pendientes-por-integrante)

---

## 1. Qué vamos a hacer, en una página

- Hacemos **dos pruebas**: una con **estudiantes** y otra con **personal del DOCE** (rol administrador).
- Cada integrante convierte **sus RF en tareas**. Una tarea es una situación realista que el participante resuelve solo, sin que le digamos dónde dar clic.
- Cada sesión es **individual, de 15 a 20 minutos**, con un **moderador** (habla) y un **observador** (anota). El participante **piensa en voz alta**.
- Por cada tarea anotamos tres cosas: **¿la completó?** (sí, con ayuda, no), **¿cuánto tardó?** y **¿dónde se trabó?**
- Al final, el participante responde la **encuesta SUS** (10 preguntas) y **3 preguntas abiertas**.
- **5 personas por perfil.** Con 5 se encuentran la mayoría de los problemas, y es lo que pide RNF01.
- El prototipo ya trae un **modo de prueba** (`prueba.html`) que muestra las tareas, cronometra, cuenta clics, aplica la encuesta SUS y descarga los resultados en CSV. No hay que hacer formularios aparte; solo hay que **agregar las tareas que faltan** en `prototipo/js/tareas.js`.

## 2. Objetivo

> Evaluar la usabilidad del prototipo interactivo del sistema para la gestión del DOCE con estudiantes de la FMAT y con el personal de la coordinación del DOCE, midiendo si completan las tareas clave sin ayuda, en cuánto tiempo y qué tan satisfechos quedan.

Lo que queremos responder:

1. ¿Las personas completan las tareas de cada RF **sin ayuda**?
2. ¿Se cumplen los límites de **RNF01**? (ver abajo)
3. ¿En qué pantallas se confunden y por qué?
4. ¿Qué tan usable perciben el sitio? (puntuación SUS)

**Criterios de RNF01 que esta prueba comprueba:**

| Criterio | Meta |
|---|---|
| Encontrar lugar, fecha y hora de la próxima actividad (estudiante) | 80 % sin ayuda, ≤ 3 clics desde inicio, ≤ 60 s |
| Encontrar horario y ubicación de un orientador (estudiante) | 80 % sin ayuda, ≤ 3 clics desde inicio, ≤ 60 s |
| Crear y publicar una actividad completa (personal del DOCE, sin manual) | ≤ 3 minutos |

Estas tres tareas (T1, T2 y T5) **no se quitan** de la prueba.

> **Prueba informal no es lo mismo que verificación.** En la verificación revisamos que el requisito esté bien escrito. Aquí vemos si una persona real logra usar lo que construimos. Por eso las tareas no son "comprueba el CA3", sino situaciones de la vida real.

## 3. Participantes

| Perfil | Quiénes | Cuántos | Cómo reclutar |
|---|---|---|---|
| Estudiante | Estudiantes de cualquier licenciatura de la FMAT que **no hayan visto el prototipo** | 5 | Compañeros de otros grupos o semestres. No vale gente del equipo ni quien ya lo probó |
| Personal del DOCE (administrador) | Idealmente personal de la coordinación del DOCE. Si no se puede, profesores o personal administrativo que no conozcan el sitio | 5 (mínimo 3) | Pedir 20 minutos por correo o en persona. Si usamos sustitutos, se dice en el reporte |

Reglas:

- Mezclar semestres y licenciaturas, y al menos una o dos personas que hagan la prueba en **celular**.
- Cada participante recibe un **código** (E01 a E05 para estudiantes, A01 a A05 para administración). **No escribimos nombres** en ningún registro.
- Una persona solo participa en un perfil.

## 4. Logística y roles

**Formato:** en persona (preferido) o por videollamada con pantalla compartida.

| Rol | Qué hace |
|---|---|
| **Moderador** | Lee el guion, entrega las tareas, recuerda pensar en voz alta. No ayuda ni explica la interfaz. |
| **Observador** | Llena la hoja de registro: tiempo, si completó, dónde se trabó y frases textuales. No habla. |

Cada sesión necesita **dos integrantes**. Con seis integrantes podemos correr tres sesiones al mismo tiempo.

**Material por sesión:**

- Computadora o celular con el prototipo abierto en `prueba.html`.
- Para el perfil de administración: **credenciales impresas en papel** (`admin@doce.uady.mx` / `Doce2026`). No se dictan.
- Hoja de registro (sección 9) impresa o en el celular del observador.
- Cronómetro (el modo de prueba ya cronometra; el del observador es respaldo).

**Antes de cada sesión:**

1. Abrir `prueba.html`, escribir el código, elegir perfil y dispositivo, y pulsar «Comenzar sesión». Los datos de ejemplo se restablecen solos.
2. Cerrar otras pestañas y notificaciones.
3. Revisar que se vea bien y que no haya una sesión anterior abierta.

**Después de cada sesión:**

1. «Facilitador: ver resumen», marcar las tareas donde hubo ayuda y escribir notas.
2. **Descargar CSV** antes de cerrar. Los resultados solo viven en ese navegador.
3. Subir el CSV y la hoja de registro a la carpeta del equipo (sección 12).

**Fecha simulada:** el prototipo toma como "hoy" el **9 de noviembre de 2026**. Si el participante pregunta por la fecha, el moderador lo dice. Así "la próxima actividad" es siempre la misma para todos.

**Sesión piloto:** antes de las sesiones reales, el equipo hace **una sesión de prueba** con alguien cercano (un amigo, no del equipo) para detectar tareas confusas o que el prototipo no permite. Se corrige y luego se empieza.

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
5. Lee la tarea en voz alta a alguien del equipo. Si pregunta "¿y dónde le pico?", está bien. Si pregunta "¿qué tengo que hacer?", hay que reescribirla.

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
| T5 | RF11, RF03.1, RF03.2, RNF01 | Rafael, Jennyfer | Eres parte del DOCE. Entra al sistema y publica la plática «Higiene del sueño» del 4 de diciembre a las 11:00 en el Auditorio, presencial, organizada por el DOCE. Usa las credenciales que te dieron en papel. | La actividad queda publicada con esos datos | Cargada |
| T6 | RF04.2 | Daniel | La actividad «Taller de mindfulness» se canceló. Indícalo en el sistema. | La actividad queda cancelada | Cargada |
| A1 | RF04.1 | Daniel | La «Pausa activa entre exámenes» del 25 de noviembre se movió a las 12:00. Actualiza la información para que los estudiantes no lleguen a la hora equivocada. | La actividad queda con hora 12:00 | Propuesta |
| A2 | RF03.3, RF03.4 | Jennyfer | Durante exámenes el DOCE atenderá hasta las 19:00. Avisa a los estudiantes. | Queda publicado un aviso con ese horario | Propuesta |
| A3 | RF06.3 | Gabriel | Te pasaron el número de una nueva línea estatal de atención en crisis. Agrégala para que los estudiantes la encuentren. (Se entrega una tarjeta con los datos.) | La línea queda registrada en el ámbito estatal | Propuesta |
| A4 | RF08 | Jahzeel | El «Protocolo de atención del DOCE (versión 2025)» ya no está vigente. Haz que los estudiantes ya no lo vean. | El material deja de estar en la consulta pública | Propuesta |
| A5 | RF09 | Jahzeel | Ayer fue la plática de sueño y estudio. Sube una foto de la actividad con una descripción corta. | Hay una foto nueva en la fotogalería | Propuesta |
| A6 | RF11 | Rafael | Terminaste por hoy. Asegúrate de que nadie más pueda entrar con tu cuenta desde esta computadora. | Cierra sesión | Propuesta |

**Datos que se entregan en papel:** cuando una tarea pide capturar información (T5, A3, A5), los datos van en una tarjeta impresa, no en la instrucción. Así el participante no tiene que memorizarlos y la instrucción sigue siendo corta.

**Orden:** de lo más fácil a lo más difícil, y las tareas de RNF01 primero (T1, T2 y T5), para que no se vean afectadas por el cansancio.

### Cómo se cargan en el prototipo

Las tareas viven en `prototipo/js/tareas.js`. Cada una tiene `id`, `perfil` (`'estudiante'` o `'personal'`), `objetivo` (solo para el equipo), `instruccion` (lo que lee el participante), `limiteSegundos`, `limiteClics`, `rutaEsperada` y `meta` (cuándo se marca lograda). El archivo explica cada campo al inicio. Cada responsable entrega su tarea con la plantilla de la sección 7 y Sofía las carga.

## 7. Plantilla de tarea

Cada integrante llena una por tarea y la pega en su issue.

```markdown
### Tarea [ID] · [RF]

- **Responsable:**
- **Perfil:** estudiante / personal del DOCE
- **Historia de usuario (el "para qué"):**
- **Instrucción para el participante:**
  > (situación realista, en segunda persona, sin nombres de botones ni menús)
- **Datos en tarjeta (si aplica):**
- **Se logra cuando:** (llega a la pantalla ___ / responde ___ / queda guardado ___)
- **Ruta esperada:** (pantallas por las que es normal pasar, de inicio a la meta)
- **Límite de tiempo:** ___ s · **Límite de clics:** ___ (o "no se mide")
- **Criterios de aceptación que toca:** CA__, CA__
- **Qué podría confundir:** (lo que sospechas que va a fallar)
- **¿La probé en el prototipo?** sí / no
```

## 8. Guion del moderador

Leerlo tal cual. Lo que está entre corchetes es para el moderador.

### Bienvenida (1 a 2 minutos)

> Hola, gracias por ayudarnos. Me llamo ___ y ella/él es ___, que va a tomar notas.
>
> Estamos diseñando un sitio para el Departamento de Orientación y Consejo Educativo de la facultad. Lo que vas a ver es un **prototipo**: parece real, pero la información es de ejemplo y no se guarda nada de verdad.
>
> **Estamos evaluando el sitio, no a ti.** No hay respuestas buenas ni malas. Si algo no te sale, es justo lo que necesitamos saber para mejorarlo.
>
> Te voy a pedir que hagas unas tareas cortas. Mientras las haces, **di en voz alta lo que piensas**: qué buscas, qué esperas encontrar, qué te sorprende. Por ejemplo: "busco algo que diga horarios... esto no es lo que esperaba".
>
> Yo no te voy a poder ayudar mientras haces las tareas, porque queremos ver cómo lo usarías tú solo. Si te atoras, puedes decir "no puedo" y pasamos a la siguiente. Eso también nos sirve.
>
> Al final hay una encuesta corta. En total son unos 15 o 20 minutos.

### Consentimiento

> No vamos a guardar tu nombre, solo un código. [Si se graba pantalla o audio:] ¿Estás de acuerdo en que grabemos la pantalla y tu voz? Solo la verá el equipo y se borra al terminar el proyecto.
>
> Puedes dejar la prueba en cualquier momento sin dar explicaciones. ¿Tienes alguna pregunta antes de empezar? ¿Estás de acuerdo en participar?

[Si dice que no a la grabación, no se graba y solo se toman notas.]

### Durante las tareas

- Lee la tarea en voz alta y deja que también la lea en pantalla.
- **No ayudes, no señales, no expliques la interfaz.** Si pregunta "¿esto es aquí?", responde: *"¿Tú qué harías si estuvieras solo?"*
- Si se queda en silencio: *"¿Qué estás pensando?"* o *"¿Qué buscas ahora?"*
- Si lleva **más del doble del límite** o está frustrado: *"Muy bien, pasemos a la siguiente."* La tarea cuenta como **no completada**.
- Si tuviste que darle una pista, la tarea cuenta como **completada con ayuda**. El observador lo anota.
- No digas "muy bien" ni "correcto" al terminar una tarea. Di *"Gracias, siguiente"*, para no dar pistas de si lo hizo bien.

Frases neutrales útiles: *"¿Qué esperabas que pasara?"*, *"¿Qué significa para ti ese botón?"*, *"Cuéntame más."*

### Cierre (3 a 5 minutos)

[El participante llena la encuesta SUS y las preguntas abiertas en el modo de prueba. Después:]

> ¿Hubo algo que te haya parecido raro o confuso que no hayas dicho?
>
> Muchas gracias por tu tiempo. Lo que encontramos hoy nos ayuda a mejorar el sitio. Te pedimos que **no le cuentes las tareas a otras personas** que vayan a participar.

[No mostrar la respuesta correcta ni explicar cómo se hacía hasta que termine la sesión, y solo si lo pide.]

## 9. Hoja de registro

Una hoja por participante. La llena el observador. El modo de prueba registra tiempo, clics y ruta automáticamente; esta hoja captura **lo que la máquina no ve**: dónde se trabó y qué dijo.

```markdown
## Registro · Participante [código] · [estudiante / personal del DOCE]

- **Fecha y hora:**
- **Moderador / observador:**
- **Dispositivo:** computadora / celular · **Navegador:**
- **Formato:** en persona / videollamada
- **¿Había usado antes un sitio del DOCE?** sí / no

| Tarea | Resultado | Tiempo | ¿Dónde se trabó? | Lo que dijo (textual) | Severidad |
|---|---|---|---|---|---|
| T1 | ✅ sola / 🆘 con ayuda / ❌ no | __ s | | | |
| T2 | | | | | |
| T3 | | | | | |
| ... | | | | | |

**Puntuación SUS:** ___ / 100

**Observaciones generales:**
```

**Resultado:**

- ✅ **Sola:** la completó sin ninguna pista.
- 🆘 **Con ayuda:** la completó, pero el moderador le dio una pista o le explicó algo.
- ❌ **No:** se rindió, se pasó del tiempo o terminó con un dato equivocado.

**Severidad** (solo cuando hubo un problema):

| Nivel | Significa | Ejemplo |
|---|---|---|
| **Alta** | Le impidió terminar la tarea | No encontró dónde publicar la actividad |
| **Media** | Terminó, pero con dificultad, errores o mucho tiempo | Entró a tres secciones equivocadas antes de llegar |
| **Baja** | Detalle que molesta pero no frena | Dijo que el icono no se entendía, pero lo usó |

**Consejos para el observador:** anota lo que **hace**, no lo que crees que piensa ("dio clic en Material buscando el horario", no "se confundió"). Copia las frases tal cual, entre comillas. Anota la pantalla exacta donde se trabó.

## 10. Encuesta final: SUS y preguntas abiertas

Ya viene en el modo de prueba. Se incluye aquí para la versión en papel y para que todos sepan cómo se calcula.

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

Hacerlo **juntos en una reunión de una hora**, con todos los CSV y las hojas de registro.

### Paso 1. Números por tarea

El resumen del facilitador ya calcula esto por tarea. Si se juntan varios CSV, se hace en una hoja de cálculo:

| Tarea | Éxito sin ayuda | Tiempo (mediana) | Clics (mediana) | Facilidad (promedio) | ¿Cumple RNF01? |
|---|---|---|---|---|---|
| T1 | 4 de 5 (80 %) | 38 s | 2 | 6.2 | Sí |
| ... | | | | | |

- **Éxito sin ayuda** = participantes con ✅ ÷ total. Los 🆘 **no cuentan** como éxito.
- Usamos la **mediana** del tiempo, no el promedio, porque una sola persona muy lenta distorsiona el promedio.
- Con 5 personas, cada una vale 20 %. Hay que decirlo así: "4 de 5", no solo "80 %".

### Paso 2. Lista de problemas

1. Cada quien pasa los "dónde se trabó" de sus hojas a notas (una nota por problema).
2. Se agrupan los que son el mismo problema.
3. Por cada problema: **cuántos participantes** lo tuvieron, **severidad** (la más alta observada), **pantalla** y **RF**.
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
├── Resultados/
│   ├── estudiantes.csv                  (CSV del modo de prueba, juntos)
│   ├── personal.csv
│   └── Registros/                       (hojas de registro, una por participante)
└── Reporte de la prueba de usabilidad.md
```

**Estructura del reporte:**

1. **Resumen** (3 a 5 líneas): con cuántas personas se probó, qué tan bien les fue y los 3 problemas principales.
2. **Objetivo y método:** objetivo, perfiles, número de participantes, formato, fechas, dispositivos. Si en el perfil de administración no fue personal real del DOCE, decirlo aquí.
3. **Tareas:** la tabla de tareas con su RF.
4. **Resultados por tarea:** tabla del paso 1, marcando qué criterios de RNF01 se cumplen.
5. **SUS:** promedio, mínimo y máximo por perfil, con su lectura.
6. **Problemas encontrados:** tabla del paso 2.
7. **Comentarios de los participantes:** frases textuales por tema.
8. **Cambios propuestos:** qué se cambiará en el prototipo o en los requisitos, con el RF y el issue.
9. **Limitaciones:** pocas personas, prototipo con datos de ejemplo, sustitutos en el perfil de administración, etc.

Para la presentación basta con: objetivo, una tabla de resultados, el puntaje SUS y los 3 problemas principales con su cambio propuesto.

## 13. Calendario y pendientes por integrante

| Día | Qué se hace |
|---|---|
| **Martes 24 nov** | Se comparte esta guía. Cada quien empieza a escribir sus tareas. |
| **Miércoles 25 nov** | Cada quien entrega sus tareas con la plantilla de la sección 7. Se reclutan participantes. |
| **Jueves 26 nov** | Se eligen las tareas finales (máximo 6 por perfil), Sofía las carga en `tareas.js` y se hace la **sesión piloto**. |
| **Viernes 27 y sábado 28 nov** | Sesiones reales: 5 estudiantes y 5 personas del perfil de administración. |
| **Domingo 29 nov** | Reunión de análisis y reporte. |
| **Lunes 30 nov** | Entrega. |

### Checklist por integrante

**Todos**

- [ ] Leer esta guía completa.
- [ ] Escribir las tareas de mis RF con la plantilla (sección 7) y probarlas en el prototipo.
- [ ] Conseguir al menos **2 participantes** (uno de cada perfil si es posible) y anotarlos con su código.
- [ ] Participar en al menos **2 sesiones** como moderador u observador.
- [ ] Subir mis CSV y hojas de registro a `Pruebas de usabilidad/Resultados/`.
- [ ] Ir a la reunión de análisis.

**Por requisito**

| Integrante | RF | Tareas a revisar o escribir | Extra |
|---|---|---|---|
| Sofía | RF01 | T1 (con Jennyfer), E1 | Cargar las tareas en `tareas.js`; coordinar el calendario de sesiones; integrar el reporte |
| Jennyfer | RF02, RF03 | T1, T5 (con Rafael), E2, A2 | |
| Daniel | RF04, RF05 | T2, T6, A1 | |
| Gabriel | RF06, RF07 | T3, T4, A3 | Preparar la tarjeta con los datos de la línea para A3 |
| Jahzeel | RF08, RF09 | E3, A4, A5 | Preparar la imagen para A5 |
| Rafael | RF10, RF11 | E4, T5 (con Jennyfer), A6 | Imprimir las tarjetas de credenciales |

**Pendientes de equipo (asignar en la próxima reunión)**

- [ ] Contactar a la coordinación del DOCE para conseguir participantes del perfil de administración.
- [ ] Hacer la sesión piloto y ajustar tareas.
- [ ] Juntar los CSV y calcular resultados por tarea.
- [ ] Escribir el reporte (sección 12).
