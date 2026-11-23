/* P01 Inicio: próxima actividad, lista, avisos (espacio de RF03-B E6) y accesos. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var F = DOCE.util.fecha;
  var icono = DOCE.icono;

  function dato(nombre, texto) { return html`<span class="dato-linea">${icono(nombre, 'icono-s')}<span>${texto}</span></span>`; }

  // Fila de actividad: se usa en Inicio y en la vista Lista del calendario.
  C.filaActividad = function (a, ruta, sinFecha) {
    var cancelada = a.estado === 'cancelada';
    return html`<a class="fila-actividad${cancelada ? ' es-cancelada' : ''}" href="${ruta}">
      ${C.sello(a.fechaInicio, cancelada)}
      <span class="fila-cuerpo">
        <span class="fila-nombre">${a.nombre}</span>
        <span class="fila-datos">
          ${dato('reloj', (sinFecha ? '' : F.corta(a.fechaInicio) + ' · ') + M.horas(a))}
          ${dato('ubicacion', M.lugarBreve(a))}
        </span>
      </span>
      <span class="fila-insignias">${cancelada ? C.insigniaEstado('cancelada') : C.insigniaModalidad(a.modalidad)}</span>
      ${icono('siguiente', 'fila-flecha')}
    </a>`;
  };

  function tarjetaProxima(a) {
    if (!a) {
      return html`<section class="tarjeta proxima" aria-labelledby="proxima-titulo">
        <h2 class="proxima-etiqueta" id="proxima-titulo">Próxima actividad</h2>
        ${C.vacio({ icono: 'calendario', titulo: 'No hay eventos por mostrar', texto: 'Todavía no hay actividades publicadas. Vuelve más tarde.' })}
      </section>`;
    }
    return html`<section class="tarjeta proxima" aria-labelledby="proxima-titulo">
      <div class="fila separados"><h2 class="proxima-etiqueta" id="proxima-titulo">Próxima actividad</h2>${C.insigniaModalidad(a.modalidad)}</div>
      <div class="proxima-cuerpo">
        ${C.sello(a.fechaInicio)}
        <div class="proxima-datos">
          <h3 class="proxima-nombre">${a.nombre}</h3>
          ${dato('reloj', F.sinAnio(a.fechaInicio) + ' · ' + M.horas(a))}
          ${dato('ubicacion', M.lugarBreve(a))}
          ${dato('edificio', a.organizador)}
        </div>
      </div>
      <div class="fila">
        <a class="boton boton-primario" href="#/actividad/${a.id}">Ver detalle</a>
        <a class="boton boton-fantasma" href="#/calendario">${icono('siguiente')}Más actividades</a>
      </div>
    </section>`;
  }

  function aviso(a) {
    var cancelado = a.estado === 'cancelado';
    return html`<li class="tarjeta aviso${cancelado ? ' es-cancelada' : ''}">
      <div class="aviso-cabeza"><span class="aviso-icono">${icono('megafono')}</span><h3 class="aviso-titulo">${a.titulo}</h3>${cancelado ? C.insigniaEstado('cancelado') : ''}</div>
      <p class="secundario">${a.contenido}</p>
      <p class="meta">Publicado el ${F.diaMes(a.publicado)}${a.vigencia ? ' · Vigente hasta el ' + F.diaMes(a.vigencia) : ''}</p>
    </li>`;
  }

  var APOYO = [
    ['#/directorio', 'personas', 'Directorio de orientación', 'Quién atiende, dónde y en qué horario'],
    ['#/lineas', 'salvavidas', 'Líneas de ayuda', 'Universitarias, locales, estatales y nacionales'],
    ['#/material', 'documento', 'Material informativo', 'Folletos, videos y documentos sobre salud mental'],
    ['#/tutorias', 'birrete', 'Tutorías y guías de carrera', 'Contactos de tutoría y guías para descargar']
  ];

  function vista(ctx) {
    var error = ctx.estado === 'error';
    var lista = ctx.estado === 'vacio' || error ? [] : M.actividadesPublicas();
    var avisos = ctx.estado === 'vacio' || error ? [] : M.avisosPublicos();
    var proxima = lista.find(function (a) { return a.estado === 'publicada'; });

    return html`
      <div class="portada"><div class="contenedor">
        <div class="mensajes pila" data-mensajes>${ctx.estado === 'sesion-cerrada' ? C.alerta({
          tipo: 'exito', titulo: 'Cerraste sesión', texto: 'Tu sesión terminó de forma segura. Para volver a gestionar contenido, inicia sesión de nuevo.'
        }) : ''}</div>
        <div class="portada-fila">
          <div class="portada-texto">
            <p class="portada-fecha">${F.sinAnio(F.hoy())}</p>
            <h1 class="display" tabindex="-1">Tu bienestar también importa.</h1>
            <p class="entrada">Talleres, pláticas y apoyos de salud mental de la Facultad de Matemáticas, en un solo lugar y sin depender del correo.</p>
            <div class="fila portada-acciones">
              <a class="boton boton-primario" href="#/calendario">${icono('calendario')}Ver calendario</a>
              <a class="boton boton-secundario" href="#/directorio">${icono('personas')}Buscar a quién acudir</a>
            </div>
          </div>
          ${error ? html`<div class="tarjeta proxima">${C.errorConsulta({})}</div>` : tarjetaProxima(proxima)}
        </div>
      </div></div>
      <div class="contenedor pagina">
        <section aria-labelledby="proximas-titulo">
          <div class="fila separados seccion-cabeza">
            <div><h2 class="titulo-2" id="proximas-titulo">Próximas actividades</h2><p class="secundario">Lo que viene en las siguientes semanas.</p></div>
            <a class="boton boton-fantasma" href="#/calendario">${icono('siguiente')}Ir al calendario</a>
          </div>
          <div class="tarjeta">${error ? C.errorConsulta({}) : lista.length
            ? html`<ul class="lista-actividades">${lista.slice(0, 5).map(function (a) { return html`<li>${C.filaActividad(a, '#/actividad/' + a.id)}</li>`; })}</ul>`
            : C.vacio({ icono: 'calendario', titulo: 'No hay eventos por mostrar', texto: 'Todavía no hay actividades publicadas. Vuelve más tarde.' })}</div>
        </section>
        <div class="inicio-columnas">
          <section aria-labelledby="avisos-titulo">
            <h2 id="avisos-titulo">Avisos</h2>
            ${error ? html`<div class="tarjeta">${C.errorConsulta({})}</div>` : avisos.length
              ? html`<ul class="pila">${avisos.map(aviso)}</ul>`
              : html`<p class="tarjeta secundario">No hay avisos por mostrar.</p>`}
          </section>
          <section aria-labelledby="apoyo-titulo">
            <h2 id="apoyo-titulo">Encuentra apoyo</h2>
            <ul class="tarjeta lista-apoyo">${APOYO.map(function (p) {
              return html`<li><a href="${p[0]}"><span class="cuadro">${icono(p[1])}</span><span class="fila-cuerpo"><span class="fila-nombre">${p[2]}</span><span class="secundario">${p[3]}</span></span>${icono('siguiente', 'fila-flecha')}</a></li>`;
            })}</ul>
          </section>
        </div>
      </div>`;
  }

  DOCE.rutas.agregar('/inicio', { titulo: 'Inicio', seccion: 'inicio', vista: vista });
})();
