/* Configuración general. Todo el prototipo vive en el objeto global DOCE. */
(function () {
  'use strict';

  var DOCE = (window.DOCE = {});

  var busqueda = new URLSearchParams(window.location.search);

  // Fecha que el prototipo toma como "hoy". null = usar el reloj real.
  var HOY_FIJO = '2026-11-09';

  function fechaValida(texto) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto || '')) return false;
    var p = texto.split('-').map(Number);
    var f = new Date(p[0], p[1] - 1, p[2]);
    return f.getFullYear() === p[0] && f.getMonth() === p[1] - 1 && f.getDate() === p[2];
  }

  var hoyUrl = busqueda.get('hoy');
  var inactividad = Number(busqueda.get('inactividad'));

  DOCE.config = {
    hoy: fechaValida(hoyUrl) ? hoyUrl : HOY_FIJO,

    // Prefijo de localStorage. prueba.html usa otro para no mezclar datos.
    prefijo: document.documentElement.getAttribute('data-prefijo') || 'doce.',

    // Pantalla que se abre sin hash en la dirección.
    rutaInicial: document.documentElement.getAttribute('data-inicio') || '/inicio',

    // Al cambiar los datos de ejemplo se sube este número y se vuelven a cargar.
    versionDatos: 3,

    // RNF04. La sesión y el bloqueo usan siempre el reloj real.
    segundosInactividad: inactividad > 0 ? inactividad : 30 * 60,
    intentosMaximos: 5,
    minutosBloqueo: 15,

    // Credenciales de ejemplo del prototipo. El sistema real guarda solo el hash (RNF04).
    credenciales: { usuario: 'admin@doce.uady.mx', contrasena: 'Doce2026' },
    persona: { nombre: 'Laura', corto: 'Laura M.', cargo: 'Coordinación DOCE', iniciales: 'LM' }
  };

  DOCE.fechaValida = fechaValida;
  DOCE.parametrosUrl = busqueda;
})();
