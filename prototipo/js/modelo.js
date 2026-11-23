/* Reglas de consulta compartidas: qué ve el público y cómo se escriben fechas, lugares y estados. */
(function () {
  'use strict';

  var M = (DOCE.modelo = {});
  var F = DOCE.util.fecha;

  M.MODALIDADES = { presencial: 'Presencial', virtual: 'Virtual', hibrida: 'Híbrida' };
  M.AMBITOS = [
    { id: 'universitario', singular: 'Universitario', plural: 'Universitarias', texto: 'Servicios de la UADY y de la Facultad de Matemáticas' },
    { id: 'local', singular: 'Local', plural: 'Locales', texto: 'Servicios en Mérida' },
    { id: 'estatal', singular: 'Estatal', plural: 'Estatales', texto: 'Servicios en Yucatán' },
    { id: 'nacional', singular: 'Nacional', plural: 'Nacionales', texto: 'Disponibles desde cualquier lugar de México' }
  ];
  M.TIPOS_MATERIAL = { folleto: 'Folleto', video: 'Video', documento: 'Documento' };

  function porFecha(a, b) {
    return (a.fechaInicio + a.horaInicio + a.nombre).localeCompare(b.fechaInicio + b.horaInicio + b.nombre);
  }

  // RF01: publicadas o canceladas, de hoy en adelante. Sin borradores.
  M.actividadesPublicas = function () {
    var hoy = F.hoy();
    return DOCE.almacen.todos('actividades').filter(function (a) {
      return (a.estado === 'publicada' || a.estado === 'cancelada') && a.fechaInicio >= hoy;
    }).sort(porFecha);
  };

  M.actividadesAdmin = function () { return DOCE.almacen.todos('actividades').slice().sort(porFecha); };

  M.proximaActividad = function () {
    return M.actividadesPublicas().find(function (a) { return a.estado === 'publicada'; }) || null;
  };

  // RF04.2: fecha de referencia del aviso = vigencia o, si no tiene, fecha de publicación.
  M.referenciaAviso = function (a) { return a.vigencia || a.publicado || ''; };

  M.avisosPublicos = function () {
    var hoy = F.hoy();
    return DOCE.almacen.todos('avisos').filter(function (a) {
      if (a.estado === 'publicado') return !a.vigencia || a.vigencia >= hoy;
      if (a.estado === 'cancelado') return M.referenciaAviso(a) >= hoy;
      return false;
    }).sort(function (a, b) { return (b.publicado + b.id).localeCompare(a.publicado + a.id); });
  };

  M.materialesPublicos = function () {
    return DOCE.almacen.todos('materiales').filter(function (m) { return m.estado === 'publicado'; })
      .sort(function (a, b) { return (b.publicado + b.editado).localeCompare(a.publicado + a.editado); });
  };

  M.personasOrdenadas = function () { return DOCE.almacen.todos('directorio').slice().sort(DOCE.util.ordenAlfabetico('nombre')); };

  M.nombreCompleto = function (p) { return (p.titulo ? p.titulo + ' ' : '') + p.nombre; };
  M.ubicacion = function (p) { return [p.edificio, p.planta, p.espacio].filter(Boolean).join(', '); };

  /* ---------- Textos de una actividad ---------- */

  // "16:00 a 17:30" o "16:00"
  M.horas = function (a) {
    if (!a.horaFin) return a.horaInicio;
    return a.horaInicio + ' a ' + a.horaFin;
  };

  // "Jueves 12 de noviembre de 2026 · 16:00 a 17:30", o con las dos fechas si termina otro día
  M.inicioYFin = function (a) {
    if (a.fechaFin && a.fechaFin !== a.fechaInicio) {
      return F.larga(a.fechaInicio) + ', ' + a.horaInicio + ' a ' + F.larga(a.fechaFin) + (a.horaFin ? ', ' + a.horaFin : '');
    }
    return F.larga(a.fechaInicio) + ' · ' + M.horas(a);
  };

  function corto(lugar) { return lugar.split(',')[0]; }

  // Lugar resumido para listas y calendario (RF01 CA1: lugar o "Virtual")
  M.lugarBreve = function (a) {
    if (a.modalidad === 'virtual') return 'Virtual';
    if (a.modalidad === 'hibrida') return corto(a.lugar) + ' y en línea';
    return corto(a.lugar);
  };

  M.modalidadLarga = function (a) { return a.modalidad === 'hibrida' ? 'Híbrida: presencial y en línea' : M.MODALIDADES[a.modalidad]; };

  // Datos del detalle (RF02 E1 a E4)
  M.datosActividad = function (a) {
    var html = DOCE.util.html;
    var U = DOCE.util;
    var conLugar = a.modalidad !== 'virtual';
    var conEnlace = a.modalidad !== 'presencial';
    return [
      { icono: 'calendario', nombre: 'Inicio y fin', valor: M.inicioYFin(a) },
      { icono: a.modalidad === 'virtual' ? 'video' : 'personas', nombre: 'Modalidad', valor: M.modalidadLarga(a) },
      conLugar && { icono: 'ubicacion', nombre: 'Lugar', valor: a.lugar },
      conEnlace && {
        icono: 'enlace', nombre: 'Enlace de acceso',
        valor: U.esEnlace(a.enlace) ? html`<a href="${a.enlace}" target="_blank" rel="noopener">${U.enlaceCorto(a.enlace)}<span class="solo-lector"> (abre en otra pestaña)</span></a>` : a.enlace
      },
      { icono: 'edificio', nombre: 'Organiza', valor: a.organizador }
    ];
  };

  // "Hoy, 9:12" o "Viernes 6, 17:40"
  M.momento = function (texto) {
    var p = texto.split('T');
    return (p[0] === F.hoy() ? 'Hoy' : F.diaSemana(p[0])) + ', ' + p[1].replace(/^0/, '');
  };

  M.ahora = function () { return F.hoy() + 'T' + F.horaActual(); };
})();
