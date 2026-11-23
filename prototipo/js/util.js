/* Utilidades: plantillas seguras, texto y fechas. */
(function () {
  'use strict';

  var util = (DOCE.util = {});

  /* ---------- Plantillas ---------- */

  // HTML ya seguro. Todo lo que no sea Crudo se escapa al insertarlo.
  function Crudo(texto) { this.texto = texto; }
  Crudo.prototype.toString = function () { return this.texto; };

  function escapar(valor) {
    return String(valor)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function aTexto(valor) {
    if (valor === null || valor === undefined || valor === false || valor === true) return '';
    if (valor instanceof Crudo) return valor.texto;
    if (Array.isArray(valor)) return valor.map(aTexto).join('');
    return escapar(valor);
  }

  // Uso: html`<p>${texto}</p>` (el texto se escapa solo).
  util.html = function (partes) {
    var salida = partes[0];
    for (var i = 1; i < partes.length; i++) salida += aTexto(arguments[i]) + partes[i];
    return new Crudo(salida);
  };
  util.crudo = function (texto) { return new Crudo(texto); };

  /* ---------- Texto ---------- */

  util.limpio = function (texto) { return String(texto === undefined || texto === null ? '' : texto).trim(); };

  // Sin acentos ni mayúsculas, para buscar y comparar.
  util.normalizar = function (texto) {
    return util.limpio(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ');
  };

  util.iniciales = function (nombre) {
    return util.limpio(nombre).split(/\s+/).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join('');
  };

  util.plural = function (n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); };

  util.recortar = function (texto, maximo) {
    texto = util.limpio(texto);
    if (texto.length <= maximo) return texto;
    var corte = texto.slice(0, maximo - 1);
    return corte.slice(0, Math.max(corte.lastIndexOf(' '), maximo - 30)).trim() + '…';
  };

  util.ordenAlfabetico = function (clave) {
    return function (a, b) { return a[clave].localeCompare(b[clave], 'es', { sensitivity: 'base' }); };
  };

  util.nuevoId = function (texto) {
    var base = util.normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'nuevo';
    return base + '-' + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36);
  };

  // Solo enlaces web; evita javascript: y similares en datos capturados.
  util.esEnlace = function (texto) {
    if (!/^https?:\/\//i.test(util.limpio(texto))) return false;
    try { return new URL(util.limpio(texto)).hostname.indexOf('.') > 0; } catch (e) { return false; }
  };
  util.enlaceCorto = function (texto) { return util.limpio(texto).replace(/^https?:\/\//i, '').replace(/\/$/, ''); };

  // "999 942 3140, ext. 1101" -> "tel:9999423140;ext=1101". Sin número (p. ej. [Número]) devuelve ''.
  util.enlaceTelefono = function (texto) {
    var partes = util.limpio(texto).split(/ext/i);
    var numero = partes[0].replace(/\D/g, '');
    if (numero.length < 3) return '';
    var ext = (partes[1] || '').replace(/\D/g, '');
    return 'tel:' + numero + (ext ? ';ext=' + ext : '');
  };

  /* ---------- Descargas ---------- */

  // PDF mínimo de una página, para que las descargas funcionen también con file://
  util.descargarPdf = function (nombre, titulo, parrafos) {
    function pdf(t) { return t.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d«»]/g, '"').replace(/…/g, '...').replace(/[^\x20-\xff]/g, '-').replace(/[\\()]/g, '\\$&'); }
    function renglones(t, ancho) {
      var salida = [''];
      t.split(' ').forEach(function (p) {
        if ((salida[salida.length - 1] + ' ' + p).length > ancho) salida.push(p);
        else salida[salida.length - 1] = (salida[salida.length - 1] + ' ' + p).trim();
      });
      return salida;
    }
    var texto = 'BT /F1 20 Tf 60 760 Td 26 TL ' + renglones(titulo, 46).map(function (r) { return '(' + pdf(r) + ') Tj T*'; }).join(' ') + ' /F1 12 Tf 18 TL ';
    parrafos.forEach(function (p) { texto += 'T* ' + renglones(p, 84).map(function (r) { return '(' + pdf(r) + ') Tj T*'; }).join(' ') + ' '; });
    texto += 'ET';
    var objetos = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
      '<< /Length ' + texto.length + ' >>\nstream\n' + texto + '\nendstream',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
    ];
    var doc = '%PDF-1.4\n';
    var lugares = objetos.map(function (o, i) { var l = doc.length; doc += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; return l; });
    var xref = doc.length;
    doc += 'xref\n0 6\n0000000000 65535 f \n' + lugares.map(function (l) { return ('0000000000' + l).slice(-10) + ' 00000 n \n'; }).join('');
    doc += 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    var bytes = new Uint8Array(doc.length);
    for (var i = 0; i < doc.length; i++) bytes[i] = doc.charCodeAt(i);
    util.descargar(nombre, new Blob([bytes], { type: 'application/pdf' }));
  };

  util.descargar = function (nombre, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.hidden = true;
    a.setAttribute('data-descarga', '');
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  };

  /* ---------- Fechas (AAAA-MM-DD, siempre en hora local) ---------- */

  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  function dos(n) { return (n < 10 ? '0' : '') + n; }
  function mayuscula(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

  var f = (util.fecha = {});
  f.MESES = MESES;
  f.DIAS = DIAS;

  f.aDate = function (iso) { var p = iso.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  f.aIso = function (d) { return d.getFullYear() + '-' + dos(d.getMonth() + 1) + '-' + dos(d.getDate()); };
  f.hoy = function () { return DOCE.config.hoy || f.aIso(new Date()); };
  f.horaActual = function () { var d = new Date(); return dos(d.getHours()) + ':' + dos(d.getMinutes()); };
  f.sumar = function (iso, dias) { var d = f.aDate(iso); d.setDate(d.getDate() + dias); return f.aIso(d); };

  // "Jueves 12 de noviembre de 2026"
  f.larga = function (iso) { return f.sinAnio(iso) + ' de ' + f.aDate(iso).getFullYear(); };
  // "Jueves 12 de noviembre"
  f.sinAnio = function (iso) { var d = f.aDate(iso); return mayuscula(DIAS[d.getDay()]) + ' ' + f.diaMes(iso); };
  // "12 de noviembre"
  f.diaMes = function (iso) { var d = f.aDate(iso); return d.getDate() + ' de ' + MESES[d.getMonth()]; };
  // "12 de noviembre de 2026"
  f.diaMesAnio = function (iso) { return f.diaMes(iso) + ' de ' + f.aDate(iso).getFullYear(); };
  // "Jue 12 nov"
  f.corta = function (iso) {
    var d = f.aDate(iso);
    return mayuscula(DIAS[d.getDay()].slice(0, 3)) + ' ' + d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3);
  };
  // "Jueves 12"
  f.diaSemana = function (iso) { var d = f.aDate(iso); return mayuscula(DIAS[d.getDay()]) + ' ' + d.getDate(); };
  // "Noviembre 2026" a partir de "2026-11"
  f.mesAnio = function (mes) { var p = mes.split('-').map(Number); return mayuscula(MESES[p[1] - 1]) + ' ' + p[0]; };
  f.sello = function (iso) {
    var d = f.aDate(iso);
    return { mes: MESES[d.getMonth()].slice(0, 3).toUpperCase(), dia: d.getDate() };
  };
})();
