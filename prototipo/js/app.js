/* Arranque, pantallas generales y pantallas que aún no se construyen. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var C = DOCE.componentes;
  var icono = DOCE.icono;

  /* ---------- Página no encontrada ---------- */

  DOCE.rutas.noEncontrada = {
    titulo: 'Página no encontrada',
    vista: function () {
      return html`<div class="contenedor pagina">
        ${C.cabezaPublica('Página no encontrada', 'La dirección no existe o cambió.')}
        <a class="boton boton-primario" href="#/inicio">Volver al inicio</a>
      </div>`;
    }
  };

  /* ---------- Catálogo de componentes (solo para revisión, no aparece en el menú) ---------- */

  var COLORES = ['tinta', 'tinta-2', 'tinta-3', 'azul-295', 'azul-70', 'azul-bruma', 'dorado', 'dorado-20', 'dorado-texto',
    'papel', 'lienzo', 'apagado', 'linea', 'linea-suave', 'exito', 'exito-20', 'error', 'error-20'];

  function catalogo() {
    return html`
      <div class="mensajes" data-mensajes></div>
      <section aria-labelledby="c-color"><h2 id="c-color">Color</h2>
        <div class="muestra">${COLORES.map(function (c) {
          return html`<div class="muestra-color"><span data-color="${c}"></span>${c}</div>`;
        })}</div></section>
      <section aria-labelledby="c-tipo"><h2 id="c-tipo">Tipografía</h2>
        <div class="pila">
          <p class="display">Display</p>
          <p class="entrada">Entrada de 18 px. Talleres, pláticas y apoyos de salud mental.</p>
          <p>Cuerpo de 16 px para texto de lectura.</p>
          <p class="meta">Etiqueta de 14 px</p>
        </div></section>
      <section aria-labelledby="c-boton"><h2 id="c-boton">Botones</h2>
        <div class="muestra">
          <button type="button" class="boton boton-primario">${icono('calendario')}Primario</button>
          <button type="button" class="boton boton-secundario">Secundario</button>
          <button type="button" class="boton boton-fantasma">Fantasma</button>
          <button type="button" class="boton boton-peligro">${icono('basura')}Peligro</button>
          <button type="button" class="boton boton-primario" disabled>Deshabilitado</button>
        </div></section>
      <section aria-labelledby="c-ins"><h2 id="c-ins">Insignias y sellos</h2>
        <div class="muestra">
          ${C.insigniaModalidad('presencial')}${C.insigniaModalidad('virtual')}${C.insigniaModalidad('hibrida')}
          ${C.insigniaEstado('publicada')}${C.insigniaEstado('borrador')}${C.insigniaEstado('cancelada')}
          ${C.sello('2026-11-12')}${C.sello('2026-11-13', true)}
        </div></section>
      <section aria-labelledby="c-campo"><h2 id="c-campo">Campos</h2>
        <div class="pila tarjeta">
          ${C.campo({ id: 'm1', etiqueta: 'Nombre de la actividad', obligatorio: true, valor: 'Charla: pedir ayuda no es debilidad' })}
          ${C.campo({ id: 'm2', etiqueta: 'Descripción', tipo: 'area', ayuda: 'Explica en dos o tres frases de qué trata y a quién va dirigida.' })}
          ${C.campo({ id: 'm3', etiqueta: 'Ámbito de atención', tipo: 'selector', valor: 'n', opciones: [['u', 'Universitario'], ['n', 'Nacional']] })}
          ${C.campo({ id: 'm4', etiqueta: 'Lugar', obligatorio: true, marcador: 'Escribe el edificio, aula o espacio', error: 'Las actividades presenciales necesitan un lugar.' })}
        </div></section>
      <section aria-labelledby="c-alerta"><h2 id="c-alerta">Alertas</h2>
        <div class="pila">
          ${C.alerta({ tipo: 'exito', titulo: 'Actividad publicada correctamente', texto: 'Ya aparece en el calendario.' })}
          ${C.alerta({ tipo: 'error', titulo: C.MENSAJE_CONEXION, texto: 'Revisa tu conexión a internet.' })}
          ${C.alerta({ tipo: 'aviso', titulo: 'Ya existe una línea parecida', texto: 'Revisa los datos antes de guardar.' })}
          ${C.alerta({ tipo: 'info', titulo: 'Al publicar', texto: 'El aviso aparecerá en la página de inicio.' })}
        </div></section>
      <section aria-labelledby="c-vacio"><h2 id="c-vacio">Estado vacío y capas</h2>
        <div class="tarjeta">${C.vacio({ icono: 'calendario', titulo: 'No hay eventos por mostrar', texto: 'Vuelve más tarde.' })}</div>
        <div class="muestra">
          <a class="boton boton-secundario" href="#/componentes/dialogo">Abrir diálogo</a>
          <a class="boton boton-secundario" href="#/componentes/panel">Abrir panel lateral</a>
          <a class="boton boton-secundario" href="#/componentes/admin">Ver el marco de administración</a>
        </div></section>
      <section aria-labelledby="c-icono"><h2 id="c-icono">Íconos (${DOCE.iconos.length})</h2>
        <ul class="rejilla-iconos">${DOCE.iconos.map(function (n) { return html`<li>${icono(n)}${n}</li>`; })}</ul></section>`;
  }

  function vistaCatalogo() {
    return html`<div class="contenedor pagina catalogo">${C.cabezaPublica('Catálogo de componentes', 'Solo para revisar el estilo; no aparece en el menú.')}${catalogo()}</div>`;
  }

  function montarCatalogo(ctx, raiz) {
    [].forEach.call(raiz.querySelectorAll('[data-color]'), function (e) { e.style.background = 'var(--' + e.dataset.color + ')'; });
  }

  DOCE.rutas.agregar('/componentes', { base: 'componentes', titulo: 'Catálogo de componentes', vista: vistaCatalogo, montar: montarCatalogo });
  DOCE.rutas.agregar('/componentes/dialogo', {
    base: 'componentes', titulo: 'Diálogo de ejemplo', vista: vistaCatalogo, montar: montarCatalogo,
    volver: function () { return '#/componentes'; },
    capa: function () {
      return C.dialogo({
        titulo: '¿Cancelar «Pausa activa entre exámenes»?', icono: 'prohibido', tono: 'error',
        texto: 'La actividad seguirá visible en el calendario con la etiqueta «Cancelada».',
        acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>No, conservar</button>
          <button type="button" class="boton boton-peligro" data-cerrar-capa>Sí, cancelar actividad</button>`
      });
    }
  });
  DOCE.rutas.agregar('/componentes/panel', {
    base: 'componentes', titulo: 'Panel de ejemplo', vista: vistaCatalogo, montar: montarCatalogo,
    volver: function () { return '#/componentes'; },
    capa: function () {
      return C.panel({
        titulo: 'Plática: dormir bien también es estudiar', entrada: 'Detalle de la actividad',
        cuerpo: C.datos([
          { icono: 'calendario', nombre: 'Inicio y fin', valor: 'Jueves 12 de noviembre de 2026 · 16:00 a 17:30' },
          { icono: 'ubicacion', nombre: 'Lugar', valor: 'Aula Magna, edificio principal, planta baja' }
        ]),
        pie: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Cerrar</button>`
      });
    }
  });
  DOCE.rutas.agregar('/componentes/admin', {
    titulo: 'Marco de administración', marco: 'admin', seccion: 'actividades',
    vista: function () {
      return html`${C.cabezaAdmin({
        titulo: 'Marco de administración', entrada: 'Muestra del marco, sin datos. El panel real pide iniciar sesión.',
        migas: [['Catálogo', '#/componentes'], ['Marco de administración']],
        acciones: html`<a class="boton boton-secundario" href="#/componentes">Volver al catálogo</a>`
      })}<div class="tarjeta">${C.vacio({ icono: 'calendario', titulo: 'Aquí va el contenido', texto: 'Los bloques 4, 5 y 7 llenan esta zona.' })}</div>`;
    }
  });

  /* ---------- Pantallas pendientes: se sustituyen al construir cada bloque ---------- */

  function pendiente(patron, titulo, seccion, bloque, marco) {
    DOCE.rutas.agregar(patron, {
      titulo: titulo, seccion: seccion, marco: marco,
      vista: function () {
        var cuerpo = html`${marco === 'admin' ? C.cabezaAdmin({ titulo: titulo }) : C.cabezaPublica(titulo)}
          <div class="tarjeta">${C.vacio({ icono: 'info', titulo: 'Pantalla en construcción', texto: 'Se construye en el bloque ' + bloque + '.' })}</div>`;
        return marco === 'admin' ? cuerpo : html`<div class="contenedor pagina">${cuerpo}</div>`;
      }
    });
  }

  // Las rutas reales se registran antes que estas, así que tienen prioridad.
  pendiente('/material', 'Material informativo', 'material', 6);
  pendiente('/fotogaleria', 'Fotogalería', 'fotogaleria', 6);
  pendiente('/tutorias', 'Tutorías y guías de carrera', 'tutorias', 6);
  pendiente('/admin/lineas', 'Líneas de ayuda', 'lineas', 7, 'admin');
  pendiente('/admin/material', 'Material informativo', 'material', 7, 'admin');
  pendiente('/admin/fotos', 'Fotogalería', 'fotos', 7, 'admin');
  pendiente('/admin/directorio', 'Directorio', 'directorio', 7, 'admin');
  pendiente('/admin/tutorias', 'Tutorías y guías', 'tutorias', 7, 'admin');

  DOCE.rutas.iniciar();
})();
