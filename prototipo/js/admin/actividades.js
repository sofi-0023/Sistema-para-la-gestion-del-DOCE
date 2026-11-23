/* A03 a A06b: actividades en administración (RF03-A, RF04). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var V = DOCE.validacion;
  var FM = DOCE.formulario;
  var R = DOCE.rutas;
  var F = DOCE.util.fecha;
  var icono = DOCE.icono;
  var LISTA = '#/admin/actividades';

  function una(ctx) { return DOCE.almacen.uno('actividades', ctx.params.id); }

  /* ---------- A03 Lista ---------- */

  var FILTROS = [['', 'Todas'], ['borrador', 'Borradores'], ['publicada', 'Publicadas'], ['cancelada', 'Canceladas']];

  function acciones(a) {
    var oculto = html`<span class="solo-lector"> «${a.nombre}»</span>`;
    var base = LISTA + '/' + a.id;
    if (a.estado === 'cancelada') return html`<a class="boton boton-fantasma" href="${base}/ver">Ver${oculto}</a>`;
    if (a.estado === 'borrador') {
      return html`<a class="boton boton-primario" href="${base}/revisar">Revisar y publicar${oculto}</a><a class="boton boton-secundario" href="${base}/editar">Editar${oculto}</a>`;
    }
    return html`<a class="boton boton-secundario" href="${base}/editar">Editar${oculto}</a><a class="boton boton-fantasma" href="${base}/cancelar">Cancelar${oculto}</a>`;
  }

  function lista(ctx) {
    var filtro = ctx.consulta.get('filtro') || '';
    var todas = M.actividadesAdmin();
    var filas = todas.filter(function (a) { return !filtro || a.estado === filtro; });
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Actividades y avisos']], titulo: 'Actividades y avisos',
      entrada: 'Crea borradores, revisa su información y publícalos cuando estén completos.', acciones: C.accionesCrear()
    })}
    <div class="mensajes" data-mensajes></div>
    <div class="tarjeta">
      ${C.pestanasPublicaciones('actividades')}
      <div class="lista-filtros">
        <div class="campo buscador"><label class="solo-lector" for="buscar-actividad">Buscar por nombre</label>${icono('buscar')}<input type="search" id="buscar-actividad" placeholder="Buscar por nombre" autocomplete="off"></div>
        <div class="segmentos" role="group" aria-label="Filtrar por estado">${FILTROS.map(function (f) {
          return html`<a class="segmento" id="filtro-${f[0] || 'todas'}" href="${LISTA}${f[0] ? '?filtro=' + f[0] : ''}"${f[0] === filtro ? html` aria-current="true"` : ''}>${f[1]}</a>`;
        })}</div>
      </div>
      ${filas.length ? html`<table class="tabla">
        <caption class="solo-lector">Actividades registradas</caption>
        <thead><tr><th scope="col">Fecha</th><th scope="col">Nombre y lugar</th><th scope="col">Modalidad</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead>
        <tbody>${filas.map(function (a) {
          var c = a.estado === 'cancelada';
          return html`<tr data-fila data-texto="${U.normalizar(a.nombre)}" class="${c ? 'es-cancelada' : ''}">
            <td>${C.sello(a.fechaInicio, c)}<span class="solo-lector">${F.larga(a.fechaInicio)}</span></td>
            <td class="celda-nombre"><span class="fila-nombre">${a.nombre}</span><span class="secundario">${F.corta(a.fechaInicio)} · ${M.horas(a)} · ${M.lugarBreve(a)}</span></td>
            <td>${C.insigniaModalidad(a.modalidad)}</td>
            <td>${C.insigniaEstado(a.estado)}</td>
            <td><div class="acciones-fila">${acciones(a)}</div></td>
          </tr>`;
        })}</tbody></table>` : html`<div>${C.vacio({ icono: 'calendario', titulo: 'No hay actividades con este estado' })}</div>`}
      <p class="secundario" data-sin-filas hidden>No hay actividades con ese nombre.</p>
      <p class="lista-nota">${icono('info', 'icono-s')}<span>Los borradores no son visibles para la comunidad. Las actividades canceladas siguen en el calendario con la etiqueta «Cancelada» hasta su fecha.</span></p>
    </div>`;
  }

  C.pestanasPublicaciones = function (actual) {
    return html`<nav class="pestanas" aria-label="Tipo de publicación">
      <a href="#/admin/actividades"${actual === 'actividades' ? html` aria-current="page"` : ''}>Actividades (${DOCE.almacen.todos('actividades').length})</a>
      <a href="#/admin/avisos"${actual === 'avisos' ? html` aria-current="page"` : ''}>Avisos (${DOCE.almacen.todos('avisos').length})</a>
    </nav>`;
  };

  // Búsqueda sobre las filas de la tabla, sin volver a dibujar
  C.montarBuscador = function (raiz, id) {
    var campo = raiz.querySelector('#' + id);
    if (!campo) return;
    campo.addEventListener('input', function () {
      var q = U.normalizar(campo.value);
      var n = 0;
      [].forEach.call(raiz.querySelectorAll('[data-fila]'), function (f) {
        f.hidden = f.dataset.texto.indexOf(q) < 0;
        if (!f.hidden) n++;
      });
      var sin = raiz.querySelector('[data-sin-filas]');
      if (sin) sin.hidden = n > 0 || !raiz.querySelector('[data-fila]');
    });
  };

  function montarLista(ctx, raiz) { C.montarBuscador(raiz, 'buscar-actividad'); }

  R.agregar('/admin/actividades', {
    base: 'admin-actividades', titulo: 'Actividades y avisos', marco: 'admin', seccion: 'actividades', vista: lista, montar: montarLista
  });

  /* ---------- Formulario (crear y editar) ---------- */

  function campos(d) {
    return html`
      <h2 class="titulo-4">Información general</h2>
      ${C.campo({ id: 'nombre', etiqueta: 'Nombre de la actividad', obligatorio: true, valor: d.nombre, maximo: 120 })}
      ${C.campo({ id: 'descripcion', etiqueta: 'Descripción', tipo: 'area', obligatorio: true, valor: d.descripcion, ayuda: 'Explica en dos o tres frases de qué trata y a quién va dirigida.' })}
      ${C.campo({ id: 'organizador', etiqueta: 'Institución u organizador responsable', obligatorio: true, valor: d.organizador })}
      <h2 class="titulo-4 form-seccion">Fecha y hora</h2>
      <div class="form-dos">
        <div data-grupo-fecha>${C.campo({ id: 'fechaInicio', etiqueta: 'Fecha de inicio', tipo: 'date', obligatorio: true, valor: d.fechaInicio })}<p class="campo-ayuda" data-antes hidden></p></div>
        ${C.campo({ id: 'horaInicio', etiqueta: 'Hora de inicio', tipo: 'time', obligatorio: true, valor: d.horaInicio })}
        ${C.campo({ id: 'fechaFin', etiqueta: 'Fecha de finalización', tipo: 'date', valor: d.fechaFin })}
        ${C.campo({ id: 'horaFin', etiqueta: 'Hora de finalización', tipo: 'time', valor: d.horaFin })}
      </div>
      <h2 class="titulo-4 form-seccion">Modalidad y lugar</h2>
      <fieldset class="campo" data-campo="modalidad"><legend>Modalidad *</legend>
        <div class="segmentos">${Object.keys(M.MODALIDADES).map(function (m) {
          return html`<label class="segmento"><input type="radio" name="modalidad" value="${m}"${d.modalidad === m ? html` checked` : ''}>${M.MODALIDADES[m]}</label>`;
        })}</div></fieldset>
      ${C.campo({ id: 'lugar', etiqueta: 'Lugar', valor: d.lugar, marcador: 'Escribe el edificio, aula o espacio' })}
      ${C.campo({ id: 'enlace', etiqueta: 'Enlace de acceso', tipo: 'url', valor: d.enlace, marcador: 'https://' })}`;
  }

  function conectarCampos(form, original) {
    FM.vigilar(form);

    // RF03-A E3 a E5: cada modalidad pide sus datos
    function modalidad() {
      var m = (form.querySelector('[name=modalidad]:checked') || {}).value;
      [['lugar', m !== 'virtual', 'Solo para actividades presenciales o híbridas'], ['enlace', m !== 'presencial', 'Solo para actividades virtuales o híbridas']].forEach(function (x) {
        var campo = form.querySelector('[data-campo=' + x[0] + ']');
        var control = campo.querySelector('input');
        var etiqueta = campo.querySelector('label');
        var pide = !!m && x[1];
        control.disabled = !!m && !x[1];
        if (pide) control.setAttribute('aria-required', 'true'); else control.removeAttribute('aria-required');
        etiqueta.textContent = etiqueta.textContent.replace(/ \*$/, '') + (pide ? ' *' : '');
        control.placeholder = control.disabled ? x[2] : (x[0] === 'lugar' ? 'Escribe el edificio, aula o espacio' : 'https://');
        if (control.disabled) FM.limpiar(form, x[0]);
      });
    }

    function antes() {
      var p = form.querySelector('[data-antes]');
      var valor = form.elements.fechaInicio.value;
      p.hidden = !original || !original.fechaInicio || valor === original.fechaInicio;
      if (!p.hidden) p.textContent = 'Antes: ' + original.fechaInicio.split('-').reverse().join('/');
    }

    // Lista «Antes de publicar» de A04
    function lista() {
      var ul = document.querySelector('[data-requisitos]');
      if (!ul) return;
      var e = V.actividad(FM.leer(form));
      var m = FM.leer(form).modalidad;
      ul.innerHTML = requisitos(e, m).map(function (r) { return r.toString(); }).join('');
    }

    function todo() { modalidad(); antes(); lista(); }
    form.addEventListener('input', todo);
    form.addEventListener('change', todo);
    todo();
  }

  function requisitos(e, m) {
    var lugar = m === 'virtual' ? ['Enlace de acceso para modalidad virtual', !e.enlace]
      : m === 'hibrida' ? ['Lugar y enlace para modalidad híbrida', !e.lugar && !e.enlace]
      : m === 'presencial' ? ['Lugar para la modalidad presencial', !e.lugar] : ['Modalidad', false];
    return [
      ['Nombre y descripción', !e.nombre && !e.descripcion],
      ['Organizador responsable', !e.organizador],
      ['Fecha y hora de inicio', !e.fechaInicio && !e.horaInicio],
      ['Fecha de fin posterior al inicio', !e.fechaFin && !e.horaFin],
      lugar
    ].map(function (r) { return C.requisito(r[0], r[1]); });
  }

  C.requisito = function (texto, cumple) {
    return html`<li class="requisito ${cumple ? 'cumple' : 'falta'}">${icono(cumple ? 'correcto' : 'alerta')}<span><span class="solo-lector">${cumple ? 'Listo: ' : 'Falta: '}</span>${texto}</span></li>`;
  };

  // Error de almacenamiento simulado o real: conserva lo capturado y permite reintentar
  FM.fallo = function (form, ctx, titulo, texto) {
    FM.aviso(form, {
      tipo: 'error', titulo: titulo, texto: texto || 'Tus datos se conservaron. Inténtalo de nuevo.',
      accion: html`<button type="button" class="boton boton-secundario alerta-boton" data-reintentar-envio>Reintentar</button>`
    });
    form.querySelector('[data-reintentar-envio]').addEventListener('click', function () {
      ctx.recuperado = true;
      form.requestSubmit();
    });
  };
  FM.debeFallar = function (ctx) { return ctx.estado === 'error' && !ctx.recuperado; };

  /* ---------- A04 Crear ---------- */

  R.agregar('/admin/actividades/nueva', {
    titulo: 'Crear actividad', marco: 'admin', seccion: 'actividades',
    vista: function () {
      return html`${C.cabezaAdmin({
        migas: [['Administración', '#/admin'], ['Actividades y avisos', LISTA], ['Crear actividad']],
        titulo: 'Crear actividad', entrada: 'Se guarda como borrador. No será visible hasta que la publiques. Los campos con * son obligatorios.'
      })}
      <div class="form-rejilla">
        <form class="tarjeta pila formulario" novalidate data-actividad>
          <div data-resumen></div>
          ${campos({ modalidad: 'presencial' })}
          <div class="form-pie"><a class="boton boton-secundario" href="${LISTA}">Cancelar</a><button type="submit" class="boton boton-primario">Guardar borrador</button></div>
        </form>
        <div class="pila">
          <section class="tarjeta" aria-labelledby="antes-t"><h2 class="titulo-4" id="antes-t">Antes de publicar</h2><ul class="requisitos" data-requisitos></ul></section>
          <div class="alerta alerta-info">${icono('ojo')}<div class="alerta-cuerpo"><p class="alerta-titulo">¿Quién lo ve?</p><p class="alerta-texto">Guardar el borrador no lo publica. Después podrás revisarlo y publicarlo en el calendario.</p></div></div>
        </div>
      </div>`;
    },
    montar: function (ctx, raiz) {
      var form = raiz.querySelector('[data-actividad]');
      conectarCampos(form, null);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        raiz.querySelector('[data-requisitos]').classList.add('enviado');
        if (!FM.mostrar(form, V.actividad(d))) return;
        V.ajustarActividad(d);
        d.id = U.nuevoId(d.nombre);
        d.estado = 'borrador';
        d.editado = M.ahora();
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('actividades', d)) {
          FM.fallo(form, ctx, 'No fue posible guardar la actividad');
          return;
        }
        DOCE.almacen.registrarCambio('lapiz', 'Guardaste el borrador «' + d.nombre + '»');
        R.mensaje({ tipo: 'exito', titulo: 'El borrador se guardó correctamente', texto: 'Aún no es visible para la comunidad. Revísalo y publícalo cuando esté listo.' });
        R.ir(LISTA + '/' + d.id + '/revisar');
      });
    }
  });

  /* ---------- A05 Revisar y publicar ---------- */

  function enRevision(ctx) {
    var a = una(ctx);
    if (!a) return null;
    a = Object.assign({}, a);
    if (ctx.estado === 'incompleta') { a.descripcion = ''; a.lugar = ''; a.enlace = ''; }
    if (ctx.estado === 'publicada') a.estado = 'publicada';
    return a;
  }

  var YA_PUBLICADA = { tipo: 'aviso', titulo: 'Esta actividad ya está publicada', texto: 'No se creó un duplicado ni se hizo ningún cambio.' };

  function incompleta(e) {
    return {
      tipo: 'error', titulo: 'Hay datos que requieren corrección', texto: 'La actividad sigue como Borrador. Corrige lo siguiente con «Editar borrador»:',
      lista: html`<ul>${Object.keys(e).map(function (k) { return html`<li>${e[k]}</li>`; })}</ul>`
    };
  }

  function noExiste(titulo, volver) {
    return html`${C.cabezaAdmin({ titulo: titulo })}<div class="tarjeta">${C.vacio({
      icono: 'prohibido', tono: 'aviso', titulo: 'Este elemento ya no está disponible', texto: 'Vuelve a la lista para ver la información actualizada.',
      accion: html`<a class="boton boton-primario" href="${volver}">Volver a la lista</a>`
    })}</div>`;
  }
  C.noExisteAdmin = noExiste;

  R.agregar('/admin/actividades/:id/revisar', {
    titulo: 'Revisar actividad', marco: 'admin', seccion: 'actividades',
    vista: function (ctx) {
      var a = enRevision(ctx);
      if (!a) return noExiste('Revisar antes de publicar', LISTA);
      var e = V.actividad(a);
      var n = Object.keys(e).length;
      var borrador = a.estado === 'borrador';
      var m = a.modalidad;
      return html`${C.cabezaAdmin({
        migas: [['Administración', '#/admin'], ['Actividades y avisos', LISTA], ['Revisar']],
        titulo: 'Revisar antes de publicar', entrada: 'Así verá la comunidad esta actividad en el calendario.',
        acciones: html`${a.estado !== 'cancelada' ? html`<a class="boton boton-secundario" href="${LISTA}/${a.id}/editar">${icono('lapiz')}${borrador ? 'Editar borrador' : 'Editar'}</a>` : ''}
          <button type="button" class="boton boton-primario" data-publicar>${icono('correcto')}Publicar</button>`
      })}
      <div class="mensajes" data-mensajes>${a.estado === 'publicada' ? C.alerta(YA_PUBLICADA) : ''}</div>
      <div class="form-rejilla">
        <section class="tarjeta pila" aria-labelledby="vp"><div class="fila separados"><h2 class="proxima-etiqueta" id="vp">Vista previa</h2>${C.insigniaEstado(a.estado)}</div>
          <div class="detalle-titulo">${C.sello(a.fechaInicio)}<h3 class="titulo-2">${a.nombre}</h3></div>
          ${C.insigniaModalidad(m)}
          <p class="secundario">${a.descripcion || '[Sin descripción]'}</p>
          ${C.datos(M.datosActividad(a).filter(Boolean).map(function (x) { return { icono: x.icono, nombre: x.nombre, valor: x.valor || '[Sin capturar]' }; }))}
        </section>
        <div class="pila">
          <section class="tarjeta pila" aria-labelledby="val"><h2 class="titulo-4" id="val">Validación previa</h2>
            <ul class="requisitos">
              ${C.requisito('Sigue en estado Borrador', borrador)}
              ${C.requisito('Campos obligatorios completos', !e.nombre && !e.descripcion && !e.organizador && !e.fechaInicio && !e.horaInicio)}
              ${C.requisito('Fecha de fin posterior al inicio', !e.fechaFin && !e.horaFin)}
              ${m !== 'virtual' ? C.requisito('Lugar para modalidad ' + M.MODALIDADES[m].toLowerCase(), !e.lugar) : ''}
              ${m !== 'presencial' ? C.requisito('Enlace de acceso para modalidad ' + M.MODALIDADES[m].toLowerCase(), !e.enlace) : ''}
            </ul>
            ${borrador && !n ? C.alerta({ tipo: 'exito', titulo: 'Lista para publicar', texto: 'Al publicarla aparecerá en el calendario y se podrá consultar su detalle.' }) : ''}
          </section>
          <div class="alerta alerta-info">${icono('info')}<p class="alerta-cuerpo alerta-texto">Publicar no envía notificaciones. La comunidad la verá al consultar el calendario.</p></div>
        </div>
      </div>`;
    },
    montar: function (ctx, raiz) {
      var boton = raiz.querySelector('[data-publicar]');
      if (!boton) return;

      function avisar(m) {
        var lugar = raiz.querySelector('[data-mensajes]');
        m.id = 'resultado';
        lugar.innerHTML = C.alerta(m).toString();
        lugar.querySelector('.alerta').focus();
        DOCE.anunciar(m.titulo);
      }

      function publicar() {
        var a = enRevision(ctx);
        if (!a) { R.dibujar(); return; }
        if (a.estado === 'publicada') { avisar(Object.assign({}, YA_PUBLICADA)); return; }
        if (a.estado === 'cancelada') { avisar({ tipo: 'error', titulo: 'No se puede publicar una actividad cancelada' }); return; }
        var e = V.actividad(a);
        if (Object.keys(e).length) {
          avisar(incompleta(e));
          document.dispatchEvent(new CustomEvent('doce:errores', { detail: { campos: Object.keys(e) } }));
          return;
        }
        a.estado = 'publicada';
        a.editado = M.ahora();
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('actividades', a)) {
          avisar({
            tipo: 'error', titulo: 'No fue posible realizar la publicación', texto: 'La actividad sigue como Borrador y no aparece en el calendario. Inténtalo de nuevo.',
            accion: html`<button type="button" class="boton boton-secundario alerta-boton" data-otra>Reintentar</button>`
          });
          raiz.querySelector('[data-otra]').addEventListener('click', function () { ctx.recuperado = true; publicar(); });
          return;
        }
        DOCE.almacen.registrarCambio('correcto', 'Publicaste «' + a.nombre + '»');
        R.mensaje({
          tipo: 'exito', titulo: 'Actividad publicada correctamente', texto: '«' + a.nombre + '» ya aparece en el calendario y se puede consultar su detalle.',
          accion: html`<a class="boton boton-secundario alerta-boton" href="#/calendario?mes=${a.fechaInicio.slice(0, 7)}">Ver en el calendario</a>`
        });
        R.ir(LISTA);
      }
      boton.addEventListener('click', publicar);
    }
  });

  /* ---------- A06 Editar ---------- */

  R.agregar('/admin/actividades/:id/editar', {
    titulo: 'Editar actividad', marco: 'admin', seccion: 'actividades',
    vista: function (ctx) {
      var a = una(ctx);
      if (!a) return noExiste('Editar actividad', LISTA);
      var migas = [['Administración', '#/admin'], ['Actividades y avisos', LISTA], ['Editar']];
      if (a.estado === 'cancelada') {
        return html`${C.cabezaAdmin({ migas: migas, titulo: 'Editar actividad' })}
          <div class="pila">${C.alerta({ tipo: 'aviso', titulo: 'No se puede editar una publicación cancelada', texto: '«' + a.nombre + '» está cancelada. Puedes consultarla, pero no modificarla.' })}
          <div class="fila"><a class="boton boton-primario" href="${LISTA}">Volver a la lista</a><a class="boton boton-secundario" href="${LISTA}/${a.id}/ver">Ver</a></div></div>`;
      }
      return html`${C.cabezaAdmin({
        migas: migas, titulo: 'Editar actividad',
        entrada: a.estado === 'publicada' ? 'Los cambios se verán en el calendario en cuanto los guardes.' : 'Sigue como borrador: no será visible hasta que la publiques.',
        acciones: a.estado === 'publicada' ? html`<a class="boton boton-peligro" href="${LISTA}/${a.id}/cancelar?desde=editar">${icono('prohibido')}Cancelar actividad</a>` : ''
      })}
      <div class="mensajes" data-mensajes></div>
      <form class="tarjeta pila formulario" novalidate data-actividad>
        <div class="fila">${C.insigniaEstado(a.estado)}<span class="nota">Última edición: ${M.momento(a.editado)}</span></div>
        <div data-resumen></div>
        ${campos(a)}
        <div class="form-pie"><a class="boton boton-secundario" href="${LISTA}">Cancelar</a><button type="submit" class="boton boton-primario">Guardar cambios</button></div>
      </form>`;
    },
    montar: function (ctx, raiz) {
      var form = raiz.querySelector('[data-actividad]');
      if (!form) return;
      var original = una(ctx);
      conectarCampos(form, original);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var actual = una(ctx);
        if (!actual || actual.estado === 'cancelada') { R.dibujar(); return; }
        var d = FM.leer(form);
        if (!FM.mostrar(form, V.actividad(d), { texto: 'No se guardaron los cambios. Corrige los campos en rojo y vuelve a guardar.' })) return;
        var nueva = Object.assign({}, actual, V.ajustarActividad(d), { editado: M.ahora() });
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('actividades', nueva)) {
          FM.fallo(form, ctx, 'No fue posible guardar los cambios');
          return;
        }
        DOCE.almacen.registrarCambio('lapiz', 'Editaste «' + nueva.nombre + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Cambios guardados correctamente', texto: nueva.estado === 'publicada' ? 'La vista pública ya muestra la información actualizada.' : 'Sigue como borrador.' });
        R.ir(nueva.estado === 'borrador' ? LISTA + '/' + nueva.id + '/revisar' : LISTA);
      });
    }
  });

  /* ---------- A06b Cancelar ---------- */

  // Diálogo de cancelación para actividades y avisos (RF04.2)
  C.capaCancelar = function (ctx, o) {
    if (!o.elemento) {
      return C.dialogo({ titulo: 'Este elemento ya no está disponible', icono: 'prohibido', tono: 'aviso', acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver a la lista</button>` });
    }
    if (o.estado === 'cancelada') {
      return C.dialogo({
        titulo: 'Esta publicación ya está cancelada', icono: 'info', tono: 'aviso', texto: 'No se hizo ningún cambio.',
        acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Entendido</button>`
      });
    }
    if (o.estado === 'borrador') {
      return C.dialogo({
        titulo: 'Solo se pueden cancelar publicaciones publicadas', icono: 'info', tono: 'aviso', texto: '«' + o.nombre + '» es un borrador y la comunidad no lo ve.',
        acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Entendido</button>`
      });
    }
    return C.dialogo({
      titulo: '¿Cancelar «' + o.nombre + '»?', icono: 'prohibido', tono: 'error', texto: o.texto,
      cuerpo: html`<div data-resultado></div><div class="resumen-elemento">${o.resumen}</div>`,
      acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>No, conservar</button>
        <button type="button" class="boton boton-peligro" data-confirmar>${o.boton}</button>`
    });
  };

  // Conecta «Confirmar» de un diálogo. accion() devuelve false si falló.
  C.montarConfirmar = function (ctx, dialogo, accion, errorTitulo) {
    var boton = dialogo.querySelector('[data-confirmar]');
    if (!boton) return;
    boton.addEventListener('click', function () {
      if (FM.debeFallar(ctx) || accion() === false) {
        ctx.recuperado = true;
        boton.textContent = 'Reintentar';
        var lugar = dialogo.querySelector('[data-resultado]');
        lugar.innerHTML = C.alerta({ tipo: 'error', titulo: errorTitulo, texto: 'No se hizo ningún cambio. Inténtalo de nuevo.', id: 'resultado-capa' }).toString();
        lugar.querySelector('.alerta').focus();
      }
    });
  };

  function volverCancelar(ctx) { return ctx.consulta.get('desde') === 'editar' ? LISTA + '/' + ctx.params.id + '/editar' : LISTA; }

  R.agregar('/admin/actividades/:id/cancelar', {
    base: 'admin-actividades', titulo: 'Cancelar actividad', marco: 'admin', seccion: 'actividades',
    vista: lista, montar: montarLista, volver: volverCancelar,
    capa: function (ctx) {
      var a = una(ctx);
      return C.capaCancelar(ctx, a ? {
        elemento: a, estado: a.estado, nombre: a.nombre, boton: 'Sí, cancelar actividad',
        texto: 'La actividad seguirá visible en el calendario con la etiqueta «Cancelada» hasta el ' + F.diaMes(a.fechaInicio) + '. No se elimina del sistema.',
        resumen: html`${C.sello(a.fechaInicio, true)}<div class="fila-cuerpo es-cancelada"><span class="fila-nombre">${a.nombre}</span><span>${C.insigniaEstado('cancelada')}</span></div>`
      } : {});
    },
    montarCapa: function (ctx, dialogo) {
      C.montarConfirmar(ctx, dialogo, function () {
        var a = una(ctx);
        if (!a || a.estado !== 'publicada') { R.dibujar(); return true; }
        if (!DOCE.almacen.guardar('actividades', Object.assign({}, a, { estado: 'cancelada', editado: M.ahora() }))) return false;
        DOCE.almacen.registrarCambio('prohibido', 'Cancelaste «' + a.nombre + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Publicación cancelada correctamente', texto: '«' + a.nombre + '» sigue en el calendario con la etiqueta «Cancelada» hasta el ' + F.diaMes(a.fechaInicio) + '.' });
        R.ir(LISTA);
      }, 'No fue posible cancelar la publicación');
    }
  });

  /* ---------- Ver (canceladas) ---------- */

  R.agregar('/admin/actividades/:id/ver', {
    base: 'admin-actividades', titulo: 'Ver actividad', marco: 'admin', seccion: 'actividades',
    vista: lista, montar: montarLista, volver: function () { return LISTA; },
    capa: function (ctx) {
      var a = una(ctx);
      if (!a) return C.capaCancelar(ctx, {});
      return C.panel({
        titulo: html`<span class="detalle-titulo">${C.sello(a.fechaInicio, a.estado === 'cancelada')}<span>${a.nombre}</span></span>`,
        entrada: 'Última edición: ' + M.momento(a.editado), cuerpo: C.detalleActividad(a),
        pie: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Cerrar</button>`
      });
    }
  });
})();
