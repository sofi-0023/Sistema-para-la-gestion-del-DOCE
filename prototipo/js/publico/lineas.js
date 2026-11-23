/* P05 Líneas de ayuda (RF06.1). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var icono = DOCE.icono;

  function linea(l) {
    var tel = U.enlaceTelefono(l.telefono);
    return html`<li class="linea">
      <div class="linea-datos">
        <h3 class="linea-nombre">${l.nombre}</h3>
        ${l.institucion ? html`<p class="nota">${l.institucion}</p>` : ''}
        <p class="secundario">${l.apoyo}</p>
        <p class="linea-horario">${icono('reloj', 'icono-s')}<span><span class="solo-lector">Horario: </span>${l.horario}</span></p>
        <div class="fila">
          ${l.gratuita ? C.insignia('Gratuita', 'exito') : ''}${l.destacada ? C.insignia('Emergencia y crisis', 'dorado') : ''}
          ${U.esEnlace(l.sitio) ? html`<a class="linea-canal" href="${l.sitio}" target="_blank" rel="noopener">${icono('externo', 'icono-s')}Sitio web<span class="solo-lector"> de ${l.nombre} (abre en otra pestaña)</span></a>` : ''}
          ${l.correo ? html`<a class="linea-canal" href="mailto:${l.correo}">${icono('correo', 'icono-s')}${l.correo}</a>` : ''}
        </div>
      </div>
      <div class="linea-contacto">
        <div><p class="nota">Teléfono</p><p class="linea-telefono">${l.telefono}</p></div>
        ${tel ? html`<a class="boton ${l.destacada ? 'boton-primario' : 'boton-secundario'}" href="${tel}">${icono('telefono')}Llamar<span class="solo-lector"> a ${l.nombre}</span></a>` : ''}
      </div>
    </li>`;
  }

  function grupo(a, lista) {
    return html`<section class="tarjeta" aria-labelledby="ambito-${a.id}">
      <div class="fila separados linea-cabeza"><div><h2 id="ambito-${a.id}">${a.plural}</h2><p class="secundario">${a.texto}</p></div>
        ${C.insignia(U.plural(lista.length, 'servicio', 'servicios'))}</div>
      ${lista.length ? html`<ul>${lista.map(linea)}</ul>` : html`<p class="secundario linea">No hay líneas de ayuda disponibles en este ámbito.</p>`}
    </section>`;
  }

  DOCE.rutas.agregar('/lineas', {
    titulo: 'Líneas de ayuda', seccion: 'lineas',
    vista: function (ctx) {
      var ambito = ctx.consulta.get('ambito') || '';
      var lineas = ctx.estado === 'vacio' ? [] : DOCE.almacen.todos('lineas').slice().sort(U.ordenAlfabetico('nombre'));
      var grupos = M.AMBITOS.filter(function (a) { return !ambito || a.id === ambito; });
      var cuerpo;
      if (ctx.estado === 'error') {
        cuerpo = html`<div class="tarjeta">${C.errorConsulta({ titulo: 'No fue posible cargar las líneas de ayuda', texto: 'No se pudo conectar con los servidores. Revisa tu conexión a internet e inténtalo de nuevo.' })}</div>`;
      } else if (!lineas.length) {
        cuerpo = html`<div class="tarjeta">${C.vacio({ icono: 'salvavidas', titulo: 'No hay líneas de ayuda disponibles', texto: 'El DOCE está actualizando esta información. En una emergencia, llama al 911.' })}</div>`;
      } else {
        cuerpo = html`<nav class="filtros lineas-filtros" aria-label="Filtrar por ámbito">
            <a class="filtro" href="#/lineas"${ambito ? '' : html` aria-current="true"`}>Todas</a>
            ${M.AMBITOS.map(function (a) { return html`<a class="filtro" href="#/lineas?ambito=${a.id}"${a.id === ambito ? html` aria-current="true"` : ''}>${a.plural}</a>`; })}
          </nav>
          <div class="pila lineas-grupos">${grupos.map(function (a) {
            return grupo(a, lineas.filter(function (l) { return l.ambito === a.id; }));
          })}</div>
          <p class="nota lineas-pie">La información de cada línea la verifica y actualiza el DOCE.</p>`;
      }
      return html`<div class="contenedor pagina">
        ${C.cabezaPublica('Líneas de ayuda', 'Si necesitas hablar con alguien, estas líneas te escuchan.')}
        <div class="mensajes" data-mensajes></div>
        <div class="alerta alerta-error lineas-911">${icono('alerta')}<div class="alerta-cuerpo"><p class="alerta-titulo">Si tu vida o la de alguien más está en riesgo, llama al 911.</p><p class="alerta-texto">El 911 atiende emergencias las 24 horas en todo el país.</p></div></div>
        ${cuerpo}
      </div>`;
    }
  });
})();
