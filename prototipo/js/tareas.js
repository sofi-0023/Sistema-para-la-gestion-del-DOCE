/* CONFIGURACIÓN DE LA PRUEBA DE USABILIDAD. Este archivo lo edita el equipo.

   Cada tarea:
     id, perfil        'estudiante' o 'personal'
     objetivo          para el equipo; el participante no lo ve
     instruccion       lo que lee el participante (un escenario, sin decir por dónde ir)
     limiteSegundos    límite de RNF01 (o referencia del equipo)
     limiteClics       máximo de clics desde inicio; null = no se mide
     rutaEsperada      pantallas por las que es normal pasar; las demás cuentan como «fuera de ruta»
     meta              cuándo se marca como lograda automáticamente. Una o varias de:
                         pantallas: ['/ruta']   llegar a una de esas pantallas
                         llamada: true          pulsar un botón de llamar
                         dato: { coleccion, igual: {...}, contiene: {...} }
                                                que exista un registro con esos datos
                                                (contiene acepta un texto o una lista de opciones)
     alTerminar        (opcional) también cuenta como lograda si pulsa «Terminé» estando en estas pantallas
     pregunta          (opcional) se pregunta al pulsar «Terminé» sin haber llegado a la meta:
                         { texto, respuestas: [...], telefonosDestacados: true, todas: [...] }
                         respuestas: basta una. todas: la respuesta debe incluir cada palabra
                         (una lista dentro de otra son opciones). El cronómetro se detiene al
                         pulsar «Terminé», no al responder.

   En las rutas: * = cualquier texto; {proxima} = identificador de la próxima actividad. */
