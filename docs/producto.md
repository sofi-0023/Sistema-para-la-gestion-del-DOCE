# Producto

Resumen del producto para la tercera entrega: cómo evolucionó entre las tres entregas, quiénes son sus usuarios y qué aporta frente a lo que ya existe.

---

## Evolución del producto

| Entrega | Qué se tenía | Cambios más significativos | Evidencia |
|---|---|---|---|
| **1** · Propuesta | Problemática (los avisos del DOCE se pierden en el correo institucional), objetivo general y objetivos específicos, alcance, propuesta de valor y una lista inicial de requisitos | Se definió el producto: una plataforma web que centraliza actividades, contactos y material de salud mental de la FMAT | [Propuesta](<propuesta.md>) |
| **2** · Requisitos y diseño | 11 requisitos funcionales y 6 no funcionales refinados, con historias de usuario, criterios de aceptación y casos de uso; diagrama de casos de uso; más de 60 bocetos; wireframes de alta fidelidad y prototipo navegable en Figma | Los requisitos amplios se dividieron en subrequisitos verificables (RF03, RF04, RF06); se agregó la gestión por el administrador de líneas de ayuda, material y fotogalería; los RNF se volvieron medibles y se agregó RNF06 de accesibilidad; la clienta aprobó logotipo y paleta 1c | [Requisitos funcionales](<../Requisitos/Requisitos funcionales/Requisitos funcionales.md>) · [Requisitos no funcionales](<../Requisitos/Requisitos no funcionales/Requisitos no funcionales.md>) · [Bocetos](<../Diseño/Bocetos>) · [Wireframes](<../Diseño/Wireframes/Wireframes y prototipo.md>) |
| **3** · Pruebas | Requisitos verificados por su responsable; prototipo HTML navegable con vistas de estudiante y de administración; prueba de usabilidad remota con estudiantes y con la Coordinación del DOCE | El prototipo pasó de pantallas conectadas en Figma a un sistema que valida formularios, guarda datos y muestra estados vacíos y de error. Se revisó contra los **124 criterios de aceptación**: 105 se cumplen con el flujo normal y 19 con un estado forzado. Se validó con usuarios reales | [Prototipo](<../prototipo/README.md>) · [Cobertura](<../prototipo/COBERTURA.md>) · [Decisiones](<../prototipo/DECISIONES.md>) · [Guía de la prueba](<../Pruebas de usabilidad/Guía de la prueba de usabilidad.md>) |

### Cobertura de los requisitos en la entrega 3

Tomado de [`prototipo/COBERTURA.md`](<../prototipo/COBERTURA.md>):

| Requisitos | Cobertura en el prototipo | Lo que falta |
|---|---|---|
| Funcionales (RF01 a RF11) | 124 de 124 criterios de aceptación (100 %): 105 con el flujo normal y 19 con estado forzado | Los 19 dependen de un fallo del servidor o de otra persona, así que solo se pueden simular |
| RNF01 Usabilidad | Detalle y directorio a 1 clic de Inicio; prueba de usabilidad en curso | Resultados de la prueba |
| RNF02 Compatibilidad | 360 a 1920 px sin desplazamiento horizontal en Chrome y Edge | Firefox y Safari |
| RNF03 Mantenibilidad | Todo el contenido se crea, edita y retira desde el panel | Directorio y tutorías no tienen RF ni wireframe propios |
| RNF04 Seguridad | Panel protegido, mensaje genérico, bloqueo por intentos y expiración de sesión | Hash de contraseñas y HTTPS (no se pueden demostrar en un prototipo local) |
| RNF05 Rendimiento | Sin librerías, catálogo paginado e imágenes con carga diferida | Medición con Lighthouse en 4G simulada |
| RNF06 Accesibilidad | Contraste AA, uso con teclado, textos alternativos, etiquetas, 16 px y áreas de 44 px | Lighthouse y lector de pantalla |

---

## Usuarios

| Tipo | Quiénes | Qué hacen en el sistema |
|---|---|---|
| **Primario** | Estudiantes de la Facultad de Matemáticas (FMAT) de la UADY | Consultan el calendario, el detalle de las actividades, el directorio, las líneas de ayuda, el material, la fotogalería y las tutorías, sin iniciar sesión |
| **Primario (gestión)** | Personal del DOCE; hoy la Coordinación del DOCE, que es la única persona del departamento con ese rol | Inicia sesión y crea, publica, edita y cancela actividades y avisos; gestiona líneas de ayuda, material y fotos |
| **Secundario** | Profesorado de la FMAT | Consulta actividades y contactos para canalizar a sus estudiantes |
| **Potencial** | Estudiantes de otras facultades de la UADY interesados en las actividades | Consultan las actividades abiertas |

### Perfil del usuario primario: estudiante de la FMAT

