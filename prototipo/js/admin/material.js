/* A09, A14, A15, A15b: material informativo en administración (RF08). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var V = DOCE.validacion;
  var FM = DOCE.formulario;
  var R = DOCE.rutas;
  var icono = DOCE.icono;
  var LISTA = '#/admin/material';

  function uno(ctx) { return ctx.estado === 'no-disponible' ? null : DOCE.almacen.uno('materiales', ctx.params.id); }

  /* ---------- Archivos (compartido con guías) ---------- */

  function tamano(bytes) { return bytes >= 1048576 ? (Math.round(bytes / 104857.6) / 10) + ' MB' : Math.max(1, Math.round(bytes / 1024)) + ' KB'; }

  // El prototipo guarda el nombre, formato y tamaño; no el contenido, para no llenar localStorage
  U.leerArchivo = function (entrada) {
    var f = entrada && entrada.files && entrada.files[0];
    if (!f) return null;
    return { nombre: f.name, formato: (f.name.split('.').pop() || '').toUpperCase(), tamano: tamano(f.size), bytes: f.size };
  };

  C.campoArchivo = function (c) {
    return html`<div class="campo" data-campo="${c.id}"><label for="${c.id}">${c.etiqueta}${c.obligatorio ? ' *' : ''}</label>
      <input type="file" id="${c.id}" name="${c.id}" accept="${c.acepta}"${c.varios ? html` multiple` : ''} aria-describedby="${c.id}-ayuda">
      <p class="campo-ayuda" id="${c.id}-ayuda">${c.ayuda}</p></div>`;
  };

  // Barra Agregar / Actualizar / Eliminar con selección (CU-08 y CU-09)
  C.barraSeleccion = function (o) {
    return html`<div class="barra-seleccion" role="group" aria-label="${o.etiqueta}">
      <span class="secundario" data-seleccion role="status">${o.texto}</span>
      <button type="button" class="boton boton-secundario" data-actualizar>${icono('lapiz')}Actualizar</button>
      <button type="button" class="boton boton-secundario" data-eliminar>${icono('basura')}Eliminar</button></div>`;
  };

  C.pedirSeleccion = function (raiz, texto) {
    var lugar = raiz.querySelector('[data-mensajes]');
    lugar.innerHTML = C.alerta({ tipo: 'aviso', titulo: texto, texto: 'No se realizó ningún cambio.', id: 'pide-seleccion' }).toString();
    lugar.querySelector('.alerta').focus();
  };

  /* ---------- Lista ---------- */

  function lista(ctx) {
    var sel = ctx.consulta.get('sel') || '';
    var todos = DOCE.almacen.todos('materiales').slice().sort(function (a, b) { return (b.estado === 'publicado') - (a.estado === 'publicado') || b.publicado.localeCompare(a.publicado); });
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Material informativo']], titulo: 'Material informativo',
      entrada: 'Agrega, actualiza o elimina el material que se muestra en el catálogo público.',
      acciones: html`<a class="boton boton-primario" href="${LISTA}/nuevo">${icono('mas')}Agregar material</a>`
    })}
    <div class="mensajes pila" data-mensajes></div>
    <div class="tarjeta">${todos.length ? html`
      ${C.barraSeleccion({ etiqueta: 'Operaciones sobre el material seleccionado', texto: 'Selecciona un material.' })}
      <table class="tabla"><caption class="solo-lector">Materiales registrados</caption>
        <thead><tr><th scope="col"><span class="solo-lector">Seleccionar</span></th><th scope="col">Material</th><th scope="col">Tipo</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead>
        <tbody>${todos.map(function (m) {
          var oculto = html`<span class="solo-lector"> «${m.titulo}»</span>`;
          return html`<tr class="${m.estado === 'retirado' ? 'fila-retirada' : ''}">
            <td><label class="opcion celda-opcion"><input type="radio" name="material" value="${m.id}" data-titulo="${m.titulo}"${m.id === sel ? html` checked` : ''}><span class="solo-lector">Seleccionar «${m.titulo}»</span></label></td>
            <td class="celda-nombre"><span class="fila-nombre">${m.titulo}</span><span class="secundario">${M.datosArchivo(m) || 'Sin datos del archivo'}</span></td>
            <td>${C.insigniaTipo(m.tipo)}</td><td>${C.insigniaEstado(m.estado)}</td>
            <td><div class="acciones-fila">${m.estado === 'publicado'
              ? html`<a class="boton boton-secundario" href="${LISTA}/${m.id}/editar">Actualizar${oculto}</a><a class="boton boton-fantasma" href="${LISTA}/${m.id}/eliminar">Eliminar${oculto}</a>`
              : html`<button type="button" class="boton boton-fantasma" data-republicar="${m.id}">Volver a publicar${oculto}</button>`}</div></td></tr>`;
        })}</tbody></table>` : C.vacio({ icono: 'documento', titulo: 'No hay materiales registrados' })}</div>`;
  }

  function montarLista(ctx, raiz) {
    function elegido() { return raiz.querySelector('[name=material]:checked'); }
    function texto() {
      var e = elegido();
      var lugar = raiz.querySelector('[data-seleccion]');
      if (lugar) lugar.textContent = e ? 'Seleccionado: ' + e.dataset.titulo : 'Selecciona un material.';
    }
    raiz.addEventListener('change', texto);
    texto();
    [['[data-actualizar]', 'editar'], ['[data-eliminar]', 'eliminar']].forEach(function (x) {
      var b = raiz.querySelector(x[0]);
      if (b) b.addEventListener('click', function () {
        if (!elegido()) { C.pedirSeleccion(raiz, 'Se solicita que seleccione un material'); return; }
        R.ir(LISTA + '/' + elegido().value + '/' + x[1]);
      });
    });
    [].forEach.call(raiz.querySelectorAll('[data-republicar]'), function (b) {
      b.addEventListener('click', function () {
        var m = DOCE.almacen.uno('materiales', b.dataset.republicar);
        if (m && DOCE.almacen.guardar('materiales', Object.assign({}, m, { estado: 'publicado', editado: M.ahora() }))) {
          DOCE.almacen.registrarCambio('correcto', 'Volviste a publicar el material «' + m.titulo + '»');
          R.mensaje({ tipo: 'exito', titulo: 'Material publicado de nuevo', texto: '«' + m.titulo + '» ya aparece en el catálogo público.' });
        }
        R.dibujar();
      });
    });
  }

  function agregar(patron, titulo, d) {
    d.base = 'admin-material'; d.titulo = titulo; d.marco = 'admin'; d.seccion = 'material'; d.vista = lista; d.montar = montarLista;
    d.volver = function () { return LISTA; };
    R.agregar(patron, d);
  }
  R.agregar('/admin/material', { base: 'admin-material', titulo: 'Material informativo', marco: 'admin', seccion: 'material', vista: lista, montar: montarLista });

  /* ---------- Formulario ---------- */

  function formulario(m) {
    var archivo = m.archivo || (m.id && m.formato ? m.formato + ' · ' + m.tamano : '');
    return html`<form class="pila" novalidate id="form-material">
      <div data-resumen></div>
      ${C.campo({ id: 'titulo', etiqueta: 'Título', obligatorio: true, valor: m.titulo, maximo: 120 })}
      ${C.campo({ id: 'tipo', etiqueta: 'Tipo de material', tipo: 'selector', obligatorio: true, valor: m.tipo || '', opciones: [['', 'Elige un tipo'], ['folleto', 'Folleto'], ['video', 'Video'], ['documento', 'Documento']] })}
      ${C.campo({ id: 'resumen', etiqueta: 'Descripción breve', tipo: 'area', valor: m.resumen, ayuda: 'Opcional, hasta 150 caracteres. Aparece en el catálogo.' })}
      ${C.campo({ id: 'descripcion', etiqueta: 'Descripción completa', tipo: 'area', valor: m.descripcion, ayuda: 'Opcional. Aparece en el detalle.' })}
      <div class="form-dos">${C.campo({ id: 'tematica', etiqueta: 'Temática', obligatorio: true, valor: m.tematica })}${C.campo({ id: 'autor', etiqueta: 'Autor o fuente', obligatorio: true, valor: m.autor })}</div>
      <div class="form-dos" data-solo-video>${C.campo({ id: 'duracion', etiqueta: 'Duración', obligatorio: true, valor: m.duracion, marcador: '8 min 32 s' })}${C.campo({ id: 'plataforma', etiqueta: 'Plataforma', obligatorio: true, valor: m.plataforma, marcador: 'YouTube' })}</div>
      ${archivo ? html`<p class="secundario">Archivo actual: <strong>${archivo}</strong></p>` : ''}
      ${C.campoArchivo({ id: 'archivo', etiqueta: archivo ? 'Reemplazar archivo' : 'Archivo', acepta: '.pdf,.mp4,.jpg,.jpeg,.png', ayuda: 'PDF, MP4 o imagen, hasta 25 MB.' })}
      ${C.campo({ id: 'origen', etiqueta: 'Enlace externo', tipo: 'url', valor: m.origen, marcador: 'https://', ayuda: 'Para videos alojados en YouTube u otra plataforma, o el sitio de origen.' })}
      ${m.editado ? html`<p class="nota">Última modificación: ${M.momento(m.editado)}</p>` : ''}
    </form>`;
  }

  function conectar(form) {
    FM.vigilar(form);
    function tipo() { form.querySelector('[data-solo-video]').hidden = form.elements.tipo.value !== 'video'; }
    form.addEventListener('change', tipo);
    tipo();
  }

  // Datos capturados con su archivo. previo = material que se actualiza
  function reunir(form, previo) {
    var d = FM.leer(form);
    var a = U.leerArchivo(form.elements.archivo);
    var e = V.material(Object.assign({}, d, { archivo: a || (previo && (previo.archivo || previo.formato)) }));
    if (a && a.bytes > 25 * 1048576) e.archivo = 'El archivo pesa ' + a.tamano + '; el máximo es 25 MB.';
    if (a && ['PDF', 'MP4', 'JPG', 'JPEG', 'PNG'].indexOf(a.formato) < 0) e.archivo = 'Usa un archivo PDF, MP4 o imagen JPG o PNG.';
    if (d.tipo === 'video') {
      if (!d.duracion) e.duracion = 'Escribe la duración del video.';
      if (!d.plataforma) e.plataforma = 'Escribe la plataforma donde se reproduce.';
    } else { d.duracion = ''; d.plataforma = ''; }
    if (a) { d.archivo = a.nombre; d.formato = a.formato; d.tamano = a.tamano; if (previo) d.paginas = 1; }
    return { datos: d, errores: e };
  }

  /* ---------- A09 Agregar ---------- */

  agregar('/admin/material/nuevo', 'Agregar material', {
    capa: function () {
      return C.panel({
        titulo: 'Agregar material', entrada: 'Se mostrará en el catálogo al agregarlo. Los campos con * son obligatorios.', cuerpo: formulario({}),
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-material" class="boton boton-primario">Agregar</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      conectar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var r = reunir(form, null);
        if (!FM.mostrar(form, r.errores)) return;
        var m = Object.assign({ id: U.nuevoId(r.datos.titulo), estado: 'publicado', publicado: U.fecha.hoy(), formato: '', tamano: '', paginas: r.datos.tipo === 'video' ? 0 : 1, idioma: 'Español', miniatura: null, archivo: '' }, r.datos, { editado: M.ahora() });
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('materiales', m)) { FM.fallo(form, ctx, 'No fue posible agregar el material'); return; }
        DOCE.almacen.registrarCambio('documento', 'Agregaste el material «' + m.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Material agregado', texto: '«' + m.titulo + '» ya aparece en el catálogo público.' });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A14 Actualizar ---------- */

  function noDisponible() {
    return C.dialogo({
      titulo: 'El material no está disponible', icono: 'prohibido', tono: 'aviso', texto: 'Otra persona lo eliminó mientras lo tenías seleccionado. La lista se actualizó y no se aplicó ningún cambio.',
      acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver a la lista</button>`
    });
  }

  agregar('/admin/material/:id/editar', 'Actualizar material', {
    capa: function (ctx) {
      var m = uno(ctx);
      if (!m) return noDisponible();
      return C.panel({
        titulo: 'Actualizar material', entrada: 'Se cargaron los datos actuales. Los cambios se ven en el catálogo al guardar.', cuerpo: formulario(m),
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-material" class="boton boton-primario">Actualizar</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      if (!form) return;
      var estadoAlAbrir = uno(ctx).estado;
      conectar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var actual = uno(ctx);
        // RF08 CA6: se retiró mientras estaba seleccionado
        if (!actual || actual.estado !== estadoAlAbrir) {
          R.mensaje({ tipo: 'error', titulo: 'El material no está disponible', texto: 'Otra persona lo retiró mientras lo editabas. Actualizamos la lista; no se aplicó ningún cambio.' });
          R.ir(LISTA);
          return;
        }
        var r = reunir(form, actual);
        if (!FM.mostrar(form, r.errores)) return;
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('materiales', Object.assign({}, actual, r.datos, { editado: M.ahora() }))) { FM.fallo(form, ctx, 'No fue posible actualizar el material'); return; }
        DOCE.almacen.registrarCambio('lapiz', 'Actualizaste el material «' + r.datos.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Material actualizado', texto: actual.estado === 'publicado' ? 'El catálogo público ya muestra la información nueva.' : 'Sigue retirado del catálogo público.' });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A15 Eliminar ---------- */

  agregar('/admin/material/:id/eliminar', 'Eliminar material', {
    capa: function (ctx) {
      var m = uno(ctx);
      if (!m || m.estado !== 'publicado') return noDisponible();
      return C.dialogo({
        titulo: '¿Eliminar este material?', icono: 'basura', tono: 'error',
        texto: 'Dejará de mostrarse en el catálogo público. Quedará en esta lista como «Retirado» y podrás volver a publicarlo.',
        cuerpo: html`<div data-resultado></div><div class="resumen-elemento"><div class="fila-cuerpo"><span class="fila-nombre">${m.titulo}</span><span class="secundario">${[M.TIPOS_MATERIAL[m.tipo], M.datosArchivo(m)].filter(Boolean).join(' · ')}</span></div></div>`,
        acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="button" class="boton boton-peligro" data-confirmar>${icono('basura')}Eliminar</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      C.montarConfirmar(ctx, dialogo, function () {
        var m = uno(ctx);
        if (!m || m.estado !== 'publicado') { R.dibujar(); return true; }
        if (!DOCE.almacen.guardar('materiales', Object.assign({}, m, { estado: 'retirado', editado: M.ahora() }))) return false;
        DOCE.almacen.registrarCambio('basura', 'Eliminaste del catálogo «' + m.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Material eliminado', texto: '«' + m.titulo + '» ya no aparece en el catálogo público.' });
        R.ir(LISTA);
      }, 'No fue posible eliminar el material');
    }
  });
})();
