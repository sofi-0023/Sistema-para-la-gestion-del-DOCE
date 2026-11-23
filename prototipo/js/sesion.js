/* Sesión del administrador (RF11, RNF04). Usa el reloj real.
   Es una simulación: en el sistema real la sesión y las credenciales se validan en el servidor. */
(function () {
  'use strict';

  var sesion = (DOCE.sesion = {});
  var CLAVE = 'sesion';

  function ahora() { return Date.now(); }
  function limite() { return DOCE.config.segundosInactividad * 1000; }

  // 'activa' | 'expirada' | 'ninguna'
  sesion.estado = function () {
    var s = DOCE.almacen.leer(CLAVE, null);
    if (!s || typeof s.ultima !== 'number') return 'ninguna';
    return ahora() - s.ultima > limite() ? 'expirada' : 'activa';
  };

  sesion.activa = function () { return sesion.estado() === 'activa'; };

  sesion.abrir = function () { DOCE.almacen.escribir(CLAVE, { ultima: ahora() }); };

  sesion.cerrar = function () { DOCE.almacen.borrar(CLAVE); };

  // Registra actividad; como mucho una escritura cada segundo.
  var ultimoRegistro = 0;
  sesion.tocar = function () {
    if (ahora() - ultimoRegistro < 1000) return;
    if (!sesion.activa()) return;
    ultimoRegistro = ahora();
    sesion.abrir();
  };
})();
