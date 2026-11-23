/* Componentes reutilizables. Devuelven HTML seguro (util.html). */
(function () {
  'use strict';

  var C = (DOCE.componentes = {});
  var html = DOCE.util.html;
  var icono = DOCE.icono;

  /* ---------- Secciones ---------- */

  C.seccionesPublicas = [
    { id: 'inicio', ruta: '#/inicio', texto: 'Inicio', icono: 'inicio' },
    { id: 'calendario', ruta: '#/calendario', texto: 'Calendario', icono: 'calendario' },
    { id: 'directorio', ruta: '#/directorio', texto: 'Directorio', icono: 'personas' },
    { id: 'lineas', ruta: '#/lineas', texto: 'Líneas de ayuda', icono: 'salvavidas' },
    { id: 'material', ruta: '#/material', texto: 'Material', movil: 'Material informativo', icono: 'documento' },
    { id: 'fotogaleria', ruta: '#/fotogaleria', texto: 'Fotogalería', icono: 'imagen' },
    { id: 'tutorias', ruta: '#/tutorias', texto: 'Tutorías y guías', icono: 'birrete' }
  ];

  C.seccionesAdmin = [
    { id: 'panel', ruta: '#/admin', texto: 'Inicio', icono: 'inicio' },
    { id: 'actividades', ruta: '#/admin/actividades', texto: 'Actividades y avisos', icono: 'calendario' },
    { id: 'lineas', ruta: '#/admin/lineas', texto: 'Líneas de ayuda', icono: 'salvavidas' },
    { id: 'material', ruta: '#/admin/material', texto: 'Material informativo', icono: 'documento' },
    { id: 'fotos', ruta: '#/admin/fotos', texto: 'Fotogalería', icono: 'imagen' },
    { id: 'directorio', ruta: '#/admin/directorio', texto: 'Directorio', icono: 'personas' },
    { id: 'tutorias', ruta: '#/admin/tutorias', texto: 'Tutorías y guías', icono: 'birrete' }
  ];

  function actual(seccion, id) { return seccion === id ? html` aria-current="page"` : ''; }

  function enlaces(secciones, seccion, conIcono) {
    return secciones.map(function (s) {
      return html`<li><a href="${s.ruta}"${actual(seccion, s.id)}>${conIcono ? icono(s.icono) : ''}${conIcono && s.movil ? s.movil : s.texto}</a></li>`;
    });
  }

  /* ---------- Piezas ---------- */

  // tono: '' | azul | dorado | exito | error
  C.insignia = function (texto, tono) {
    return html`<span class="insignia${tono ? ' insignia-' + tono : ''}">${texto}</span>`;
  };

  var MODALIDADES = {
    presencial: { texto: 'Presencial', tono: 'azul' },
    virtual: { texto: 'Virtual', tono: '' },
    hibrida: { texto: 'Híbrida', tono: 'dorado' }
  };
  C.insigniaModalidad = function (m) { return MODALIDADES[m] ? C.insignia(MODALIDADES[m].texto, MODALIDADES[m].tono) : ''; };

  var ESTADOS = {
    publicada: ['Publicada', 'exito'], publicado: ['Publicado', 'exito'],
    borrador: ['Borrador', 'dorado'],
    cancelada: ['Cancelada', ''], cancelado: ['Cancelada', ''],
    retirado: ['Retirado', '']
  };
  C.insigniaEstado = function (e) { return ESTADOS[e] ? C.insignia(ESTADOS[e][0], ESTADOS[e][1]) : ''; };

  // La fecha completa se lee en el texto vecino; el sello es decorativo para lectores de pantalla.
  C.sello = function (iso, apagado) {
    var s = DOCE.util.fecha.sello(iso);
    return html`<span class="sello${apagado ? ' sello-apagado' : ''}" aria-hidden="true"><span class="sello-mes">${s.mes}</span><span class="sello-dia">${s.dia}</span></span>`;
  };

  var ICONO_ALERTA = { exito: 'correcto', error: 'alerta', aviso: 'info', info: 'info' };

  // { tipo, titulo, texto, lista }. El anuncio a lectores de pantalla lo hace DOCE.anunciar.
  C.alerta = function (a) {
    var tipo = ICONO_ALERTA[a.tipo] ? a.tipo : 'info';
    return html`<div class="alerta alerta-${tipo}"${a.id ? html` id="${a.id}" tabindex="-1"` : ''}${tipo === 'error' ? html` role="alert"` : ''}>
      ${icono(ICONO_ALERTA[tipo])}
      <div class="alerta-cuerpo">
        <p class="alerta-titulo">${a.titulo}</p>
        ${a.texto ? html`<p class="alerta-texto">${a.texto}</p>` : ''}
        ${a.lista || ''}
        ${a.accion || ''}
      </div>
    </div>`;
  };

  C.vacio = function (v) {
    return html`<div class="vacio">
      <span class="redondo${v.tono ? ' redondo-' + v.tono : ''}">${icono(v.icono, 'icono-l')}</span>
      <h2 class="titulo-4">${v.titulo}</h2>
      ${v.texto ? html`<p class="secundario">${v.texto}</p>` : ''}
      ${v.accion || ''}
    </div>`;
  };

  C.MENSAJE_CONEXION = 'No se pudo conectar con los servidores, intenta de nuevo más tarde';

  // Error de consulta con «Reintentar» (quita el estado forzado y vuelve a consultar).
  C.errorConsulta = function (e) {
    return html`<div class="pila">
      ${C.alerta({ tipo: 'error', titulo: e.titulo || C.MENSAJE_CONEXION, texto: e.texto || 'Revisa tu conexión a internet e inténtalo de nuevo.' })}
      <div><button type="button" class="boton boton-secundario" data-reintentar>Reintentar</button></div>
    </div>`;
  };

  /* Campo de formulario con etiqueta, ayuda y error asociados.
     { id, etiqueta, tipo: text|email|url|date|time|tel|password|area|selector, valor, obligatorio, ayuda, error,
       opciones: [[valor, texto]], marcador, autocompletar, deshabilitado, maximo } */
  C.campo = function (c) {
    var describe = [c.ayuda ? c.id + '-ayuda' : '', c.error ? c.id + '-error' : ''].filter(Boolean).join(' ');
    var atributos = html`id="${c.id}" name="${c.nombre || c.id}"${c.obligatorio ? html` aria-required="true"` : ''}${c.error ? html` aria-invalid="true"` : ''}${describe ? html` aria-describedby="${describe}"` : ''}${c.deshabilitado ? html` disabled` : ''}${c.maximo ? html` maxlength="${c.maximo}"` : ''}${c.marcador ? html` placeholder="${c.marcador}"` : ''}${c.autocompletar ? html` autocomplete="${c.autocompletar}"` : ''}`;
    var valor = c.valor === undefined || c.valor === null ? '' : c.valor;
    var control;
    if (c.tipo === 'area') {
      control = html`<textarea ${atributos}>${valor}</textarea>`;
    } else if (c.tipo === 'selector') {
      control = html`<select ${atributos}>${c.opciones.map(function (o) {
        return html`<option value="${o[0]}"${o[0] === valor ? html` selected` : ''}>${o[1]}</option>`;
      })}</select>`;
    } else {
      control = html`<input type="${c.tipo || 'text'}" value="${valor}" ${atributos}>`;
    }
    return html`<div class="campo" data-campo="${c.id}">
      <label for="${c.id}">${c.etiqueta}${c.obligatorio ? ' *' : ''}</label>
      ${control}
      ${c.ayuda ? html`<p class="campo-ayuda" id="${c.id}-ayuda">${c.ayuda}</p>` : ''}
      ${c.error ? html`<p class="campo-error" id="${c.id}-error">${icono('alerta', 'icono-s')}<span>${c.error}</span></p>` : ''}
    </div>`;
  };

  /* Fila de datos: [{ icono, nombre, valor }] */
  C.datos = function (lista) {
    return html`<dl class="datos">${lista.filter(Boolean).map(function (d) {
      return html`<div><span class="cuadro">${icono(d.icono, 'icono-s')}</span><div class="dato"><dt>${d.nombre}</dt><dd>${d.valor}</dd></div></div>`;
    })}</dl>`;
  };

  /* ---------- Capas ---------- */

  // Diálogo centrado. { titulo, icono, tono, texto, cuerpo, acciones }
  C.dialogo = function (d) {
    return html`<dialog class="dialogo" aria-labelledby="capa-titulo">
      <div class="pila">
        ${d.icono ? html`<span class="redondo redondo-${d.tono || 'azul'}">${icono(d.icono, 'icono-l')}</span>` : ''}
        <h2 id="capa-titulo" tabindex="-1">${d.titulo}</h2>
        ${d.texto ? html`<p class="secundario">${d.texto}</p>` : ''}
        ${d.cuerpo || ''}
        <div class="dialogo-acciones">${d.acciones}</div>
      </div>
    </dialog>`;
  };

  // Panel lateral. { titulo, entrada, cuerpo, pie }
  C.panel = function (p) {
    return html`<dialog class="panel" aria-labelledby="capa-titulo">
      <div class="panel-cabeza">
        <div>
          <h2 id="capa-titulo" tabindex="-1">${p.titulo}</h2>
          ${p.entrada ? html`<p class="secundario">${p.entrada}</p>` : ''}
        </div>
        <button type="button" class="boton boton-icono" data-cerrar-capa aria-label="Cerrar">${icono('cerrar')}</button>
      </div>
      <div class="panel-cuerpo">${p.cuerpo}</div>
      ${p.pie ? html`<div class="panel-pie">${p.pie}</div>` : ''}
    </dialog>`;
  };

  /* Confirmación suelta (sin dirección propia). Devuelve una promesa con true o false. */
  C.confirmar = function (o) {
    return new Promise(function (resolver) {
      var lugar = document.createElement('div');
      lugar.innerHTML = C.dialogo({
        titulo: o.titulo, texto: o.texto, icono: o.icono, tono: o.tono,
        acciones: html`<button type="button" class="boton boton-secundario" value="no">${o.no || 'Cancelar'}</button>
          <button type="button" class="boton ${o.peligro ? 'boton-peligro' : 'boton-primario'}" value="si">${o.si}</button>`
      }).toString().replace(/capa-titulo/g, 'confirmar-titulo');
      var dialogo = lugar.firstElementChild;
      var respuesta = false;
      document.body.appendChild(dialogo);
      dialogo.addEventListener('click', function (ev) {
        var boton = ev.target.closest('button[value]');
        if (!boton) return;
        respuesta = boton.value === 'si';
        dialogo.close();
      });
      dialogo.addEventListener('close', function () { dialogo.remove(); resolver(respuesta); });
      dialogo.showModal();
      dialogo.querySelector('h2').focus();
    });
  };

  /* ---------- Franja de ayuda (RF06.2) ---------- */

  C.franja = function () {
    var destacadas = DOCE.almacen.todos('lineas').filter(function (l) { return l.destacada; });
    var una = destacadas.length === 1 ? destacadas[0] : null;
    var texto;
    if (una) {
      texto = una.nombre + ' · ' + una.horario.split(',')[0] + (una.gratuita ? ', gratuita' : '');
    } else if (destacadas.length) {
      texto = 'Estas líneas atienden emergencias y crisis.';
    } else {
      texto = 'Consulta las líneas de ayuda disponibles.';
    }
    return html`<aside class="franja${destacadas.length > 1 ? ' franja-varias' : ''}" aria-label="Ayuda inmediata">
      <div class="franja-texto">
        <span class="redondo">${icono('salvavidas')}</span>
        <div>
          <p class="franja-titulo">¿Necesitas hablar con alguien ahora?</p>
          <p class="franja-linea">${texto}</p>
        </div>
      </div>
      <div class="franja-acciones">
        ${destacadas.map(function (l) {
          var tel = DOCE.util.enlaceTelefono(l.telefono);
          if (!tel) return html`<span class="franja-titulo">${l.nombre}: ${l.telefono}</span>`;
          return html`<a class="boton boton-primario" href="${tel}">${icono('telefono')}<span>${una ? 'Llamar al ' : html`<span class="franja-nombre">${l.nombre} </span>`}<span class="franja-numero">${l.telefono}</span></span></a>`;
        })}
        <a class="boton boton-fantasma" href="#/lineas" aria-label="Ver todas las líneas"><span>Ver todas<span class="franja-largo"> las líneas</span></span></a>
      </div>
    </aside>`;
  };

  /* ---------- Marcos ---------- */

  function marca(ruta, texto, logo) {
    return html`<a class="marca" href="${ruta}">
      <img src="img/${logo}" alt="" width="39" height="48">
      <span><span class="marca-nombre">DOCE</span><span class="marca-texto">${texto}</span></span>
    </a>`;
  }

  C.marcoPublico = function (seccion) {
    var depto = 'Departamento de Orientación y Consejo Educativo · FMAT';
    return html`<div class="publico">
      <a class="saltar" href="#contenido" data-saltar>Saltar al contenido</a>
      <header class="encabezado">
        <div class="contenedor encabezado-fila">
          ${marca('#/inicio', depto, 'logo-doce-color.svg')}
          <nav class="menu" aria-label="Secciones"><ul>${enlaces(C.seccionesPublicas, seccion)}</ul></nav>
          <a class="acceso" href="#/acceso">${icono('candado', 'icono-s')}Acceso DOCE</a>
          <button type="button" class="boton boton-fantasma abrir-menu" data-abrir-menu aria-haspopup="dialog">${icono('menu')}Menú</button>
        </div>
      </header>
      <dialog class="menu-movil" aria-label="Menú">
        <div class="contenedor pila">
          <div class="encabezado-fila">
            ${marca('#/inicio', depto, 'logo-doce-color.svg')}
            <button type="button" class="boton boton-fantasma abrir-menu-cerrar" data-cerrar-menu>${icono('cerrar')}Cerrar</button>
          </div>
          <nav aria-label="Secciones"><ul>${enlaces(C.seccionesPublicas, seccion, true)}</ul></nav>
          ${C.franja()}
          <div><a class="acceso" href="#/acceso">${icono('candado', 'icono-s')}Acceso DOCE</a></div>
        </div>
      </dialog>
      <main id="contenido" tabindex="-1">
        <div data-vista></div>
        <div class="contenedor franja-lugar" data-franja></div>
      </main>
      <footer class="pie">
        <div class="contenedor pie-fila">
          <p>Departamento de Orientación y Consejo Educativo · Facultad de Matemáticas, UADY</p>
          <p>Edificio principal, planta alta · Lunes a viernes, 8:00 a 15:00</p>
          <button type="button" class="boton boton-fantasma" data-restablecer>${icono('restablecer', 'icono-s')}Restablecer datos de ejemplo</button>
        </div>
      </footer>
    </div>`;
  };

  C.marcoAdmin = function (seccion) {
    var p = DOCE.config.persona;
    return html`<div class="admin">
      <a class="saltar" href="#contenido" data-saltar>Saltar al contenido</a>
      <header class="lateral">
        <div class="lateral-barra">
          ${marca('#/admin', 'Panel de administración', 'logo-doce-una-tinta-blanco.svg')}
          <button type="button" class="boton abrir-lateral" data-abrir-lateral aria-expanded="false" aria-controls="lateral-menu">${icono('menu')}Menú</button>
        </div>
        <div class="lateral-plegable" id="lateral-menu">
          <nav aria-label="Administración"><ul>${enlaces(C.seccionesAdmin, seccion, true)}</ul></nav>
          <div class="lateral-pie">
            <button type="button" class="boton" data-restablecer>${icono('restablecer')}Restablecer datos de ejemplo</button>
            <div class="persona">
              <span class="iniciales" aria-hidden="true">${p.iniciales}</span>
              <span><span class="persona-nombre">${p.corto}</span><span class="persona-cargo">${p.cargo}</span></span>
            </div>
            <button type="button" class="boton" data-cerrar-sesion>${icono('salir')}Cerrar sesión</button>
          </div>
        </div>
      </header>
      <main id="contenido" tabindex="-1"><div class="admin-contenido" data-vista></div></main>
    </div>`;
  };

  C.marcoLimpio = function () {
    return html`<main id="contenido" class="limpio" tabindex="-1"><div data-vista></div></main>`;
  };

  /* Encabezado de página */
  C.cabezaPublica = function (titulo, entrada) {
    return html`<div class="pagina-cabeza"><h1 tabindex="-1">${titulo}</h1>${entrada ? html`<p class="entrada">${entrada}</p>` : ''}</div>`;
  };

  // migas: [[texto, ruta]]; la última va sin ruta
  C.cabezaAdmin = function (o) {
    return html`${o.migas ? html`<nav class="migas" aria-label="Ruta de navegación"><ol>${o.migas.map(function (m) {
      return m[1] ? html`<li><a href="${m[1]}">${m[0]}</a></li>` : html`<li aria-current="page">${m[0]}</li>`;
    })}</ol></nav>` : ''}
    <div class="admin-cabeza">
      <div><h1 tabindex="-1">${o.titulo}</h1>${o.entrada ? html`<p class="secundario">${o.entrada}</p>` : ''}</div>
      ${o.acciones ? html`<div class="acciones">${o.acciones}</div>` : ''}
    </div>`;
  };
})();
