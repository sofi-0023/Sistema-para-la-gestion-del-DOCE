/* P07 Fotogalería (RF09 CA7 a CA10): cuadrícula que se recorre con la página. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var F = DOCE.util.fecha;
  var icono = DOCE.icono;

  M.fotosOrdenadas = function () {
    return DOCE.almacen.todos('fotos').slice().sort(function (a, b) { return b.fecha.localeCompare(a.fecha); });
  };

  function fallida() { return html`<span class="foto-caja foto-fallida">${icono('alerta', 'icono-l')}<span>Imagen no disponible</span></span>`; }

  // Sin archivo se dibuja un recuadro de ejemplo con el mismo texto alternativo
  C.foto = function (f, decorativa) {
    if (f.imagen) return html`<img class="foto-caja" src="${f.imagen}" alt="${decorativa ? '' : f.descripcion}" loading="lazy" data-foto>`;
    if (decorativa) return html`<span class="foto-caja" aria-hidden="true">${icono('imagen', 'icono-l')}</span>`;
    return html`<span class="foto-caja" role="img" aria-label="${f.descripcion}">${icono('imagen', 'icono-l')}</span>`;
  };

  var PARCIAL = { tipo: 'aviso', titulo: 'No fue posible cargar algunas imágenes', texto: 'Las demás fotos de la galería siguen disponibles.' };

  DOCE.rutas.agregar('/fotogaleria', {
    titulo: 'Fotogalería', seccion: 'fotogaleria',
    vista: function (ctx) {
      var fotos = ctx.estado === 'vacio' ? [] : M.fotosOrdenadas();
      var cuerpo;
      if (ctx.estado === 'error') {
        cuerpo = html`<div class="tarjeta">${C.errorConsulta({ titulo: 'No fue posible cargar las imágenes' })}</div>`;
      } else if (!fotos.length) {
        cuerpo = html`<div class="tarjeta">${C.vacio({ icono: 'imagen', titulo: 'No hay imágenes disponibles para consultar', texto: 'Cuando el DOCE publique fotos de sus actividades aparecerán aquí.', accion: html`<a class="boton boton-secundario" href="#/inicio">Volver al inicio</a>` })}</div>`;
      } else {
        cuerpo = html`<ul class="galeria">${fotos.map(function (f, i) {
          return html`<li><figure class="foto">${ctx.estado === 'parcial' && i === 1 ? fallida() : C.foto(f)}
            <figcaption><h2 class="foto-titulo">${f.titulo}</h2><p class="secundario">${f.descripcion}</p><p class="meta">${F.diaMesAnio(f.fecha)}</p></figcaption></figure></li>`;
        })}</ul>`;
      }
      return html`<div class="contenedor pagina">
        ${C.cabezaPublica('Fotogalería', 'Momentos de las actividades de bienestar que se han realizado en la Facultad de Matemáticas.')}
        <div class="mensajes pila" data-mensajes>${ctx.estado === 'parcial' ? C.alerta(PARCIAL) : ''}</div>${cuerpo}</div>`;
    },
    montar: function (ctx, raiz) {
      [].forEach.call(raiz.querySelectorAll('[data-foto]'), function (img) {
        img.addEventListener('error', function () {
          img.outerHTML = fallida().toString();
          raiz.querySelector('[data-mensajes]').innerHTML = C.alerta(PARCIAL).toString();
        });
      });
    }
  });
})();
