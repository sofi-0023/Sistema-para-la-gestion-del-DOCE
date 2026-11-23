/* A02 Panel de administración. Cifras y pendientes salen de los datos. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var F = DOCE.util.fecha;
  var icono = DOCE.icono;

  function saludo() {
    var h = new Date().getHours();
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  }

  function borrador(tipo, o) {
    var esActividad = tipo === 'actividades';
    var nombre = esActividad ? o.nombre : o.titulo;
    return html`<li class="pendiente">
      ${esActividad ? C.sello(o.fechaInicio) : html`<span class="sello-aviso" aria-hidden="true">${icono('megafono', 'icono-l')}</span>`}
      <div class="fila-cuerpo"><h3 class="fila-nombre titulo-fila">${nombre}</h3>
        <div class="fila insignias">${C.insigniaEstado('borrador')}${C.insignia(esActividad ? 'Actividad' : 'Aviso')}${esActividad ? C.insigniaModalidad(o.modalidad) : ''}</div></div>
      <a class="boton boton-secundario" href="#/admin/${tipo}/${o.id}/revisar">Revisar y publicar<span class="solo-lector"> «${nombre}»</span></a>
    </li>`;
  }

  function cifra(n, uno, varios) { return html`<li><span class="cifra">${n}</span><span>${n === 1 ? uno : varios}</span></li>`; }

  DOCE.rutas.agregar('/admin', {
    titulo: 'Panel de administración', marco: 'admin', seccion: 'panel',
    vista: function () {
      var act = M.actividadesAdmin().filter(function (a) { return a.estado === 'borrador'; });
      var avi = DOCE.almacen.todos('avisos').filter(function (a) { return a.estado === 'borrador'; });
      var n = act.length + avi.length;
      var publicadas = M.actividadesPublicas().filter(function (a) { return a.estado === 'publicada'; }).length;
      var avisos = M.avisosPublicos().filter(function (a) { return a.estado === 'publicado'; }).length;
      var cambios = DOCE.almacen.todos('cambios').slice(0, 5);
      return html`${C.cabezaAdmin({
        titulo: saludo() + ', ' + DOCE.config.persona.nombre,
        entrada: 'Esto es lo que necesita tu atención hoy, ' + F.sinAnio(F.hoy()).toLowerCase() + '.',
        acciones: C.accionesCrear()
      })}
      <div class="panel-rejilla">
        <section class="tarjeta" aria-labelledby="p-pend">
          <div class="fila separados linea-cabeza"><div><h2 id="p-pend">Pendientes de publicar</h2><p class="secundario">Borradores que aún no ve la comunidad.</p></div>
            ${C.insignia(U.plural(n, 'borrador', 'borradores'), n ? 'dorado' : '')}</div>
          ${n ? html`<ul>${act.map(function (a) { return borrador('actividades', a); })}${avi.map(function (a) { return borrador('avisos', a); })}</ul>`
            : html`<p class="secundario">No hay borradores pendientes.</p>`}
        </section>
        <div class="pila">
          <section class="tarjeta" aria-labelledby="p-acc"><h2 class="titulo-4" id="p-acc">Accesos rápidos</h2>
            <ul class="accesos">
              <li><a href="#/admin/lineas/nueva">${icono('salvavidas')}<span>Registrar línea de ayuda</span>${icono('siguiente', 'fila-flecha')}</a></li>
              <li><a href="#/admin/material/nuevo">${icono('documento')}<span>Agregar material informativo</span>${icono('siguiente', 'fila-flecha')}</a></li>
              <li><a href="#/admin/fotos/subir">${icono('subir')}<span>Subir fotografías</span>${icono('siguiente', 'fila-flecha')}</a></li>
            </ul></section>
          <section class="tarjeta" aria-labelledby="p-pub"><h2 class="titulo-4" id="p-pub">Publicado ahora</h2>
            <ul class="cifras">
              ${cifra(publicadas, 'actividad próxima en el calendario', 'actividades próximas en el calendario')}
              ${cifra(avisos, 'aviso visible', 'avisos visibles')}
              ${cifra(M.materialesPublicos().length, 'material informativo', 'materiales informativos')}
              ${cifra(DOCE.almacen.todos('fotos').length, 'foto en la galería', 'fotos en la galería')}
            </ul></section>
        </div>
      </div>
      <section class="tarjeta panel-cambios" aria-labelledby="p-cam"><h2 id="p-cam">Cambios recientes</h2>
        <ul>${cambios.map(function (c) {
          return html`<li>${icono(c.icono)}<span class="fila-cuerpo">${c.texto}</span><span class="nota">${M.momento(c.momento)}</span></li>`;
        })}</ul></section>`;
    }
  });

  C.accionesCrear = function () {
    return html`<a class="boton boton-secundario" href="#/admin/avisos/nuevo">${icono('megafono')}Crear aviso</a>
      <a class="boton boton-primario" href="#/admin/actividades/nueva">${icono('mas')}Crear actividad</a>`;
  };
})();
