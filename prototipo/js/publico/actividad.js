/* P03 Detalle de actividad (RF02), sobre el calendario. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var icono = DOCE.icono;

  var NO_DISPONIBLE = 'La actividad ya no está disponible';

  function buscar(ctx) {
    if (ctx.estado === 'no-disponible') return null;
    return M.actividadesPublicas().find(function (a) { return a.id === ctx.params.id; }) || null;
  }

  function mes(ctx) {
    var a = DOCE.almacen.uno('actividades', ctx.params.id);
    return a && a.fechaInicio >= DOCE.util.fecha.hoy() ? a.fechaInicio.slice(0, 7) : undefined;
  }

  // Contenido del detalle; también lo usa «Ver» en administración.
  C.detalleActividad = function (a) {
    var cancelada = a.estado === 'cancelada';
    return html`<div class="pila detalle">
      <div class="fila">${C.insigniaModalidad(a.modalidad)}${cancelada ? C.insignia('Cancelada', 'error') : ''}</div>
      ${cancelada ? C.alerta({ tipo: 'aviso', titulo: 'Esta actividad se canceló', texto: 'Se muestra hasta su fecha original para que la comunidad lo sepa.' }) : ''}
      <p class="secundario">${a.descripcion}</p>
      ${C.datos(M.datosActividad(a))}
    </div>`;
  };

  DOCE.rutas.agregar('/actividad/:id', {
    base: 'calendario', seccion: 'calendario',
    titulo: function (ctx) { var a = buscar(ctx); return a && ctx.estado !== 'error' ? a.nombre : 'Detalle de la actividad'; },
    vista: function (ctx) { return DOCE.publico.calendario.contenido(ctx.consulta, '', mes(ctx)); },
    volver: function (ctx) {
      // RF01 CA8: regresa al calendario con el mensaje
      if (ctx.estado !== 'error' && !buscar(ctx)) DOCE.rutas.mensaje({ tipo: 'aviso', titulo: NO_DISPONIBLE });
      return DOCE.publico.calendario.volver(ctx.consulta, mes(ctx));
    },
    capa: function (ctx) {
      if (ctx.estado === 'error') {
        return C.dialogo({
          titulo: 'No pudimos cargar el detalle', icono: 'sinconexion', tono: 'error',
          texto: 'No fue posible consultar el detalle de la actividad. Revisa tu conexión e inténtalo de nuevo.',
          acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Volver al calendario</button>
            <button type="button" class="boton boton-primario" data-reintentar>Reintentar</button>`
        });
      }
      var a = buscar(ctx);
      if (!a) {
        return C.dialogo({
          titulo: NO_DISPONIBLE, icono: 'prohibido', tono: 'aviso',
          texto: 'Dejó de estar publicada. Vuelve al calendario para ver la información actualizada.',
          acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver al calendario</button>`
        });
      }
      var conSesion = a.modalidad !== 'presencial' && a.estado === 'publicada' && DOCE.util.esEnlace(a.enlace);
      return C.panel({
        titulo: html`<span class="detalle-titulo">${C.sello(a.fechaInicio, a.estado === 'cancelada')}<span>${a.nombre}</span></span>`,
        entrada: 'Detalle de la actividad',
        cuerpo: C.detalleActividad(a),
        pie: html`<div class="fila">
          ${conSesion ? html`<a class="boton boton-primario" href="${a.enlace}" target="_blank" rel="noopener">${icono('externo')}Abrir enlace de la sesión</a>` : ''}
          <button type="button" class="boton ${conSesion ? 'boton-secundario' : 'boton-primario'}" data-cerrar-capa>Cerrar</button>
        </div>`
      });
    }
  });
})();
