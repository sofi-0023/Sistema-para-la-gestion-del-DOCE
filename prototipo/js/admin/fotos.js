/* A10, A16, A17, A17b: fotogalería en administración (RF09 CA1 a CA6). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var FM = DOCE.formulario;
  var R = DOCE.rutas;
  var icono = DOCE.icono;
  var LISTA = '#/admin/fotos';
  var PIDE = 'Se solicita que seleccione al menos una foto';

  function una(ctx) { return ctx.estado === 'no-disponible' ? null : DOCE.almacen.uno('fotos', ctx.params.id); }

  function lista() {
    var fotos = M.fotosOrdenadas();
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Fotogalería']], titulo: 'Fotogalería', entrada: 'Sube fotos de las actividades realizadas, edita su descripción o elimínalas.',
      acciones: html`<a class="boton boton-primario" href="${LISTA}/subir">${icono('subir')}Subir fotografías</a>`
    })}
    <div class="mensajes pila" data-mensajes></div>
    <div class="tarjeta"><h2 class="titulo-4">${U.plural(fotos.length, 'foto publicada', 'fotos publicadas')}</h2>
      ${C.barraSeleccion({ etiqueta: 'Operaciones sobre las fotos seleccionadas', texto: 'Selecciona una foto para editarla o eliminarla.' })}
      ${fotos.length ? html`<ul class="galeria galeria-admin">${fotos.map(function (f) {
        var oculto = html`<span class="solo-lector"> «${f.titulo}»</span>`;
        return html`<li class="foto"><label class="foto-elegir">${C.foto(f, true)}<span class="opcion"><input type="checkbox" name="foto" value="${f.id}"><span class="foto-titulo">${f.titulo}</span></span></label>
          <div class="acciones-fila"><a class="boton boton-fantasma" href="${LISTA}/${f.id}/editar">Editar${oculto}</a><a class="boton boton-fantasma" href="${LISTA}/eliminar?ids=${f.id}">Eliminar${oculto}</a></div></li>`;
      })}</ul>` : C.vacio({ icono: 'imagen', titulo: 'No hay fotos publicadas' })}</div>`;
  }

  function montarLista(ctx, raiz) {
    function elegidas() { return [].map.call(raiz.querySelectorAll('[name=foto]:checked'), function (e) { return e.value; }); }
    raiz.addEventListener('change', function () {
      var n = elegidas().length;
      raiz.querySelector('[data-seleccion]').textContent = n ? U.plural(n, 'foto seleccionada', 'fotos seleccionadas') : 'Selecciona una foto para editarla o eliminarla.';
    });
    raiz.querySelector('[data-actualizar]').addEventListener('click', function () {
      var ids = elegidas();
      if (!ids.length) C.pedirSeleccion(raiz, PIDE);
      else if (ids.length > 1) C.pedirSeleccion(raiz, 'Selecciona solo una foto para actualizarla');
      else R.ir(LISTA + '/' + ids[0] + '/editar');
    });
    raiz.querySelector('[data-eliminar]').addEventListener('click', function () {
      var ids = elegidas();
      if (!ids.length) C.pedirSeleccion(raiz, PIDE); else R.ir(LISTA + '/eliminar?ids=' + ids.join(','));
    });
  }

  function agregar(patron, titulo, d) {
    d.base = 'admin-fotos'; d.titulo = titulo; d.marco = 'admin'; d.seccion = 'fotos'; d.vista = lista; d.montar = montarLista; d.volver = function () { return LISTA; };
    R.agregar(patron, d);
  }
  R.agregar('/admin/fotos', { base: 'admin-fotos', titulo: 'Fotogalería', marco: 'admin', seccion: 'fotos', vista: lista, montar: montarLista });

  /* ---------- Imágenes ---------- */

  // Reduce la imagen para que quepa en localStorage. Devuelve una promesa con un data URI.
  function reducir(archivo) {
    return new Promise(function (resolver, rechazar) {
      var lector = new FileReader();
      lector.onerror = rechazar;
      lector.onload = function () {
        var img = new Image();
        img.onerror = rechazar;
        img.onload = function () {
          var e = Math.min(1, 800 / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(img.width * e));
          c.height = Math.max(1, Math.round(img.height * e));
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolver(c.toDataURL('image/jpeg', 0.75));
        };
        img.src = lector.result;
      };
      lector.readAsDataURL(archivo);
    });
  }

  function revisarImagen(f) {
    if (!/^image\/(jpeg|png)$/.test(f.type)) return '«' + f.name + '» no es una imagen JPG o PNG.';
    if (f.size > 10 * 1048576) return '«' + f.name + '» pesa más de 10 MB.';
    return '';
  }

  var AYUDA = 'JPG o PNG, hasta 10 MB cada una.';

  /* ---------- A16 Subir ---------- */

  agregar('/admin/fotos/subir', 'Subir fotografías', {
    capa: function () {
      return C.panel({
        titulo: 'Subir fotografías', entrada: 'Agrega un título y una descripción a cada foto.',
        cuerpo: html`<form class="pila" novalidate id="form-fotos"><div data-resumen></div>
          ${C.campoArchivo({ id: 'imagenes', etiqueta: 'Fotografías', obligatorio: true, acepta: 'image/jpeg,image/png', varios: true, ayuda: AYUDA + ' Puedes elegir varias.' })}
          <p class="secundario" role="status" data-cuenta></p><div class="pila" data-nuevas></div></form>`,
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-fotos" class="boton boton-primario">${icono('subir')}Agregar</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      var nuevas = [];
      FM.vigilar(form);

      function contar() {
        form.querySelector('[data-cuenta]').textContent = nuevas.length ? U.plural(nuevas.length, 'foto seleccionada', 'fotos seleccionadas') : '';
      }

      form.elements.imagenes.addEventListener('change', function () {
        var archivos = [].slice.call(form.elements.imagenes.files);
        var problemas = archivos.map(revisarImagen).filter(Boolean);
        form.elements.imagenes.value = '';
        archivos.filter(function (f) { return !revisarImagen(f); }).forEach(function (f) {
          reducir(f).then(function (uri) {
            var id = 'n' + Date.now().toString(36) + nuevas.length;
            nuevas.push({ id: id, imagen: uri });
            form.querySelector('[data-nuevas]').insertAdjacentHTML('beforeend', html`<fieldset class="foto-nueva" data-nueva="${id}"><legend class="solo-lector">Foto ${nuevas.length}: ${f.name}</legend>
              <img src="${uri}" alt="Vista previa de ${f.name}"><div class="pila">
              ${C.campo({ id: 'titulo-' + id, etiqueta: 'Título', obligatorio: true, maximo: 80 })}${C.campo({ id: 'descripcion-' + id, etiqueta: 'Descripción', obligatorio: true, tipo: 'area', ayuda: 'También la leen los lectores de pantalla.' })}
              <div><button type="button" class="boton boton-fantasma" data-quitar="${id}">${icono('cerrar')}Quitar foto</button></div></div></fieldset>`.toString());
            contar();
          }, function () { FM.mostrar(form, { imagenes: 'No fue posible leer «' + f.name + '».' }); });
        });
        if (problemas.length) FM.mostrar(form, { imagenes: problemas.join(' ') }, { texto: 'Las demás imágenes sí se agregaron.' });
        else FM.limpiar(form, 'imagenes');
      });

      form.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-quitar]');
        if (!b) return;
        nuevas = nuevas.filter(function (n) { return n.id !== b.dataset.quitar; });
        form.querySelector('[data-nueva="' + b.dataset.quitar + '"]').remove();
        contar();
      });

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        var e = {};
        if (!nuevas.length) e.imagenes = 'Elige al menos una fotografía.';
        nuevas.forEach(function (n, i) {
          if (!d['titulo-' + n.id]) e['titulo-' + n.id] = 'Escribe un título para esta foto (foto ' + (i + 1) + ').';
          if (!d['descripcion-' + n.id]) e['descripcion-' + n.id] = 'Escribe una descripción para esta foto (foto ' + (i + 1) + ').';
        });
        if (!FM.mostrar(form, e)) return;
        var guardadas = [];
        var ok = !FM.debeFallar(ctx) && nuevas.every(function (n) {
          var f = { id: U.nuevoId(d['titulo-' + n.id]), titulo: d['titulo-' + n.id], descripcion: d['descripcion-' + n.id], fecha: U.fecha.hoy(), imagen: n.imagen };
          guardadas.push(f.id);
          return DOCE.almacen.guardar('fotos', f);
        });
        if (!ok) {
          DOCE.almacen.eliminar('fotos', guardadas);
          FM.fallo(form, ctx, 'No fue posible agregar las fotos', 'No se publicó ninguna y tus datos se conservaron. Si el espacio del navegador está lleno, quita alguna foto e inténtalo de nuevo.');
          return;
        }
        DOCE.almacen.registrarCambio('imagen', 'Subiste ' + U.plural(nuevas.length, 'fotografía', 'fotografías'));
        R.mensaje({ tipo: 'exito', titulo: nuevas.length === 1 ? 'Se publicó 1 fotografía' : 'Se publicaron ' + nuevas.length + ' fotografías', texto: 'Ya ' + (nuevas.length === 1 ? 'aparece' : 'aparecen') + ' en la fotogalería pública.' });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A17 Editar ---------- */

  function noDisponible() {
    return C.dialogo({
      titulo: 'La foto no está disponible', icono: 'prohibido', tono: 'aviso', texto: 'Se eliminó mientras la tenías seleccionada. Actualizamos la galería; no se aplicó ningún cambio.',
      acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver a la galería</button>`
    });
  }

  agregar('/admin/fotos/:id/editar', 'Editar fotografía', {
    capa: function (ctx) {
      var f = una(ctx);
      if (!f) return noDisponible();
      return C.panel({
        titulo: 'Editar fotografía', entrada: 'Puedes cambiar la imagen, el título o la descripción.',
        cuerpo: html`<form class="pila" novalidate id="form-foto"><div data-resumen></div><div data-vista-foto>${C.foto(f)}</div>
          ${C.campoArchivo({ id: 'imagen', etiqueta: 'Reemplazar imagen', acepta: 'image/jpeg,image/png', ayuda: AYUDA })}
          ${C.campo({ id: 'titulo', etiqueta: 'Título', obligatorio: true, valor: f.titulo, maximo: 80 })}
          ${C.campo({ id: 'descripcion', etiqueta: 'Descripción', tipo: 'area', obligatorio: true, valor: f.descripcion })}
          <p class="nota">Publicada el ${U.fecha.diaMesAnio(f.fecha)}</p></form>`,
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-foto" class="boton boton-primario">Guardar cambios</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      if (!form) return;
      var nueva = null;
      FM.vigilar(form);
      form.elements.imagen.addEventListener('change', function () {
        var a = form.elements.imagen.files[0];
        if (!a) return;
        var p = revisarImagen(a);
        if (p) { form.elements.imagen.value = ''; FM.mostrar(form, { imagen: p }); return; }
        reducir(a).then(function (uri) {
          nueva = uri;
          form.querySelector('[data-vista-foto]').innerHTML = C.foto({ imagen: uri, descripcion: 'Vista previa de la imagen nueva' }).toString();
        }, function () { FM.mostrar(form, { imagen: 'No fue posible leer la imagen.' }); });
      });
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var actual = una(ctx);
        if (!actual) { R.dibujar(); return; } // RF09 CA6
        var d = FM.leer(form);
        var e = {};
        if (!d.titulo) e.titulo = 'Escribe un título para esta foto.';
        if (!d.descripcion) e.descripcion = 'Escribe una descripción para esta foto.';
        if (!FM.mostrar(form, e)) return;
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('fotos', Object.assign({}, actual, { titulo: d.titulo, descripcion: d.descripcion, imagen: nueva || actual.imagen }))) { FM.fallo(form, ctx, 'No fue posible guardar los cambios'); return; }
        DOCE.almacen.registrarCambio('lapiz', 'Editaste la foto «' + d.titulo + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Fotografía actualizada', texto: 'La fotogalería pública ya muestra los cambios.' });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A10 Eliminar una o varias ---------- */

  function porEliminar(ctx) {
    if (ctx.estado === 'no-disponible') return [];
    return (ctx.consulta.get('ids') || '').split(',').map(function (id) { return DOCE.almacen.uno('fotos', id); }).filter(Boolean);
  }

  agregar('/admin/fotos/eliminar', 'Eliminar fotografías', {
    capa: function (ctx) {
      var fotos = porEliminar(ctx);
      if (!fotos.length && !ctx.consulta.get('ids') && !ctx.estado) {
        return C.dialogo({ titulo: PIDE, icono: 'info', tono: 'aviso', texto: 'No se realizó ningún cambio.', acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Entendido</button>` });
      }
      if (!fotos.length) return noDisponible();
      var n = fotos.length;
      return C.dialogo({
        titulo: n === 1 ? '¿Eliminar esta fotografía?' : '¿Eliminar ' + n + ' fotografías?', icono: 'basura', tono: 'error',
        texto: n === 1 ? 'Se eliminarán la foto «' + fotos[0].titulo + '» y su descripción. Dejará de verse en la fotogalería pública y no se puede deshacer.' : 'Se eliminarán las fotos y sus descripciones. Dejarán de verse en la fotogalería pública y no se puede deshacer.',
        cuerpo: html`<div data-resultado></div>${fotos.map(function (f) {
          return html`<div class="resumen-elemento"><span class="foto-mini">${C.foto(f, true)}</span><div class="fila-cuerpo"><span class="fila-nombre">${f.titulo}</span><span class="secundario">${f.descripcion}</span></div></div>`;
        })}`,
        acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="button" class="boton boton-peligro" data-confirmar>${icono('basura')}${n === 1 ? 'Eliminar fotografía' : 'Eliminar fotografías'}</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var pedidas = (ctx.consulta.get('ids') || '').split(',').length;
      C.montarConfirmar(ctx, dialogo, function () {
        var fotos = porEliminar(ctx);
        if (!fotos.length) { R.dibujar(); return true; }
        if (!DOCE.almacen.eliminar('fotos', fotos.map(function (f) { return f.id; }))) return false;
        DOCE.almacen.registrarCambio('basura', 'Eliminaste ' + U.plural(fotos.length, 'fotografía', 'fotografías'));
        R.mensaje({
          tipo: 'exito', titulo: fotos.length === 1 ? 'Fotografía eliminada' : 'Se eliminaron ' + fotos.length + ' fotografías',
          texto: 'Ya no ' + (fotos.length === 1 ? 'aparece' : 'aparecen') + ' en la fotogalería pública.' + (fotos.length < pedidas ? ' Las demás ya no estaban disponibles.' : '')
        });
        R.ir(LISTA);
      }, 'No fue posible eliminar las fotos');
    }
  });
})();
