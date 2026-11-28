/* A08, A12, A13, A13b: líneas de ayuda en administración (RF06.3 a RF06.5). */
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
  var LISTA = '#/admin/lineas';

  function ambito(id) { return M.AMBITOS.find(function (a) { return a.id === id; }) || { plural: '' }; }
  function una(ctx) { return ctx.estado === 'no-disponible' ? null : DOCE.almacen.uno('lineas', ctx.params.id); }

  function lista() {
    var lineas = M.lineasOrdenadas();
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Líneas de ayuda']], titulo: 'Líneas de ayuda',
      entrada: 'Registra, modifica o elimina las líneas que verá la comunidad, organizadas por ámbito.',
      acciones: html`<a class="boton boton-primario" href="${LISTA}/nueva">${icono('mas')}Registrar línea</a>`
    })}
    <div class="mensajes" data-mensajes></div>
    <div class="pila lineas-grupos">${M.AMBITOS.map(function (a) {
      var suyas = lineas.filter(function (l) { return l.ambito === a.id; });
      return html`<section class="tarjeta" aria-labelledby="am-${a.id}">
        <div class="fila separados linea-cabeza"><h2 class="titulo-4" id="am-${a.id}">${a.plural}</h2>${C.insignia(U.plural(suyas.length, 'línea', 'líneas'))}</div>
        ${suyas.length ? html`<ul>${suyas.map(function (l) {
          var oculto = html`<span class="solo-lector"> «${l.nombre}»</span>`;
          return html`<li class="linea"><div class="linea-datos"><h3 class="linea-nombre">${l.nombre}</h3><p class="secundario">${l.telefono} · ${l.horario}</p></div>
            <div class="acciones-fila acciones-centro">${l.destacada ? C.insignia('Destacada', 'dorado') : ''}
              <a class="boton boton-secundario" href="${LISTA}/${l.id}/editar">Modificar${oculto}</a><a class="boton boton-fantasma" href="${LISTA}/${l.id}/eliminar">Eliminar${oculto}</a></div></li>`;
        })}</ul>` : html`<p class="secundario linea">No hay líneas registradas en este ámbito.</p>`}
      </section>`;
    })}</div>`;
  }

  function agregar(patron, titulo, d) {
    d.base = 'admin-lineas'; d.titulo = titulo; d.marco = 'admin'; d.seccion = 'lineas'; d.vista = lista; d.volver = function () { return LISTA; };
    R.agregar(patron, d);
  }
  R.agregar('/admin/lineas', { base: 'admin-lineas', titulo: 'Líneas de ayuda', marco: 'admin', seccion: 'lineas', vista: lista });

  /* ---------- Formulario ---------- */

  function formulario(l, pie) {
    return html`<form class="pila" novalidate id="form-linea">
      <div data-resumen></div>
      ${C.campo({ id: 'nombre', etiqueta: 'Nombre de la línea', obligatorio: true, valor: l.nombre, maximo: 120 })}
      ${C.campo({ id: 'ambito', etiqueta: 'Ámbito de atención', tipo: 'selector', obligatorio: true, valor: l.ambito || '', opciones: [['', 'Elige un ámbito']].concat(M.AMBITOS.map(function (a) { return [a.id, a.singular]; })) })}
      ${C.campo({ id: 'institucion', etiqueta: 'Institución responsable', valor: l.institucion })}
      ${C.campo({ id: 'apoyo', etiqueta: 'Descripción del tipo de apoyo', tipo: 'area', obligatorio: true, valor: l.apoyo })}
      <div class="form-dos">
        ${C.campo({ id: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', obligatorio: true, valor: l.telefono, ayuda: '10 dígitos; extensión opcional.' })}
        ${C.campo({ id: 'horario', etiqueta: 'Horario', obligatorio: true, valor: l.horario, ayuda: 'Por ejemplo: 24 horas.' })}
      </div>
      ${C.campo({ id: 'sitio', etiqueta: 'Sitio web', tipo: 'url', valor: l.sitio, marcador: 'https://', ayuda: 'Opcional.' })}
      ${C.campo({ id: 'correo', etiqueta: 'Correo', tipo: 'email', valor: l.correo, ayuda: 'Opcional.' })}
      <label class="opcion"><input type="checkbox" name="gratuita"${l.gratuita ? html` checked` : ''}><span>Es gratuita</span></label>
      <label class="opcion"><input type="checkbox" name="destacada"${l.destacada ? html` checked` : ''}><span>Destacada: aparece en el acceso rápido de todas las páginas</span></label>
      ${pie || ''}
    </form>`;
  }

  // RF06 CA8: mismo teléfono, mismo nombre, o un nombre contenido en otro del mismo ámbito
  function parecida(d, id) {
    var nombre = U.normalizar(d.nombre);
    var tel = U.enlaceTelefono(d.telefono);
    return DOCE.almacen.todos('lineas').find(function (l) {
      if (l.id === id) return false;
      var otro = U.normalizar(l.nombre);
      if (otro === nombre || (tel && U.enlaceTelefono(l.telefono) === tel)) return true;
      return l.ambito === d.ambito && nombre.length >= 6 && otro.length >= 6 && (otro.indexOf(nombre) >= 0 || nombre.indexOf(otro) >= 0);
    }) || null;
  }

  function avisoDuplicado(l, queda) {
    return {
      tipo: 'aviso', titulo: 'Ya existe una línea parecida',
      texto: '«' + l.nombre + '» ya está registrada en ' + ambito(l.ambito).plural + ' (' + l.telefono + ', ' + l.horario + '). Revisa los datos; ' + queda,
      accion: html`<a class="boton boton-secundario alerta-boton" href="${LISTA}/${l.id}/editar">Revisar «${l.nombre}»</a>`
    };
  }

  // Duplicado al escribir, como en A08
  function vigilarDuplicado(form, id, queda) {
    form.addEventListener('change', function (ev) {
      if (['nombre', 'telefono', 'ambito'].indexOf(ev.target.name) < 0) return;
      var d = FM.leer(form);
      var l = d.nombre && parecida(d, id);
      var resumen = form.querySelector('[data-resumen]');
      if (l) resumen.innerHTML = C.alerta(avisoDuplicado(l, queda)).toString();
      else if (resumen.querySelector('.alerta-aviso')) resumen.innerHTML = '';
    });
  }

  /* ---------- A08 Registrar ---------- */

  var QUEDA_NUEVA = 'no se creó un registro duplicado.';

  agregar('/admin/lineas/nueva', 'Registrar línea de ayuda', {
    capa: function () {
      return C.panel({
        titulo: 'Registrar línea de ayuda', entrada: 'Los campos con * son obligatorios.', cuerpo: formulario({}),
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-linea" class="boton boton-primario">Guardar línea</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      FM.vigilar(form);
      vigilarDuplicado(form, null, QUEDA_NUEVA);
      // RF06 CA9: cancelar pide confirmación
      dialogo.dataset.protegido = 'si';
      dialogo.addEventListener('doce:cerrar', function () {
        C.confirmar({ titulo: '¿Cancelar el registro?', texto: 'La línea de ayuda no se guardará y se perderá lo que escribiste.', icono: 'prohibido', tono: 'aviso', no: 'Seguir registrando', si: 'Sí, cancelar' })
          .then(function (si) { if (si) R.ir(LISTA); });
      });
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = FM.leer(form);
        if (!FM.mostrar(form, V.linea(d))) return;
        var l = parecida(d, null);
        if (l) { FM.aviso(form, avisoDuplicado(l, QUEDA_NUEVA)); return; }
        d.id = U.nuevoId(d.nombre);
        d.editado = M.ahora();
        // RF06 CA10: informa y cancela el registro
        if (ctx.estado === 'error' || !DOCE.almacen.guardar('lineas', d)) {
          R.mensaje({ tipo: 'error', titulo: 'No fue posible registrar la línea de ayuda', texto: 'No se pudo completar la operación y el registro se canceló. Inténtalo de nuevo más tarde.' });
          R.ir(LISTA);
          return;
        }
        DOCE.almacen.registrarCambio('salvavidas', 'Registraste la línea «' + d.nombre + '»');
        R.mensaje({
          tipo: 'exito', titulo: 'Línea de ayuda registrada', texto: '«' + d.nombre + '» (' + d.telefono + ', ' + d.horario + ') ya aparece en ' + ambito(d.ambito).plural + '.',
          accion: html`<a class="boton boton-secundario alerta-boton" href="${LISTA}/nueva">Registrar otra línea</a>`
        });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A12 Modificar ---------- */

  var QUEDA_IGUAL = 'no se modificó la línea.';

  function noDisponible(titulo) {
    return C.dialogo({
      titulo: titulo, icono: 'prohibido', tono: 'aviso', texto: 'Ya no está registrada: otra persona la eliminó. No se aplicó ningún cambio y la lista se actualizó.',
      acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver a la lista</button>`
    });
  }

  agregar('/admin/lineas/:id/editar', 'Modificar línea de ayuda', {
    capa: function (ctx) {
      var l = una(ctx);
      if (!l) return noDisponible('La línea de ayuda no está disponible');
      return C.panel({
        titulo: 'Modificar línea de ayuda', entrada: 'Se cargaron los datos actuales. Los campos con * son obligatorios.',
        cuerpo: formulario(l, html`<p class="nota">Última modificación: ${M.momento(l.editado)}</p>`),
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-linea" class="boton boton-primario">Guardar cambios</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var form = dialogo.querySelector('form');
      if (!form) return;
      var abierta = una(ctx).editado;
      FM.vigilar(form);
      vigilarDuplicado(form, ctx.params.id, QUEDA_IGUAL);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var actual = una(ctx);
        if (!actual) { R.dibujar(); return; } // RF06 CA13
        var d = FM.leer(form);
        if (!FM.mostrar(form, V.linea(d))) return;
        if (actual.editado !== abierta) { // CU-06.3 FA06
          abierta = actual.editado;
          FM.aviso(form, { tipo: 'aviso', titulo: 'Otra persona modificó esta línea', texto: 'Los datos cambiaron después de que abriste el formulario. Si guardas otra vez, se conservarán los tuyos.' });
          return;
        }
        var l = parecida(d, actual.id);
        if (l) { FM.aviso(form, avisoDuplicado(l, QUEDA_IGUAL)); return; }
        // RF06 CA15: informa y sigue en el formulario
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar('lineas', Object.assign({}, actual, d, { editado: M.ahora() + ':' + (Date.now() % 100000) }))) {
          FM.fallo(form, ctx, 'No fue posible completar la modificación', 'Los cambios no se guardaron. Tus datos siguen aquí; inténtalo de nuevo.');
          return;
        }
        DOCE.almacen.registrarCambio('lapiz', 'Modificaste la línea «' + d.nombre + '»');
        R.mensaje({ tipo: 'exito', titulo: 'Línea de ayuda modificada', texto: 'Datos actualizados: ' + d.nombre + ' · ' + d.telefono + ' · ' + d.horario + ' · ' + ambito(d.ambito).plural + '.' });
        R.ir(LISTA);
      });
    }
  });

  /* ---------- A13 Eliminar ---------- */

  agregar('/admin/lineas/:id/eliminar', 'Eliminar línea de ayuda', {
    capa: function (ctx) {
      var l = una(ctx);
      if (!l) return noDisponible('Esta línea de ayuda ya fue eliminada'); // RF06 CA19
      return C.dialogo({
        titulo: '¿Eliminar esta línea de ayuda?', icono: 'basura', tono: 'error',
        texto: 'Dejará de mostrarse en Líneas de ayuda. Esta acción no se puede deshacer.',
        cuerpo: html`${l.destacada ? C.alerta({ tipo: 'aviso', titulo: 'Es una línea destacada', texto: 'También dejará de aparecer en el acceso rápido de todas las páginas.' }) : ''}
          <div class="resumen-elemento"><div class="fila-cuerpo"><span class="fila-nombre">${l.nombre}</span><span class="secundario">${ambito(l.ambito).plural} · ${l.telefono} · ${l.horario}</span></div></div>`,
        acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="button" class="boton boton-peligro" data-confirmar>${icono('basura')}Eliminar línea</button>`
      });
    },
    montarCapa: function (ctx, dialogo) {
      var boton = dialogo.querySelector('[data-confirmar]');
      if (!boton) return;
      boton.addEventListener('click', function () {
        var l = una(ctx);
        if (!l) { R.dibujar(); return; }
        // RF06 CA20: informa y cierra la confirmación
        if (ctx.estado === 'error' || !DOCE.almacen.eliminar('lineas', l.id)) {
          R.mensaje({ tipo: 'error', titulo: 'No fue posible eliminar la línea de ayuda', texto: '«' + l.nombre + '» sigue registrada. Inténtalo de nuevo más tarde.' });
        } else {
          DOCE.almacen.registrarCambio('basura', 'Eliminaste la línea «' + l.nombre + '»');
          R.mensaje({ tipo: 'exito', titulo: 'Línea de ayuda eliminada', texto: '«' + l.nombre + '» ya no aparece en el sitio público. La lista se actualizó.' });
        }
        R.ir(LISTA);
      });
    }
  });
})();
