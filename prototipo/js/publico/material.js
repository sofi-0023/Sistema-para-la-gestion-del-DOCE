/* P06 Material informativo (RF07). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var F = DOCE.util.fecha;
  var icono = DOCE.icono;
  var POR_PAGINA = 6;

  var FILTROS = [['', 'Todos'], ['folleto', 'Folletos'], ['video', 'Videos'], ['documento', 'Documentos']];
  var TONO = { folleto: 'dorado', video: 'azul', documento: '' };

  C.insigniaTipo = function (tipo) { return C.insignia(M.TIPOS_MATERIAL[tipo] || tipo, TONO[tipo]); };
  C.iconoTipo = function (tipo, clase) { return icono(tipo === 'video' ? 'reproducir' : 'documento', clase); };
  M.datosArchivo = function (m) {
    return (m.tipo === 'video' ? [m.duracion, m.plataforma] : [m.formato, m.tamano]).filter(Boolean).join(' · ');
  };

  function direccion(tipo, pagina) {
    var q = new URLSearchParams();
    if (tipo) q.set('tipo', tipo);
    if (pagina > 1) q.set('pagina', pagina);
    return '#/material' + (q.toString() ? '?' + q : '');
  }

  function tarjeta(m, desde) {
    var datos = M.datosArchivo(m);
    return html`<li><a class="tarjeta material" href="#/material/${m.id}${desde}">
      <span class="material-mini material-${m.tipo}" aria-hidden="true">${m.miniatura ? html`<img src="${m.miniatura}" alt="">` : html`<span class="redondo">${C.iconoTipo(m.tipo, 'icono-l')}</span>`}</span>
      <span class="material-cuerpo">
        <span>${C.insigniaTipo(m.tipo)}</span>
        <span class="material-titulo" role="heading" aria-level="2">${m.titulo}</span>
        ${m.resumen ? html`<span class="secundario">${U.recortar(m.resumen, 150)}</span>` : html`<em class="nota">Este material no cuenta con descripción.</em>`}
        ${datos ? html`<span class="dato-linea">${icono(m.tipo === 'video' ? 'reloj' : 'documento', 'icono-s')}<span>${datos}</span></span>` : ''}
      </span></a></li>`;
  }

  function paginas(tipo, actual, total) {
    var n = [];
    for (var i = 1; i <= total; i++) n.push(i);
    function paso(p, ic, texto) {
      return p < 1 || p > total ? html`<span class="boton boton-icono pagina-inactiva" aria-hidden="true">${icono(ic)}</span>`
        : html`<a class="boton boton-secundario boton-icono" id="pagina-${ic}" href="${direccion(tipo, p)}" aria-label="${texto}">${icono(ic)}</a>`;
    }
    return html`<nav class="fila paginas" aria-label="Páginas del catálogo">${paso(actual - 1, 'anterior', 'Página anterior')}
      ${n.map(function (p) { return html`<a class="boton ${p === actual ? 'boton-primario' : 'boton-secundario'} boton-icono" id="pagina-${p}" href="${direccion(tipo, p)}" aria-label="Página ${p}"${p === actual ? html` aria-current="page"` : ''}>${p}</a>`; })}
      ${paso(actual + 1, 'siguiente', 'Página siguiente')}</nav>`;
  }

  DOCE.rutas.agregar('/material', {
    titulo: 'Material informativo', seccion: 'material',
    vista: function (ctx) {
      var tipo = M.TIPOS_MATERIAL[ctx.consulta.get('tipo')] ? ctx.consulta.get('tipo') : '';
      var todos = ctx.estado === 'vacio' ? [] : M.materialesPublicos();
      var lista = todos.filter(function (m) { return !tipo || m.tipo === tipo; });
      var total = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
      var pagina = Math.min(total, Math.max(1, Number(ctx.consulta.get('pagina')) || 1));
      var desde = (pagina - 1) * POR_PAGINA;
      var cuerpo;
      if (ctx.estado === 'error') {
        cuerpo = html`<div class="tarjeta">${C.errorConsulta({ titulo: 'No fue posible cargar los materiales informativos', texto: 'No se pudo conectar con los servidores. Revisa tu conexión a internet e inténtalo de nuevo.' })}</div>`;
      } else if (!todos.length) {
        cuerpo = html`<div class="tarjeta">${C.vacio({ icono: 'documento', titulo: 'No hay materiales disponibles', texto: 'Cuando el DOCE publique materiales informativos aparecerán aquí.' })}</div>`;
      } else {
        var parametros = direccion(tipo, pagina).split('?')[1];
        cuerpo = html`<div class="fila separados material-filtros"><nav class="filtros" aria-label="Filtrar por tipo">${FILTROS.map(function (f) {
            return html`<a class="filtro" id="tipo-${f[0] || 'todos'}" href="${direccion(f[0], 1)}"${f[0] === tipo ? html` aria-current="true"` : ''}>${f[1]}</a>`;
          })}</nav><p class="secundario">${U.plural(lista.length, 'material', 'materiales')}</p></div>
          ${lista.length ? html`<ul class="materiales">${lista.slice(desde, desde + POR_PAGINA).map(function (m) { return tarjeta(m, parametros ? '?' + parametros : ''); })}</ul>
          <div class="fila separados"><p class="secundario">Mostrando ${desde + 1} a ${Math.min(desde + POR_PAGINA, lista.length)} de ${U.plural(lista.length, 'material', 'materiales')}</p>${total > 1 ? paginas(tipo, pagina, total) : ''}</div>`
          : html`<div class="tarjeta">${C.vacio({ icono: 'documento', titulo: 'No hay materiales de este tipo' })}</div>`}`;
      }
      return html`<div class="contenedor pagina">
        ${C.cabezaPublica('Material informativo', 'Folletos, videos y documentos sobre salud mental, revisados por el DOCE. Puedes consultarlos aquí o descargarlos.')}
        <div class="mensajes" data-mensajes></div>${cuerpo}</div>`;
    }
  });

  /* ---------- Detalle ---------- */

  function buscar(ctx) {
    if (ctx.estado === 'no-disponible') return null;
    return M.materialesPublicos().find(function (m) { return m.id === ctx.params.id; }) || null;
  }

  function volver(ctx) { return direccion(ctx.consulta.get('tipo') || '', Number(ctx.consulta.get('pagina')) || 1); }

  function reproductor(m) {
    return html`<div class="reproductor" data-reproductor>
      <button type="button" class="reproductor-boton" data-reproducir aria-label="Reproducir «${m.titulo}»"><span class="redondo">${icono('reproducir', 'icono-l')}</span></button>
      <p class="reproductor-texto" role="status" data-estado-video>Reproducción simulada del prototipo</p></div>`;
  }

  function vistaPrevia(m) {
    var total = m.paginas || 1;
    return html`<div class="fila separados"><p class="secundario">Vista previa · página <span data-n>1</span> de ${total}</p>${m.formato ? C.insignia(m.formato) : ''}</div>
      <div class="hoja"><p class="hoja-origen">${M.TIPOS_MATERIAL[m.tipo]} DOCE · FMAT</p><p class="hoja-titulo">${m.titulo}</p><div class="hoja-lineas" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b><i></i><i></i><i></i><b></b><i></i><i></i></div></div>
      <div class="fila separados"><button type="button" class="boton boton-secundario" data-hoja="-1" disabled>${icono('anterior')}Anterior</button><span aria-hidden="true"><span data-n>1</span> / ${total}</span><button type="button" class="boton boton-secundario" data-hoja="1"${total === 1 ? html` disabled` : ''}>Siguiente${icono('siguiente')}</button></div>`;
  }

  function fila(nombre, valor) { return valor ? html`<div><dt>${nombre}</dt><dd>${valor}</dd></div>` : ''; }

  DOCE.rutas.agregar('/material/:id', {
    seccion: 'material',
    titulo: function (ctx) { var m = buscar(ctx); return m ? m.titulo : 'Material informativo'; },
    vista: function (ctx) {
      var regresar = html`<a class="boton boton-fantasma regresar" href="${volver(ctx)}">${icono('regresar')}Regresar</a>`;
      if (ctx.estado === 'error') {
        return html`<div class="contenedor pagina">${regresar}<h1 tabindex="-1" class="solo-lector">Material informativo</h1><div class="tarjeta">${C.errorConsulta({ titulo: 'No fue posible cargar la información del material', texto: 'No se pudo conectar con los servidores. Revisa tu conexión a internet e inténtalo de nuevo.' })}</div></div>`;
      }
      var m = buscar(ctx);
      if (!m) {
        return html`<div class="contenedor pagina"><h1 tabindex="-1" class="solo-lector">Material no disponible</h1><div class="tarjeta">${C.vacio({
          icono: 'prohibido', tono: 'aviso', titulo: 'Este material ya no está disponible', texto: 'El DOCE lo retiró mientras consultabas el catálogo. Vuelve al catálogo para ver los materiales vigentes.',
          accion: html`<a class="boton boton-primario" href="#/material">Volver al catálogo</a>`
        })}</div></div>`;
      }
      var video = m.tipo === 'video';
      var origen = U.esEnlace(m.origen) ? m.origen : '';
      return html`<div class="contenedor pagina">${regresar}
        <div class="mensajes pila" data-mensajes>${ctx.estado === 'enlace' ? noDisponible() : ''}</div>
        <div class="material-detalle">
          <section class="tarjeta pila" aria-label="${video ? 'Video' : 'Vista previa'}">${video ? reproductor(m) : vistaPrevia(m)}</section>
          <div class="pila">
            <section class="tarjeta pila"><div>${C.insigniaTipo(m.tipo)}</div><h1 class="material-h1" tabindex="-1">${m.titulo}</h1>
              ${m.descripcion || m.resumen ? html`<p class="secundario">${m.descripcion || m.resumen}</p>` : html`<p class="nota"><em>Este material no cuenta con descripción.</em></p>`}
              ${video ? html`<p class="fila"><span class="dato-linea">${icono('reloj', 'icono-s')}<span>Duración: ${m.duracion || 'sin registrar'}</span></span><span class="dato-linea">${icono('video', 'icono-s')}<span>Se reproduce en ${m.plataforma || 'este sitio'}</span></span></p>` : ''}
              <div class="pila material-acciones">
                ${video ? '' : html`<button type="button" class="boton boton-primario" data-descargar>${icono('descarga')}Descargar ${m.formato || 'archivo'}${m.tamano ? ' (' + m.tamano + ')' : ''}</button>`}
                ${origen ? html`<a class="boton ${video ? 'boton-primario' : 'boton-fantasma'}" href="${origen}" target="_blank" rel="noopener" data-origen>${icono('externo')}${video && m.plataforma ? 'Ver en ' + m.plataforma : 'Ver en el sitio de origen'}<span class="solo-lector"> (abre en otra pestaña)</span></a>` : ''}
              </div></section>
            <section class="tarjeta" aria-labelledby="ficha-t"><h2 class="titulo-4" id="ficha-t">${video ? 'Ficha del video' : 'Ficha del archivo'}</h2>
              <dl class="ficha-archivo">${fila('Tipo', M.TIPOS_MATERIAL[m.tipo])}${fila('Temática', m.tematica)}${fila('Autor o fuente', m.autor)}
                ${video ? html`${fila('Duración', m.duracion)}${fila('Plataforma', m.plataforma)}` : html`${fila('Formato', m.formato)}${fila('Tamaño', m.tamano)}${fila('Páginas', m.paginas)}`}
                ${fila('Idioma', m.idioma)}${fila('Publicado', F.diaMesAnio(m.publicado))}</dl></section>
          </div>
        </div></div>`;
    },
    montar: function (ctx, raiz) {
      var m = buscar(ctx);
      if (!m || ctx.estado === 'error') return;

      var origen = raiz.querySelector('[data-origen]');
      if (origen) origen.addEventListener('click', function (ev) {
        if (ctx.estado !== 'enlace') return;
        ev.preventDefault();
        raiz.querySelector('[data-mensajes]').innerHTML = noDisponible().toString();
        DOCE.anunciar('El contenido no está disponible');
      });

      var descargar = raiz.querySelector('[data-descargar]');
      if (descargar) descargar.addEventListener('click', function () {
        U.descargarPdf(m.id + '.pdf', m.titulo, [m.descripcion || m.resumen || 'Este material no cuenta con descripción.', 'Autor o fuente: ' + m.autor, 'Archivo de ejemplo del prototipo.']);
        DOCE.anunciar('Descarga iniciada');
      });

      var play = raiz.querySelector('[data-reproducir]');
      if (play) play.addEventListener('click', function () {
        var caja = raiz.querySelector('[data-reproductor]');
        var si = caja.classList.toggle('en-curso');
        play.setAttribute('aria-label', (si ? 'Detener' : 'Reproducir') + ' «' + m.titulo + '»');
        raiz.querySelector('[data-estado-video]').textContent = si ? 'Reproduciendo el video (simulado)' : 'Video detenido';
      });

      var n = 1;
      [].forEach.call(raiz.querySelectorAll('[data-hoja]'), function (b) {
        b.addEventListener('click', function () {
          n = Math.min(m.paginas, Math.max(1, n + Number(b.dataset.hoja)));
          [].forEach.call(raiz.querySelectorAll('[data-n]'), function (e) { e.textContent = n; });
          raiz.querySelector('[data-hoja="-1"]').disabled = n === 1;
          raiz.querySelector('[data-hoja="1"]').disabled = n === m.paginas;
          DOCE.anunciar('Página ' + n + ' de ' + m.paginas);
        });
      });
    }
  });

  function noDisponible() {
    return C.alerta({
      tipo: 'aviso', titulo: 'El contenido no está disponible', texto: 'El sitio externo donde se aloja este material no responde. Inténtalo más tarde o consulta otro material.',
      accion: html`<a class="boton boton-secundario alerta-boton" href="#/material">Ver otros materiales</a>`
    });
  }
})();
