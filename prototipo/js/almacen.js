/* Persistencia en localStorage. Cada lectura va al almacenamiento, así dos pestañas comparten
   datos y se puede comprobar el caso "otra persona lo eliminó". Si el navegador bloquea
   localStorage, los datos viven en memoria hasta cerrar la página. */
(function () {
  'use strict';

  var almacen = (DOCE.almacen = {});
  var memoria = {};
  var CLAVE_DATOS = 'datos';

  /* ---------- Claves sueltas (sesión, preferencias) ---------- */

  almacen.leer = function (clave, porOmision) {
    var texto;
    try { texto = localStorage.getItem(DOCE.config.prefijo + clave); } catch (e) { texto = null; }
    if (texto === null || texto === undefined) texto = memoria[clave];
    if (texto === undefined) return porOmision;
    try { return JSON.parse(texto); } catch (e) { return porOmision; }
  };

  // Devuelve false si no hay espacio; quien llama avisa y conserva lo capturado.
  almacen.escribir = function (clave, valor) {
    var texto = JSON.stringify(valor);
    try {
      localStorage.setItem(DOCE.config.prefijo + clave, texto);
      delete memoria[clave];
      return true;
    } catch (e) {
      if (e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) return false;
      memoria[clave] = texto;
      return true;
    }
  };

  almacen.borrar = function (clave) {
    delete memoria[clave];
    try { localStorage.removeItem(DOCE.config.prefijo + clave); } catch (e) { /* sin almacenamiento */ }
  };

  /* ---------- Colecciones ---------- */

  function cargar() {
    var guardado = almacen.leer(CLAVE_DATOS, null);
    if (guardado && guardado.version === DOCE.config.versionDatos && guardado.datos) return guardado.datos;
    var datos = DOCE.datosEjemplo();
    persistir(datos);
    return datos;
  }

  function persistir(datos) {
    return almacen.escribir(CLAVE_DATOS, { version: DOCE.config.versionDatos, datos: datos });
  }

  almacen.todos = function (coleccion) { return cargar()[coleccion] || []; };

  almacen.uno = function (coleccion, id) {
    return almacen.todos(coleccion).find(function (x) { return x.id === id; }) || null;
  };

  // Crea o reemplaza. Devuelve false si no hubo espacio.
  almacen.guardar = function (coleccion, objeto) {
    var datos = cargar();
    var lista = datos[coleccion] || (datos[coleccion] = []);
    var i = lista.findIndex(function (x) { return x.id === objeto.id; });
    if (i >= 0) lista[i] = objeto; else lista.push(objeto);
    return persistir(datos);
  };

  almacen.eliminar = function (coleccion, ids) {
    ids = [].concat(ids);
    var datos = cargar();
    datos[coleccion] = (datos[coleccion] || []).filter(function (x) { return ids.indexOf(x.id) < 0; });
    return persistir(datos);
  };

  almacen.restablecer = function () { return persistir(DOCE.datosEjemplo()); };

  almacen.registrarCambio = function (icono, texto) {
    var datos = cargar();
    datos.cambios.unshift({
      id: DOCE.util.nuevoId('cambio'), icono: icono, texto: texto,
      momento: DOCE.util.fecha.hoy() + 'T' + DOCE.util.fecha.horaActual()
    });
    datos.cambios = datos.cambios.slice(0, 12);
    persistir(datos);
  };
})();
