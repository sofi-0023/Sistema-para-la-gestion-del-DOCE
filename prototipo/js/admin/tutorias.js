/* Contactos de tutoría y guías de carrera en administración (RNF03). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var V = DOCE.validacion;
  var FM = DOCE.formulario;
  var icono = DOCE.icono;
  var LISTA = '#/admin/tutorias';

  function lista() {
    var tutores = DOCE.almacen.todos('tutores');
    var guias = DOCE.almacen.todos('guias');
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Tutorías y guías']], titulo: 'Tutorías y guías', entrada: 'Contactos del programa de tutorías y guías de carrera que verá la comunidad.',
      acciones: html`<a class="boton boton-secundario" href="${LISTA}/guias/nuevo">${icono('mas')}Agregar guía</a><a class="boton boton-primario" href="${LISTA}/contactos/nuevo">${icono('mas')}Agregar contacto</a>`
    })}
    <div class="mensajes pila" data-mensajes></div>
    <div class="pila lineas-grupos">
      <section class="tarjeta" aria-labelledby="ad-c"><div class="fila separados linea-cabeza"><h2 class="titulo-4" id="ad-c">Contactos de tutoría</h2>${C.insignia(U.plural(tutores.length, 'contacto', 'contactos'))}</div>
        ${tutores.length ? html`<ul>${tutores.map(function (t) {
          return html`<li class="linea"><div class="linea-datos"><h3 class="linea-nombre">${M.nombreCompleto(t)}</h3><p class="secundario">${t.cargo} · ${t.correo} · ext. ${t.extension}</p></div>${C.accionesGestion('/admin/tutorias/contactos', t.id, t.nombre)}</li>`;
        })}</ul>` : html`<p class="secundario">No hay contactos registrados.</p>`}</section>
      <section class="tarjeta" aria-labelledby="ad-g"><div class="fila separados linea-cabeza"><h2 class="titulo-4" id="ad-g">Guías de carrera</h2>${C.insignia(U.plural(guias.length, 'guía', 'guías'))}</div>
        ${guias.length ? html`<ul>${guias.map(function (g) {
          return html`<li class="linea"><div class="linea-datos"><h3 class="linea-nombre">${g.titulo}</h3><p class="secundario">${g.formato} · ${g.tamano}</p>${g.disponible ? '' : html`<p>${C.insignia('Archivo no disponible', 'error')}</p>`}</div>${C.accionesGestion('/admin/tutorias/guias', g.id, g.titulo)}</li>`;
        })}</ul>` : html`<p class="secundario">No hay guías registradas.</p>`}</section>
    </div>`;
  }

  DOCE.rutas.agregar('/admin/tutorias', { base: 'admin-tutorias', titulo: 'Tutorías y guías', marco: 'admin', seccion: 'tutorias', vista: lista });

  C.gestion({
    base: 'admin-tutorias', ruta: '/admin/tutorias/contactos', volver: LISTA, seccion: 'tutorias', coleccion: 'tutores', vista: lista,
    singular: 'Contacto', articulo: 'el', nombre: M.nombreCompleto, resumen: function (t) { return t.cargo + ' · ' + t.correo; },
    formulario: function (t) {
      return html`${C.campo({ id: 'titulo', etiqueta: 'Grado académico', valor: t.titulo, marcador: 'Dr.', ayuda: 'Opcional.' })}
        ${C.campo({ id: 'nombre', etiqueta: 'Nombre completo', obligatorio: true, valor: t.nombre })}
        ${C.campo({ id: 'cargo', etiqueta: 'Cargo', obligatorio: true, valor: t.cargo })}
        <div class="form-dos">${C.campo({ id: 'correo', etiqueta: 'Correo', tipo: 'email', obligatorio: true, valor: t.correo })}${C.campo({ id: 'extension', etiqueta: 'Extensión', obligatorio: true, valor: t.extension, maximo: 6 })}</div>
        ${C.campo({ id: 'ubicacion', etiqueta: 'Ubicación', obligatorio: true, valor: t.ubicacion })}
        ${C.campo({ id: 'horario', etiqueta: 'Horario de atención', obligatorio: true, valor: t.horario })}
        ${C.campo({ id: 'orientacion', etiqueta: 'Orientación que ofrece', tipo: 'area', obligatorio: true, valor: t.orientacion })}`;
    },
    reunir: function (form) { var d = FM.leer(form); return { datos: d, errores: V.tutor(d) }; }
  });

  C.gestion({
    base: 'admin-tutorias', ruta: '/admin/tutorias/guias', volver: LISTA, seccion: 'tutorias', coleccion: 'guias', vista: lista,
    singular: 'Guía', articulo: 'la', nombre: function (g) { return g.titulo; }, resumen: function (g) { return g.formato + ' · ' + g.tamano; },
    formulario: function (g) {
      return html`${C.campo({ id: 'titulo', etiqueta: 'Título de la guía', obligatorio: true, valor: g.titulo, maximo: 120 })}
        ${g.formato ? html`<p class="secundario">Archivo actual: <strong>${g.formato} · ${g.tamano}</strong>${g.disponible ? '' : ' (no disponible; súbelo de nuevo)'}</p>` : ''}
        ${C.campoArchivo({ id: 'archivo', etiqueta: g.formato ? 'Reemplazar archivo' : 'Archivo', obligatorio: !g.formato, acepta: '.pdf', ayuda: 'PDF, hasta 25 MB.' })}`;
    },
    reunir: function (form, previo) {
      var d = FM.leer(form);
      var a = U.leerArchivo(form.elements.archivo);
      var e = {};
      if (!d.titulo) e.titulo = 'Escribe el título de la guía.';
      if (!a && !previo) e.archivo = 'Selecciona el archivo de la guía.';
      if (a && a.formato !== 'PDF') e.archivo = 'Usa un archivo PDF.';
      else if (a && a.bytes > 25 * 1048576) e.archivo = 'El archivo pesa ' + a.tamano + '; el máximo es 25 MB.';
      if (a) { d.formato = a.formato; d.tamano = a.tamano; d.disponible = true; }
      return { datos: d, errores: e };
    }
  });
})();
