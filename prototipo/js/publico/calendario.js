/* P02 Calendario (RF01): vista Mes y vista Lista. */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var C = DOCE.componentes;
  var M = DOCE.modelo;
  var F = DOCE.util.fecha;
  var icono = DOCE.icono;

  var DIAS = [['Lun', 'Lunes'], ['Mar', 'Martes'], ['Mié', 'Miércoles'], ['Jue', 'Jueves'], ['Vie', 'Viernes'], ['Sáb', 'Sábado'], ['Dom', 'Domingo']];

  function moverMes(mes, pasos) {
    var p = mes.split('-').map(Number);
    return F.aIso(new Date(p[0], p[1] - 1 + pasos, 1)).slice(0, 7);
  }

  // Parámetros de la vista, con valores por omisión. En celular se abre en Lista.
  function opciones(consulta, mesPorOmision) {
    var mes = consulta.get('mes');
    var vista = consulta.get('vista');
    return {
      mes: /^\d{4}-(0[1-9]|1[0-2])$/.test(mes || '') ? mes : (mesPorOmision || F.hoy().slice(0, 7)),
      vista: vista === 'mes' || vista === 'lista' ? vista : (window.matchMedia('(max-width: 767px)').matches ? 'lista' : 'mes'),
      dia: consulta.get('dia') || ''
    };
  }

  function direccion(o, cambios) {
    var q = new URLSearchParams();
    var d = { vista: o.vista, mes: o.mes, dia: '' };
    Object.keys(cambios || {}).forEach(function (k) { d[k] = cambios[k]; });
    Object.keys(d).forEach(function (k) { if (d[k]) q.set(k, d[k]); });
    return '#/calendario?' + q.toString();
  }

  function enlaceActividad(a, o) { return '#/actividad/' + a.id + '?vista=' + o.vista + '&mes=' + o.mes; }

  function ficha(a, o) {
    var cancelada = a.estado === 'cancelada';
    return html`<li><a class="evento${cancelada ? ' evento-cancelada' : ''}" href="${enlaceActividad(a, o)}">
      <span class="evento-hora">${a.horaInicio}${cancelada ? html` <span class="evento-etiqueta">Cancelada</span>` : ''}</span>
      <span class="evento-nombre">${a.nombre}</span>
      <span class="evento-lugar">${M.lugarBreve(a)}</span>
    </a></li>`;
  }

  function cuadricula(o, lista, inactiva) {
    var hoy = F.hoy();
    var p = o.mes.split('-').map(Number);
    var primero = new Date(p[0], p[1] - 1, 1);
    var inicio = F.sumar(F.aIso(primero), -((primero.getDay() + 6) % 7));
    var ultimo = F.aIso(new Date(p[0], p[1], 0));
    var semanas = [];
    for (var d = inicio; d <= ultimo; d = F.sumar(d, 7)) semanas.push(d);

    return html`<table class="mes${inactiva ? ' mes-inactivo' : ''}"${inactiva ? html` aria-hidden="true"` : ''}>
      <caption class="solo-lector">Actividades de ${F.mesAnio(o.mes)}</caption>
      <thead><tr>${DIAS.map(function (x) { return html`<th scope="col"><span aria-hidden="true">${x[0]}</span><span class="solo-lector">${x[1]}</span></th>`; })}</tr></thead>
      <tbody>${semanas.map(function (s) {
        return html`<tr>${DIAS.map(function (_, i) {
          var dia = F.sumar(s, i);
          var fuera = dia.slice(0, 7) !== o.mes;
          var eventos = fuera ? [] : lista.filter(function (a) { return a.fechaInicio === dia; });
          var numero = Number(dia.slice(8));
          var esHoy = dia === hoy;
          return html`<td class="${fuera || dia < hoy ? 'dia-apagado' : ''}${dia === o.dia ? ' dia-elegido' : ''}">
            <span class="dia-numero${esHoy ? ' dia-hoy' : ''}${eventos.length ? ' con-eventos' : ''}"><span class="dia-cifra">${numero}</span>${esHoy ? html`<span class="dia-texto">Hoy</span>` : ''}</span>
            ${eventos.length ? html`<a class="dia-boton" id="dia-${dia}" href="${direccion(o, { dia: dia })}"${dia === o.dia ? html` aria-current="date"` : ''}>
              <span class="dia-cifra">${numero}</span><span class="dia-marcas" aria-hidden="true">${eventos.map(function (e) { return html`<i class="${e.estado === 'cancelada' ? 'marca-cancelada' : ''}"></i>`; })}</span>
              <span class="solo-lector">${F.sinAnio(dia)}, ${DOCE.util.plural(eventos.length, 'actividad', 'actividades')}</span></a>
            <ul class="eventos">${eventos.map(function (a) { return ficha(a, o); })}</ul>` : ''}
          </td>`;
        })}</tr>`;
      })}</tbody>
    </table>`;
  }

  function listaPorDia(lista, o, nivel) {
    var dias = [];
    lista.forEach(function (a) { if (dias.indexOf(a.fechaInicio) < 0) dias.push(a.fechaInicio); });
    return html`<div class="lista-dias">${dias.map(function (d) {
      return html`<section aria-labelledby="lista-${nivel}-${d}"><h3 class="lista-dia" id="lista-${nivel}-${d}">${F.diaSemana(d)}</h3>
        <ul class="pila">${lista.filter(function (a) { return a.fechaInicio === d; }).map(function (a) {
          return html`<li class="tarjeta tarjeta-actividad">${C.filaActividad(a, enlaceActividad(a, o), true)}</li>`;
        })}</ul></section>`;
    })}</div>`;
  }

  function sinEventos(todas, o) {
    var despues = todas.find(function (a) { return a.fechaInicio.slice(0, 7) !== o.mes; });
    return C.vacio({
      icono: 'calendario', titulo: 'No hay eventos por mostrar',
      texto: despues ? 'No hay actividades publicadas para este mes.' : 'Todavía no hay actividades publicadas. Vuelve más tarde.',
      accion: despues ? html`<a class="boton boton-secundario" href="${direccion(o, { mes: despues.fechaInicio.slice(0, 7) })}">Ver ${F.mesAnio(despues.fechaInicio.slice(0, 7)).toLowerCase()}</a>` : ''
    });
  }

  // También es el fondo del detalle de actividad, que pide su propio mes y nunca hereda el estado.
  function contenido(consulta, estado, mesPorOmision) {
    var o = opciones(consulta, mesPorOmision);
    var error = estado === 'error';
    var todas = error || estado === 'vacio' ? [] : M.actividadesPublicas();
    var delMes = todas.filter(function (a) { return a.fechaInicio.slice(0, 7) === o.mes; });
    var delDia = delMes.filter(function (a) { return a.fechaInicio === o.dia; });

    var cuerpo;
    if (error) {
      cuerpo = html`<div class="cal-error">${C.errorConsulta({ texto: 'Revisa tu conexión a internet. Tus datos no se perdieron.' })}</div>${o.vista === 'mes' ? cuadricula(o, [], true) : ''}`;
    } else if (o.vista === 'lista') {
      cuerpo = delMes.length ? listaPorDia(delMes, o, 'm') : sinEventos(todas, o);
    } else {
      cuerpo = html`${cuadricula(o, delMes)}
        ${delMes.length ? html`<div class="dia-detalle">${delDia.length ? listaPorDia(delDia, o, 'd') : html`<p class="secundario">Elige un día marcado para ver sus actividades.</p>`}</div>` : sinEventos(todas, o)}`;
    }

    return html`<div class="contenedor pagina">
      <div class="fila separados cal-cabeza">
        ${C.cabezaPublica('Calendario de actividades', 'Actividades publicadas del DOCE a partir de hoy.')}
        <ul class="leyenda" aria-label="Significado de los colores"><li><i></i>Actividad</li><li><i class="marca-cancelada"></i>Cancelada</li></ul>
      </div>
      <div class="mensajes" data-mensajes></div>
      <div class="tarjeta calendario">
        <div class="cal-barra">
          <div class="cal-mes">
            <a class="boton boton-secundario boton-icono" id="mes-anterior" href="${direccion(o, { mes: moverMes(o.mes, -1) })}" aria-label="Mes anterior">${icono('anterior')}</a>
            <h2 aria-live="polite">${F.mesAnio(o.mes)}</h2>
            <a class="boton boton-secundario boton-icono" id="mes-siguiente" href="${direccion(o, { mes: moverMes(o.mes, 1) })}" aria-label="Mes siguiente">${icono('siguiente')}</a>
            <a class="boton boton-secundario" id="mes-hoy" href="${direccion(o, { mes: F.hoy().slice(0, 7) })}">Hoy</a>
          </div>
          <div class="segmentos" role="group" aria-label="Vista del calendario">
            <a class="segmento" id="vista-mes" href="${direccion(o, { vista: 'mes' })}"${o.vista === 'mes' ? html` aria-current="true"` : ''}>${icono('cuadricula')}Mes</a>
            <a class="segmento" id="vista-lista" href="${direccion(o, { vista: 'lista' })}"${o.vista === 'lista' ? html` aria-current="true"` : ''}>${icono('lista')}Lista</a>
          </div>
        </div>
        ${cuerpo}
      </div>
    </div>`;
  }

  DOCE.publico = DOCE.publico || {};
  DOCE.publico.calendario = {
    contenido: contenido,
    // Dirección del calendario que se veía antes de abrir el detalle
    volver: function (consulta, mes) { return direccion(opciones(consulta, mes)); }
  };

  DOCE.rutas.agregar('/calendario', {
    base: 'calendario', titulo: 'Calendario', seccion: 'calendario',
    vista: function (ctx) { return contenido(ctx.consulta, ctx.estado); }
  });
})();