| Característica | Descripción |
|---|---|
| Edad | Entre 18 y 25 años, en su mayoría |
| Carreras | Licenciaturas de la FMAT (matemáticas, actuaría, computación, software, etc.) |
| Uso de tecnología | Alto. Usa celular para casi todo y computadora para clases |
| Cómo se entera hoy | Por correo institucional, junto con muchos otros mensajes de la facultad |
| Necesidad | Saber a tiempo qué actividades de salud mental hay, dónde y cuándo, y a quién acudir si necesita ayuda |
| Frustración | Los avisos se pierden en la bandeja; no sabe dónde está el cubículo de orientación ni su horario |
| Restricción | No quiere registrarse ni iniciar sesión para consultar información |

### Personas

> Personas de referencia construidas con el perfil de arriba, la problemática de la propuesta y la reunión con la clienta. No son participantes reales.

**Ana, 20 años, estudiante de 3.er semestre**
- Revisa el correo institucional una vez por semana y casi siempre se entera de los talleres cuando ya pasaron.
- Quiere ver en su celular qué hay esta semana y agregarlo a su calendario.
- Lo que necesita del sistema: calendario de hoy en adelante y detalle con lugar, hora y modalidad (RF01, RF02).

**Luis, 22 años, estudiante de 7.º semestre**
- Está pasando por una época de mucho estrés y no sabe con quién hablar.
- Le da pena preguntar en persona dónde está orientación.
- Lo que necesita del sistema: directorio con ubicación y horario, y líneas de ayuda siempre a la vista (RF05, RF06).

**Coordinación del DOCE**
- Organiza talleres y avisos y hoy los difunde por correo.
- Necesita publicar y corregir sin depender de nadie y sin conocimientos técnicos.
- Lo que necesita del sistema: panel con inicio de sesión para crear, revisar, publicar, editar y cancelar (RF03, RF04, RF11).

### Escenarios

| # | Escenario | Requisitos |
|---|---|---|
| 1 | Ana abre la plataforma el lunes, ve en el calendario un taller de manejo del estrés el jueves, abre el detalle y lo agrega a su calendario | RF01, RF02 |
| 2 | Luis busca en el directorio a la persona de orientación, ve en qué edificio y planta está y en qué horario atiende | RF05 |
| 3 | Un viernes en la noche Luis necesita hablar con alguien; desde cualquier página llega a las líneas de ayuda y llama | RF06 |
| 4 | La Coordinación crea un taller, revisa los datos, lo publica y aparece de inmediato en el calendario | RF03, RF11 |
| 5 | El taller cambia de salón; la Coordinación lo edita y el detalle se actualiza. Si se cancela, sigue visible con la etiqueta "Cancelada" hasta su fecha | RF04 |

Cada escenario tiene un apartado equivalente en la [prueba de usabilidad](<../Pruebas de usabilidad/Guía de la prueba de usabilidad.md>): el 1 con el apartado 1 de estudiantes, el 2 con el 3, el 3 con el 4, el 4 con el apartado 1 de coordinación y el 5 con los apartados 3 y 4 de coordinación.

---

## Innovación

### Qué existe hoy

| Medio | Para qué sirve | Por qué no basta |
|---|---|---|
| Correo institucional | Es el canal oficial del DOCE para las convocatorias | Compite con todos los correos de la facultad; los avisos se pierden y no hay forma de consultar lo que viene |
| Redes sociales y grupos de mensajería | Difusión rápida | Depende de seguir la cuenta o estar en el grupo; la información queda enterrada en el historial y no hay directorio ni material |
| Páginas institucionales generales | Información fija de la universidad o la facultad | No muestran el calendario del DOCE ni se pueden actualizar de forma sencilla por el propio departamento |

### Qué aporta este producto

- **Un solo lugar para todo lo de salud mental de la FMAT:** calendario, detalle de actividades, directorio, líneas de ayuda, material, fotogalería y tutorías. Hoy esa información está repartida o no existe.
- **Consulta sin barreras:** nadie tiene que iniciar sesión ni registrarse para ver la información, lo que importa cuando alguien busca ayuda.
- **Líneas de ayuda siempre a la vista** en todas las páginas, organizadas por ámbito (universitario, local, estatal y nacional).
- **Autonomía del DOCE:** el propio departamento publica, edita y cancela su contenido desde un panel, sin depender de terceros (RNF03).
- **Información honesta sobre cambios:** una actividad cancelada no desaparece, sigue visible con su etiqueta hasta su fecha, para que nadie llegue a un taller que ya no existe.
- **Accesibilidad desde el diseño:** la paleta y la tipografía se eligieron por contraste y legibilidad (RNF06), no solo por estética.

### Por qué es original

La necesidad salió de una clienta real (la Coordinación del DOCE) y de un problema concreto de la FMAT: la información de salud mental se pierde en el correo. El producto no es una plataforma genérica de eventos: está diseñado para el contexto de orientación y salud mental, con prioridad en encontrar ayuda rápido, sin iniciar sesión, y con el departamento como dueño de su propio contenido.
