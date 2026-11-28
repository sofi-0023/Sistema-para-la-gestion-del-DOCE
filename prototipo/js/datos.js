/* Datos de ejemplo. Personas, actividades y contactos son ficticios.
   Las líneas locales y estatales no confirmadas se muestran como [Número]. */
(function () {
  'use strict';

  var TEAMS = 'https://teams.microsoft.com/l/meetup/doce-fmat';

  DOCE.datosEjemplo = function () {
    return {
      /* estado: publicada | borrador | cancelada */
      actividades: [
        {
          id: 'feria-bienestar', nombre: 'Feria de bienestar', estado: 'publicada', modalidad: 'presencial',
          descripcion: 'Módulos informativos sobre los servicios de apoyo de la facultad.',
          fechaInicio: '2026-11-04', horaInicio: '10:00', fechaFin: '2026-11-04', horaFin: '13:00',
          lugar: 'Explanada central', enlace: '', organizador: 'Departamento de Orientación y Consejo Educativo',
          editado: '2026-10-28T12:30'
        },
        {
          id: 'platica-dormir', nombre: 'Plática: dormir bien también es estudiar', estado: 'publicada', modalidad: 'presencial',
          descripcion: 'Por qué el sueño importa para la memoria y el rendimiento, y hábitos sencillos para dormir mejor durante el semestre.',
          fechaInicio: '2026-11-12', horaInicio: '16:00', fechaFin: '2026-11-12', horaFin: '17:30',
          lugar: 'Aula Magna, edificio principal, planta baja', enlace: '', organizador: 'Psicología FMAT',
          editado: '2026-11-03T10:15'
        },
        {
          id: 'cine-debate', nombre: 'Cine-debate: hablemos de ansiedad', estado: 'cancelada', modalidad: 'presencial',
          descripcion: 'Proyección de una película y conversación guiada sobre la ansiedad en la vida universitaria.',
          fechaInicio: '2026-11-13', horaInicio: '17:00', fechaFin: '2026-11-13', horaFin: '19:00',
          lugar: 'Auditorio', enlace: '', organizador: 'Departamento de Orientación y Consejo Educativo',
          editado: '2026-11-06T12:05'
        },
        {
          id: 'taller-estres', nombre: 'Taller: manejo del estrés en exámenes', estado: 'publicada', modalidad: 'hibrida',
          descripcion: 'Técnicas breves de respiración y organización para llegar con más calma a la temporada de exámenes. Puedes asistir en persona o conectarte en línea.',
          fechaInicio: '2026-11-17', horaInicio: '12:00', fechaFin: '2026-11-17', horaFin: '14:00',
          lugar: 'Sala de usos múltiples, edificio B, planta alta', enlace: TEAMS, organizador: 'Departamento de Orientación y Consejo Educativo',
          editado: '2026-11-09T09:12'
        },
        {
          id: 'grupo-apoyo', nombre: 'Grupo de apoyo: ansiedad y procrastinación', estado: 'publicada', modalidad: 'virtual',
          descripcion: 'Un espacio guiado por psicología para compartir estrategias contra la procrastinación y la ansiedad académica. No necesitas encender tu cámara.',
          fechaInicio: '2026-11-20', horaInicio: '13:00', fechaFin: '2026-11-20', horaFin: '14:00',
          lugar: '', enlace: TEAMS, organizador: 'Departamento de Orientación y Consejo Educativo',
          editado: '2026-11-05T11:00'
        },
        {
          id: 'pausa-activa', nombre: 'Pausa activa entre exámenes', estado: 'publicada', modalidad: 'presencial',
          descripcion: 'Estiramiento guiado al aire libre para despejarte entre exámenes.',
          fechaInicio: '2026-11-25', horaInicio: '11:00', fechaFin: '2026-11-25', horaFin: '11:45',
          lugar: 'Explanada central', enlace: '', organizador: 'Deportes FMAT y DOCE',
          editado: '2026-11-06T17:40'
        },
        {
          id: 'charla-ayuda', nombre: 'Charla: pedir ayuda no es debilidad', estado: 'borrador', modalidad: 'presencial',
          descripcion: 'Conversación abierta con Psicología FMAT sobre los mitos que nos impiden buscar apoyo y cómo dar el primer paso.',
          fechaInicio: '2026-11-27', horaInicio: '10:00', fechaFin: '2026-11-27', horaFin: '11:30',
          lugar: 'Aula 5, edificio A', enlace: '', organizador: 'Psicología FMAT',
          editado: '2026-11-07T13:20'
        },
        {
          id: 'taller-mindfulness', nombre: 'Taller de mindfulness', estado: 'publicada', modalidad: 'presencial',
          descripcion: 'Práctica guiada de atención plena para cerrar el semestre con más calma. No necesitas experiencia.',
          fechaInicio: '2026-12-02', horaInicio: '12:00', fechaFin: '2026-12-02', horaFin: '13:30',
          lugar: 'Sala de usos múltiples, edificio B, planta alta', enlace: '', organizador: 'Psicología FMAT',
          editado: '2026-11-05T16:10'
        }
      ],

      /* estado: publicado | borrador | cancelado. La vigencia es opcional. */
      avisos: [
        {
          id: 'inscripciones-grupo', titulo: 'Inscripciones abiertas al grupo de apoyo', estado: 'publicado',
          contenido: 'Cupo de 12 personas. Inscríbete en el DOCE, planta alta, antes del 18 de noviembre.',
          publicado: '2026-11-06', vigencia: '2026-11-18', editado: '2026-11-06T09:00'
        },
        {
          id: 'horario-examenes', titulo: 'Horario de atención en periodo de exámenes', estado: 'publicado',
          contenido: 'Del 23 de noviembre al 4 de diciembre el DOCE atenderá de 8:00 a 17:00.',
          publicado: '2026-11-03', vigencia: '2026-12-04', editado: '2026-11-03T09:30'
        },
        {
          id: 'horario-extendido', titulo: 'Horario extendido del DOCE en exámenes', estado: 'borrador',
          contenido: 'Del 23 de noviembre al 4 de diciembre el DOCE atenderá de 8:00 a 17:00 en el edificio principal, planta alta.',
          publicado: '', vigencia: '', editado: '2026-11-07T10:40'
        }
      ],

      /* titulo = grado académico; no cuenta para el orden alfabético (RF05 CA7) */
      directorio: [
        {
          id: 'laura-medina', titulo: 'Mtra.', nombre: 'Laura Medina Ruiz', cargo: 'Coordinación del DOCE', area: 'orientacion',
          edificio: 'Edificio principal', planta: 'planta alta', espacio: 'cubículo 3', horario: 'Lunes a viernes, 8:00 a 15:00',
          correo: 'doce.fmat@correo.uady.mx', telefono: '999 942 3140, ext. 1101',
          descripcion: 'Coordina las actividades de bienestar de la facultad y canaliza solicitudes de orientación a la persona indicada.'
        },
        {
          id: 'carlos-rivas', titulo: 'Psic.', nombre: 'Carlos Rivas Pech', cargo: 'Atención psicológica', area: 'psicologia',
          edificio: 'Edificio principal', planta: 'planta alta', espacio: 'cubículo 5', horario: 'Lunes a jueves, 12:00 a 18:00',
          correo: 'carlos.rivas@correo.uady.mx', telefono: '',
          descripcion: 'Brinda atención psicológica individual y primera escucha.'
        },
        {
          id: 'andrea-mena', titulo: 'Mtra.', nombre: 'Andrea Mena Canul', cargo: 'Orientación vocacional', area: 'orientacion',
          edificio: 'Edificio B', planta: 'planta baja', espacio: 'cubículo 12', horario: 'Martes y jueves, 9:00 a 13:00',
          correo: 'andrea.mena@correo.uady.mx', telefono: '999 942 3140, ext. 1105',
          descripcion: 'Acompaña en la elección de carrera, los cambios de plan y las dudas vocacionales.'
        },
        {
          id: 'daniela-pool', titulo: 'Psic.', nombre: 'Daniela Pool Chan', cargo: 'Atención psicológica', area: 'psicologia',
          edificio: 'Edificio principal', planta: 'planta alta', espacio: 'cubículo 6', horario: 'Lunes, miércoles y viernes, 9:00 a 14:00',
          correo: 'daniela.pool@correo.uady.mx', telefono: '999 942 3140, ext. 1106',
          descripcion: 'Brinda atención psicológica individual y facilita los grupos de apoyo.'
        },
        {
          id: 'jorge-uc', titulo: 'Mtro.', nombre: 'Jorge Uc Tun', cargo: 'Orientación académica', area: 'orientacion',
          edificio: 'Edificio A', planta: 'planta baja', espacio: 'cubículo 2', horario: 'Lunes a viernes, 10:00 a 14:00',
          correo: 'jorge.uc@correo.uady.mx', telefono: '999 942 3140, ext. 1108',
          descripcion: 'Orienta sobre técnicas de estudio, carga académica y trámites escolares.'
        },
        {
          id: 'sofia-cauich', titulo: 'Lic.', nombre: 'Sofía Cauich May', cargo: 'Trabajo social', area: 'social',
          edificio: 'Edificio principal', planta: 'planta alta', espacio: 'cubículo 4', horario: 'Lunes a viernes, 8:00 a 13:00',
          correo: '', telefono: '999 942 3140, ext. 1103',
          descripcion: 'Apoya en situaciones familiares y económicas, y vincula con becas y servicios externos.'
        }
      ],

      /* ambito: universitario | local | estatal | nacional (una línea pertenece a un solo ámbito) */
      lineas: [
        {
          id: 'doce-fmat', nombre: 'Departamento de Orientación y Consejo Educativo', ambito: 'universitario',
          institucion: 'Facultad de Matemáticas, UADY', telefono: '999 942 3140, ext. 1101',
          apoyo: 'Orientación y primera escucha', horario: 'Lunes a viernes, 8:00 a 15:00', gratuita: true,
          sitio: '', correo: 'doce.fmat@correo.uady.mx', destacada: false, editado: '2026-11-02T10:00'
        },
        {
          id: 'servicio-universitario', nombre: '[Nombre del servicio universitario]', ambito: 'universitario',
          institucion: '[Institución responsable]', telefono: '[Número]',
          apoyo: '[Tipo de apoyo: atención psicológica, acompañamiento]', horario: '[Horario de atención]', gratuita: false,
          sitio: '', correo: '', destacada: false, editado: '2026-11-02T10:00'
        },
        {
          id: 'servicio-local', nombre: '[Nombre del servicio local]', ambito: 'local',
          institucion: '[Institución responsable]', telefono: '[Número]',
          apoyo: '[Tipo de apoyo]', horario: '[Horario de atención]', gratuita: false,
          sitio: '', correo: '', destacada: false, editado: '2026-11-02T10:00'
        },
        {
          id: 'servicio-estatal', nombre: '[Nombre del servicio estatal]', ambito: 'estatal',
          institucion: '[Institución responsable]', telefono: '[Número]',
          apoyo: '[Tipo de apoyo]', horario: '[Horario de atención]', gratuita: false,
          sitio: '', correo: '', destacada: false, editado: '2026-11-02T10:00'
        },
        {
          id: 'linea-vida', nombre: 'Línea de la Vida', ambito: 'nacional',
          institucion: 'Secretaría de Salud', telefono: '800 911 2000',
          apoyo: 'Escucha y orientación en crisis emocional y consumo de sustancias', horario: '24 horas, todos los días', gratuita: true,
          sitio: 'https://www.gob.mx/salud/conadic', correo: '', destacada: true, editado: '2026-11-02T10:00'
        },
        {
          id: 'saptel', nombre: 'SAPTEL', ambito: 'nacional',
          institucion: 'Sistema Nacional de Apoyo, Consejo Psicológico e Intervención en Crisis por Teléfono', telefono: '55 5259 8121',
          apoyo: 'Apoyo psicológico por teléfono', horario: '24 horas, todos los días', gratuita: true,
          sitio: 'https://www.saptel.org.mx', correo: '', destacada: true, editado: '2026-11-02T10:00'
        }
      ],

      /* tipo: folleto | video | documento. estado: publicado */
      materiales: [
        material('cuidar-de-ti', 'Cuidar de ti en la universidad', 'folleto', '2026-11-08', 'Autocuidado', 'DOCE FMAT',
          'Señales de alerta, estrategias para afrontar el estrés y lugares a los que puedes acudir dentro de la facultad.',
          'Este folleto reúne señales de alerta frecuentes, estrategias sencillas para afrontar el estrés y los lugares a los que puedes acudir dentro de la facultad cuando necesites apoyo.',
          { formato: 'PDF', tamano: '1.2 MB', paginas: 4 }),
        material('hablemos-bienestar', 'Hablemos de bienestar', 'video', '2026-11-07', 'Pedir ayuda', 'Psicología FMAT',
          'Psicología FMAT conversa con estudiantes sobre cómo pedir ayuda sin sentir culpa.',
          'Psicología FMAT conversa con estudiantes de distintas licenciaturas sobre cómo pedir ayuda sin sentir culpa y a dónde acudir dentro de la facultad.',
          { duracion: '8 min 32 s', plataforma: 'YouTube', origen: 'https://www.youtube.com/' }),
        material('guia-crisis', 'Guía para acompañar a una persona en crisis', 'documento', '2026-11-06', 'Crisis emocional', 'DOCE FMAT',
          'Qué decir, qué evitar y cómo canalizar a alguien con los servicios de apoyo de la facultad.',
          'Qué decir, qué evitar y cómo canalizar a alguien con los servicios de apoyo de la facultad. Pensada para estudiantes, docentes y personal.',
          { formato: 'PDF', tamano: '2.4 MB', paginas: 12 }),
        material('dormir-bien', 'Dormir bien también es estudiar', 'folleto', '2026-11-05', 'Sueño', 'Psicología FMAT',
          '', '', { formato: 'PDF', tamano: '860 KB', paginas: 2 }),
        material('pausa-clases', 'Una pausa entre clases', 'video', '2026-11-04', 'Respiración', 'Psicología FMAT',
          'Ejercicio guiado de respiración de cinco minutos para hacer entre una clase y otra.',
          'Ejercicio guiado de respiración de cinco minutos para hacer entre una clase y otra, sin necesidad de equipo.',
          { duracion: '5 min 10 s', plataforma: 'YouTube', origen: 'https://www.youtube.com/' }),
        material('protocolo-atencion', 'Protocolo de atención del DOCE', 'documento', '2026-11-03', 'Servicios', 'DOCE FMAT',
          'Cómo funciona la atención en el departamento y qué puedes esperar en tu primera cita.',
          'Cómo funciona la atención en el departamento, qué puedes esperar en tu primera cita y cómo se cuida la confidencialidad.',
          { formato: 'PDF', tamano: '640 KB', paginas: 8 }),
        material('ansiedad-examenes', 'Ansiedad ante los exámenes', 'folleto', '2026-10-30', 'Ansiedad', 'DOCE FMAT',
          'Cómo reconocer la ansiedad antes de un examen y qué hacer el día anterior.',
          'Cómo reconocer la ansiedad antes de un examen, qué hacer el día anterior y cómo retomar la calma durante la prueba.',
          { formato: 'PDF', tamano: '910 KB', paginas: 2 }),
        material('manejo-estres', 'Manejo del estrés: respira y organízate', 'video', '2026-10-26', 'Estrés', 'Psicología FMAT',
          'Tres técnicas breves para manejar el estrés en temporada de exámenes.',
          'Tres técnicas breves para manejar el estrés en temporada de exámenes, con ejemplos de estudiantes de la facultad.',
          { duracion: '6 min 45 s', plataforma: 'YouTube', origen: 'https://www.youtube.com/' }),
        material('redes-apoyo', 'Construye tu red de apoyo', 'documento', '2026-10-21', 'Redes de apoyo', 'Trabajo social FMAT',
          'Ejercicio escrito para identificar a las personas con las que cuentas.',
          'Ejercicio escrito para identificar a las personas e instituciones con las que cuentas y planear cómo acercarte a ellas.',
          { formato: 'PDF', tamano: '720 KB', paginas: 6 }),
        material('uso-pantallas', 'Pantallas y descanso', 'folleto', '2026-10-15', 'Sueño', 'Psicología FMAT',
          'Ideas para usar el celular sin que te quite horas de sueño.',
          'Ideas para usar el celular y la computadora sin que te quiten horas de sueño durante el semestre.',
          { formato: 'PDF', tamano: '780 KB', paginas: 2 }),
        material('mitos-terapia', 'Mitos sobre ir a terapia', 'video', '2026-10-09', 'Pedir ayuda', 'Psicología FMAT',
          'Cinco ideas equivocadas sobre la atención psicológica.',
          'Cinco ideas equivocadas sobre la atención psicológica, explicadas por el personal de Psicología FMAT.',
          { duracion: '7 min 02 s', plataforma: 'YouTube', origen: 'https://www.youtube.com/' }),
        material('primeros-auxilios', 'Primeros auxilios psicológicos', 'documento', '2026-10-02', 'Crisis emocional', 'DOCE FMAT',
          'Pasos básicos para apoyar a alguien después de un evento difícil.',
          'Pasos básicos para apoyar a alguien después de un evento difícil y saber cuándo pedir ayuda profesional.',
          { formato: 'PDF', tamano: '1.8 MB', paginas: 10 }),
        material('procrastinacion', 'Entender la procrastinación', 'folleto', '2026-09-24', 'Organización', 'Psicología FMAT',
          'Por qué postergamos y tres maneras de empezar.',
          'Por qué postergamos las tareas, qué emociones están detrás y tres maneras de empezar.',
          { formato: 'PDF', tamano: '840 KB', paginas: 2 }),
        material('duelo', 'Vivir un duelo en la universidad', 'documento', '2026-09-17', 'Duelo', 'Trabajo social FMAT',
          'Orientación para estudiantes que pasan por una pérdida.',
          'Orientación para estudiantes que pasan por una pérdida, con opciones de apoyo académico y emocional.',
          { formato: 'PDF', tamano: '1.1 MB', paginas: 8 }),
        material('protocolo-2025', 'Protocolo de atención del DOCE (versión 2025)', 'documento', '2025-08-18', 'Servicios', 'DOCE FMAT',
          'Versión anterior del protocolo de atención.', 'Versión anterior del protocolo de atención.',
          { formato: 'PDF', tamano: '590 KB', paginas: 7 })
      ],

      /* imagen: null = recuadro de ejemplo; las que suba el administrador son data URI */
      fotos: [
        foto('taller-manejo-estres', 'Taller de manejo del estrés', 'Estudiantes de todas las licenciaturas practicaron técnicas de respiración y organización del tiempo antes de la temporada de exámenes.', '2026-10-14'),
        foto('pausa-bienestar', 'Pausa por el bienestar', 'Ejercicios de estiramiento al aire libre.', '2026-10-09'),
        foto('encuentro-redes', 'Encuentro de redes de apoyo', 'Diálogo entre estudiantes y orientadores.', '2026-10-02'),
        foto('platica-sueno', 'Plática de sueño y estudio', 'Hábitos para dormir mejor.', '2026-09-25'),
        foto('cine-debate-foto', 'Cine-debate', 'Proyección y conversación sobre ansiedad en la vida universitaria.', '2026-09-18'),
        foto('feria', 'Feria de bienestar', 'Módulos informativos de los servicios de apoyo de la facultad.', '2026-09-11'),
        foto('taller-respiracion', 'Taller de respiración', 'Ejercicio de respiración guiada con estudiantes de primer semestre.', '2026-09-04'),
        foto('grupo-apoyo-foto', 'Grupo de apoyo', 'Cierre del grupo de apoyo del semestre anterior.', '2026-08-28'),
        foto('bienvenida', 'Bienvenida a nuevo ingreso', 'Presentación del DOCE a estudiantes de nuevo ingreso.', '2026-08-17')
      ],

      tutores: [
        {
          id: 'patricia-canche', titulo: 'Mtra.', nombre: 'Patricia Canché', cargo: 'Coordinación de tutorías',
          correo: 'tutorias.fmat@correo.uady.mx', extension: '1120', ubicacion: 'Edificio principal, planta alta, cubículo 8',
          horario: 'Lunes a viernes, 9:00 a 14:00', orientacion: 'Asignación de tutor, cambios de tutor y dudas generales del programa de tutorías.'
        },
        {
          id: 'luis-herrera', titulo: 'Dr.', nombre: 'Luis Herrera', cargo: 'Tutor · Ingeniería de Software',
          correo: 'luis.herrera@correo.uady.mx', extension: '1131', ubicacion: 'Edificio A, planta alta, cubículo 4',
          horario: 'Martes y jueves, 11:00 a 13:00', orientacion: 'Plan de estudios, prácticas profesionales y proyectos de Ingeniería de Software.'
        },
        {
          id: 'ana-vazquez', titulo: 'Mtra.', nombre: 'Ana Vázquez', cargo: 'Tutora · Ciencias de la Computación',
          correo: 'ana.vazquez@correo.uady.mx', extension: '1134', ubicacion: 'Edificio A, planta alta, cubículo 7',
          horario: 'Lunes y miércoles, 10:00 a 12:00', orientacion: 'Elección de optativas, movilidad y titulación en Ciencias de la Computación.'
        },
        {
          id: 'raul-montejo', titulo: 'Mtro.', nombre: 'Raúl Montejo', cargo: 'Tutor · Actuaría',
          correo: 'raul.montejo@correo.uady.mx', extension: '1142', ubicacion: 'Edificio B, planta baja, cubículo 3',
          horario: 'Viernes, 9:00 a 13:00', orientacion: 'Carga académica, certificaciones y servicio social en Actuaría.'
        }
      ],

      /* disponible: false = el archivo ya no existe (RF10 CA5) */
      guias: [
        { id: 'guia-software', titulo: 'Guía de carrera · Ingeniería de Software', formato: 'PDF', tamano: '1.4 MB', disponible: true },
        { id: 'guia-computacion', titulo: 'Guía vocacional · Ciencias de la Computación', formato: 'PDF', tamano: '980 KB', disponible: true },
        { id: 'guia-practicas', titulo: 'Guía de prácticas profesionales', formato: 'PDF', tamano: '2.1 MB', disponible: true },
        { id: 'guia-optativas', titulo: 'Guía para elegir optativas', formato: 'PDF', tamano: '760 KB', disponible: false }
      ],

      /* Historial que muestra el panel de administración (más reciente primero) */
      cambios: [
        { id: 'c3', icono: 'correcto', texto: 'Publicaste «Taller: manejo del estrés en exámenes»', momento: '2026-11-09T09:12' },
        { id: 'c2', icono: 'lapiz', texto: 'Editaste la fecha de «Pausa activa entre exámenes»', momento: '2026-11-06T17:40' },
        { id: 'c1', icono: 'prohibido', texto: 'Cancelaste «Cine-debate: hablemos de ansiedad»', momento: '2026-11-06T12:05' }
      ]
    };
  };

  function material(id, titulo, tipo, publicado, tematica, autor, resumen, descripcion, extra) {
    var m = {
      id: id, titulo: titulo, tipo: tipo, estado: 'publicado', publicado: publicado, tematica: tematica, autor: autor,
      resumen: resumen, descripcion: descripcion, formato: '', tamano: '', paginas: 0, idioma: 'Español',
      duracion: '', plataforma: '', origen: 'https://www.uady.mx/', miniatura: null, editado: publicado + 'T10:00'
    };
    Object.keys(extra).forEach(function (c) { m[c] = extra[c]; });
    return m;
  }

  function foto(id, titulo, descripcion, fecha) {
    return { id: id, titulo: titulo, descripcion: descripcion, fecha: fecha, imagen: null };
  }
})();