(function () {
  'use strict';

  DOCE.prueba = DOCE.prueba || {};

  DOCE.prueba.bienvenida = [
    'Vas a usar un sitio del Departamento de Orientación y Consejo Educativo (DOCE). Se evalúa el sitio, no a ti: no hay respuestas buenas ni malas.',
    'Puedes pensar en voz alta mientras lo usas. Si una tarea se complica, puedes decir que no pudiste terminarla y seguir con la siguiente.',
    'No se guardan tu nombre ni tus datos personales, solo un código. La información del sitio es de ejemplo.'
  ];

  DOCE.prueba.despedida = 'Terminaste la prueba. Tus respuestas ayudan a mejorar el sitio. Avísale a la persona que te acompaña.';

  DOCE.prueba.tareas = [
    {
      id: 'T1', perfil: 'estudiante',
      objetivo: 'Encontrar el detalle de la próxima actividad (RF01, RF02, RNF01)',
      instruccion: 'Quieres ir a la próxima actividad del DOCE. Averigua dónde es, qué día y a qué hora.',
      limiteSegundos: 60, limiteClics: 3,
      rutaEsperada: ['/inicio', '/calendario', '/actividad/{proxima}'],
      meta: { pantallas: ['/actividad/{proxima}'] },
      // Inicio ya muestra estos datos: si termina ahí, se comprueba que los encontró
      pregunta: { texto: '¿Dónde es, qué día y a qué hora?', todas: ['aula magna', '12', ['16', '4', '4pm', 'cuatro']] }
    },
    {
      id: 'T2', perfil: 'estudiante',
      objetivo: 'Encontrar el horario y la ubicación de un orientador (RF05, RNF01)',
      instruccion: 'Necesitas hablar con Andrea Mena Canul. Averigua en qué edificio está y en qué horario atiende.',
      limiteSegundos: 60, limiteClics: 3,
      rutaEsperada: ['/inicio', '/directorio', '/directorio/andrea-mena'],
      meta: { pantallas: ['/directorio/andrea-mena'] },
      // La lista del directorio ya muestra estos datos
      pregunta: { texto: '¿En qué edificio está y en qué horario atiende?', todas: ['b', 'martes', 'jueves', ['9', '09', '9am', 'nueve']] }
    },
    {
      id: 'T3', perfil: 'estudiante',
      objetivo: 'Llegar a una línea de emergencia (RF06.2)',
      instruccion: 'Una amiga está pasando por un momento muy difícil y necesitas un número al que llamar ahora mismo.',
      limiteSegundos: 60, limiteClics: 3,
      rutaEsperada: ['/inicio', '/lineas'],
      meta: { pantallas: ['/lineas'], llamada: true },
      pregunta: { texto: '¿A qué número llamarías?', telefonosDestacados: true, respuestas: ['911'] }
    },
    {
      id: 'T4', perfil: 'estudiante',
      objetivo: 'Consultar un material informativo (RF07)',
      instruccion: 'Busca un video sobre manejo del estrés y ábrelo.',
      limiteSegundos: 60, limiteClics: 3,
      rutaEsperada: ['/inicio', '/material', '/material/manejo-estres'],
      meta: { pantallas: ['/material/manejo-estres'] }
    },
    {
      id: 'T5', perfil: 'personal',
      objetivo: 'Crear y publicar una actividad (RF11, RF03.1, RF03.2, RNF01)',
      instruccion: 'Eres parte del DOCE. Entra al sistema y publica la plática «Higiene del sueño» del 4 de diciembre a las 11:00 en el Auditorio, presencial, organizada por el DOCE. Usa las credenciales que te dieron en papel.',
      limiteSegundos: 180, limiteClics: null,
      rutaEsperada: ['/inicio', '/acceso', '/admin', '/admin/actividades', '/admin/actividades/nueva', '/admin/actividades/*/revisar', '/calendario'],
      meta: {
        dato: {
          coleccion: 'actividades',
          igual: { estado: 'publicada', fechaInicio: '2026-12-04', horaInicio: '11:00', modalidad: 'presencial' },
          contiene: { nombre: 'higiene del sueño', lugar: 'auditorio', organizador: ['doce', 'departamento de orientación'] }
        }
      }
    },
    {
      id: 'T6', perfil: 'personal',
      objetivo: 'Cancelar una actividad (RF04.2)',
      instruccion: 'La actividad «Taller de mindfulness» se canceló. Indícalo en el sistema.',
      limiteSegundos: 120, limiteClics: null,
      rutaEsperada: ['/inicio', '/acceso', '/admin', '/admin/actividades', '/admin/actividades/taller-mindfulness/editar', '/admin/actividades/taller-mindfulness/cancelar'],
      meta: { dato: { coleccion: 'actividades', igual: { id: 'taller-mindfulness', estado: 'cancelada' } } }
    }
  ];

  DOCE.prueba.facilidad = {
    pregunta: 'En general, ¿qué tan fácil o difícil fue esta tarea?',
    minimo: 'Muy difícil', maximo: 'Muy fácil', puntos: 7
  };

  /* Encuesta SUS: las impares son positivas y las pares negativas. Si se cambia por otra
     encuesta, poner sus: false para no calcular el puntaje. */
  DOCE.prueba.encuesta = {
    sus: true, puntos: 5, minimo: 'Totalmente en desacuerdo', maximo: 'Totalmente de acuerdo',
    preguntas: [
      'Creo que me gustaría usar este sitio con frecuencia.',
      'Encontré el sitio innecesariamente complejo.',
      'Pensé que el sitio era fácil de usar.',
      'Creo que necesitaría ayuda de una persona con conocimientos técnicos para usar este sitio.',
      'Encontré que las distintas funciones del sitio estaban bien integradas.',
      'Pensé que había demasiada inconsistencia en el sitio.',
      'Imagino que la mayoría de las personas aprendería a usar este sitio muy rápido.',
      'Encontré el sitio muy difícil de usar.',
      'Me sentí con confianza al usar el sitio.',
      'Necesité aprender muchas cosas antes de poder usar el sitio.'
    ],
    abiertas: [
      '¿Qué fue lo más fácil de hacer?',
      '¿Qué fue lo más difícil o confuso?',
      '¿Qué cambiarías o agregarías?'
    ]
  };

  // Meta de RNF01: porcentaje de personas que completa cada tarea sin ayuda
  DOCE.prueba.metaExito = 80;
})();
