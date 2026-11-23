/* Íconos de línea (24 x 24, trazo del color del texto). Son decorativos: van con aria-hidden. */
(function () {
  'use strict';

  var TRAZOS = {
    inicio: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
    calendario: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>',
    personas: '<circle cx="9" cy="7.5" r="3.5"/><path d="M2.5 20.5v-1.5a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v1.5"/><path d="M16 4.2a3.5 3.5 0 0 1 0 6.6M21.5 20.5v-1.5a4 4 0 0 0-3-3.8"/>',
    salvavidas: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
    documento: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h7M8.5 9h2"/>',
    imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15.5-4.5-4.5L6 21"/>',
    birrete: '<path d="M12 4 1.5 9.5 12 15l10.5-5.5z"/><path d="M5.5 11.8V17c0 1.5 3 3 6.5 3s6.5-1.500 6.500-3v-5.200M22.500 9.500V15"/>',
    candado: '<rect x="4" y="10.500" width="16" height="10.500" rx="2"/><path d="M7.500 10.500V7a4.500 4.500 0 0 1 9 0v3.500"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.500 2"/>',
    ubicacion: '<path d="M19.500 10c0 6-7.500 11.500-7.500 11.500S4.500 16 4.500 10a7.500 7.500 0 0 1 15 0z"/><circle cx="12" cy="10" r="2.800"/>',
    edificio: '<rect x="5" y="2.500" width="14" height="19" rx="1.500"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21.500v-3h4v3"/>',
    telefono: '<path d="M21 16.800v2.700a2 2 0 0 1-2.200 2A18.500 18.500 0 0 1 2.500 5.200 2 2 0 0 1 4.500 3h2.700a2 2 0 0 1 2 1.700c.1.900.3 1.700.6 2.500a2 2 0 0 1-.4 2.100L8.300 10.400a15 15 0 0 0 5.300 5.300l1.100-1.100a2 2 0 0 1 2.100-.4c.8.300 1.600.500 2.500.600a2 2 0 0 1 1.700 2z"/>',
    correo: '<rect x="2.500" y="4.500" width="19" height="15" rx="2"/><path d="m3 6.500 9 6.500 9-6.500"/>',
    enlace: '<path d="M10 13.500a4.500 4.500 0 0 0 6.800.5l2.700-2.700a4.500 4.500 0 0 0-6.400-6.400L11.600 6.400"/><path d="M14 10.500a4.500 4.500 0 0 0-6.800-.5l-2.700 2.700a4.500 4.500 0 0 0 6.400 6.400l1.500-1.500"/>',
    externo: '<path d="M18 13.500V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5.500M15 3h6v6M10.500 13.500 21 3"/>',
    descarga: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10.500l5 5 5-5M12 15.500V3"/>',
    subir: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12.500"/>',
    anterior: '<path d="m15 18-6-6 6-6"/>',
    siguiente: '<path d="m9 18 6-6-6-6"/>',
    abajo: '<path d="m6 9 6 6 6-6"/>',
    regresar: '<path d="M19.500 12h-15M11 18.500 4.500 12 11 5.500"/>',
    cerrar: '<path d="m18 6-12 12M6 6l12 12"/>',
    menu: '<path d="M3.500 6h17M3.500 12h17M3.500 18h17"/>',
    buscar: '<circle cx="11" cy="11" r="7.500"/><path d="m21 21-4.700-4.700"/>',
    info: '<circle cx="12" cy="12" r="9.500"/><path d="M12 11.500v5M12 7.500v.1"/>',
    alerta: '<circle cx="12" cy="12" r="9.500"/><path d="M12 7v5.500M12 16.500v.1"/>',
    correcto: '<circle cx="12" cy="12" r="9.500"/><path d="m8.500 12.200 2.500 2.500 4.700-5"/>',
    prohibido: '<circle cx="12" cy="12" r="9.500"/><path d="m5.300 5.300 13.400 13.400"/>',
    sinconexion: '<path d="m2.500 2.500 19 19M8.500 16.500a5 5 0 0 1 7 0M5 12.800a10 10 0 0 1 5-2.700M19 12.800a10 10 0 0 0-2.800-2M2 8.800a15 15 0 0 1 4.500-2.900M22 8.800A15 15 0 0 0 10.800 5M12 20v.1"/>',
    video: '<rect x="2.500" y="6" width="13" height="12" rx="2"/><path d="m15.500 10.500 6-3.500v10l-6-3.500"/>',
    reproducir: '<path d="M6 3.500 20 12 6 20.500z"/>',
    basura: '<path d="M3.500 6h17M8 6V4a1.500 1.500 0 0 1 1.500-1.500h5A1.500 1.500 0 0 1 16 4v2M5.500 6l.8 13.700a2 2 0 0 0 2 1.800h7.400a2 2 0 0 0 2-1.800L18.500 6M10 11v6M14 11v6"/>',
    lapiz: '<path d="M16.500 3.500a2.100 2.100 0 0 1 3 0l1 1a2.100 2.100 0 0 1 0 3L8 20l-5.500 1.500L4 16z"/><path d="m14 6 4 4"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    megafono: '<path d="M3 11v3a1 1 0 0 0 1 1h2.500L20.500 19V5.500L6.500 10H4a1 1 0 0 0-1 1zM7.500 15.500V18a2.500 2.500 0 0 0 5 .5v-1.700"/>',
    ojo: '<path d="M1.500 12S5.500 5 12 5s10.500 7 10.500 7-4 7-10.500 7S1.500 12 1.500 12z"/><circle cx="12" cy="12" r="3"/>',
    salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 16.500l4.500-4.500L16 7.500M20.500 12H9"/>',
    cuadricula: '<rect x="3.500" y="3.500" width="7" height="7" rx="1"/><rect x="13.500" y="3.500" width="7" height="7" rx="1"/><rect x="3.500" y="13.500" width="7" height="7" rx="1"/><rect x="13.500" y="13.500" width="7" height="7" rx="1"/>',
    lista: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    restablecer: '<path d="M3 12a9 9 0 1 0 2.900-6.600L3 8"/><path d="M3 3v5h5"/>'
  };

  DOCE.iconos = Object.keys(TRAZOS);

  DOCE.icono = function (nombre, clase) {
    return DOCE.util.crudo(
      '<svg class="icono ' + (clase || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (TRAZOS[nombre] || '') + '</svg>'
    );
  };
})();
