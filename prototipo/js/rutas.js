/* Navegación por hash.

   DOCE.rutas.agregar('/actividad/:id', {
     titulo: 'Calendario' | function (ctx),   título de la pestaña del navegador
     seccion: 'calendario',                   sección marcada en el menú
     marco: 'publico' | 'admin' | 'limpio',
     franja: true | false,                    franja al final de la página pública
     vista: function (ctx) -> html,           contenido de la página
     montar: function (ctx, raiz),            conecta eventos de la vista
     capa: function (ctx) -> html | null,     diálogo o panel sobre la vista
     montarCapa: function (ctx, dialogo),
     volver: function (ctx) -> '#/...'        a dónde va al cerrar la capa
   })

   ctx = { ruta, params, consulta, estado, ir(ruta), conConsulta(cambios) } */
(function () {
  'use strict';

  var R = (DOCE.rutas = {});
  var tabla = [];
  var html = DOCE.util.html;
  var anterior = null;          // { definicion, hash }
  var origenCapa = '';          // enlace que abrió la capa, para devolverle el foco
  var mensajes = [];
  var estadoUrlUsado = false;

  R.agregar = function (patron, definicion) {
    var nombres = [];
    var expresion = patron.replace(/:(\w+)/g, function (_, n) { nombres.push(n); return '([^/]+)'; });
    tabla.push({ expresion: new RegExp('^' + expresion + '$'), nombres: nombres, def: definicion });
  };

  R.ir = function (ruta, reemplazar) {
    if (reemplazar) window.location.replace(ruta); else window.location.hash = ruta;
  };

  /* Mensajes que se muestran en la siguiente pantalla (resultado de una operación) */
  R.mensaje = function (m) { mensajes.push(m); };

  DOCE.anunciar = function (texto) {
    var lugar = document.getElementById('anuncios');
    lugar.textContent = '';
    window.setTimeout(function () { lugar.textContent = texto; }, 60);
  };

  function analizar() {
    var hash = window.location.hash || '#' + DOCE.config.rutaInicial;
    var partes = hash.slice(1).split('?');
    var ruta = partes[0].replace(/\/+$/, '') || DOCE.config.rutaInicial;
    var consulta = new URLSearchParams(partes.slice(1).join('?'));
    return { hash: hash, ruta: ruta, consulta: consulta };
  }

  function decodificar(texto) { try { return decodeURIComponent(texto); } catch (e) { return texto; } }

  function buscar(ruta) {
    for (var i = 0; i < tabla.length; i++) {
      var m = tabla[i].expresion.exec(ruta);
      if (!m) continue;
      var params = {};
      tabla[i].nombres.forEach(function (n, j) { params[n] = decodificar(m[j + 1]); });
      return { def: tabla[i].def, params: params };
    }
    return { def: R.noEncontrada, params: {} };
  }

  function armarHash(ruta, consulta) {
    var q = consulta.toString();
    return '#' + ruta + (q ? '?' + q : '');
  }

  R.dibujar = function () {
    var a = analizar();

    // index.html?estado=vacio#/calendario equivale a #/calendario?estado=vacio (solo la primera vez)
    var estadoUrl = DOCE.parametrosUrl.get('estado');
    if (estadoUrl && !estadoUrlUsado) {
      estadoUrlUsado = true;
      if (!a.consulta.get('estado')) {
        a.consulta.set('estado', estadoUrl);
        R.ir(armarHash(a.ruta, a.consulta), true);
        return;
      }
    }

    // Guarda del panel (RF11 CA8 y CA9, RNF04)
    if (a.ruta === '/admin' || a.ruta.indexOf('/admin/') === 0) {
      var s = DOCE.sesion.estado();
      if (s !== 'activa') {
        if (s === 'expirada') DOCE.sesion.cerrar();
        // RF06 CA21: operaciones sobre líneas de ayuda sin permisos
        var motivo = s === 'expirada' ? 'expirada' : /^\/admin\/lineas\/./.test(a.ruta) ? 'sin-permisos' : 'protegido';
        R.ir('#/acceso?estado=' + motivo + '&destino=' + encodeURIComponent(armarHash(a.ruta, a.consulta)), true);
        return;
      }
      DOCE.sesion.tocar();
    }

    var encontrada = buscar(a.ruta);
    var def = encontrada.def;
    var ctx = {
      ruta: a.ruta,
      params: encontrada.params,
      consulta: a.consulta,
      estado: a.consulta.get('estado') || '',
      ir: R.ir,
      // Dirección actual con cambios en los parámetros; null quita el parámetro
      conConsulta: function (cambios) {
        var q = new URLSearchParams(a.consulta);
        Object.keys(cambios).forEach(function (k) {
          if (cambios[k] === null || cambios[k] === '') q.delete(k); else q.set(k, cambios[k]);
        });
        return armarHash(a.ruta, q);
      }
    };

    pintar(def, ctx, a);
  };

  function pintar(def, ctx, a) {
    var app = document.getElementById('app');
    var marco = def.marco || 'publico';
    var C = DOCE.componentes;
    var foco = document.activeElement;
    var mismaBase = !!anterior && (anterior.def === def || (def.base && def.base === anterior.def.base));
    var scroll = window.scrollY;

    // Recuerda qué enlace abrió la capa
    if (def.capa && foco && foco.getAttribute && foco.getAttribute('href') && foco.closest('#app')) origenCapa = foco.getAttribute('href');

    cerrarCapas();

    var titulo = typeof def.titulo === 'function' ? def.titulo(ctx) : def.titulo;
    document.title = titulo + ' · DOCE FMAT';

    app.innerHTML = (marco === 'admin' ? C.marcoAdmin(def.seccion) : marco === 'limpio' ? C.marcoLimpio() : C.marcoPublico(def.seccion)).toString();

    var vista = app.querySelector('[data-vista]');
    var pendientes = mensajes;
    mensajes = [];

    try {
      vista.innerHTML = def.vista(ctx).toString();
    } catch (error) {
      console.error(error);
      vista.innerHTML = html`<div class="contenedor pagina"><h1 tabindex="-1">Ocurrió un error</h1>${C.errorConsulta({ titulo: 'No fue posible mostrar esta pantalla' })}</div>`.toString();
    }

    var lugarMensajes = vista.querySelector('[data-mensajes]');
    if (pendientes.length) {
      if (!lugarMensajes) {
        lugarMensajes = document.createElement('div');
        var h1 = vista.querySelector('h1');
        var cabeza = h1 && h1.closest('.pagina-cabeza, .admin-cabeza');
        if (cabeza) cabeza.after(lugarMensajes); else vista.prepend(lugarMensajes);
      }
      lugarMensajes.className = 'mensajes pila';
      lugarMensajes.innerHTML = pendientes.map(function (m) { return C.alerta(m); }).join('');
      DOCE.anunciar(pendientes.map(function (m) { return m.titulo + '. ' + (m.texto || ''); }).join(' '));
    }

    var franja = app.querySelector('[data-franja]');
    if (franja) {
      if (def.franja === false) franja.remove(); else franja.innerHTML = C.franja().toString();
    }

    conectarMarco(app, ctx);
    if (def.montar) def.montar(ctx, vista);

    var contenidoCapa = def.capa ? def.capa(ctx) : null;

    if (contenidoCapa) {
      if (mismaBase) window.scrollTo(0, scroll);
      abrirCapa(contenidoCapa, def, ctx);
    } else if (anterior) {
      if (anterior.conCapa && mismaBase) {
        window.scrollTo(0, scroll);
        devolverFoco(app);
      } else if (anterior.def === def && anterior.ruta === a.ruta) {
        // Misma pantalla con otro parámetro (filtro, mes, página): se conserva la posición
        window.scrollTo(0, scroll);
        devolverFocoFiltro(app, foco);
      } else {
        window.scrollTo(0, 0);
        enfocarTitulo(app);
      }
    }

    anterior = { def: def, ruta: a.ruta, conCapa: !!contenidoCapa };
    document.dispatchEvent(new CustomEvent('doce:pantalla', { detail: { hash: a.hash, ruta: a.ruta } }));
  }

  function enfocarTitulo(app) {
    var h1 = app.querySelector('h1');
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }

  function porHref(app, href) {
    return [].find.call(app.querySelectorAll('main a[href]'), function (e) { return e.getAttribute('href') === href; });
  }

  function devolverFoco(app) {
    var enlace = origenCapa && porHref(app, origenCapa);
    origenCapa = '';
    if (enlace) enlace.focus({ preventScroll: true }); else enfocarTitulo(app);
  }

  function devolverFocoFiltro(app, foco) {
    if (!foco || foco === document.body) return;
    var destino = (foco.id && document.getElementById(foco.id)) || (foco.getAttribute && foco.getAttribute('href') && porHref(app, foco.getAttribute('href')));
    if (destino) destino.focus({ preventScroll: true }); else enfocarTitulo(app);
  }

  /* ---------- Capas ---------- */

  function cerrarCapas() {
    [].forEach.call(document.querySelectorAll('#capa dialog'), function (d) {
      d.dataset.sinVolver = 'si';
      if (d.open) d.close();
    });
    document.getElementById('capa').innerHTML = '';
    // Confirmaciones sueltas que quedaron abiertas al cambiar de dirección
    [].forEach.call(document.querySelectorAll('body > dialog'), function (d) { if (d.open) d.close(); });
  }

  function abrirCapa(contenido, def, ctx) {
    var lugar = document.getElementById('capa');
    lugar.innerHTML = contenido.toString();
    var dialogo = lugar.querySelector('dialog');

    function cerrar() { R.ir(def.volver ? def.volver(ctx) : '#/inicio'); }

    dialogo.addEventListener('cancel', function (ev) {
      ev.preventDefault();
      if (dialogo.dataset.protegido !== 'si') cerrar();
      else dialogo.dispatchEvent(new CustomEvent('doce:cerrar'));
    });
    // Chrome puede cerrar sin permitir cancelar si se presiona Esc dos veces
    dialogo.addEventListener('close', function () { if (dialogo.dataset.sinVolver !== 'si') cerrar(); });
    dialogo.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-cerrar-capa]')) {
        if (dialogo.dataset.protegido === 'si') dialogo.dispatchEvent(new CustomEvent('doce:cerrar'));
        else cerrar();
        return;
      }
      // Clic fuera: solo en capas de consulta, para no perder lo capturado
      if (ev.target === dialogo && !dialogo.querySelector('form')) {
        var r = dialogo.getBoundingClientRect();
        if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) cerrar();
      }
    });

    conectarComun(dialogo, ctx);
    if (def.montarCapa) def.montarCapa(ctx, dialogo);
    dialogo.showModal();
    var h = dialogo.querySelector('#capa-titulo');
    if (h) h.focus();
  }

  /* ---------- Eventos comunes ---------- */

  function conectarComun(raiz, ctx) {
    [].forEach.call(raiz.querySelectorAll('[data-reintentar]'), function (b) {
      b.addEventListener('click', function () {
        var destino = ctx.conConsulta({ estado: null });
        if (destino === window.location.hash) R.dibujar(); else R.ir(destino);
      });
    });
  }

  function conectarMarco(app, ctx) {
    conectarComun(app, ctx);

    var saltar = app.querySelector('[data-saltar]');
    if (saltar) saltar.addEventListener('click', function (ev) {
      ev.preventDefault(); // el hash es de la navegación
      var destino = app.querySelector('#contenido');
      destino.focus();
      destino.scrollIntoView();
    });

    var menu = app.querySelector('.menu-movil');
    if (menu) {
      app.querySelector('[data-abrir-menu]').addEventListener('click', function () { menu.showModal(); });
      app.querySelector('[data-cerrar-menu]').addEventListener('click', function () { menu.close(); });
      // Si se elige la sección en la que ya está, no hay cambio de hash: solo se cierra
      menu.addEventListener('click', function (ev) { if (ev.target.closest('a')) menu.close(); });
    }

    var lateral = app.querySelector('.lateral');
    if (lateral) {
      var boton = app.querySelector('[data-abrir-lateral]');
      boton.addEventListener('click', function () {
        boton.setAttribute('aria-expanded', String(lateral.classList.toggle('abierto')));
      });
      lateral.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && lateral.classList.contains('abierto')) { boton.click(); boton.focus(); }
      });
      app.querySelector('[data-cerrar-sesion]').addEventListener('click', function () {
        DOCE.sesion.cerrar();
        R.ir('#/inicio?estado=sesion-cerrada'); // RF11 CA6: al inicio público
      });
    }

    [].forEach.call(app.querySelectorAll('[data-restablecer]'), function (b) {
      b.addEventListener('click', function () {
        DOCE.componentes.confirmar({
          titulo: '¿Restablecer los datos de ejemplo?',
          texto: 'Se perderán los cambios que hiciste en el prototipo. La sesión no se cierra.',
          icono: 'restablecer', si: 'Restablecer datos'
        }).then(function (si) {
          if (!si) return;
          DOCE.almacen.restablecer();
          R.mensaje({ tipo: 'exito', titulo: 'Datos de ejemplo restablecidos', texto: 'El prototipo volvió a su contenido inicial.' });
          R.dibujar();
          window.scrollTo(0, 0);
        });
      });
    });
  }

  R.iniciar = function () {
    window.addEventListener('hashchange', R.dibujar);
    // Al volver con «Atrás» desde la caché del navegador se revisa la sesión otra vez
    window.addEventListener('pageshow', function (ev) { if (ev.persisted) R.dibujar(); });
    ['click', 'keydown', 'input'].forEach(function (tipo) {
      document.addEventListener(tipo, function (ev) {
        if (!/^#\/admin(\/|\?|$)/.test(window.location.hash)) return;
        // RF11 CA7: con la sesión vencida, la siguiente acción lleva al acceso
        if (!DOCE.sesion.activa()) {
          ev.preventDefault();
          ev.stopPropagation();
          R.dibujar();
        } else {
          DOCE.sesion.tocar();
        }
      }, true);
    });
    R.dibujar();
  };
})();
