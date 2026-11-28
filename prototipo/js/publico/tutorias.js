/* P08 Tutorías y guías de carrera (RF10). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var icono = DOCE.icono;

  function tutor(t) {
    return html`<li class="tutor"><span class="persona-iniciales" aria-hidden="true">${U.iniciales(t.nombre)}</span>
      <div class="fila-cuerpo"><h3 class="persona-titulo">${M.nombreCompleto(t)}</h3><p class="persona-puesto">${t.cargo}</p>
        <p class="dato-linea">${icono('correo', 'icono-s')}<span>${t.correo}</span></p></div>
      <a class="boton boton-fantasma" href="#/tutorias/${t.id}">Ver detalle<span class="solo-lector"> de ${M.nombreCompleto(t)}</span></a></li>`;
  }

  function guia(g) {
    return html`<li class="tutor"><span class="cuadro">${icono('documento')}</span>
      <div class="fila-cuerpo"><h3 class="persona-titulo">${g.titulo}</h3><p class="nota">${g.formato} · ${g.tamano}</p></div>
      <button type="button" class="boton boton-secundario" data-guia="${g.id}">${icono('descarga')}Descargar<span class="solo-lector"> ${g.titulo}</span></button></li>`;
  }

  function errorGuia(titulo) {
    return C.alerta({ tipo: 'error', titulo: 'La guía no se pudo descargar', texto: (titulo ? '«' + titulo + '»: el' : 'El') + ' archivo ya no está disponible. Inténtalo más tarde o pregunta en el DOCE.' });
  }

  DOCE.rutas.agregar('/tutorias', {
    titulo: 'Tutorías y guías', seccion: 'tutorias',
    vista: function (ctx) {
      var tutores = ctx.estado === 'vacio' ? [] : DOCE.almacen.todos('tutores');
      var guias = ctx.estado === 'vacio' ? [] : DOCE.almacen.todos('guias');
      var cuerpo;
      if (ctx.estado === 'error') {
        cuerpo = html`<div class="tarjeta">${C.errorConsulta({ texto: 'Sigues en esta página; tus datos no se perdieron.' })}</div>`;
      } else if (!tutores.length && !guias.length) {
        cuerpo = html`<div class="tarjeta">${C.vacio({ icono: 'birrete', titulo: 'No hay contactos o guías registradas en este momento', texto: 'Vuelve más tarde o pregunta por el programa de tutorías en el DOCE.' })}</div>`;
      } else {
        cuerpo = html`<div class="inicio-columnas tutorias">
          <section class="tarjeta" aria-labelledby="tut-c"><h2 id="tut-c">Contactos de tutoría</h2>${tutores.length ? html`<ul>${tutores.map(tutor)}</ul>` : html`<p class="secundario">No hay contactos registrados en este momento.</p>`}</section>
          <section class="tarjeta" aria-labelledby="tut-g"><h2 id="tut-g">Guías de carrera</h2>${guias.length ? html`<ul>${guias.map(guia)}</ul>` : html`<p class="secundario">No hay guías registradas en este momento.</p>`}</section></div>`;
      }
      return html`<div class="contenedor pagina">
        ${C.cabezaPublica('Tutorías y guías de carrera', 'Contactos del programa de tutorías y guías para orientar tu trayectoria académica y profesional.')}
        <div class="mensajes pila" data-mensajes>${ctx.estado === 'guia' ? errorGuia() : ''}</div>${cuerpo}</div>`;
    },
    montar: function (ctx, raiz) {
      raiz.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-guia]');
        if (!b) return;
        var g = DOCE.almacen.uno('guias', b.dataset.guia);
        var lugar = raiz.querySelector('[data-mensajes]');
        if (!g || !g.disponible || ctx.estado === 'guia') {
          lugar.innerHTML = errorGuia(g && g.titulo).toString();
          lugar.scrollIntoView({ block: 'center' });
          return;
        }
        lugar.innerHTML = '';
        U.descargarPdf(g.id + '.pdf', g.titulo, ['Archivo de ejemplo del prototipo.']);
        DOCE.anunciar('Se descargó «' + g.titulo + '»');
      });
    }
  });

  DOCE.rutas.agregar('/tutorias/:id', {
    seccion: 'tutorias',
    titulo: function (ctx) { var t = DOCE.almacen.uno('tutores', ctx.params.id); return t ? M.nombreCompleto(t) : 'Contacto de tutoría'; },
    vista: function (ctx) {
      var volver = html`<a class="boton boton-fantasma regresar" href="#/tutorias">${icono('regresar')}Volver a la lista</a>`;
      var t = DOCE.almacen.uno('tutores', ctx.params.id);
      if (ctx.estado === 'error') {
        return html`<div class="contenedor pagina">${volver}<h1 tabindex="-1" class="solo-lector">Contacto de tutoría</h1><div class="tarjeta">${C.errorConsulta({ texto: 'Sigues en esta página; tus datos no se perdieron.' })}</div></div>`;
      }
      if (!t) {
        return html`<div class="contenedor pagina">${volver}<h1 tabindex="-1" class="solo-lector">Contacto de tutoría</h1><div class="tarjeta">${C.vacio({ icono: 'prohibido', tono: 'aviso', titulo: 'Este contacto ya no está disponible', texto: 'Vuelve a la lista para ver la información actualizada.' })}</div></div>`;
      }
      return html`<div class="contenedor pagina">${volver}
        <div class="tarjeta pila tutor-detalle">
          <div class="persona-cabeza"><span class="persona-iniciales" aria-hidden="true">${U.iniciales(t.nombre)}</span><div><h1 class="material-h1" tabindex="-1">${M.nombreCompleto(t)}</h1><p class="persona-puesto">${t.cargo}</p></div></div>
          ${C.datos([
            { icono: 'correo', nombre: 'Correo', valor: t.correo },
            { icono: 'telefono', nombre: 'Extensión', valor: t.extension },
            { icono: 'ubicacion', nombre: 'Ubicación', valor: t.ubicacion },
            { icono: 'reloj', nombre: 'Horario de atención', valor: t.horario },
            { icono: 'birrete', nombre: 'Orientación que ofrece', valor: t.orientacion }
          ])}
          <div><a class="boton boton-primario" href="mailto:${t.correo}">${icono('correo')}Escribir correo</a></div>
        </div></div>`;
    }
  });
})();
