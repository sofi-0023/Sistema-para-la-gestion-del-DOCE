/* P04 Directorio (RF05). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var icono = DOCE.icono;

  M.AREAS = [['orientacion', 'Orientación'], ['psicologia', 'Atención psicológica'], ['social', 'Trabajo social']];
  var FILTROS = [['', 'Todas las áreas'], ['psicologia', 'Atención psicológica'], ['orientacion', 'Orientación'], ['social', 'Trabajo social']];

  function linea(nombre, etiqueta, texto) {
    return html`<li>${icono(nombre, 'icono-s')}<span><span class="solo-lector">${etiqueta}: </span>${texto}</span></li>`;
  }

  // RF05 CA2 y CA3: solo los medios registrados
  function tarjeta(p) {
    return html`<li class="tarjeta persona-tarjeta" data-persona data-area="${p.area}" data-texto="${U.normalizar(M.nombreCompleto(p) + ' ' + p.cargo)}">
      <div class="persona-cabeza"><span class="persona-iniciales" aria-hidden="true">${U.iniciales(p.nombre)}</span>
        <div><h2 class="persona-titulo">${M.nombreCompleto(p)}</h2><p class="persona-puesto">${p.cargo}</p></div></div>
      <ul class="persona-datos">
        ${linea('ubicacion', 'Ubicación', M.ubicacion(p))}
        ${linea('reloj', 'Horario', p.horario)}
        ${p.correo ? linea('correo', 'Correo', p.correo) : ''}
        ${p.telefono ? linea('telefono', 'Teléfono', p.telefono) : ''}
      </ul>
      <a class="boton boton-fantasma" href="#/directorio/${p.id}">${icono('siguiente')}Ver ficha completa<span class="solo-lector"> de ${M.nombreCompleto(p)}</span></a>
    </li>`;
  }

  function contenido(consulta, estado) {
    var cuerpo;
    var personas = estado === 'vacio' ? [] : M.personasOrdenadas();
    if (estado === 'error') {
      cuerpo = html`<div class="tarjeta">${C.errorConsulta({ titulo: 'No se pudo cargar el directorio', texto: 'No se pudo conectar con los servidores. Revisa tu conexión a internet e inténtalo de nuevo.' })}</div>`;
    } else if (!personas.length) {
      cuerpo = html`<div class="tarjeta">${C.vacio({
        icono: 'personas', titulo: 'No hay contactos disponibles por el momento',
        texto: 'El DOCE está actualizando su directorio. Mientras tanto, puedes acudir a la planta alta del edificio principal.'
      })}</div>`;
    } else {
      var area = consulta.get('area') || '';
      cuerpo = html`<form class="directorio-filtros" role="search" data-filtros>
          <div class="campo buscador"><label class="solo-lector" for="buscar-persona">Buscar por nombre o área</label>
            ${icono('buscar')}<input type="search" id="buscar-persona" placeholder="Buscar por nombre o área" value="${consulta.get('q') || ''}" autocomplete="off"></div>
          <div class="filtros" role="group" aria-label="Filtrar por área">${FILTROS.map(function (f) {
            return html`<button type="button" class="filtro" data-area="${f[0]}" aria-pressed="${String(f[0] === area)}">${f[1]}</button>`;
          })}</div>
        </form>
        <p class="secundario directorio-cuenta" role="status" data-cuenta></p>
        <ul class="directorio">${personas.map(tarjeta)}</ul>
        <div class="tarjeta" data-sin-resultados hidden>${C.vacio({
          icono: 'buscar', titulo: 'No encontramos a nadie con esa búsqueda', texto: 'Revisa cómo está escrito o quita los filtros.',
          accion: html`<button type="button" class="boton boton-secundario" data-limpiar>Ver todo el directorio</button>`
        })}</div>`;
    }
    return html`<div class="contenedor pagina">
      ${C.cabezaPublica('¿A quién puedo acudir?', 'Personas del Departamento de Orientación y Consejo Educativo, dónde encontrarlas y en qué horario atienden. No necesitas iniciar sesión.')}
      <div class="mensajes" data-mensajes></div>
      ${cuerpo}
    </div>`;
  }

  function montar(ctx, raiz) {
    var form = raiz.querySelector('[data-filtros]');
    if (!form) return;
    var campo = form.querySelector('input');

    function filtrar() {
      var q = U.normalizar(campo.value);
      var area = form.querySelector('[aria-pressed="true"]').dataset.area;
      var visibles = 0;
      [].forEach.call(raiz.querySelectorAll('[data-persona]'), function (t) {
        var si = (!area || t.dataset.area === area) && q.split(' ').every(function (p) { return t.dataset.texto.indexOf(p) >= 0; });
        t.hidden = !si;
        if (si) visibles++;
      });
      raiz.querySelector('[data-sin-resultados]').hidden = visibles > 0;
      raiz.querySelector('[data-cuenta]').textContent = U.plural(visibles, 'persona', 'personas');
      // La dirección refleja el filtro sin volver a dibujar
      if (ctx.ruta === '/directorio') {
        try { window.history.replaceState(null, '', ctx.conConsulta({ q: campo.value.trim(), area: area })); } catch (e) { /* file:// sin historial */ }
      }
    }

    form.addEventListener('submit', function (ev) { ev.preventDefault(); });
    campo.addEventListener('input', filtrar);
    form.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-area]');
      if (!b) return;
      [].forEach.call(form.querySelectorAll('button[data-area]'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      filtrar();
    });
    raiz.querySelector('[data-limpiar]').addEventListener('click', function () {
      campo.value = '';
      form.querySelector('button[data-area=""]').click();
      campo.focus();
    });
    filtrar();
  }

  DOCE.rutas.agregar('/directorio', {
    base: 'directorio', titulo: 'Directorio', seccion: 'directorio',
    vista: function (ctx) { return contenido(ctx.consulta, ctx.estado); }, montar: montar
  });

  DOCE.rutas.agregar('/directorio/:id', {
    base: 'directorio', seccion: 'directorio',
    titulo: function (ctx) { var p = DOCE.almacen.uno('directorio', ctx.params.id); return p ? M.nombreCompleto(p) : 'Ficha de contacto'; },
    vista: function (ctx) { return contenido(ctx.consulta, ''); }, montar: montar,
    volver: function () { return '#/directorio'; },
    capa: function (ctx) {
      var p = DOCE.almacen.uno('directorio', ctx.params.id);
      if (ctx.estado === 'error') {
        return C.dialogo({
          titulo: 'No se pudo cargar la ficha', icono: 'sinconexion', tono: 'error',
          texto: 'No se pudo conectar con los servidores. Revisa tu conexión a internet e inténtalo de nuevo.',
          acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Volver al directorio</button><button type="button" class="boton boton-primario" data-reintentar>Reintentar</button>`
        });
      }
      if (!p) {
        return C.dialogo({
          titulo: 'Este contacto ya no está disponible', icono: 'prohibido', tono: 'aviso', texto: 'Vuelve al directorio para ver la información actualizada.',
          acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver al directorio</button>`
        });
      }
      var tel = U.enlaceTelefono(p.telefono);
      return C.dialogo({
        titulo: M.nombreCompleto(p), clase: 'ficha', etiqueta: 'Ficha de contacto',
        cuerpo: html`<p class="persona-puesto">${p.cargo}</p>
          ${p.descripcion ? html`<p class="secundario">${p.descripcion}</p>` : ''}
          ${C.datos([
            { icono: 'ubicacion', nombre: 'Ubicación', valor: M.ubicacion(p) },
            { icono: 'reloj', nombre: 'Horario de atención', valor: p.horario },
            p.correo && { icono: 'correo', nombre: 'Correo institucional', valor: p.correo },
            p.telefono && { icono: 'telefono', nombre: 'Teléfono', valor: p.telefono }
          ])}`,
        acciones: html`${p.correo ? html`<a class="boton boton-primario" href="mailto:${p.correo}">${icono('correo')}Escribir correo</a>` : ''}
          ${tel ? html`<a class="boton ${p.correo ? 'boton-secundario' : 'boton-primario'}" href="${tel}">${icono('telefono')}Llamar</a>` : ''}
          <button type="button" class="boton boton-fantasma" data-cerrar-capa>Cerrar</button>`
      });
    }
  });
})();
