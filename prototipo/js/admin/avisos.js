/* A07 y A11: avisos en administración (RF03-B, RF04). Todo sobre la lista, en panel lateral. */
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
  var LISTA = '#/admin/avisos';

  function uno(ctx) { return DOCE.almacen.uno('avisos', ctx.params.id); }
  function volver() { return LISTA; }

  function acciones(a) {
    var oculto = html`<span class="solo-lector"> «${a.titulo}»</span>`;
    var base = LISTA + '/' + a.id;
    if (a.estado === 'cancelado') return html`<a class="boton boton-fantasma" href="${base}/ver">Ver${oculto}</a>`;
    if (a.estado === 'borrador') return html`<a class="boton boton-primario" href="${base}/revisar">Revisar y publicar${oculto}</a><a class="boton boton-secundario" href="${base}/editar">Editar${oculto}</a>`;
    return html`<a class="boton boton-secundario" href="${base}/editar">Editar${oculto}</a><a class="boton boton-fantasma" href="${base}/cancelar">Cancelar${oculto}</a>`;
  }

  function lista() {
    var avisos = DOCE.almacen.todos('avisos').slice().sort(function (a, b) { return b.editado.localeCompare(a.editado); });
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Actividades y avisos']], titulo: 'Actividades y avisos',
      entrada: 'Crea borradores, revisa su información y publícalos cuando estén completos.', acciones: C.accionesCrear()
    })}
    <div class="mensajes" data-mensajes></div>
    <div class="tarjeta">
      ${C.pestanasPublicaciones('avisos')}
      ${avisos.length ? html`<table class="tabla">
        <caption class="solo-lector">Avisos registrados</caption>
        <thead><tr><th scope="col">Título y contenido</th><th scope="col">Publicado</th><th scope="col">Vigencia</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead>
        <tbody>${avisos.map(function (a) {
          return html`<tr class="${a.estado === 'cancelado' ? 'es-cancelada' : ''}">
            <td class="celda-nombre"><span class="fila-nombre">${a.titulo}</span><span class="secundario">${U.recortar(a.contenido, 110)}</span></td>
            <td data-etiqueta="Publicado">${a.publicado ? F.diaMes(a.publicado) : 'Sin publicar'}</td>
            <td data-etiqueta="Vigente hasta">${a.vigencia ? F.diaMes(a.vigencia) : 'Sin límite'}</td>
            <td>${C.insigniaEstado(a.estado)}</td>
            <td><div class="acciones-fila">${acciones(a)}</div></td>
          </tr>`;
        })}</tbody></table>` : C.vacio({ icono: 'megafono', titulo: 'No hay avisos registrados' })}
      <p class="lista-nota">${icono('info', 'icono-s')}<span>Los borradores no son visibles para la comunidad. Los avisos cancelados siguen en la página de inicio con la etiqueta «Cancelada» hasta su vigencia.</span></p>
    </div>`;
  }

  function agregar(patron, titulo, d) {
    d.base = 'admin-avisos'; d.titulo = titulo; d.marco = 'admin'; d.seccion = 'actividades'; d.vista = lista; d.volver = volver;
    R.agregar(patron, d);
  }

  R.agregar('/admin/avisos', { base: 'admin-avisos', titulo: 'Avisos', marco: 'admin', seccion: 'actividades', vista: lista });

  function noDisponible() { return C.capaCancelar({}, {}); }

  /* ---------- Formulario ---------- */

  function formulario(a) {
    return html`<form class="pila" novalidate id="form-aviso">
      <div data-resumen></div>
      ${C.campo({ id: 'titulo', etiqueta: 'Título del aviso', obligatorio: true, valor: a.titulo, maximo: 120 })}
      ${C.campo({ id: 'contenido', etiqueta: 'Contenido', tipo: 'area', obligatorio: true, valor: a.contenido })}
      ${C.campo({ id: 'vigencia', etiqueta: 'Vigente hasta', tipo: 'date', valor: a.vigencia, ayuda: 'Opcional. Después de esa fecha deja de mostrarse.' })}
      ${a.publicado ? html`<p class="nota">Publicado el ${F.diaMesAnio(a.publicado)}</p>` : ''}
    </form>`;
  }

  agregar('/admin/avisos/nuevo', 'Crear aviso', {
    capa: function () {
      return C.panel({
        titulo: 'Crear aviso', entrada: 'Se guarda como borrador; no será visible hasta que lo publiques.', cuerpo: formulario({}),
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-aviso" class="boton boton-primario">Guardar borrador</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      FM.vigilar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        if (!FM.mostrar(form, V.aviso(d))) return;
        d.id = U.nuevoId(d.titulo); d.estado = 'borrador'; d.publicado = ''; d.editado = M.ahora();
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('avisos', d)) { FM.fallo(form, ctx, 'No fue posible guardar el aviso'); return; }
        DOCE.almacen.registrarCambio('lapiz', 'Guardaste el borrador «' + d.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'El borrador se guardó correctamente', texto: 'Aún no es visible para la comunidad. Revísalo y publícalo cuando esté listo.' });
        R.ir(LISTA);
      });
    }
  });

  agregar('/admin/avisos/:id/editar', 'Editar aviso', {
    capa: function (ctx) {
      var a = uno(ctx);
      if (!a) return noDisponible();
      if (a.estado === 'cancelado') {
        return C.dialogo({ titulo: 'No se puede editar una publicación cancelada', icono: 'info', tono: 'aviso', texto: '«' + a.titulo + '» está cancelada. Puedes consultarla, pero no modificarla.', acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Entendido</button>` });
      }
      return C.panel({
        titulo: 'Editar aviso', entrada: a.estado === 'publicado' ? 'Los cambios se verán en la página de inicio en cuanto los guardes.' : 'Sigue como borrador hasta que lo publiques.',
        cuerpo: html`<div class="pila"><div class="fila">${C.insigniaEstado(a.estado)}<span class="nota">Última edición: ${M.momento(a.editado)}</span></div>${formulario(a)}</div>`,
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-aviso" class="boton boton-primario">Guardar cambios</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      if (!form) return;
      FM.vigilar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var actual = uno(ctx);
        if (!actual || actual.estado === 'cancelado') { R.dibujar(); return; }
        var d = FM.leer(form);
        if (!FM.mostrar(form, V.aviso(d), { texto: 'No se guardaron los cambios. Corrige los campos en rojo y vuelve a guardar.' })) return;
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('avisos', Object.assign({}, actual, d, { editado: M.ahora() }))) { FM.fallo(form, ctx, 'No fue posible guardar los cambios'); return; }
        DOCE.almacen.registrarCambio('lapiz', 'Editaste «' + d.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Cambios guardados correctamente', texto: actual.estado === 'publicado' ? 'La página de inicio ya muestra la información actualizada.' : 'Sigue como borrador.' });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A11 Revisar y publicar ---------- */

  function enRevision(ctx) {
    var a = uno(ctx);
    if (!a) return null;
    a = Object.assign({}, a);
    if (ctx.estado === 'incompleto') a.contenido = ' ';
    if (ctx.estado === 'publicado') a.estado = 'publicado';
    return a;
  }

  var YA_PUBLICADO = { tipo: 'aviso', titulo: 'Este aviso ya está publicado', texto: 'No se creó un duplicado ni se hizo ningún cambio.' };

  agregar('/admin/avisos/:id/revisar', 'Revisar aviso', {
    capa: function (ctx) {
      var a = enRevision(ctx);
      if (!a) return noDisponible();
      var e = V.aviso(a);
      return C.panel({
        titulo: 'Revisar aviso', entrada: 'Así lo verá la comunidad en la sección Avisos.',
        cuerpo: html`<div class="pila">
          <div data-resultado>${a.estado === 'publicado' ? C.alerta(YA_PUBLICADO) : ''}</div>
          <div class="fila insignias">${C.insigniaEstado(a.estado)}${C.insignia('Aviso')}</div>
          <div class="resumen-elemento resumen-aviso"><p class="dato-linea">${icono('megafono', 'icono-s')}<span>Vista previa</span></p>
            <h3 class="titulo-4">${a.titulo}</h3><p class="secundario">${U.limpio(a.contenido) || '[Sin contenido]'}</p>
            ${a.vigencia ? html`<p class="nota">Vigente hasta el ${F.diaMes(a.vigencia)}</p>` : ''}</div>
          <h3 class="titulo-fila">Antes de publicar se revisa que:</h3>
          <ul class="requisitos">${C.requisito('Tiene título', !e.titulo)}${C.requisito('Tiene contenido', !e.contenido)}${C.requisito('Sigue en estado Borrador', a.estado === 'borrador')}</ul>
          ${C.alerta({ tipo: 'info', titulo: 'Al publicar', texto: 'El aviso aparecerá en la página de inicio. Podrás editarlo o cancelarlo después.' })}
        </div>`,
        pie: html`${a.estado === 'cancelado' ? '' : html`<a class="boton boton-secundario" href="${LISTA}/${a.id}/editar">${icono('lapiz')}Seguir editando</a>`}<button type="button" class="boton boton-primario" data-publicar>${icono('correcto')}Publicar</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var boton = dialogo.querySelector('[data-publicar]');
      if (!boton) return;
      function avisar(m) {
        var lugar = dialogo.querySelector('[data-resultado]');
        m.id = 'resultado-capa';
        lugar.innerHTML = C.alerta(m).toString();
        lugar.querySelector('.alerta').focus();
      }
      function publicar() {
        var a = enRevision(ctx);
        if (!a) { R.dibujar(); return; }
        if (a.estado === 'publicado') { avisar(Object.assign({}, YA_PUBLICADO)); return; }
        if (a.estado === 'cancelado') { avisar({ tipo: 'error', titulo: 'No se puede publicar un aviso cancelado' }); return; }
        var e = V.aviso(a);
        if (Object.keys(e).length) {
          avisar({ tipo: 'error', titulo: 'Hay datos que requieren corrección', texto: 'El aviso sigue como Borrador. Corrige lo siguiente con «Seguir editando»:', lista: html`<ul>${Object.keys(e).map(function (k) { return html`<li>${e[k]}</li>`; })}</ul>` });
          document.dispatchEvent(new CustomEvent('doce:errores', { detail: { campos: Object.keys(e) } }));
          return;
        }
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('avisos', Object.assign({}, a, { estado: 'publicado', publicado: F.hoy(), editado: M.ahora() }))) {
          avisar({ tipo: 'error', titulo: 'No fue posible realizar la publicación', texto: 'El aviso sigue como Borrador y no aparece en el espacio de avisos. Inténtalo de nuevo.', accion: html`<button type="button" class="boton boton-secundario alerta-boton" data-otra>Reintentar</button>` });
          dialogo.querySelector('[data-otra]').addEventListener('click', function () { ctx.recuperado = true; publicar(); });
          return;
        }
        DOCE.almacen.registrarCambio('correcto', 'Publicaste el aviso «' + a.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Aviso publicado correctamente', texto: '«' + a.titulo + '» ya aparece en la sección Avisos de la página de inicio.' });
        R.ir(LISTA);
      }
      boton.addEventListener('click', publicar);
    }
  });

  /* ---------- Cancelar y ver ---------- */

  agregar('/admin/avisos/:id/cancelar', 'Cancelar aviso', {
    capa: function (ctx) {
      var a = uno(ctx);
      return C.capaCancelar(ctx, a ? {
        elemento: a, estado: a.estado === 'cancelado' ? 'cancelada' : a.estado, nombre: a.titulo, boton: 'Sí, cancelar aviso',
        texto: M.referenciaAviso(a) >= F.hoy()
          ? 'El aviso seguirá en la página de inicio con la etiqueta «Cancelada» hasta el ' + F.diaMes(M.referenciaAviso(a)) + '. No se elimina del sistema.'
          : 'Su fecha de referencia ya pasó, así que dejará de mostrarse en la página de inicio. Sigue registrado en esta lista.',
        resumen: html`<div class="fila-cuerpo es-cancelada"><span class="fila-nombre">${a.titulo}</span><span>${C.insigniaEstado('cancelado')}</span></div>`
      } : {});
    },
    montarCapa: function (ctx, dialogo) {
      C.montarConfirmar(ctx, dialogo, function () {
        var a = uno(ctx);
        if (!a || a.estado !== 'publicado') { R.dibujar(); return true; }
        if (!DOCE.almacen.guardar('avisos', Object.assign({}, a, { estado: 'cancelado', editado: M.ahora() }))) return false;
        DOCE.almacen.registrarCambio('prohibido', 'Cancelaste el aviso «' + a.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Publicación cancelada correctamente', texto: '«' + a.titulo + '» sigue registrado en esta lista con estado «Cancelada».' });
        R.ir(LISTA);
      }, 'No fue posible cancelar la publicación');
    }
  });

  agregar('/admin/avisos/:id/ver', 'Ver aviso', {
    capa: function (ctx) {
      var a = uno(ctx);
      if (!a) return noDisponible();
      return C.panel({
        titulo: a.titulo, entrada: 'Última edición: ' + M.momento(a.editado),
        cuerpo: html`<div class="pila"><div>${C.insigniaEstado(a.estado)}</div><p class="secundario">${a.contenido}</p><p class="nota">${a.publicado ? 'Publicado el ' + F.diaMesAnio(a.publicado) : 'Sin publicar'}${a.vigencia ? ' · Vigente hasta el ' + F.diaMesAnio(a.vigencia) : ''}</p></div>`,
        pie: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Cerrar</button>`
      });
    }
  });
})();
