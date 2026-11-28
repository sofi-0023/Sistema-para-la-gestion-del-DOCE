/* Directorio en administración (RNF03). Incluye el alta, edición y retiro genéricos
   que también usa tutorias.js. No hay wireframe de estas pantallas. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var V = DOCE.validacion;
  var FM = DOCE.formulario;
  var R = DOCE.rutas;
  var icono = DOCE.icono;

  /* o = { base, ruta, volver, seccion, coleccion, vista, singular, articulo: 'el'|'la', nombre(x), resumen(x),
           formulario(x), reunir(form, previo) -> { datos, errores }, conectar(form) } */
  C.gestion = function (o) {
    var femenino = o.articulo === 'la';
    function listo(verbo) { return verbo + (femenino ? 'a' : 'o'); }
    function uno(ctx) { return ctx.estado === 'no-disponible' ? null : DOCE.almacen.uno(o.coleccion, ctx.params.id); }
    function definicion(titulo, d) {
      d.base = o.base; d.titulo = titulo; d.marco = 'admin'; d.seccion = o.seccion; d.vista = o.vista; d.montar = o.montar;
      d.volver = function () { return o.volver; };
      return d;
    }
    function noDisponible() {
      return C.dialogo({
        titulo: 'Este elemento ya no está disponible', icono: 'prohibido', tono: 'aviso', texto: 'Otra persona lo retiró. La lista se actualizó y no se aplicó ningún cambio.',
        acciones: html`<button type="button" class="boton boton-primario" data-cerrar-capa>Volver a la lista</button>`
      });
    }
    function panel(titulo, x, boton) {
      return C.panel({
        titulo: titulo, entrada: 'Los campos con * son obligatorios. Los cambios se ven de inmediato en el sitio.',
        cuerpo: html`<form class="pila" novalidate id="form-gestion"><div data-resumen></div>${o.formulario(x)}</form>`,
        pie: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="submit" form="form-gestion" class="boton boton-primario">${boton}</button>`
      });
    }
    function montarFormulario(ctx, dialogo, nuevo) {
      var form = dialogo.querySelector('form');
      if (!form) return;
      FM.vigilar(form);
      if (o.conectar) o.conectar(form);
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var previo = nuevo ? null : uno(ctx);
        if (!nuevo && !previo) { R.dibujar(); return; }
        var r = o.reunir(form, previo);
        if (!FM.mostrar(form, r.errores)) return;
        var x = Object.assign({}, previo, r.datos);
        if (nuevo) x.id = U.nuevoId(o.nombre(x));
        if (FM.debeFallar(ctx) || !DOCE.almacen.guardar(o.coleccion, x)) { FM.fallo(form, ctx, 'No fue posible guardar'); return; }
        DOCE.almacen.registrarCambio(nuevo ? 'mas' : 'lapiz', (nuevo ? 'Agregaste ' : 'Editaste ') + '«' + o.nombre(x) + '»');
        R.mensaje({ tipo: 'exito', titulo: o.singular + ' ' + (nuevo ? listo('agregad') : listo('actualizad')), texto: '«' + o.nombre(x) + '» ya se muestra así en el sitio público.' });
        R.ir(o.volver);
      });
    }

    R.agregar(o.ruta + '/nuevo', definicion('Agregar ' + o.singular.toLowerCase(), {
      capa: function () { return panel('Agregar ' + o.singular.toLowerCase(), {}, 'Agregar'); },
      montarCapa: function (ctx, d) { montarFormulario(ctx, d, true); }
    }));
    R.agregar(o.ruta + '/:id/editar', definicion('Editar ' + o.singular.toLowerCase(), {
      capa: function (ctx) { var x = uno(ctx); return x ? panel('Editar ' + o.singular.toLowerCase(), x, 'Guardar cambios') : noDisponible(); },
      montarCapa: function (ctx, d) { montarFormulario(ctx, d, false); }
    }));
    R.agregar(o.ruta + '/:id/retirar', definicion('Retirar ' + o.singular.toLowerCase(), {
      capa: function (ctx) {
        var x = uno(ctx);
        if (!x) return noDisponible();
        return C.dialogo({
          titulo: '¿Retirar ' + (femenino ? 'esta ' : 'este ') + o.singular.toLowerCase() + '?', icono: 'basura', tono: 'error', texto: 'Dejará de mostrarse en el sitio público. Esta acción no se puede deshacer.',
          cuerpo: html`<div data-resultado></div><div class="resumen-elemento"><div class="fila-cuerpo"><span class="fila-nombre">${o.nombre(x)}</span><span class="secundario">${o.resumen(x)}</span></div></div>`,
          acciones: html`<button type="button" class="boton boton-secundario" data-cerrar-capa>Cancelar</button><button type="button" class="boton boton-peligro" data-confirmar>${icono('basura')}Retirar</button>`
        });
      },
      montarCapa: function (ctx, d) {
        C.montarConfirmar(ctx, d, function () {
          var x = uno(ctx);
          if (!x) { R.dibujar(); return true; }
          if (!DOCE.almacen.eliminar(o.coleccion, x.id)) return false;
          DOCE.almacen.registrarCambio('basura', 'Retiraste «' + o.nombre(x) + '»');
          R.mensaje({ tipo: 'exito', titulo: o.singular + ' ' + listo('retirad'), texto: '«' + o.nombre(x) + '» ya no aparece en el sitio público.' });
          R.ir(o.volver);
        }, 'No fue posible retirar el elemento');
      }
    }));
  };

  C.accionesGestion = function (ruta, id, nombre) {
    var oculto = html`<span class="solo-lector"> «${nombre}»</span>`;
    return html`<div class="acciones-fila"><a class="boton boton-secundario" href="#${ruta}/${id}/editar">Editar${oculto}</a><a class="boton boton-fantasma" href="#${ruta}/${id}/retirar">Retirar${oculto}</a></div>`;
  };

  /* ---------- Directorio ---------- */

  function lista() {
    var personas = M.personasOrdenadas();
    return html`${C.cabezaAdmin({
      migas: [['Administración', '#/admin'], ['Directorio']], titulo: 'Directorio', entrada: 'Personas de orientación y psicología que verá la comunidad, con su ubicación, horario y contacto.',
      acciones: html`<a class="boton boton-primario" href="#/admin/directorio/nuevo">${icono('mas')}Agregar persona</a>`
    })}
    <div class="mensajes pila" data-mensajes></div>
    <div class="tarjeta">${personas.length ? html`<table class="tabla"><caption class="solo-lector">Personas del directorio</caption>
      <thead><tr><th scope="col">Nombre y cargo</th><th scope="col">Ubicación</th><th scope="col">Horario</th><th scope="col">Acciones</th></tr></thead>
      <tbody>${personas.map(function (p) {
        return html`<tr><td class="celda-nombre"><span class="fila-nombre">${M.nombreCompleto(p)}</span><span class="secundario">${p.cargo}</span></td><td data-etiqueta="Ubicación">${M.ubicacion(p)}</td><td data-etiqueta="Horario">${p.horario}</td><td>${C.accionesGestion('/admin/directorio', p.id, p.nombre)}</td></tr>`;
      })}</tbody></table>` : C.vacio({ icono: 'personas', titulo: 'No hay personas registradas' })}</div>`;
  }

  R.agregar('/admin/directorio', { base: 'admin-directorio', titulo: 'Directorio', marco: 'admin', seccion: 'directorio', vista: lista });

  C.gestion({
    base: 'admin-directorio', ruta: '/admin/directorio', volver: '#/admin/directorio', seccion: 'directorio', coleccion: 'directorio', vista: lista,
    singular: 'Persona', articulo: 'la', nombre: M.nombreCompleto, resumen: function (p) { return p.cargo + ' · ' + M.ubicacion(p); },
    formulario: function (p) {
      return html`<div class="form-dos">${C.campo({ id: 'titulo', etiqueta: 'Grado académico', valor: p.titulo, marcador: 'Mtra.', ayuda: 'Opcional.' })}${C.campo({ id: 'area', etiqueta: 'Área', tipo: 'selector', valor: p.area || 'orientacion', opciones: M.AREAS })}</div>
        ${C.campo({ id: 'nombre', etiqueta: 'Nombre completo', obligatorio: true, valor: p.nombre })}
        ${C.campo({ id: 'cargo', etiqueta: 'Cargo o área de atención', obligatorio: true, valor: p.cargo })}
        ${C.campo({ id: 'descripcion', etiqueta: 'Descripción', tipo: 'area', valor: p.descripcion, ayuda: 'Opcional. Aparece en la ficha.' })}
        <div class="form-dos">${C.campo({ id: 'edificio', etiqueta: 'Edificio', obligatorio: true, valor: p.edificio })}${C.campo({ id: 'planta', etiqueta: 'Planta', obligatorio: true, valor: p.planta })}</div>
        ${C.campo({ id: 'espacio', etiqueta: 'Cubículo o espacio', valor: p.espacio, ayuda: 'Opcional.' })}
        ${C.campo({ id: 'horario', etiqueta: 'Horario de atención', obligatorio: true, valor: p.horario })}
        ${C.campo({ id: 'correo', etiqueta: 'Correo institucional', tipo: 'email', valor: p.correo, ayuda: 'Se necesita al menos correo o teléfono.' })}
        ${C.campo({ id: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', valor: p.telefono, ayuda: '10 dígitos; extensión opcional.' })}`;
    },
    reunir: function (form) { var d = FM.leer(form); return { datos: d, errores: V.persona(d) }; }
  });
})();
