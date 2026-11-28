/* Motor del modo de prueba. Solo lo carga prueba.html; index.html no lo conoce.
   Se apoya en dos avisos del prototipo: doce:pantalla (cambio de pantalla) y doce:errores (validación). */
(function () {
  'use strict';

  var P = DOCE.prueba;
  var R = DOCE.rutas;
  var C = DOCE.componentes;
  var FM = DOCE.formulario;
  var U = DOCE.util;
  var html = U.html;
  var icono = DOCE.icono;

  /* ---------- Estado de la sesión ---------- */

  var CURSO = 'sesion-en-curso';
  var SESIONES = 'sesiones';

  function curso() { return DOCE.almacen.leer(CURSO, null); }
  function sesiones() { return DOCE.almacen.leer(SESIONES, []); }
  function guardarCurso(s) { return DOCE.almacen.escribir(CURSO, s); }
  function guardarSesion(s) {
    var lista = sesiones();
    var i = lista.findIndex(function (x) { return x.id === s.id; });
    if (i >= 0) lista[i] = s; else lista.push(s);
    return DOCE.almacen.escribir(SESIONES, lista);
  }

  function tareasDe(perfil) { return P.tareas.filter(function (t) { return t.perfil === perfil; }); }
  function tareaPorId(id) { return P.tareas.find(function (t) { return t.id === id; }); }
  function tareaActual(s) { return tareasDe(s.perfil)[s.indice]; }
  function enTarea() { var s = curso(); return s && s.paso === 'haciendo' ? s : null; }

  var RUTA_PASO = { bienvenida: '#/prueba/bienvenida', instruccion: '#/prueba/tarea', haciendo: '#/inicio', facilidad: '#/prueba/facilidad', encuesta: '#/prueba/encuesta', cierre: '#/prueba/cierre' };

  function pasar(s, paso) {
    s.paso = paso;
    guardarCurso(s);
    R.ir(RUTA_PASO[paso]);
  }

  function restablecerPrototipo() {
    DOCE.almacen.restablecer();
    DOCE.sesion.cerrar();
    DOCE.almacen.borrar('intentos');
  }

  /* ---------- Metas ---------- */

  function rutaReal(patron) {
    var p = DOCE.modelo.proximaActividad();
    return patron.replace('{proxima}', p ? p.id : '');
  }
  function coincide(ruta, patrones) {
    return (patrones || []).some(function (patron) {
      var exp = rutaReal(patron).replace(/[.+?^$()|[\]\\{}]/g, '\\$&').replace(/\*/g, '[^/]+');
      return new RegExp('^' + exp + '$').test(ruta);
    });
  }
  function rutaActual() { return (window.location.hash || '#').slice(1).split('?')[0]; }

  function datoCumple(d) {
    return DOCE.almacen.todos(d.coleccion).some(function (o) {
      return Object.keys(d.igual || {}).every(function (k) { return o[k] === d.igual[k]; }) &&
        Object.keys(d.contiene || {}).every(function (k) {
          return [].concat(d.contiene[k]).some(function (t) { return U.normalizar(o[k]).indexOf(U.normalizar(t)) >= 0; });
        });
    });
  }

  function metaLograda(t, ruta) {
    var m = t.meta || {};
    return (m.pantallas && coincide(ruta, m.pantallas)) || (m.dato && datoCumple(m.dato)) || false;
  }

  // Texto por palabras, para que «b» no coincida dentro de «buscar»
  function palabras(t) { return ' ' + U.normalizar(t).replace(/[^a-z0-9ñ]+/g, ' ').trim() + ' '; }

  function respuestaCorrecta(p, texto) {
    if (p.todas) {
      return p.todas.every(function (x) {
        return [].concat(x).some(function (o) { return palabras(texto).indexOf(palabras(o)) >= 0; });
      });
    }
    var digitos = texto.replace(/\D/g, '');
    var validos = (p.respuestas || []).slice();
    if (p.telefonosDestacados) DOCE.almacen.todos('lineas').forEach(function (l) { if (l.destacada) validos.push(l.telefono); });
    return validos.some(function (v) {
      var n = v.replace(/\D/g, '');
      return n ? digitos === n : U.normalizar(texto).indexOf(U.normalizar(v)) >= 0;
    });
  }

  /* ---------- Registro durante la tarea ---------- */

  function nuevoRegistro(t) {
    return { id: t.id, inicio: Date.now(), fin: 0, lograda: false, forma: '', clics: 0, ruta: [], fueraDeRuta: 0, errores: 0, facilidad: null, respuesta: '', ayuda: false, nota: '' };
  }

  function lograr(s, forma) {
    var r = s.registro;
    if (r.fin) return;
    r.fin = Date.now();
    delete r.pausa;
    preguntando = false;
    r.lograda = true;
    r.forma = forma;
    guardarCurso(s);
    pintarBarra();
  }

  document.addEventListener('doce:pantalla', function (ev) {
    var s = enTarea();
    if (!s || !s.registro || s.registro.fin) { pintarBarra(); return; }
    var ruta = ev.detail.ruta;
    if (ruta.indexOf('/prueba') === 0) return;
    var r = s.registro;
    // Cambiar de filtro o de mes no es otra pantalla
    if (!r.ruta.length || r.ruta[r.ruta.length - 1] !== ruta) {
      r.ruta.push(ruta);
      if (!coincide(ruta, tareaActual(s).rutaEsperada)) r.fueraDeRuta++;
    }
    guardarCurso(s);
    if (metaLograda(tareaActual(s), ruta)) lograr(s, 'automática');
    pintarBarra();
  });

  document.addEventListener('doce:errores', function (ev) {
    var s = enTarea();
    if (!s || s.registro.fin) return;
    s.registro.errores += ev.detail.campos.length;
    guardarCurso(s);
  });

  // Clics en enlaces y botones del prototipo, sin contar la barra. Enter y Espacio cuentan igual.
  document.addEventListener('click', function (ev) {
    var e = ev.target.closest ? ev.target.closest('a[href], button') : null;
    if (!e || e.closest('#barra-prueba') || e.hasAttribute('data-descarga')) return;
    var s = enTarea();
    var href = e.getAttribute('href') || '';
    if (s && !s.registro.fin) { s.registro.clics++; guardarCurso(s); }
    if (/^(tel|mailto|https?):/i.test(href)) {
      ev.preventDefault();
      avisar('En la prueba no se hacen llamadas, no se envían correos ni se abren otros sitios.');
      if (s && /^tel:/i.test(href) && (tareaActual(s).meta || {}).llamada) lograr(s, 'automática');
    }
  }, true);

  /* ---------- Barra de la tarea ---------- */

  var barra = document.createElement('div');
  barra.id = 'barra-prueba';
  barra.setAttribute('role', 'region');
  barra.setAttribute('aria-label', 'Tarea de la prueba');
  var barraEstado = '';
  var visible = true;
  var preguntando = false;

  function pintarBarra() {
    var s = enTarea();
    document.body.classList.toggle('en-tarea', !!s);
    if (!s) { barra.remove(); barraEstado = ''; preguntando = false; return; }
    var t = tareaActual(s);
    var listo = s.registro.lograda;
    var estado = [s.id, t.id, listo, preguntando, visible].join('|');
    if (estado !== barraEstado) {
      barraEstado = estado;
      barra.innerHTML = html`
        <div class="barra-cabeza"><p class="barra-titulo">Tarea ${s.indice + 1} de ${tareasDe(s.perfil).length}</p>
          <button type="button" class="boton boton-fantasma" data-ver aria-expanded="${String(visible)}" aria-controls="barra-texto">${visible ? 'Ocultar' : 'Ver'} instrucción</button></div>
        <p class="barra-texto" id="barra-texto"${visible ? '' : html` hidden`}>${t.instruccion}</p>
        <p class="barra-aviso" role="status" data-aviso></p>
        ${listo ? html`<div class="barra-acciones"><p class="barra-listo">${icono('correcto')}¡Listo! Completaste la tarea.</p><button type="button" class="boton boton-primario" data-continuar>Continuar</button></div>`
          : preguntando ? html`<form class="barra-acciones" data-pregunta><div class="campo barra-campo"><label for="barra-respuesta">${t.pregunta.texto}</label><input type="text" id="barra-respuesta" autocomplete="off"></div>
              <button type="submit" class="boton boton-primario">Responder</button><button type="button" class="boton boton-secundario" data-seguir>Seguir con la tarea</button></form>`
          : html`<div class="barra-acciones"><button type="button" class="boton boton-primario" data-termine>Terminé</button><button type="button" class="boton boton-secundario" data-no-pude>No pude terminarla</button></div>`}`.toString();
      if (preguntando) barra.querySelector('input').focus();
    }
    colocar();
  }

  function avisar(texto) {
    var lugar = barra.querySelector('[data-aviso]');
    if (!barra.isConnected || !lugar) { DOCE.anunciar(texto); return; }
    lugar.textContent = texto;
    window.setTimeout(function () { lugar.textContent = ''; }, 5000);
  }

  // Un diálogo modal deja inerte lo demás, así que la barra se mueve dentro del que esté encima.
  function colocar() {
    if (!enTarea()) return;
    var abiertos = ['body > dialog[open]', '#capa dialog[open]', '.menu-movil[open]'].map(function (q) { return document.querySelector(q); }).filter(Boolean);
    var destino = abiertos[0] || document.body;
    if (barra.parentNode !== destino) {
      if (destino === document.body) destino.insertBefore(barra, destino.firstChild); else destino.appendChild(barra);
    }
    document.documentElement.style.setProperty('--alto-barra', barra.offsetHeight + 'px');
  }
  new MutationObserver(colocar).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] });
  if (window.ResizeObserver) new ResizeObserver(colocar).observe(barra);

  function cerrarTarea(forma, lograda, respuesta) {
    var s = enTarea();
    if (!s) return;
    var r = s.registro;
    if (!r.fin) { r.fin = r.pausa || Date.now(); delete r.pausa; r.lograda = !!lograda; r.forma = forma; r.respuesta = respuesta || ''; }
    preguntando = false;
    pasar(s, 'facilidad');
  }

  barra.addEventListener('click', function (ev) {
    var s = enTarea();
    var b = ev.target.closest('button');
    if (!b || !s) return;
    // Que el diálogo que contiene a la barra no interprete el clic
    ev.stopPropagation();
    var t = tareaActual(s);
    if (b.hasAttribute('data-ver')) { visible = !visible; pintarBarra(); barra.querySelector('[data-ver]').focus(); }
    if (b.hasAttribute('data-continuar')) cerrarTarea();
    if (b.hasAttribute('data-no-pude')) cerrarTarea('se rindió', false);
    if (b.hasAttribute('data-seguir')) { preguntando = false; delete s.registro.pausa; guardarCurso(s); pintarBarra(); }
    if (b.hasAttribute('data-termine')) {
      if (coincide(rutaActual(), t.alTerminar)) cerrarTarea('terminé', true);
      else if (t.pregunta) { preguntando = true; s.registro.pausa = Date.now(); guardarCurso(s); pintarBarra(); }
      else cerrarTarea('terminé', false);
    }
  });
  barra.addEventListener('submit', function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var s = enTarea();
    var texto = U.limpio(barra.querySelector('input').value);
    if (!s || !texto) return;
    cerrarTarea('terminé', respuestaCorrecta(tareaActual(s).pregunta, texto), texto);
  });

  /* ---------- Pantallas ---------- */

  function pagina(contenido, ancho) { return html`<div class="contenedor pagina prueba-pagina${ancho ? ' prueba-ancha' : ''}">${contenido}</div>`; }

  // Cada paso tiene su pantalla. Si la dirección no corresponde al paso, se va al paso.
  function paso(patron, nombre, titulo, d) {
    R.agregar(patron, {
      titulo: titulo, marco: 'limpio',
      vista: function (ctx) { var s = curso(); return s && s.paso === nombre ? d.vista(s, ctx) : html`<h1 class="solo-lector">Prueba</h1>`; },
      montar: function (ctx, raiz) {
        var s = curso();
        if (!s) { R.ir('#/prueba', true); return; }
        if (s.paso !== nombre) { R.ir(RUTA_PASO[s.paso], true); return; }
        pintarBarra();
        if (d.montar) d.montar(s, raiz);
      }
    });
  }

  function al(raiz, selector, fn) { var e = raiz.querySelector(selector); if (e) e.addEventListener('click', fn); }

  function escala(nombre, puntos, minimo, maximo, pregunta, numero) {
    var valores = [];
    for (var i = 1; i <= puntos; i++) valores.push(i);
    return html`<fieldset class="campo escala" data-campo="${nombre}"><legend>${numero ? numero + '. ' : ''}${pregunta}</legend>
      <div class="escala-opciones">${valores.map(function (v) {
        return html`<label class="escala-opcion"><input type="radio" name="${nombre}" value="${v}"><span>${v}</span>${v === 1 ? html`<span class="solo-lector"> (${minimo})</span>` : v === puntos ? html`<span class="solo-lector"> (${maximo})</span>` : ''}</label>`;
      })}</div>
      <div class="escala-extremos" aria-hidden="true"><span>1 = ${minimo}</span><span>${puntos} = ${maximo}</span></div></fieldset>`;
  }

  /* Facilitador */

  function siguienteCodigo() {
    var mayor = sesiones().reduce(function (m, s) { return Math.max(m, Number(s.codigo.slice(1)) || 0); }, 0);
    return 'P' + ('0' + (mayor + 1)).slice(-Math.max(2, String(mayor + 1).length));
  }

  R.agregar('/prueba', {
    titulo: 'Prueba de usabilidad', marco: 'limpio',
    vista: function () {
      var s = curso();
      var movil = window.matchMedia('(max-width: 767px)').matches;
      return pagina(html`
        <div class="pagina-cabeza"><h1 tabindex="-1">Prueba de usabilidad</h1><p class="entrada">Pantalla del facilitador. Solo se guarda un código por participante, nunca su nombre.</p></div>
        <div class="mensajes" data-mensajes></div>
        ${s ? html`<section class="tarjeta pila" aria-labelledby="curso-t"><h2 id="curso-t">Sesión en curso: ${s.codigo}</h2>
            <p class="secundario">Quedó a medias. Puedes continuarla o descartarla.</p>
            <div class="fila"><button type="button" class="boton boton-primario" data-continuar-sesion>Continuar</button><button type="button" class="boton boton-secundario" data-descartar>Descartar</button></div></section>`
          : html`<form class="tarjeta pila formulario" novalidate data-nueva>
            <h2>Nueva sesión</h2>
            <div data-resumen></div>
            ${C.campo({ id: 'codigo', etiqueta: 'Código del participante', obligatorio: true, valor: siguienteCodigo(), ayuda: 'Por ejemplo P01, P02. No escribas nombres.' })}
            <fieldset class="campo" data-campo="perfil"><legend>Perfil *</legend><div class="segmentos">
              <label class="segmento"><input type="radio" name="perfil" value="estudiante" checked>Estudiante (${tareasDe('estudiante').length} tareas)</label>
              <label class="segmento"><input type="radio" name="perfil" value="personal">Personal del DOCE (${tareasDe('personal').length} tareas)</label></div></fieldset>
            <fieldset class="campo" data-campo="dispositivo"><legend>Dispositivo *</legend><div class="segmentos">
              <label class="segmento"><input type="radio" name="dispositivo" value="escritorio"${movil ? '' : html` checked`}>Escritorio</label>
              <label class="segmento"><input type="radio" name="dispositivo" value="celular"${movil ? html` checked` : ''}>Celular</label></div></fieldset>
            <p class="nota">Al comenzar se restablecen los datos de ejemplo y se cierra la sesión del panel. Para el perfil de personal, entrega en papel: ${DOCE.config.credenciales.usuario} / ${DOCE.config.credenciales.contrasena}.</p>
            <div class="form-pie"><button type="button" class="boton boton-secundario" data-restablecer-prueba>${icono('restablecer')}Restablecer datos</button><button type="submit" class="boton boton-primario">Comenzar sesión</button></div>
          </form>`}
        ${resultados()}`, true);
    },
    montar: function (ctx, raiz) {
      if (enTarea()) { R.ir('#/inicio', true); return; }
      pintarBarra();
      al(raiz, '[data-continuar-sesion]', function () { R.ir(RUTA_PASO[curso().paso]); });
      al(raiz, '[data-descartar]', function () {
        C.confirmar({ titulo: '¿Descartar la sesión en curso?', texto: 'Se perderá lo registrado hasta ahora.', icono: 'basura', tono: 'error', si: 'Descartar', peligro: true }).then(function (si) {
          if (si) { DOCE.almacen.borrar(CURSO); R.dibujar(); }
        });
      });
      al(raiz, '[data-restablecer-prueba]', function () {
        restablecerPrototipo();
        R.mensaje({ tipo: 'exito', titulo: 'Datos de ejemplo restablecidos', texto: 'El prototipo quedó igual para la siguiente persona. Los resultados no se borraron.' });
        R.dibujar();
      });
      al(raiz, '[data-csv]', function () { descargar('prueba-doce.csv', csv(), 'text/csv;charset=utf-8'); });
      al(raiz, '[data-json]', function () { descargar('prueba-doce.json', JSON.stringify(sesiones(), null, 2), 'application/json'); });

      var form = raiz.querySelector('[data-nueva]');
      if (!form) return;
      FM.vigilar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        var codigo = d.codigo.toUpperCase();
        var e = {};
        if (!/^P\d{2,3}$/.test(codigo)) e.codigo = 'Usa la letra P y dos o tres números, por ejemplo P01.';
        else if (sesiones().some(function (s) { return s.codigo === codigo && s.perfil === d.perfil; })) e.codigo = 'Ya hay una sesión con ese código y perfil.';
        if (!FM.mostrar(form, e)) return;
        restablecerPrototipo();
        visible = true;
        var s = { id: U.nuevoId(codigo), codigo: codigo, perfil: d.perfil, dispositivo: d.dispositivo, ancho: window.innerWidth, fecha: new Date().toISOString(), indice: 0, registro: null, tareas: [], sus: [], puntajeSus: null, abiertas: [] };
        pasar(s, 'bienvenida');
      });
    }
  });

  paso('/prueba/bienvenida', 'bienvenida', 'Bienvenida', {
    vista: function () {
      return pagina(html`<div class="tarjeta pila prueba-tarjeta"><h1 tabindex="-1">Gracias por participar</h1>
        ${P.bienvenida.map(function (t) { return html`<p class="entrada">${t}</p>`; })}
        <div><button type="button" class="boton boton-primario" data-empezar>Empezar</button></div></div>`);
    },
    montar: function (s, raiz) { al(raiz, '[data-empezar]', function () { pasar(s, 'instruccion'); }); }
  });

  paso('/prueba/tarea', 'instruccion', 'Tarea', {
    vista: function (s) {
      var t = tareaActual(s);
      return pagina(html`<div class="tarjeta pila prueba-tarjeta"><p class="nota">Tarea ${s.indice + 1} de ${tareasDe(s.perfil).length}</p>
        <h1 tabindex="-1" class="prueba-instruccion">${t.instruccion}</h1>
        <p class="secundario">Al empezar se abre el sitio. Arriba verás esta instrucción y dos botones: «Terminé» y «No pude terminarla».</p>
        <div><button type="button" class="boton boton-primario" data-empezar>Empezar tarea</button></div></div>`);
    },
    montar: function (s, raiz) {
      al(raiz, '[data-empezar]', function () {
        s.registro = nuevoRegistro(tareaActual(s));
        visible = true;
        pasar(s, 'haciendo');
      });
    }
  });

  paso('/prueba/facilidad', 'facilidad', 'Facilidad de la tarea', {
    vista: function () {
      var f = P.facilidad;
      return pagina(html`<form class="tarjeta pila prueba-tarjeta" novalidate><h1 tabindex="-1" class="prueba-instruccion">Sobre la tarea que acabas de hacer</h1>
        <div data-resumen></div>${escala('facilidad', f.puntos, f.minimo, f.maximo, f.pregunta)}
        <div><button type="submit" class="boton boton-primario">Continuar</button></div></form>`);
    },
    montar: function (s, raiz) {
      var form = raiz.querySelector('form');
      FM.vigilar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var v = FM.leer(form).facilidad;
        if (!FM.mostrar(form, v ? {} : { facilidad: 'Elige un número del 1 al ' + P.facilidad.puntos + '.' }, { titulo: 'Falta tu respuesta', texto: 'Elige una opción para continuar.' })) return;
        s.registro.facilidad = Number(v);
        s.tareas.push(s.registro);
        s.registro = null;
        s.indice++;
        pasar(s, s.indice < tareasDe(s.perfil).length ? 'instruccion' : 'encuesta');
      });
    }
  });

  paso('/prueba/encuesta', 'encuesta', 'Encuesta de satisfacción', {
    vista: function () {
      var e = P.encuesta;
      return pagina(html`<form class="pila" novalidate><div><h1 tabindex="-1">Encuesta de satisfacción</h1><p class="entrada">Responde según tu experiencia con el sitio. 1 = ${e.minimo.toLowerCase()}; ${e.puntos} = ${e.maximo.toLowerCase()}.</p></div>
        <div data-resumen></div>
        ${e.preguntas.map(function (p, i) { return html`<div class="tarjeta">${escala('p' + (i + 1), e.puntos, e.minimo, e.maximo, p, i + 1)}</div>`; })}
        ${e.abiertas.map(function (p, i) { return html`<div class="tarjeta">${C.campo({ id: 'a' + (i + 1), etiqueta: p, tipo: 'area', ayuda: 'Opcional. No escribas tu nombre.' })}</div>`; })}
        <div><button type="submit" class="boton boton-primario">Enviar respuestas</button></div></form>`);
    },
    montar: function (s, raiz) {
      var form = raiz.querySelector('form');
      FM.vigilar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        var e = {};
        P.encuesta.preguntas.forEach(function (_, i) { if (!d['p' + (i + 1)]) e['p' + (i + 1)] = 'Responde la pregunta ' + (i + 1) + '.'; });
        if (!FM.mostrar(form, e, { titulo: 'Faltan respuestas', texto: 'Responde las preguntas marcadas para continuar.' })) return;
        s.sus = P.encuesta.preguntas.map(function (_, i) { return Number(d['p' + (i + 1)]); });
        s.puntajeSus = P.encuesta.sus ? P.calcularSus(s.sus) : null;
        s.abiertas = P.encuesta.abiertas.map(function (_, i) { return d['a' + (i + 1)]; });
        s.paso = 'cierre';
        if (!guardarSesion(s)) {
          FM.aviso(form, { tipo: 'error', titulo: 'No se pudieron guardar los resultados', texto: 'El almacenamiento del navegador está lleno. Descarga y borra sesiones anteriores e inténtalo de nuevo.' });
          return;
        }
        pasar(s, 'cierre');
      });
    }
  });

  // Impares: respuesta - 1. Pares: 5 - respuesta. Suma x 2.5
  P.calcularSus = function (r) {
    return r.reduce(function (t, v, i) { return t + (i % 2 === 0 ? v - 1 : 5 - v); }, 0) * 2.5;
  };

  paso('/prueba/cierre', 'cierre', 'Fin de la prueba', {
    vista: function () {
      return pagina(html`<div class="tarjeta pila prueba-tarjeta"><span class="redondo">${icono('correcto', 'icono-l')}</span><h1 tabindex="-1">¡Muchas gracias!</h1><p class="entrada">${P.despedida}</p>
        <div class="form-pie"><button type="button" class="boton boton-secundario" data-resumen-sesion>Facilitador: ver resumen</button></div></div>`);
    },
    montar: function (s, raiz) {
      al(raiz, '[data-resumen-sesion]', function () {
        var id = s.id;
        DOCE.almacen.borrar(CURSO);
        R.ir('#/prueba/sesion/' + id);
      });
    }
  });

  /* ---------- Resultados ---------- */

  function segundos(r) { return Math.round((r.fin - r.inicio) / 100) / 10; }
  function exito(r) { return r.lograda && !r.ayuda; }
  function mediana(l) {
    if (!l.length) return null;
    l = l.slice().sort(function (a, b) { return a - b; });
    var m = Math.floor(l.length / 2);
    return l.length % 2 ? l[m] : (l[m - 1] + l[m]) / 2;
  }
  function promedio(l) { return l.length ? l.reduce(function (a, b) { return a + b; }, 0) / l.length : null; }
  function num(n, sufijo) { return n === null || n === undefined ? '—' : String(Math.round(n * 10) / 10) + (sufijo || ''); }

  function resultados() {
    var lista = sesiones();
    if (!lista.length) return html`<section class="prueba-seccion" aria-labelledby="res-t"><h2 id="res-t">Resultados</h2><p class="tarjeta secundario">Aún no hay sesiones terminadas en este navegador.</p></section>`;
    var sus = lista.map(function (s) { return s.puntajeSus; }).filter(function (v) { return v !== null; });
    return html`<section class="prueba-seccion" aria-labelledby="res-t">
      <div class="fila separados"><h2 id="res-t">Resultados (${U.plural(lista.length, 'sesión', 'sesiones')})</h2>
        <div class="fila"><button type="button" class="boton boton-secundario" data-csv>${icono('descarga')}Descargar CSV</button><button type="button" class="boton boton-secundario" data-json>${icono('descarga')}Descargar JSON</button></div></div>
      <p class="secundario">Descarga antes de cerrar: los resultados se pierden si se borran los datos del navegador. SUS promedio: <strong>${num(promedio(sus))}</strong> (referencia: 68).</p>
      <div class="tarjeta"><h3 class="titulo-4">Por tarea</h3><table class="tabla"><caption class="solo-lector">Indicadores por tarea</caption>
        <thead><tr><th scope="col">Tarea</th><th scope="col">Éxito sin ayuda</th><th scope="col">Tiempo (mediana)</th><th scope="col">Clics (mediana)</th><th scope="col">Facilidad</th></tr></thead>
        <tbody>${P.tareas.map(function (t) {
          var r = lista.reduce(function (a, s) { return a.concat(s.tareas.filter(function (x) { return x.id === t.id; })); }, []);
          if (!r.length) return '';
          var pct = 100 * r.filter(exito).length / r.length;
          return html`<tr><td class="celda-nombre"><span class="fila-nombre">${t.id}</span><span class="secundario">${t.objetivo}</span></td>
            <td data-etiqueta="Éxito sin ayuda">${C.insignia(num(pct, ' %') + ' de ' + r.length, pct >= P.metaExito ? 'exito' : 'error')}</td>
            <td data-etiqueta="Tiempo">${num(mediana(r.map(segundos)), ' s')} (límite ${t.limiteSegundos} s)</td>
            <td data-etiqueta="Clics">${num(mediana(r.map(function (x) { return x.clics; })))}${t.limiteClics ? ' (máximo ' + t.limiteClics + ')' : ''}</td>
            <td data-etiqueta="Facilidad">${num(promedio(r.map(function (x) { return x.facilidad; })))} de ${P.facilidad.puntos}</td></tr>`;
        })}</tbody></table></div>
      <div class="tarjeta"><h3 class="titulo-4">Sesiones</h3><table class="tabla"><caption class="solo-lector">Sesiones registradas</caption>
        <thead><tr><th scope="col">Código</th><th scope="col">Perfil</th><th scope="col">Dispositivo</th><th scope="col">Tareas logradas</th><th scope="col">SUS</th><th scope="col">Acciones</th></tr></thead>
        <tbody>${lista.map(function (s) {
          return html`<tr><td class="celda-nombre"><span class="fila-nombre">${s.codigo}</span></td><td data-etiqueta="Perfil">${s.perfil === 'personal' ? 'Personal del DOCE' : 'Estudiante'}</td><td data-etiqueta="Dispositivo">${s.dispositivo}</td>
            <td data-etiqueta="Logradas">${s.tareas.filter(exito).length} de ${s.tareas.length}</td><td data-etiqueta="SUS">${num(s.puntajeSus)}</td>
            <td><a class="boton boton-secundario" href="#/prueba/sesion/${s.id}">Ver y anotar<span class="solo-lector"> ${s.codigo}</span></a></td></tr>`;
        })}</tbody></table></div>
    </section>`;
  }

  R.agregar('/prueba/sesion/:id', {
    titulo: 'Resumen de la sesión', marco: 'limpio',
    vista: function (ctx) {
      var s = sesiones().find(function (x) { return x.id === ctx.params.id; });
      if (!s) return pagina(html`<h1 tabindex="-1">Sesión no encontrada</h1><p><a class="boton boton-primario" href="#/prueba">Volver</a></p>`);
      return pagina(html`<div class="pagina-cabeza"><h1 tabindex="-1">Sesión ${s.codigo}</h1><p class="entrada">${s.perfil === 'personal' ? 'Personal del DOCE' : 'Estudiante'} · ${s.dispositivo} (${s.ancho} px) · SUS ${num(s.puntajeSus)}</p></div>
        <div class="mensajes" data-mensajes></div>
        <form class="pila" novalidate><div data-resumen></div>${s.tareas.map(function (r) {
          var t = tareaPorId(r.id) || { objetivo: '', limiteSegundos: 0 };
          var seg = segundos(r);
          return html`<section class="tarjeta pila" aria-labelledby="t-${r.id}"><div class="fila separados"><h2 id="t-${r.id}">${r.id}</h2>${C.insignia(r.lograda ? 'Lograda (' + r.forma + ')' : 'No lograda (' + r.forma + ')', r.lograda ? 'exito' : 'error')}</div>
            <p class="secundario">${t.objetivo}</p>
            <ul class="prueba-datos"><li>Tiempo: <strong>${seg} s</strong> ${t.limiteSegundos ? (seg <= t.limiteSegundos ? '(dentro de ' : '(pasó de ') + t.limiteSegundos + ' s)' : ''}</li>
              <li>Clics: <strong>${r.clics}</strong>${t.limiteClics ? (r.clics <= t.limiteClics ? ' (dentro de ' : ' (pasó de ') + t.limiteClics + ')' : ''}</li>
              <li>Errores de validación: <strong>${r.errores}</strong></li><li>Pantallas fuera de ruta: <strong>${r.fueraDeRuta}</strong></li><li>Facilidad: <strong>${r.facilidad}</strong> de ${P.facilidad.puntos}</li>
              ${r.respuesta ? html`<li>Respondió: <strong>${r.respuesta}</strong></li>` : ''}<li>Ruta: ${r.ruta.join(' → ')}</li></ul>
            <label class="opcion"><input type="checkbox" name="ayuda-${r.id}"${r.ayuda ? html` checked` : ''}><span>Pidió o recibió ayuda (no cuenta como éxito sin ayuda)</span></label>
            ${C.campo({ id: 'nota-' + r.id, etiqueta: 'Nota del facilitador', tipo: 'area', valor: r.nota, ayuda: 'No escribas nombres.' })}</section>`;
        })}
        <section class="tarjeta pila" aria-labelledby="abiertas-t"><h2 id="abiertas-t">Preguntas abiertas</h2>${P.encuesta.abiertas.map(function (p, i) { return html`<div><p><strong>${p}</strong></p><p class="secundario">${s.abiertas[i] || 'Sin respuesta'}</p></div>`; })}</section>
        <div class="form-pie"><a class="boton boton-secundario" href="#/prueba">Volver a la pantalla del facilitador</a>
          <div class="fila"><button type="button" class="boton boton-fantasma" data-borrar>${icono('basura')}Borrar sesión</button><button type="submit" class="boton boton-primario">Guardar notas</button></div></div></form>`);
    },
    montar: function (ctx, raiz) {
      if (enTarea()) { R.ir('#/inicio', true); return; }
      pintarBarra();
      var s = sesiones().find(function (x) { return x.id === ctx.params.id; });
      var form = raiz.querySelector('form');
      if (!s || !form) return;
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        s.tareas.forEach(function (r) { r.ayuda = d['ayuda-' + r.id]; r.nota = d['nota-' + r.id]; });
        guardarSesion(s);
        R.mensaje({ tipo: 'exito', titulo: 'Notas guardadas' });
        R.ir('#/prueba');
      });
      al(raiz, '[data-borrar]', function () {
        C.confirmar({ titulo: '¿Borrar la sesión ' + s.codigo + '?', texto: 'Sus resultados se perderán. Esta acción no se puede deshacer.', icono: 'basura', tono: 'error', si: 'Borrar sesión', peligro: true }).then(function (si) {
          if (!si) return;
          DOCE.almacen.escribir(SESIONES, sesiones().filter(function (x) { return x.id !== s.id; }));
          R.ir('#/prueba');
        });
      });
    }
  });

  /* ---------- Descargas ---------- */

  function celda(v) {
    var t = v === null || v === undefined ? '' : String(v);
    if (/^[=+\-@]/.test(t)) t = "'" + t; // que la hoja de cálculo no lo tome como fórmula
    return '"' + t.replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"';
  }

  // Una fila por participante y tarea, más el puntaje SUS
  function csv() {
    var filas = [['fecha', 'codigo', 'perfil', 'dispositivo', 'ancho_px', 'tarea', 'objetivo', 'lograda', 'forma', 'con_ayuda', 'exito_sin_ayuda', 'tiempo_s', 'limite_s', 'dentro_tiempo', 'clics', 'limite_clics', 'dentro_clics', 'errores_validacion', 'fuera_de_ruta', 'facilidad_1_7', 'respuesta', 'ruta', 'nota', 'sus']
      .concat(P.encuesta.preguntas.map(function (_, i) { return 'sus_' + (i + 1); }), P.encuesta.abiertas.map(function (_, i) { return 'abierta_' + (i + 1); }))];
    function si(v) { return v ? 'sí' : 'no'; }
    sesiones().forEach(function (s) {
      s.tareas.forEach(function (r) {
        var t = tareaPorId(r.id) || {};
        filas.push([s.fecha, s.codigo, s.perfil, s.dispositivo, s.ancho, r.id, t.objetivo, si(r.lograda), r.forma, si(r.ayuda), si(exito(r)), segundos(r), t.limiteSegundos,
          t.limiteSegundos ? si(segundos(r) <= t.limiteSegundos) : '', r.clics, t.limiteClics, t.limiteClics ? si(r.clics <= t.limiteClics) : '', r.errores, r.fueraDeRuta, r.facilidad, r.respuesta, r.ruta.join(' > '), r.nota, s.puntajeSus]
          .concat(s.sus, s.abiertas));
      });
    });
    return '﻿' + filas.map(function (f) { return f.map(celda).join(','); }).join('\r\n');
  }
  P.csv = csv;

  function descargar(nombre, texto, tipo) {
    U.descargar(nombre, new Blob([texto], { type: tipo }));
  }
})();
