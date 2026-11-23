/* Reglas de validación y ayuda para mostrar errores en formularios. */
(function () {
  'use strict';

  var V = (DOCE.validacion = {});
  var FM = (DOCE.formulario = {});
  var U = DOCE.util;
  var html = U.html;

  /* ---------- Reglas: devuelven { campo: mensaje } ---------- */

  function exigir(errores, datos, campo, mensaje) { if (!U.limpio(datos[campo])) errores[campo] = mensaje; }

  V.correo = function (t) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(U.limpio(t)); };

  // 10 dígitos con espacios o guiones opcionales y extensión opcional: "999 942 3140, ext. 1101"
  V.telefono = function (t) {
    var m = /^([\d\s\-()]+?)(?:\s*,?\s*ext\.?\s*(\d{1,6}))?$/i.exec(U.limpio(t));
    return !!m && m[1].replace(/\D/g, '').length === 10;
  };
  var TELEFONO = 'Escribe un número de 10 dígitos. Si tiene extensión: 999 942 3140, ext. 1101.';
  var ENLACE = 'Escribe un enlace completo, por ejemplo https://www.uady.mx.';
  var CORREO = 'Escribe un correo completo, por ejemplo nombre@correo.uady.mx.';

  // RF03-A E2 a E5 y RF04.1 CA5
  V.actividad = function (d) {
    var e = {};
    var hoy = U.fecha.hoy();
    exigir(e, d, 'nombre', 'Escribe el nombre de la actividad.');
    exigir(e, d, 'descripcion', 'Escribe una descripción de la actividad.');
    exigir(e, d, 'organizador', 'Escribe la institución u organizador responsable.');

    if (!U.limpio(d.fechaInicio)) e.fechaInicio = 'Elige la fecha de inicio.';
    else if (!DOCE.fechaValida(d.fechaInicio)) e.fechaInicio = 'Escribe una fecha válida.';
    else if (d.fechaInicio < hoy) e.fechaInicio = 'La fecha de inicio no puede ser anterior a hoy (' + U.fecha.diaMesAnio(hoy) + ').';

    if (!U.limpio(d.horaInicio)) e.horaInicio = 'Elige la hora de inicio.';
    else if (!/^\d{2}:\d{2}$/.test(d.horaInicio)) e.horaInicio = 'Escribe una hora válida.';

    if (d.fechaFin && !DOCE.fechaValida(d.fechaFin)) e.fechaFin = 'Escribe una fecha válida.';
    else if (d.fechaFin && d.fechaInicio && d.fechaFin < d.fechaInicio) e.fechaFin = 'La finalización no puede ser anterior al inicio.';
    else if (d.horaFin && d.horaInicio && (!d.fechaFin || d.fechaFin === d.fechaInicio) && d.horaFin <= d.horaInicio) {
      e.horaFin = d.horaFin === d.horaInicio ? 'La finalización debe ser posterior al inicio.' : 'La finalización no puede ser anterior al inicio.';
    } else if (d.fechaFin && d.fechaFin !== d.fechaInicio && !d.horaFin) {
      e.horaFin = 'Elige la hora en que termina.';
    }

    if (['presencial', 'virtual', 'hibrida'].indexOf(d.modalidad) < 0) e.modalidad = 'Elige la modalidad.';
    if (d.modalidad === 'presencial') exigir(e, d, 'lugar', 'Las actividades presenciales necesitan un lugar.');
    if (d.modalidad === 'hibrida') exigir(e, d, 'lugar', 'Las actividades híbridas necesitan un lugar.');
    if (d.modalidad === 'virtual' || d.modalidad === 'hibrida') {
      if (!U.limpio(d.enlace)) e.enlace = 'Las actividades ' + (d.modalidad === 'virtual' ? 'virtuales' : 'híbridas') + ' necesitan un enlace de acceso.';
      else if (!U.esEnlace(d.enlace)) e.enlace = 'Escribe un enlace completo, por ejemplo https://teams.microsoft.com/...';
    }
    return e;
  };

  // Deja solo los datos que corresponden a la modalidad
  V.ajustarActividad = function (d) {
    if (d.modalidad === 'virtual') d.lugar = '';
    if (d.modalidad === 'presencial') d.enlace = '';
    if (d.horaFin && !d.fechaFin) d.fechaFin = d.fechaInicio;
    return d;
  };

  // RF03-B E2 y RF04.1 CA5
  V.aviso = function (d) {
    var e = {};
    exigir(e, d, 'titulo', 'Escribe el título del aviso; no puede quedar vacío ni tener solo espacios.');
    exigir(e, d, 'contenido', 'Escribe el contenido del aviso; no puede quedar vacío ni tener solo espacios.');
    if (d.vigencia && !DOCE.fechaValida(d.vigencia)) e.vigencia = 'Escribe una fecha válida.';
    else if (d.vigencia && d.vigencia < U.fecha.hoy()) e.vigencia = 'La vigencia no puede ser anterior a hoy.';
    return e;
  };

  // RF06.3, RF06 CA6 y CA7
  V.linea = function (d) {
    var e = {};
    exigir(e, d, 'nombre', 'Escribe el nombre de la línea.');
    if (!DOCE.modelo.AMBITOS.some(function (a) { return a.id === d.ambito; })) e.ambito = 'Elige el ámbito de atención.';
    exigir(e, d, 'apoyo', 'Describe el tipo de apoyo que ofrece.');
    if (!U.limpio(d.telefono)) e.telefono = 'Escribe el número telefónico.';
    else if (!V.telefono(d.telefono)) e.telefono = TELEFONO;
    exigir(e, d, 'horario', 'Escribe el horario o la disponibilidad.');
    if (U.limpio(d.sitio) && !U.esEnlace(d.sitio)) e.sitio = ENLACE;
    if (U.limpio(d.correo) && !V.correo(d.correo)) e.correo = CORREO;
    return e;
  };

  // RF08
  V.material = function (d) {
    var e = {};
    exigir(e, d, 'titulo', 'Escribe el título del material.');
    if (!DOCE.modelo.TIPOS_MATERIAL[d.tipo]) e.tipo = 'Elige el tipo de material.';
    if (U.limpio(d.resumen).length > 150) e.resumen = 'La descripción breve admite hasta 150 caracteres; tiene ' + U.limpio(d.resumen).length + '.';
    exigir(e, d, 'tematica', 'Escribe la temática.');
    exigir(e, d, 'autor', 'Escribe el autor o la fuente.');
    if (U.limpio(d.origen) && !U.esEnlace(d.origen)) e.origen = ENLACE;
    if (!e.origen && !d.archivo && !U.limpio(d.origen)) e.origen = 'Selecciona un archivo o escribe un enlace.';
    return e;
  };

  // RF05 CA2: al menos un medio de contacto
  V.persona = function (d) {
    var e = {};
    exigir(e, d, 'nombre', 'Escribe el nombre completo.');
    exigir(e, d, 'cargo', 'Escribe el cargo o área de atención.');
    exigir(e, d, 'edificio', 'Escribe el edificio.');
    exigir(e, d, 'planta', 'Escribe la planta.');
    exigir(e, d, 'horario', 'Escribe el horario de atención.');
    if (U.limpio(d.correo) && !V.correo(d.correo)) e.correo = CORREO;
    if (U.limpio(d.telefono) && !V.telefono(d.telefono)) e.telefono = TELEFONO;
    if (!U.limpio(d.correo) && !U.limpio(d.telefono)) e.correo = 'Escribe al menos un medio de contacto: correo o teléfono.';
    return e;
  };

  // RF10 CA3
  V.tutor = function (d) {
    var e = {};
    exigir(e, d, 'nombre', 'Escribe el nombre completo.');
    exigir(e, d, 'cargo', 'Escribe el cargo.');
    if (!U.limpio(d.correo)) e.correo = 'Escribe el correo.';
    else if (!V.correo(d.correo)) e.correo = CORREO;
    if (!/^\d{1,6}$/.test(U.limpio(d.extension))) e.extension = 'Escribe la extensión solo con números.';
    exigir(e, d, 'ubicacion', 'Escribe la ubicación.');
    exigir(e, d, 'horario', 'Escribe el horario de atención.');
    exigir(e, d, 'orientacion', 'Describe la orientación que ofrece.');
    return e;
  };

  /* ---------- Formularios ---------- */

  // Valores por nombre de campo. Casillas = true/false. Texto sin espacios sobrantes.
  FM.leer = function (form) {
    var d = {};
    [].forEach.call(form.elements, function (el) {
      if (!el.name || el.type === 'file') return;
      if (el.type === 'checkbox') d[el.name] = el.checked;
      else if (el.type === 'radio') { if (el.checked) d[el.name] = el.value; else if (!(el.name in d)) d[el.name] = ''; }
      else d[el.name] = U.limpio(el.value);
    });
    return d;
  };

  function campoDe(form, nombre) { return form.querySelector('[data-campo="' + nombre + '"]'); }
  function controlesDe(campo) { return campo.querySelectorAll('input, select, textarea'); }

  FM.limpiar = function (form, nombre) {
    [].forEach.call(form.querySelectorAll(nombre ? '[data-campo="' + nombre + '"]' : '[data-campo]'), function (campo) {
      var error = campo.querySelector('.campo-error');
      if (!error) return;
      [].forEach.call(controlesDe(campo), function (c) {
        c.removeAttribute('aria-invalid');
        var resto = (c.getAttribute('aria-describedby') || '').split(' ').filter(function (i) { return i && i !== error.id; }).join(' ');
        if (resto) c.setAttribute('aria-describedby', resto); else c.removeAttribute('aria-describedby');
      });
      error.remove();
    });
  };

  // Marca los campos, conserva lo capturado y enfoca el resumen. Devuelve true si no hay errores.
  FM.mostrar = function (form, errores, textos) {
    var nombres = Object.keys(errores);
    var resumen = form.querySelector('[data-resumen]');
    FM.limpiar(form);
    if (resumen) resumen.innerHTML = '';
    if (!nombres.length) return true;

    nombres.forEach(function (n) {
      var campo = campoDe(form, n);
      if (!campo) return;
      var id = 'error-' + n;
      campo.insertAdjacentHTML('beforeend', html`<p class="campo-error" id="${id}">${DOCE.icono('alerta', 'icono-s')}<span>${errores[n]}</span></p>`.toString());
      [].forEach.call(controlesDe(campo), function (c) {
        c.setAttribute('aria-invalid', 'true');
        c.setAttribute('aria-describedby', ((c.getAttribute('aria-describedby') || '') + ' ' + id).trim());
      });
    });

    if (resumen) {
      var t = textos || {};
      resumen.innerHTML = DOCE.componentes.alerta({
        tipo: 'error', id: 'resumen-errores',
        titulo: t.titulo || 'Revisa ' + (nombres.length === 1 ? 'el campo marcado' : 'los ' + nombres.length + ' campos marcados'),
        texto: t.texto || 'Tus datos se conservaron. Corrige los campos en rojo y vuelve a guardar.',
        lista: html`<ul class="lista-errores">${nombres.map(function (n) { return html`<li><button type="button" class="enlace" data-ir="${n}">${errores[n]}</button></li>`; })}</ul>`
      }).toString();
      resumen.querySelector('.alerta').focus();
      [].forEach.call(resumen.querySelectorAll('[data-ir]'), function (b) {
        b.addEventListener('click', function () { var c = campoDe(form, b.dataset.ir); if (c && controlesDe(c)[0]) controlesDe(c)[0].focus(); });
      });
    }
    document.dispatchEvent(new CustomEvent('doce:errores', { detail: { campos: nombres } }));
    return false;
  };

  // Mensaje general dentro del formulario (error al guardar, duplicado)
  FM.aviso = function (form, alerta) {
    var resumen = form.querySelector('[data-resumen]');
    alerta.id = 'resumen-errores';
    resumen.innerHTML = DOCE.componentes.alerta(alerta).toString();
    resumen.querySelector('.alerta').focus();
  };

  // Al corregir un campo se quita su error
  FM.vigilar = function (form) {
    form.addEventListener('input', function (ev) {
      var campo = ev.target.closest('[data-campo]');
      if (campo) FM.limpiar(form, campo.dataset.campo);
    });
  };
})();
