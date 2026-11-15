/* ==========================================================================
   DOCE · Prototipo para pruebas de usabilidad
   Prototipo no funcional: no hay base de datos ni servidor. Los datos son de
   ejemplo y el estado se guarda en el navegador (localStorage).
   ========================================================================== */

'use strict';

/* ---------- Fecha fija de la prueba ---------- */

// "Hoy" es el lunes 9 de noviembre de 2026, como en los wireframes, para que
// todas las sesiones de prueba vean lo mismo.
const HOY = new Date(2026, 10, 9);

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MESES_CORTOS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

/* ---------- Datos de ejemplo ---------- */

// Nombres, actividades y contactos son de ejemplo (los mismos de los wireframes).
function datosIniciales() {
  return {
    sesion: false,
    actividades: [
      {
        id: 'a-1112', nombre: 'Plática: dormir bien también es estudiar',
        descripcion: 'Por qué el sueño importa para la memoria y el rendimiento, y hábitos sencillos para dormir mejor durante el semestre.',
        organizador: 'Psicología FMAT', inicio: '2026-11-12T16:00', fin: '2026-11-12T17:30',
        modalidad: 'presencial', lugar: 'Aula Magna, edificio principal, planta baja', lugarCorto: 'Aula Magna', enlace: '',
        estado: 'publicada'
      },
      {
        id: 'a-1113', nombre: 'Cine-debate: hablemos de ansiedad',
        descripcion: 'Proyección de un cortometraje y conversación guiada sobre la ansiedad en la vida universitaria.',
        organizador: 'Departamento de Orientación y Consejo Educativo', inicio: '2026-11-13T17:00', fin: '2026-11-13T19:00',
        modalidad: 'presencial', lugar: 'Auditorio, edificio principal', lugarCorto: 'Auditorio', enlace: '',
        estado: 'cancelada'
      },
      {
        id: 'a-1117', nombre: 'Taller: manejo del estrés en exámenes',
        descripcion: 'Técnicas breves de respiración y organización para llegar con más calma a los exámenes.',
        organizador: 'Departamento de Orientación y Consejo Educativo', inicio: '2026-11-17T12:00', fin: '2026-11-17T14:00',
        modalidad: 'hibrida', lugar: 'Sala de usos múltiples, edificio B', lugarCorto: 'Sala de usos múltiples y en línea',
        enlace: 'teams.microsoft.com/l/meetup/doce-fmat', estado: 'publicada'
      },
      {
        id: 'a-1120', nombre: 'Grupo de apoyo: ansiedad y procrastinación',
        descripcion: 'Un espacio guiado por psicología para compartir estrategias contra la procrastinación y la ansiedad académica. No necesitas encender tu cámara.',
        organizador: 'Departamento de Orientación y Consejo Educativo', inicio: '2026-11-20T13:00', fin: '2026-11-20T14:00',
        modalidad: 'virtual', lugar: '', lugarCorto: 'En línea (Microsoft Teams)',
        enlace: 'teams.microsoft.com/l/meetup/doce-fmat', estado: 'publicada'
      },
      {
        id: 'a-1125', nombre: 'Pausa activa entre exámenes',
        descripcion: 'Quince minutos de estiramientos y respiración guiada para despejarte entre un examen y otro.',
        organizador: 'Departamento de Orientación y Consejo Educativo', inicio: '2026-11-25T11:00', fin: '2026-11-25T11:45',
        modalidad: 'presencial', lugar: 'Explanada central', lugarCorto: 'Explanada central', enlace: '',
        estado: 'publicada'
      },
      {
        id: 'a-1127', nombre: 'Charla: pedir ayuda no es debilidad',
        descripcion: 'Conversación abierta con Psicología FMAT sobre los mitos que nos impiden buscar apoyo y cómo dar el primer paso.',
        organizador: 'Psicología FMAT', inicio: '2026-11-27T10:00', fin: '2026-11-27T11:30',
        modalidad: 'presencial', lugar: 'Aula 5, edificio A', lugarCorto: 'Aula 5, edificio A', enlace: '',
        estado: 'publicada'
      },
      {
        id: 'a-1203', nombre: 'Taller: organiza tu semana de exámenes',
        descripcion: 'Arma un plan de estudio realista para la última semana del semestre.',
        organizador: 'Departamento de Orientación y Consejo Educativo', inicio: '2026-12-03T12:00', fin: '2026-12-03T13:30',
        modalidad: 'presencial', lugar: 'Sala de usos múltiples, edificio B', lugarCorto: 'Sala de usos múltiples', enlace: '',
        estado: 'borrador'
      }
    ],
    avisos: [
      {
        id: 'v-1116', titulo: 'Inscripciones abiertas al grupo de apoyo',
        contenido: 'Cupo de 12 personas. Inscríbete en el DOCE, planta alta, antes del 18 de noviembre.',
        fecha: '2026-11-16', publicado: '2026-11-06', estado: 'publicado'
      },
      {
        id: 'v-1123', titulo: 'Horario extendido del DOCE en exámenes',
        contenido: 'Del 23 de noviembre al 4 de diciembre el DOCE atenderá de 8:00 a 17:00.',
        fecha: '2026-11-23', publicado: '2026-11-03', estado: 'publicado'
      }
    ]
  };
}

const PERSONAS = [
  {
    id: 'laura-medina', nombre: 'Mtra. Laura Medina Ruiz', iniciales: 'LM', puesto: 'Coordinación del DOCE', area: 'coordinacion',
    descripcion: 'Coordina las actividades de bienestar de la facultad y canaliza solicitudes de orientación a la persona indicada.',
    ubicacion: 'Edificio principal, planta alta, cubículo 3', horario: 'Lunes a viernes, 8:00 a 15:00',
    correo: 'doce.fmat@correo.uady.mx', telefono: '999 942 3140, ext. 1101'
  },
  {
    id: 'carlos-rivas', nombre: 'Psic. Carlos Rivas Pech', iniciales: 'CR', puesto: 'Atención psicológica', area: 'psicologica',
    descripcion: 'Brinda atención psicológica individual y breve. Puedes acudir sin cita en su horario.',
    ubicacion: 'Edificio principal, planta alta, cubículo 5', horario: 'Lunes a jueves, 12:00 a 18:00',
    correo: 'carlos.rivas@correo.uady.mx', telefono: ''
  },
  {
    id: 'andrea-mena', nombre: 'Mtra. Andrea Mena Canul', iniciales: 'AM', puesto: 'Orientación vocacional', area: 'orientacion',
    descripcion: 'Acompaña dudas sobre tu carrera, cambios de programa y decisiones vocacionales.',
    ubicacion: 'Edificio B, planta baja, cubículo 12', horario: 'Martes y jueves, 9:00 a 13:00',
    correo: 'andrea.mena@correo.uady.mx', telefono: '999 942 3140, ext. 1105'
  },
  {
    id: 'daniela-pool', nombre: 'Psic. Daniela Pool Chan', iniciales: 'DP', puesto: 'Atención psicológica', area: 'psicologica',
    descripcion: 'Brinda atención psicológica individual y coordina los grupos de apoyo.',
    ubicacion: 'Edificio principal, planta alta, cubículo 6', horario: 'Lunes, miércoles y viernes, 9:00 a 14:00',
    correo: 'daniela.pool@correo.uady.mx', telefono: '999 942 3140, ext. 1106'
  },
  {
    id: 'jorge-uc', nombre: 'Mtro. Jorge Uc Tun', iniciales: 'JU', puesto: 'Orientación académica', area: 'orientacion',
    descripcion: 'Orienta sobre técnicas de estudio, carga académica y situaciones escolares que afectan tu avance.',
    ubicacion: 'Edificio A, planta baja, cubículo 2', horario: 'Lunes a viernes, 10:00 a 14:00',
    correo: 'jorge.uc@correo.uady.mx', telefono: '999 942 3140, ext. 1108'
  },
  {
    id: 'sofia-cauich', nombre: 'Lic. Sofía Cauich May', iniciales: 'SC', puesto: 'Trabajo social', area: 'trabajo-social',
    descripcion: 'Atiende situaciones socioeconómicas y gestiona apoyos y becas de la facultad.',
    ubicacion: 'Edificio principal, planta alta, cubículo 4', horario: 'Lunes a viernes, 8:00 a 13:00',
    correo: '', telefono: '999 942 3140, ext. 1103'
  }
];

const AREAS = [
  { id: 'todas', nombre: 'Todas las áreas' },
  { id: 'psicologica', nombre: 'Atención psicológica' },
  { id: 'orientacion', nombre: 'Orientación' },
  { id: 'trabajo-social', nombre: 'Trabajo social' }
];

const MODALIDADES = { presencial: 'Presencial', virtual: 'Virtual', hibrida: 'Híbrida' };

/* ---------- Estado ---------- */

const CLAVE_ESTADO = 'doce-prototipo:estado';
const CLAVE_RESULTADOS = 'doce-prototipo:resultados';

function leer(clave) {
  try { return JSON.parse(localStorage.getItem(clave)); } catch (e) { return null; }
}
function escribir(clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento: el prototipo sigue en memoria */ }
}

let estado = leer(CLAVE_ESTADO) || datosIniciales();
function guardar() { escribir(CLAVE_ESTADO, estado); }

// Estado de la interfaz: no se guarda.
const ui = {
  mes: { anio: HOY.getFullYear(), mes: HOY.getMonth() },
  vista: window.innerWidth < 960 ? 'lista' : 'mes',
  resaltar: null,
  area: 'todas',
  busqueda: '',
  aviso: null,          // mensaje que se muestra una vez en la siguiente pantalla
  pestana: 'actividades',
  filtroEstado: 'todas',
  busquedaAdmin: '',
  despuesDeEntrar: '/admin'
};

/* ---------- Utilidades ---------- */

function esc(texto) {
  return String(texto == null ? '' : texto)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function aFecha(iso) {
  if (!iso) return null;
  const [f, h] = iso.split('T');
  const [a, m, d] = f.split('-').map(Number);
  const [hh, mm] = (h || '00:00').split(':').map(Number);
  return new Date(a, m - 1, d, hh, mm);
}
function mayus(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
function hora(d) { return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); }
function fechaLarga(d) { return mayus(DIAS[d.getDay()]) + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear(); }
function fechaMedia(d) { return mayus(DIAS[d.getDay()]) + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()]; }
function fechaCorta(d) { return DIAS_CORTOS[d.getDay()] + ' ' + d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3); }
function mismoDia(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function claveDia(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }

function horario(a) {
  const ini = aFecha(a.inicio);
  const fin = aFecha(a.fin);
  if (!fin) return hora(ini);
  if (mismoDia(ini, fin)) return hora(ini) + ' a ' + hora(fin);
  return hora(ini) + ' al ' + fechaMedia(fin).toLowerCase() + ', ' + hora(fin);
}
function lugarCorto(a) { return a.lugarCorto || a.lugar || (a.modalidad === 'virtual' ? 'En línea' : ''); }

function publicadasYCanceladas() {
  return estado.actividades.filter(a => a.estado === 'publicada' || a.estado === 'cancelada')
    .sort((x, y) => aFecha(x.inicio) - aFecha(y.inicio));
}
function proximas() {
  return publicadasYCanceladas().filter(a => a.estado === 'publicada' && aFecha(a.inicio) >= HOY);
}
function buscarActividad(id) { return estado.actividades.find(a => a.id === id); }

/* ---------- Íconos (trazos de línea, 24 × 24) ---------- */

const ICONOS = {
  calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  personas: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  lugar: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  edificio: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  telefono: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  correo: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  candado: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  derecha: '<path d="m9 18 6-6-6-6"/>',
  izquierda: '<path d="m15 18-6-6 6-6"/>',
  cerrar: '<path d="M18 6 6 18M6 6l12 12"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  salvavidas: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24"/>',
  megafono: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  documento: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  birrete: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  casa: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  subir: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  alerta: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  pendiente: '<circle cx="12" cy="12" r="10"/>',
  ojo: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  lapiz: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  buscar: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  enlace: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  cuadricula: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  externo: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  prohibido: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  herramienta: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
};

function ico(nombre, clase) {
  return '<svg class="ico' + (clase ? ' ' + clase : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONOS[nombre] + '</svg>';
}

/* ---------- Piezas comunes ---------- */

function sello(a, extra) {
  const d = aFecha(a.inicio);
  const clase = a.estado === 'cancelada' ? ' sello-cancelada' : '';
  return '<span class="sello' + clase + (extra || '') + '" aria-hidden="true"><span class="sello-mes">' + MESES_CORTOS[d.getMonth()] +
    '</span><span class="sello-dia">' + d.getDate() + '</span></span>';
}

function insigniaModalidad(m) { return '<span class="insignia insignia-' + m + '">' + MODALIDADES[m] + '</span>'; }
function insigniaEstado(e) {
  const t = { publicada: 'Publicada', borrador: 'Borrador', cancelada: 'Cancelada' }[e];
  return '<span class="insignia insignia-' + e + '">' + t + '</span>';
}

function franjaAyuda() {
  return '<aside class="franja" aria-label="Línea de ayuda">' +
    '<span class="franja-ico">' + ico('salvavidas') + '</span>' +
    '<div class="franja-texto"><p class="franja-titulo">¿Necesitas hablar con alguien ahora?</p>' +
    '<p class="franja-sub">Línea de la Vida · 24 horas, gratuita y confidencial</p></div>' +
    '<div class="franja-acciones"><a class="btn btn-primario" href="#/fuera">' + ico('telefono') + 'Llamar al 800 911 2000</a>' +
    '<a href="#/fuera">Ver todas las líneas</a></div></aside>';
}

function alertaHtml(a) {
  const iconos = { exito: 'ok', error: 'alerta', aviso: 'info', info: 'info' };
  return '<div class="alerta alerta-' + a.tipo + '"' + (a.rol ? ' role="' + a.rol + '"' : '') + (a.id ? ' id="' + a.id + '" tabindex="-1"' : '') + '>' +
    ico(iconos[a.tipo]) + '<div><p class="alerta-titulo">' + a.titulo + '</p>' + (a.texto ? '<p>' + a.texto + '</p>' : '') + (a.extra || '') + '</div></div>';
}

// El aviso recibe el foco al llegar a la pantalla, para que se anuncie.
function tomarAviso() { const a = ui.aviso; ui.aviso = null; return a ? alertaHtml(Object.assign({ id: 'aviso-pantalla' }, a)) : ''; }

/* ---------- Diseño público ---------- */

const MENU = [
  { ruta: '/inicio', texto: 'Inicio', icono: 'casa' },
  { ruta: '/calendario', texto: 'Calendario', icono: 'calendario' },
  { ruta: '/directorio', texto: 'Directorio', icono: 'personas' },
  { ruta: '/fuera', texto: 'Líneas de ayuda', icono: 'salvavidas' },
  { ruta: '/fuera', texto: 'Material', icono: 'documento' },
  { ruta: '/fuera', texto: 'Fotogalería', icono: 'imagen' },
  { ruta: '/fuera', texto: 'Tutorías y guías', icono: 'birrete' }
];

function marca(sub) {
  return '<a class="marca" href="#/inicio"><img src="img/logo-doce-color.svg" alt="" width="44" height="55">' +
    '<span><span class="marca-nombre">DOCE</span><span class="marca-sub">' + sub + '</span></span>' +
    '<span class="solo-lector">, ir al inicio</span></a>';
}

function disenoPublico(activa, contenido) {
  const items = MENU.map(m => '<li><a href="#' + m.ruta + '"' + (m.ruta === activa && m.ruta !== '/fuera' ? ' aria-current="page"' : '') + '>' + m.texto + '</a></li>').join('');
  return '<header class="cab"><div class="contenedor cab-in">' +
    marca('Departamento de Orientación<br>y Consejo Educativo · FMAT') +
    '<nav aria-label="Principal"><ul class="menu">' + items + '</ul></nav>' +
    '<a class="acceso" href="#/acceso">' + ico('candado') + 'Acceso DOCE</a>' +
    '<button class="btn-menu" type="button" data-accion="abrir-menu" aria-haspopup="dialog" aria-label="Abrir menú">' + ico('menu') + '</button>' +
    '</div></header>' +
    '<main id="contenido" tabindex="-1">' + contenido + '</main>' +
    '<footer class="pie"><div class="contenedor pie-in"><p>Departamento de Orientación y Consejo Educativo · Facultad de Matemáticas, UADY</p>' +
    '<p>Edificio principal, planta alta · Lunes a viernes, 8:00 a 15:00</p></div></footer>';
}

function abrirMenuMovil() {
  const activa = actual.base;
  const items = MENU.map(m => '<li><a href="#' + m.ruta + '"' + (m.ruta === activa && m.ruta !== '/fuera' ? ' aria-current="page"' : '') + '>' +
    ico(m.icono) + m.texto + '</a></li>').join('');
  abrirDialogo({
    clave: 'menu', clase: 'dlg-completo', etiqueta: 'Menú',
    html: '<div class="menu-movil-cab">' + marca('') +
      '<button class="btn-icono" type="button" data-accion="cerrar-dialogo" aria-label="Cerrar menú" data-foco>' + ico('cerrar') + '</button></div>' +
      '<nav aria-label="Principal"><ul class="menu-movil-lista">' + items + '</ul></nav>' +
      '<div class="menu-movil-extra">' + franjaAyuda() +
      '<a class="acceso" href="#/acceso">' + ico('candado') + 'Acceso DOCE</a></div>'
  });
}

/* ---------- Pantallas públicas ---------- */

function filaActividad(a, base) {
  const d = aFecha(a.inicio);
  return '<li><a class="fila-act" href="#' + base + '/a/' + a.id + '">' + sello(a) +
    '<span><span class="fila-titulo">' + esc(a.nombre) + '</span>' +
    '<span class="fila-meta"><span>' + ico('reloj') + fechaCorta(d) + ' · ' + horario(a) + '</span>' +
    '<span>' + ico('lugar') + esc(lugarCorto(a)) + '</span></span></span>' +
    insigniaModalidad(a.modalidad) + ico('derecha') + '</a></li>';
}

function pInicio() {
  const lista = proximas();
  const prox = lista[0];
  const tarjetaProxima = prox
    ? '<section class="tarjeta proxima" aria-labelledby="prox-titulo">' +
      '<div class="proxima-cab"><span>Próxima actividad</span>' + insigniaModalidad(prox.modalidad) + '</div>' +
      '<div class="proxima-cuerpo">' + sello(prox) + '<div><h2 id="prox-titulo">' + esc(prox.nombre) + '</h2>' +
      '<ul class="meta"><li>' + ico('reloj') + fechaMedia(aFecha(prox.inicio)) + ' · ' + horario(prox) + '</li>' +
      '<li>' + ico('lugar') + esc(prox.lugar || lugarCorto(prox)) + '</li>' +
      '<li>' + ico('edificio') + esc(prox.organizador) + '</li></ul></div></div>' +
      '<div class="proxima-acciones"><a class="btn btn-primario" href="#/inicio/a/' + prox.id + '">Ver detalle<span class="solo-lector"> de ' + esc(prox.nombre) + '</span></a>' +
      '<a class="enlace-flecha" href="#/calendario">' + ico('derecha') + 'Más actividades</a></div></section>'
    : '<section class="tarjeta vacio"><strong>No hay actividades próximas</strong><p>Consulta el calendario más adelante.</p></section>';

  const avisos = estado.avisos.filter(v => v.estado === 'publicado').map(v =>
    '<article class="tarjeta aviso"><h3>' + ico('megafono') + esc(v.titulo) + '</h3><p>' + esc(v.contenido) + '</p>' +
    '<p class="publicado">Publicado el ' + aFecha(v.publicado).getDate() + ' de ' + MESES[aFecha(v.publicado).getMonth()] + '</p></article>').join('');

  const apoyo = [
    ['#/directorio', 'personas', 'Directorio de orientación', 'Quién atiende, dónde y en qué horario'],
    ['#/fuera', 'salvavidas', 'Líneas de ayuda', 'Universitarias, locales, estatales y nacionales'],
    ['#/fuera', 'documento', 'Material informativo', 'Folletos, videos y documentos sobre salud mental'],
    ['#/fuera', 'birrete', 'Tutorías y guías de carrera', 'Contactos de tutoría y guías para descargar']
  ].map(x => '<li><a href="' + x[0] + '"><span class="apoyo-ico">' + ico(x[1]) + '</span><span><strong>' + x[2] + '</strong><span class="sub">' + x[3] + '</span></span>' + ico('derecha') + '</a></li>').join('');

  return {
    titulo: 'Inicio',
    html: disenoPublico('/inicio',
      '<section class="hero"><div class="contenedor hero-in"><div>' +
      '<p class="hero-fecha">' + fechaMedia(HOY) + '</p>' +
      '<h1>Tu bienestar también importa.</h1>' +
      '<p class="hero-texto">Talleres, pláticas y apoyos de salud mental de la Facultad de Matemáticas, en un solo lugar y sin depender del correo.</p>' +
      '<div class="hero-acciones"><a class="btn btn-primario" href="#/calendario">' + ico('calendario') + 'Ver calendario</a>' +
      '<a class="btn btn-secundario" href="#/directorio">' + ico('personas') + 'Buscar a quién acudir</a></div></div>' +
      tarjetaProxima + '</div></section>' +
      '<div class="zona-gris"><div class="contenedor">' + franjaAyuda() +
      '<section class="seccion" aria-labelledby="sec-proximas"><div class="seccion-cab"><div><h2 id="sec-proximas">Próximas actividades</h2>' +
      '<p>Lo que viene en las siguientes semanas.</p></div><a class="enlace-flecha" href="#/calendario">' + ico('derecha') + 'Ir al calendario</a></div>' +
      '<div class="tarjeta" style="padding:0"><ul class="lista-act">' + lista.slice(0, 4).map(a => filaActividad(a, '/inicio')).join('') + '</ul></div></section>' +
      '<div class="seccion dos-col"><section aria-labelledby="sec-avisos"><h2 class="h-serif" id="sec-avisos">Avisos</h2><div class="avisos">' + avisos + '</div></section>' +
      '<section aria-labelledby="sec-apoyo"><h2 class="h-serif" id="sec-apoyo">Encuentra apoyo</h2><nav class="tarjeta apoyo" aria-labelledby="sec-apoyo"><ul>' + apoyo + '</ul></nav></section></div>' +
      '</div></div>')
  };
}

function eventosDelDia(d) {
  const k = claveDia(d);
  const acts = publicadasYCanceladas().filter(a => claveDia(aFecha(a.inicio)) === k);
  const avs = estado.avisos.filter(v => v.estado === 'publicado' && v.fecha === k);
  return { acts, avs };
}

function htmlCalendario() {
  const { anio, mes } = ui.mes;
  const titulo = mayus(MESES[mes]) + ' ' + anio;
  const barra = '<div class="cal-barra"><div class="cal-nav">' +
    '<button class="btn-icono" type="button" data-accion="mes-anterior" aria-label="Mes anterior">' + ico('izquierda') + '</button>' +
    '<button class="btn-icono" type="button" data-accion="mes-siguiente" aria-label="Mes siguiente">' + ico('derecha') + '</button>' +
    '<h2 id="cal-titulo" aria-live="polite">' + titulo + '</h2>' +
    '<button class="btn btn-secundario" type="button" data-accion="mes-hoy">Hoy</button></div>' +
    '<div class="segmentado" role="group" aria-label="Vista del calendario">' +
    '<button type="button" data-accion="vista-mes" aria-pressed="' + (ui.vista === 'mes') + '">' + ico('cuadricula') + 'Mes</button>' +
    '<button type="button" data-accion="vista-lista" aria-pressed="' + (ui.vista === 'lista') + '">' + ico('lista') + 'Lista</button></div></div>';

  const primero = new Date(anio, mes, 1);
  const ultimo = new Date(anio, mes + 1, 0);
  let cuerpo;

  if (ui.vista === 'mes') {
    const inicio = new Date(primero);
    inicio.setDate(1 - ((primero.getDay() + 6) % 7));        // lunes de la primera semana
    const filas = [];
    const d = new Date(inicio);
    while (d <= ultimo || d.getDay() !== 1) {
      const celdas = [];
      for (let i = 0; i < 7; i++) {
        const fuera = d.getMonth() !== mes;
        const { acts, avs } = fuera ? { acts: [], avs: [] } : eventosDelDia(d);
        const esHoy = mismoDia(d, HOY);
        const evs = avs.map(v => '<li><span class="ev ev-aviso"><span class="ev-hora">Aviso</span><span class="ev-titulo">' + esc(v.titulo) + '</span></span></li>').join('') +
          acts.map(a => '<li><a class="ev' + (a.estado === 'cancelada' ? ' ev-cancelada' : '') + (ui.resaltar === a.id ? ' ev-nueva' : '') + '" href="#/calendario/a/' + a.id + '">' +
            '<span class="ev-hora">' + hora(aFecha(a.inicio)) + (a.estado === 'cancelada' ? ' · Cancelada' : '') + '</span>' +
            '<span class="ev-titulo">' + esc(a.nombre) + '</span></a></li>').join('');
        celdas.push('<td class="' + (fuera ? 'fuera' : '') + '"' + (esHoy ? ' aria-current="date"' : '') + '>' +
          '<span class="dia-num">' + (esHoy ? '<span class="hoy">' + d.getDate() + '</span><span class="hoy-texto">Hoy</span>' : d.getDate()) +
          '<span class="solo-lector"> de ' + MESES[d.getMonth()] + '</span></span>' +
          (evs ? '<ul class="eventos">' + evs + '</ul>' : '') + '</td>');
        d.setDate(d.getDate() + 1);
      }
      filas.push('<tr>' + celdas.join('') + '</tr>');
    }
    const cab = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((t, i) =>
      '<th scope="col"><abbr title="' + ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'][i] + '" style="text-decoration:none">' + t + '</abbr></th>').join('');
    const hay = publicadasYCanceladas().some(a => aFecha(a.inicio).getMonth() === mes && aFecha(a.inicio).getFullYear() === anio);
    cuerpo = '<table class="mes" aria-labelledby="cal-titulo"><thead><tr>' + cab + '</tr></thead><tbody>' + filas.join('') + '</tbody></table>' +
      (hay ? '' : '<p class="vacio"><strong>No hay actividades este mes</strong><span>Cuando el DOCE publique una actividad, aparecerá aquí.</span></p>');
  } else {
    // Lista: desde hoy si es el mes actual; todo el mes si es otro.
    const desde = (anio === HOY.getFullYear() && mes === HOY.getMonth()) ? HOY : primero;
    const dias = [];
    for (let d = new Date(desde); d <= ultimo; d.setDate(d.getDate() + 1)) {
      const { acts, avs } = eventosDelDia(d);
      if (!acts.length && !avs.length) continue;
      const items = avs.map(v =>
        '<div class="tarjeta-act"><span class="sello sello-aviso" aria-hidden="true">' + ico('megafono') + '</span><span>' +
        '<span class="fila-titulo">Aviso: ' + esc(v.titulo) + '</span><span class="fila-meta"><span>' + esc(v.contenido) + '</span></span>' +
        '<span class="insignia insignia-aviso">Aviso</span></span></div>').join('') +
        acts.map(a =>
          '<a class="tarjeta-act' + (ui.resaltar === a.id ? ' ev-nueva' : '') + '" href="#/calendario/a/' + a.id + '">' + sello(a) + '<span>' +
          '<span class="fila-titulo' + (a.estado === 'cancelada' ? ' tachado' : '') + '">' + esc(a.nombre) + '</span>' +
          '<span class="fila-meta"><span>' + ico('reloj') + horario(a) + '</span><span>' + ico('lugar') + esc(lugarCorto(a)) + '</span></span>' +
          (a.estado === 'cancelada' ? '<span class="insignia insignia-cancelada">Cancelada</span>' : insigniaModalidad(a.modalidad)) +
          (ui.resaltar === a.id ? ' <span class="insignia insignia-nueva">Nueva</span>' : '') +
          '</span></a>').join('');
      dias.push('<h3 class="cal-dia-titulo">' + mayus(DIAS[d.getDay()]) + ' ' + d.getDate() + '</h3>' + items);
    }
    cuerpo = dias.length
      ? '<div class="cal-lista">' + dias.join('') + '</div>'
      : '<div class="vacio"><span class="vacio-ico">' + ico('calendario') + '</span><strong>No hay actividades este mes</strong><span>Cuando el DOCE publique una actividad, aparecerá aquí.</span></div>';
  }
  return barra + cuerpo;
}

function pCalendario() {
  return {
    titulo: 'Calendario',
    html: disenoPublico('/calendario',
      '<div class="contenedor pagina"><div class="pagina-cab"><div><h1>Calendario de actividades</h1>' +
      '<p>Actividades y avisos publicados del DOCE a partir de hoy.</p></div>' +
      '<ul class="leyenda" aria-label="Leyenda"><li><i></i>Actividad</li><li><i class="l-aviso"></i>Aviso</li><li><i class="l-cancelada"></i>Cancelada</li></ul></div>' +
      '<section class="tarjeta" id="calendario" aria-label="Calendario">' + htmlCalendario() + '</section>' +
      '<div class="seccion">' + franjaAyuda() + '</div></div>')
  };
}

function repintarCalendario(enfocar) {
  const caja = document.getElementById('calendario');
  if (!caja) return;
  caja.innerHTML = htmlCalendario();
  if (enfocar) { const b = caja.querySelector('[data-accion="' + enfocar + '"]'); if (b) b.focus(); }
}

function htmlDetalle(a) {
  const ini = aFecha(a.inicio);
  const fin = aFecha(a.fin);
  const cuando = fechaLarga(ini) + ' · ' + (fin && !mismoDia(ini, fin) ? hora(ini) + ' a ' + fechaLarga(fin) + ' · ' + hora(fin) : horario(a));
  const datos = [['calendario', 'Inicio y fin', cuando], ['personas', 'Modalidad', MODALIDADES[a.modalidad]]];
  if (a.modalidad !== 'virtual') datos.push(['lugar', 'Lugar', esc(a.lugar)]);
  if (a.modalidad !== 'presencial') datos.push(['enlace', 'Enlace de acceso', '<a href="#/fuera">' + esc(a.enlace) + '</a>']);
  datos.push(['edificio', 'Organiza', esc(a.organizador)]);
  return '<div class="dlg-cuerpo"><div class="dlg-cab"><span>Detalle de la actividad</span>' +
    '<button class="btn-icono" type="button" data-accion="cerrar-dialogo" aria-label="Cerrar detalle">' + ico('cerrar') + '</button></div>' +
    '<div style="margin-top:16px">' + (a.estado === 'cancelada' ? '<span class="insignia insignia-cancelada">Cancelada</span> ' : '') + insigniaModalidad(a.modalidad) + '</div>' +
    '<div class="dlg-titulo-fila">' + sello(a) + '<h2 class="titulo-serif" id="dlg-titulo">' + esc(a.nombre) + '</h2></div>' +
    (a.estado === 'cancelada' ? '<div style="margin-top:20px">' + alertaHtml({ tipo: 'aviso', titulo: 'Esta actividad se canceló', texto: 'Sigue en el calendario para que sepas que no se realizará.' }) + '</div>' : '') +
    '<p class="dlg-desc">' + esc(a.descripcion) + '</p>' +
    '<ul class="datos">' + datos.map(x => '<li><span class="datos-ico">' + ico(x[0]) + '</span><span><span class="datos-etq">' + x[1] + '</span><br><span class="datos-val">' + x[2] + '</span></span></li>').join('') + '</ul></div>' +
    '<div class="dlg-pie">' + (a.modalidad !== 'presencial' && a.estado !== 'cancelada' ? '<a class="btn btn-primario" href="#/fuera">' + ico('externo') + 'Abrir enlace de la sesión</a>' : '') +
    '<button class="btn ' + (a.modalidad !== 'presencial' && a.estado !== 'cancelada' ? 'btn-secundario' : 'btn-primario') + '" type="button" data-accion="cerrar-dialogo" data-foco>Cerrar</button></div>';
}

function htmlNoDisponible(etiqueta) {
  return '<div class="dlg-cuerpo"><div class="dlg-cab"><span>' + etiqueta + '</span>' +
    '<button class="btn-icono" type="button" data-accion="cerrar-dialogo" aria-label="Cerrar">' + ico('cerrar') + '</button></div>' +
    '<div class="vacio"><span class="vacio-ico">' + ico('info') + '</span><strong id="dlg-titulo">Esto ya no está disponible</strong>' +
    '<span>Puede que se haya retirado. Vuelve al listado para ver lo vigente.</span></div></div>' +
    '<div class="dlg-pie"><button class="btn btn-primario" type="button" data-accion="cerrar-dialogo" data-foco>Cerrar</button></div>';
}

/* Directorio */

function personasFiltradas() {
  const q = ui.busqueda.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return PERSONAS.filter(p => {
    if (ui.area !== 'todas' && p.area !== ui.area) return false;
    if (!q) return true;
    const texto = (p.nombre + ' ' + p.puesto).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return texto.includes(q);
  });
}

function htmlPersonas() {
  const lista = personasFiltradas();
  if (!lista.length) {
    return '<div class="tarjeta vacio"><span class="vacio-ico">' + ico('personas') + '</span><strong>No encontramos a nadie con esa búsqueda</strong>' +
      '<span>Prueba con otro nombre o elige "Todas las áreas".</span></div>';
  }
  return '<ul class="rejilla-personas">' + lista.map(p =>
    '<li><article class="tarjeta persona"><div class="persona-cab"><span class="avatar" aria-hidden="true">' + p.iniciales + '</span>' +
    '<div><h2>' + esc(p.nombre) + '</h2><p class="area">' + esc(p.puesto) + '</p></div></div>' +
    '<ul class="meta"><li>' + ico('lugar') + '<span><span class="solo-lector">Ubicación: </span>' + esc(p.ubicacion) + '</span></li>' +
    '<li>' + ico('reloj') + '<span><span class="solo-lector">Horario: </span>' + esc(p.horario) + '</span></li>' +
    (p.correo ? '<li>' + ico('correo') + '<span><span class="solo-lector">Correo: </span>' + esc(p.correo) + '</span></li>' : '') +
    (p.telefono ? '<li>' + ico('telefono') + '<span><span class="solo-lector">Teléfono: </span>' + esc(p.telefono) + '</span></li>' : '') + '</ul>' +
    '<a class="enlace-flecha" href="#/directorio/p/' + p.id + '">' + ico('derecha') + 'Ver ficha completa<span class="solo-lector"> de ' + esc(p.nombre) + '</span></a>' +
    '</article></li>').join('') + '</ul>';
}

function pDirectorio() {
  const chips = AREAS.map(a => '<button class="chip" type="button" data-accion="area" data-area="' + a.id + '" aria-pressed="' + (ui.area === a.id) + '">' + a.nombre + '</button>').join('');
  return {
    titulo: 'Directorio',
    html: disenoPublico('/directorio',
      '<div class="contenedor pagina"><div class="pagina-cab"><div><h1>¿A quién puedo acudir?</h1>' +
      '<p>Personas del Departamento de Orientación y Consejo Educativo, dónde encontrarlas y en qué horario atienden. No necesitas iniciar sesión.</p></div></div>' +
      '<div class="filtros"><div class="buscador">' + ico('buscar') +
      '<label class="solo-lector" for="buscar-persona">Buscar por nombre o área</label>' +
      '<input class="entrada" id="buscar-persona" type="search" placeholder="Buscar por nombre o área" value="' + esc(ui.busqueda) + '" autocomplete="off"></div>' +
      '<div class="chips" role="group" aria-label="Filtrar por área">' + chips + '</div></div>' +
      '<p class="solo-lector" aria-live="polite" id="conteo-personas"></p>' +
      '<div id="personas">' + htmlPersonas() + '</div>' +
      '<div class="seccion">' + franjaAyuda() + '</div></div>'),
    montar() {
      document.getElementById('buscar-persona').addEventListener('input', e => { ui.busqueda = e.target.value; repintarPersonas(); });
    }
  };
}

function repintarPersonas() {
  document.getElementById('personas').innerHTML = htmlPersonas();
  const n = personasFiltradas().length;
  document.getElementById('conteo-personas').textContent = n === 1 ? '1 persona' : n + ' personas';
}

function htmlFicha(p) {
  const datos = [['lugar', 'Ubicación', p.ubicacion], ['reloj', 'Horario de atención', p.horario]];
  if (p.correo) datos.push(['correo', 'Correo institucional', p.correo]);
  if (p.telefono) datos.push(['telefono', 'Teléfono', p.telefono]);
  return '<div class="dlg-cuerpo"><div class="dlg-cab"><span>Ficha de contacto</span>' +
    '<button class="btn-icono" type="button" data-accion="cerrar-dialogo" aria-label="Cerrar ficha">' + ico('cerrar') + '</button></div>' +
    '<div class="dlg-titulo-fila" style="align-items:center"><span class="avatar avatar-g" aria-hidden="true">' + p.iniciales + '</span>' +
    '<div><h2 class="titulo-serif" id="dlg-titulo">' + esc(p.nombre) + '</h2><p style="color:var(--azul-70)">' + esc(p.puesto) + '</p></div></div>' +
    '<p class="dlg-desc">' + esc(p.descripcion) + '</p>' +
    '<ul class="datos">' + datos.map(x => '<li><span class="datos-ico">' + ico(x[0]) + '</span><span><span class="datos-etq">' + x[1] + '</span><br><span class="datos-val">' + esc(x[2]) + '</span></span></li>').join('') + '</ul>' +
    '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:20px">' +
    (p.correo ? '<a class="btn btn-primario" href="#/fuera">' + ico('correo') + 'Escribir correo</a>' : '') +
    (p.telefono ? '<a class="btn btn-secundario" href="#/fuera">' + ico('telefono') + 'Llamar</a>' : '') +
    '<button class="btn btn-fantasma" type="button" data-accion="cerrar-dialogo" data-foco>Cerrar</button></div></div>';
}

/* Fuera de la prueba */

function htmlFuera(volver, titulo, texto) {
  return '<div class="contenedor"><section class="tarjeta fuera-caja"><span class="vacio-ico">' + ico('herramienta') + '</span>' +
    '<h1>' + (titulo || 'Sección fuera de esta prueba') + '</h1>' +
    '<p>' + (texto || 'Esta parte del sitio no se incluye en la prueba de usabilidad. Vuelve atrás para seguir con tu tarea.') + '</p>' +
    '<a class="btn btn-primario" href="' + volver + '">' + ico('izquierda') + 'Volver</a></section></div>';
}

function pFuera() {
  return { titulo: 'Fuera de esta prueba', html: disenoPublico(null, htmlFuera('#/inicio')), volverAtras: true };
}

/* ---------- Acceso (A01) ---------- */

function pAcceso() {
  return {
    titulo: 'Acceso para el personal del DOCE',
    html: '<main id="contenido" tabindex="-1" class="acceso-pagina"><section class="tarjeta acceso-caja">' +
      '<div class="marca" style="pointer-events:none"><img src="img/logo-doce-color.svg" alt="" width="40" height="50"><span><span class="marca-nombre">DOCE</span><span class="marca-sub">Panel de administración</span></span></div>' +
      '<h1>Acceso para el personal del DOCE</h1><p class="intro">Ingresa tus credenciales para gestionar el contenido.</p>' +
      '<div id="error-acceso"></div>' +
      '<form id="form-acceso" novalidate>' +
      '<div class="campo"><label for="usuario">Usuario o correo institucional</label>' +
      '<input class="entrada" id="usuario" name="usuario" type="text" autocomplete="username" placeholder="Escribe tu usuario"></div>' +
      '<div class="campo"><label for="contrasena">Contraseña</label>' +
      '<input class="entrada" id="contrasena" name="contrasena" type="password" autocomplete="current-password" placeholder="Escribe tu contraseña"></div>' +
      '<button class="btn btn-primario btn-ancho" type="submit">' + ico('candado') + 'Iniciar sesión</button>' +
      '<a class="btn btn-fantasma btn-ancho" href="#/inicio">Cancelar</a></form>' +
      '<p class="acceso-nota">' + ico('info') + '<span>Solo personal autorizado. Tu sesión se cierra tras 30 minutos sin actividad.</span></p>' +
      '</section></main>',
    montar() {
      document.getElementById('form-acceso').addEventListener('submit', e => {
        e.preventDefault();
        const u = document.getElementById('usuario');
        const c = document.getElementById('contrasena');
        // Prototipo: cualquier usuario y contraseña no vacíos entran. No hay credenciales reales.
        if (!u.value.trim() || !c.value) {
          const caja = document.getElementById('error-acceso');
          caja.innerHTML = alertaHtml({ tipo: 'error', rol: 'alert', id: 'alerta-acceso', titulo: 'No se pudo iniciar sesión', texto: 'El usuario o la contraseña no son correctos. Revísalos e inténtalo de nuevo.' });
          [u, c].forEach(x => x.setAttribute('aria-invalid', 'true'));
          u.setAttribute('aria-describedby', 'alerta-acceso');
          (u.value.trim() ? c : u).focus();
          return;
        }
        estado.sesion = true;
        guardar();
        const destino = ui.despuesDeEntrar || '/admin';
        ui.despuesDeEntrar = '/admin';
        navegar(destino);
      });
    }
  };
}

/* ---------- Diseño de administración ---------- */

const MENU_ADMIN = [
  { ruta: '/admin', texto: 'Inicio', icono: 'casa' },
  { ruta: '/admin/actividades', texto: 'Actividades y avisos', icono: 'calendario' },
  { ruta: '/admin/fuera', texto: 'Líneas de ayuda', icono: 'salvavidas' },
  { ruta: '/admin/fuera', texto: 'Material informativo', icono: 'documento' },
  { ruta: '/admin/fuera', texto: 'Fotogalería', icono: 'imagen' }
];

function disenoAdmin(activa, contenido) {
  const items = MENU_ADMIN.map(m => '<li><a href="#' + m.ruta + '"' + (m.ruta === activa ? ' aria-current="page"' : '') + '>' + ico(m.icono) + m.texto + '</a></li>').join('');
  return '<div class="adm"><aside class="lateral" id="lateral"><div class="lateral-cab">' +
    '<a class="marca" href="#/admin"><img src="img/logo-doce-color.svg" alt="" width="40" height="50"><span><span class="marca-nombre">DOCE</span><span class="marca-sub">Panel de administración</span></span><span class="solo-lector">, inicio del panel</span></a>' +
    '<button class="btn-menu" type="button" data-accion="menu-admin" aria-expanded="false" aria-controls="nav-admin" aria-label="Menú del panel">' + ico('menu') + '</button></div>' +
    '<nav class="lateral-nav" id="nav-admin" aria-label="Panel de administración"><ul>' + items + '</ul>' +
    '<div class="usuario"><span class="avatar" aria-hidden="true">LM</span><span class="usuario-texto"><strong>Laura M.</strong><span>Coordinación DOCE</span></span>' +
    '<button class="btn-icono" type="button" data-accion="salir" aria-label="Cerrar sesión" style="background:transparent;border:0">' + ico('salir') + '</button></div></nav></aside>' +
    '<main class="adm-main" id="contenido" tabindex="-1">' + contenido + '</main></div>';
}

function migas(lista) {
  return '<nav class="migas" aria-label="Ruta"><ol>' + lista.map((m, i) =>
    '<li>' + (i < lista.length - 1 ? '<a href="#' + m[1] + '">' + m[0] + '</a>' : '<span aria-current="page">' + m[0] + '</span>') + '</li>').join('') + '</ol></nav>';
}

function pAdmin() {
  const borradores = estado.actividades.filter(a => a.estado === 'borrador').sort((x, y) => aFecha(x.inicio) - aFecha(y.inicio));
  const pend = borradores.length
    ? '<ul class="pendientes">' + borradores.map(a => '<li class="pendiente">' + sello(a) + '<div class="pendiente-texto"><strong>' + esc(a.nombre) + '</strong>' +
      '<div class="insignias">' + insigniaEstado('borrador') + '<span class="insignia insignia-neutra">Actividad</span>' + insigniaModalidad(a.modalidad) + '</div></div>' +
      '<a class="btn btn-secundario" href="#/admin/revisar/' + a.id + '">Revisar y publicar<span class="solo-lector"> ' + esc(a.nombre) + '</span></a></li>').join('') + '</ul>'
    : '<p class="vacio"><strong>No hay borradores pendientes</strong></p>';
  const visibles = proximas().length;
  return {
    titulo: 'Panel de administración',
    html: disenoAdmin('/admin',
      tomarAviso() +
      '<div class="adm-cab"><div><h1>Buenos días, Laura</h1><p>Esto es lo que necesita tu atención hoy, ' + fechaMedia(HOY).toLowerCase() + '.</p></div>' +
      '<div class="adm-acciones"><a class="btn btn-secundario" href="#/admin/fuera">' + ico('megafono') + 'Crear aviso</a>' +
      '<a class="btn btn-primario" href="#/admin/crear">' + ico('mas') + 'Crear actividad</a></div></div>' +
      '<div class="adm-rejilla"><section class="tarjeta" aria-labelledby="t-pend"><div class="tarjeta-cab"><div><h2 id="t-pend">Pendientes de publicar</h2>' +
      '<p>Borradores que aún no ve la comunidad.</p></div><span class="insignia insignia-borrador">' + borradores.length + (borradores.length === 1 ? ' borrador' : ' borradores') + '</span></div>' + pend + '</section>' +
      '<div class="adm-columna"><section class="tarjeta" aria-labelledby="t-rap"><h2 class="h-sans" id="t-rap">Accesos rápidos</h2><ul class="rapidos">' +
      '<li><a href="#/admin/fuera">' + ico('salvavidas') + '<span>Registrar línea de ayuda</span>' + ico('derecha') + '</a></li>' +
      '<li><a href="#/admin/fuera">' + ico('documento') + '<span>Agregar material informativo</span>' + ico('derecha') + '</a></li>' +
      '<li><a href="#/admin/fuera">' + ico('subir') + '<span>Subir fotografías</span>' + ico('derecha') + '</a></li></ul></section>' +
      '<section class="tarjeta" aria-labelledby="t-pub"><h2 class="h-sans" id="t-pub">Publicado ahora</h2><ul class="cifras">' +
      '<li><strong>' + visibles + '</strong>actividades próximas en el calendario</li>' +
      '<li><strong>' + estado.avisos.filter(v => v.estado === 'publicado').length + '</strong>avisos visibles</li>' +
      '<li><strong>14</strong>materiales informativos</li><li><strong>38</strong>fotos en la galería</li></ul></section></div></div>' +
      '<section class="tarjeta seccion" aria-labelledby="t-camb"><div class="tarjeta-cab"><h2 id="t-camb">Cambios recientes</h2></div><ul class="cambios">' +
      '<li>' + ico('ok') + '<span>Publicaste «Taller: manejo del estrés en exámenes»</span><time>Hoy, 9:12</time></li>' +
      '<li>' + ico('lapiz') + '<span>Editaste la fecha de «Pausa activa entre exámenes»</span><time>Viernes 6, 17:40</time></li>' +
      '<li>' + ico('prohibido') + '<span>Cancelaste «Cine-debate: hablemos de ansiedad»</span><time>Viernes 6, 12:05</time></li></ul></section>')
  };
}

/* Actividades y avisos (A03) */

function htmlTablaActividades() {
  const q = ui.busquedaAdmin.trim().toLowerCase();
  const lista = estado.actividades
    .filter(a => ui.filtroEstado === 'todas' || a.estado === ui.filtroEstado)
    .filter(a => !q || a.nombre.toLowerCase().includes(q))
    .sort((x, y) => aFecha(x.inicio) - aFecha(y.inicio));
  if (!lista.length) return '<p class="vacio"><strong>No hay actividades con ese filtro</strong></p>';
  return '<table class="tabla"><thead><tr><th scope="col">Fecha</th><th scope="col">Nombre y lugar</th><th scope="col">Modalidad</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead><tbody>' +
    lista.map(a => {
      let acciones;
      if (a.estado === 'borrador') acciones = '<a class="btn btn-primario" href="#/admin/revisar/' + a.id + '">Revisar y publicar<span class="solo-lector"> ' + esc(a.nombre) + '</span></a>';
      else if (a.estado === 'cancelada') acciones = '<a class="btn btn-fantasma" href="#/admin/fuera">Ver<span class="solo-lector"> ' + esc(a.nombre) + '</span></a>';
      else acciones = '<a class="btn btn-secundario" href="#/admin/fuera">Editar<span class="solo-lector"> ' + esc(a.nombre) + '</span></a><a class="btn btn-fantasma" href="#/admin/fuera">Cancelar<span class="solo-lector"> ' + esc(a.nombre) + '</span></a>';
      return '<tr class="' + a.estado + '"><td class="t-fecha">' + sello(a) + '<span class="solo-lector">' + fechaMedia(aFecha(a.inicio)) + '</span></td>' +
        '<td class="t-nombre"><strong>' + esc(a.nombre) + '</strong><span>' + esc(lugarCorto(a)) + '</span></td>' +
        '<td>' + insigniaModalidad(a.modalidad) + '</td><td>' + insigniaEstado(a.estado) + '</td>' +
        '<td class="t-acciones-celda"><div class="t-acciones">' + acciones + '</div></td></tr>';
    }).join('') + '</tbody></table>';
}

function htmlTablaAvisos() {
  return '<ul class="pendientes">' + estado.avisos.map(v => '<li class="pendiente"><span class="sello sello-aviso" aria-hidden="true">' + ico('megafono') + '</span>' +
    '<div class="pendiente-texto"><strong>' + esc(v.titulo) + '</strong><div class="insignias"><span class="insignia insignia-publicada">Publicado</span></div></div>' +
    '<a class="btn btn-secundario" href="#/admin/fuera">Editar<span class="solo-lector"> ' + esc(v.titulo) + '</span></a></li>').join('') + '</ul>';
}

function htmlListaAdmin() {
  if (ui.pestana === 'avisos') return htmlTablaAvisos();
  const filtros = [['todas', 'Todas'], ['borrador', 'Borradores'], ['publicada', 'Publicadas'], ['cancelada', 'Canceladas']];
  return '<div class="lista-filtros"><div class="buscador">' + ico('buscar') +
    '<label class="solo-lector" for="buscar-act">Buscar por nombre</label>' +
    '<input class="entrada" id="buscar-act" type="search" placeholder="Buscar por nombre" value="' + esc(ui.busquedaAdmin) + '" autocomplete="off"></div>' +
    '<div class="segmentado" role="group" aria-label="Filtrar por estado">' +
    filtros.map(f => '<button type="button" class="oscuro" data-accion="filtro-estado" data-estado="' + f[0] + '" aria-pressed="' + (ui.filtroEstado === f[0]) + '">' + f[1] + '</button>').join('') +
    '</div></div><div id="tabla-act">' + htmlTablaActividades() + '</div>' +
    '<p class="nota-tabla">' + ico('info') + '<span>Los borradores no son visibles para la comunidad. Las actividades canceladas siguen en el calendario con la etiqueta «Cancelada» hasta su fecha.</span></p>';
}

function pActividades() {
  const nAct = estado.actividades.length;
  const nAv = estado.avisos.length;
  return {
    titulo: 'Actividades y avisos',
    html: disenoAdmin('/admin/actividades',
      migas([['Administración', '/admin'], ['Actividades y avisos']]) +
      '<div class="adm-cab"><div><h1>Actividades y avisos</h1><p>Crea borradores, revisa su información y publícalos cuando estén completos.</p></div>' +
      '<div class="adm-acciones"><a class="btn btn-secundario" href="#/admin/fuera">' + ico('megafono') + 'Crear aviso</a>' +
      '<a class="btn btn-primario" href="#/admin/crear">' + ico('mas') + 'Crear actividad</a></div></div>' +
      tomarAviso() +
      '<section class="tarjeta" aria-label="Listado"><div class="pestanas" role="tablist" aria-label="Tipo de publicación">' +
      '<button type="button" role="tab" id="tab-act" aria-controls="panel-lista" data-accion="pestana" data-pestana="actividades" aria-selected="' + (ui.pestana === 'actividades') + '">Actividades (' + nAct + ')</button>' +
      '<button type="button" role="tab" id="tab-av" aria-controls="panel-lista" data-accion="pestana" data-pestana="avisos" aria-selected="' + (ui.pestana === 'avisos') + '">Avisos (' + nAv + ')</button></div>' +
      '<div id="panel-lista" role="tabpanel" aria-labelledby="' + (ui.pestana === 'avisos' ? 'tab-av' : 'tab-act') + '">' + htmlListaAdmin() + '</div></section>'),
    montar: montarListaAdmin
  };
}

function montarListaAdmin() {
  const b = document.getElementById('buscar-act');
  if (b) b.addEventListener('input', e => { ui.busquedaAdmin = e.target.value; document.getElementById('tabla-act').innerHTML = htmlTablaActividades(); });
}

/* Crear o editar actividad (A04) */

function validarActividad(v) {
  const errores = {};
  const vacio = t => !t || !t.trim();
  if (vacio(v.nombre)) errores.nombre = 'Escribe el nombre de la actividad.';
  if (vacio(v.descripcion)) errores.descripcion = 'Escribe de qué trata la actividad.';
  if (vacio(v.organizador)) errores.organizador = 'Escribe quién organiza la actividad.';
  if (!v.fechaInicio) errores.fechaInicio = 'Elige la fecha de inicio.';
  if (!v.horaInicio) errores.horaInicio = 'Elige la hora de inicio.';
  if (v.fechaFin && !v.horaFin) errores.horaFin = 'Elige la hora de finalización.';
  if (v.fechaInicio && v.horaInicio && (v.fechaFin || v.horaFin) && v.horaFin) {
    const ini = aFecha(v.fechaInicio + 'T' + v.horaInicio);
    const fin = aFecha((v.fechaFin || v.fechaInicio) + 'T' + v.horaFin);
    if (fin < ini) {
      if (v.fechaFin && v.fechaFin < v.fechaInicio) errores.fechaFin = 'La finalización no puede ser anterior al inicio.';
      else errores.horaFin = 'La finalización no puede ser anterior al inicio.';
    }
  }
  if (!v.modalidad) errores.modalidad = 'Elige la modalidad.';
  if (v.modalidad !== 'virtual' && vacio(v.lugar)) errores.lugar = v.modalidad === 'hibrida' ? 'Las actividades híbridas necesitan un lugar.' : 'Las actividades presenciales necesitan un lugar.';
  if (v.modalidad !== 'presencial' && vacio(v.enlace)) errores.enlace = v.modalidad === 'hibrida' ? 'Las actividades híbridas necesitan un enlace de acceso.' : 'Las actividades virtuales necesitan un enlace de acceso.';
  return errores;
}

function valoresDeActividad(a) {
  const [fi, hi] = a.inicio.split('T');
  const [ff, hf] = a.fin ? a.fin.split('T') : ['', ''];
  return { nombre: a.nombre, descripcion: a.descripcion, organizador: a.organizador, fechaInicio: fi, horaInicio: hi, fechaFin: ff, horaFin: hf, modalidad: a.modalidad, lugar: a.lugar, enlace: a.enlace };
}

const ETIQUETAS = {
  nombre: 'Nombre de la actividad', descripcion: 'Descripción', organizador: 'Institución u organizador responsable',
  fechaInicio: 'Fecha de inicio', horaInicio: 'Hora de inicio', fechaFin: 'Fecha de finalización', horaFin: 'Hora de finalización',
  modalidad: 'Modalidad', lugar: 'Lugar', enlace: 'Enlace de acceso'
};

function checklist(v, errores, intentado) {
  const fila = (ok, texto) => {
    if (ok) return '<li class="ok">' + ico('ok') + '<span>' + texto + '<span class="solo-lector"> (listo)</span></span></li>';
    if (intentado) return '<li class="mal">' + ico('alerta') + '<span>' + texto + '<span class="solo-lector"> (por corregir)</span></span></li>';
    return '<li class="pendiente">' + ico('pendiente') + '<span>' + texto + '<span class="solo-lector"> (pendiente)</span></span></li>';
  };
  const lugarTexto = v.modalidad === 'virtual' ? 'Enlace para la modalidad virtual' : v.modalidad === 'hibrida' ? 'Lugar y enlace para la modalidad híbrida' : 'Lugar para la modalidad presencial';
  return fila(!errores.nombre && !errores.descripcion, 'Nombre y descripción') +
    fila(!errores.organizador, 'Organizador responsable') +
    fila(!errores.fechaInicio && !errores.horaInicio, 'Fecha y hora de inicio') +
    fila(!errores.fechaFin && !errores.horaFin, 'Fecha de fin posterior al inicio') +
    fila(!errores.lugar && !errores.enlace, lugarTexto);
}

function pFormulario(id) {
  const existente = id ? buscarActividad(id) : null;
  if (id && (!existente || existente.estado !== 'borrador')) return pNoEncontrado();
  const v = existente ? valoresDeActividad(existente) : { modalidad: 'presencial' };
  const campo = (nombre, tipo, extra) => {
    const req = extra && extra.opcional ? '' : ' <span class="obligatorio" aria-hidden="true">*</span>';
    const ayuda = extra && extra.ayuda ? '<p class="ayuda" id="ayuda-' + nombre + '">' + extra.ayuda + '</p>' : '';
    const control = tipo === 'textarea'
      ? '<textarea class="entrada" id="f-' + nombre + '" name="' + nombre + '"' + (extra && extra.ayuda ? ' data-ayuda="ayuda-' + nombre + '"' : '') + (extra && extra.opcional ? '' : ' aria-required="true"') + '>' + esc(v[nombre] || '') + '</textarea>'
      : '<input class="entrada" id="f-' + nombre + '" name="' + nombre + '" type="' + tipo + '" value="' + esc(v[nombre] || '') + '"' +
        (extra && extra.placeholder ? ' placeholder="' + extra.placeholder + '"' : '') + (extra && extra.ayuda ? ' data-ayuda="ayuda-' + nombre + '"' : '') +
        (extra && extra.opcional ? '' : ' aria-required="true"') + ' autocomplete="off">';
    return '<div class="campo" data-campo="' + nombre + '"><label for="f-' + nombre + '">' + ETIQUETAS[nombre] + req + '</label>' + control + ayuda + '<p class="msg-error" id="error-' + nombre + '" hidden></p></div>';
  };
  const radios = ['presencial', 'virtual', 'hibrida'].map(m =>
    '<input type="radio" id="m-' + m + '" name="modalidad" value="' + m + '"' + (v.modalidad === m ? ' checked' : '') + '><label for="m-' + m + '">' + MODALIDADES[m] + '</label>').join('');

  const titulo = existente ? 'Editar borrador' : 'Crear actividad';
  return {
    titulo,
    html: disenoAdmin('/admin/actividades',
      migas([['Administración', '/admin'], ['Actividades y avisos', '/admin/actividades'], [titulo]]) +
      '<div class="adm-cab"><div><h1>' + titulo + '</h1><p>Se guarda como borrador. No será visible hasta que la publiques.</p></div></div>' +
      '<div id="resumen-errores"></div>' +
      '<div class="form-rejilla"><form class="tarjeta" id="form-actividad" novalidate>' +
      '<p style="color:var(--tinta-2);margin-bottom:20px">Los campos con <span class="obligatorio" style="color:var(--error)" aria-hidden="true">*</span> son obligatorios.</p>' +
      '<div class="form-bloque"><h2>Información general</h2>' +
      campo('nombre', 'text', { placeholder: 'Por ejemplo, Taller: manejo del estrés' }) +
      campo('descripcion', 'textarea', { ayuda: 'Explica en dos o tres frases de qué trata y a quién va dirigida.' }) +
      campo('organizador', 'text', { placeholder: 'Por ejemplo, Psicología FMAT' }) + '</div>' +
      '<div class="form-bloque"><h2>Fecha y hora</h2>' +
      '<div class="fila-campos">' + campo('fechaInicio', 'date') + campo('horaInicio', 'time') + '</div>' +
      '<div class="fila-campos">' + campo('fechaFin', 'date', { opcional: true }) + campo('horaFin', 'time', { opcional: true }) + '</div></div>' +
      '<div class="form-bloque"><h2>Modalidad y lugar</h2>' +
      '<fieldset class="campo" data-campo="modalidad" style="margin-top:0"><legend>Modalidad <span class="obligatorio" aria-hidden="true">*</span></legend><div class="radios">' + radios + '</div>' +
      '<p class="msg-error" id="error-modalidad" hidden></p></fieldset>' +
      campo('lugar', 'text', { placeholder: 'Escribe el edificio, aula o espacio' }) +
      campo('enlace', 'text', { placeholder: 'Por ejemplo, teams.microsoft.com/…', ayuda: 'Solo para actividades virtuales o híbridas.' }) + '</div>' +
      '<div class="form-acciones"><a class="btn btn-secundario" href="#/admin/actividades">Cancelar</a>' +
      '<button class="btn btn-primario" type="submit">Guardar borrador</button></div></form>' +
      '<div class="adm-columna"><section class="tarjeta" aria-labelledby="t-antes"><h2 class="h-sans" id="t-antes">Antes de publicar</h2><ul class="revision" id="checklist"></ul></section>' +
      '<section class="tarjeta alerta-info" style="border:0" aria-labelledby="t-quien"><h2 class="h-sans" id="t-quien" style="display:flex;gap:10px;align-items:center;font-size:1.125rem;color:var(--azul)">' + ico('ojo') + '¿Quién lo ve?</h2>' +
      '<p style="margin-top:8px;color:var(--tinta-2)">Guardar el borrador no lo publica. Después podrás revisarlo y publicarlo en el calendario.</p></section></div></div>'),
    montar() { montarFormulario(existente); }
  };
}

function montarFormulario(existente) {
  const form = document.getElementById('form-actividad');
  let intentado = false;

  const leerValores = () => {
    const f = new FormData(form);
    const v = {};
    ['nombre', 'descripcion', 'organizador', 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'lugar', 'enlace'].forEach(k => { v[k] = f.get(k) || ''; });
    v.modalidad = f.get('modalidad') || '';
    // Los campos desactivados no se envían; se conservan para no perder lo escrito.
    v.lugar = form.elements.lugar.value;
    v.enlace = form.elements.enlace.value;
    return v;
  };

  const ajustarModalidad = () => {
    const m = (form.querySelector('input[name="modalidad"]:checked') || {}).value;
    const lugar = form.elements.lugar;
    const enlace = form.elements.enlace;
    lugar.disabled = m === 'virtual';
    enlace.disabled = m === 'presencial';
    lugar.setAttribute('aria-required', String(m !== 'virtual'));
    enlace.setAttribute('aria-required', String(m !== 'presencial'));
    form.querySelector('[data-campo="lugar"] .obligatorio').hidden = m === 'virtual';
    form.querySelector('[data-campo="enlace"] .obligatorio').hidden = m === 'presencial';
  };

  const pintarErrores = (errores) => {
    Object.keys(ETIQUETAS).forEach(k => {
      const msg = document.getElementById('error-' + k);
      const control = k === 'modalidad' ? null : form.elements[k];
      const err = intentado ? errores[k] : null;
      msg.hidden = !err;
      msg.innerHTML = err ? ico('alerta') + '<span>' + err + '</span>' : '';
      if (control) {
        const ayuda = control.getAttribute('data-ayuda');
        const desc = [err ? 'error-' + k : '', ayuda || ''].filter(Boolean).join(' ');
        if (err) control.setAttribute('aria-invalid', 'true'); else control.removeAttribute('aria-invalid');
        if (desc) control.setAttribute('aria-describedby', desc); else control.removeAttribute('aria-describedby');
      }
    });
  };

  const actualizar = () => {
    const v = leerValores();
    const errores = validarActividad(v);
    document.getElementById('checklist').innerHTML = checklist(v, errores, intentado);
    pintarErrores(errores);
    return { v, errores };
  };

  form.addEventListener('input', actualizar);
  form.addEventListener('change', e => { if (e.target.name === 'modalidad') ajustarModalidad(); actualizar(); });
  ajustarModalidad();
  actualizar();

  form.addEventListener('submit', e => {
    e.preventDefault();
    intentado = true;
    const { v, errores } = actualizar();
    const claves = Object.keys(errores);
    const resumen = document.getElementById('resumen-errores');
    if (claves.length) {
      // RF03 CA2 y CA3: se señalan los campos, se conservan los datos y no se registra nada.
      const n = claves.length;
      resumen.innerHTML = '<div style="margin-bottom:24px">' + alertaHtml({
        tipo: 'error', rol: 'alert', id: 'alerta-errores',
        titulo: 'Revisa ' + (n === 1 ? 'el campo marcado' : 'los ' + n + ' campos marcados'),
        texto: 'Tus datos se conservaron. Corrige los campos en rojo y vuelve a guardar.',
        extra: '<ul>' + claves.map(k => '<li><a href="#" data-accion="ir-campo" data-campo="' + k + '">' + ETIQUETAS[k] + ': ' + errores[k] + '</a></li>').join('') + '</ul>'
      }) + '</div>';
      document.getElementById('alerta-errores').focus();
      return;
    }
    resumen.innerHTML = '';
    const datos = {
      nombre: v.nombre.trim(), descripcion: v.descripcion.trim(), organizador: v.organizador.trim(),
      inicio: v.fechaInicio + 'T' + v.horaInicio,
      fin: v.horaFin ? (v.fechaFin || v.fechaInicio) + 'T' + v.horaFin : '',
      modalidad: v.modalidad,
      lugar: v.modalidad === 'virtual' ? '' : v.lugar.trim(),
      enlace: v.modalidad === 'presencial' ? '' : v.enlace.trim()
    };
    datos.lugarCorto = v.modalidad === 'virtual' ? 'En línea' : v.modalidad === 'hibrida' ? datos.lugar + ' y en línea' : datos.lugar;
    let act = existente;
    if (act) Object.assign(act, datos);
    else {
      act = Object.assign({ id: 'a-n' + Date.now().toString(36), estado: 'borrador', creadaEnPrototipo: true }, datos);
      estado.actividades.push(act);
    }
    guardar();
    // RF03 CA1: queda como borrador, con mensaje de confirmación.
    ui.aviso = { tipo: 'exito', rol: 'status', titulo: 'Borrador guardado', texto: 'Todavía no aparece en el calendario. Revísalo y publícalo cuando esté listo.' };
    navegar('/admin/revisar/' + act.id);
  });
}

/* Revisar y publicar (A05) */

function pRevisar(id) {
  const a = buscarActividad(id);
  if (!a) return pNoEncontrado();
  const errores = validarActividad(valoresDeActividad(a));
  const valida = !Object.keys(errores).length;
  const ini = aFecha(a.inicio);
  const datos = [['calendario', 'Inicio y fin', fechaLarga(ini) + ' · ' + horario(a)], [a.modalidad === 'virtual' ? 'video' : 'personas', 'Modalidad', MODALIDADES[a.modalidad]]];
  if (a.modalidad !== 'virtual') datos.push(['lugar', 'Lugar', esc(a.lugar)]);
  if (a.modalidad !== 'presencial') datos.push(['enlace', 'Enlace de acceso', esc(a.enlace)]);
  datos.push(['edificio', 'Organiza', esc(a.organizador)]);
  const comprobaciones = [
    [a.estado === 'borrador', a.estado === 'borrador' ? 'Sigue en estado Borrador' : 'Ya no está en Borrador'],
    [!errores.nombre && !errores.descripcion && !errores.organizador && !errores.fechaInicio && !errores.horaInicio, 'Campos obligatorios completos'],
    [!errores.fechaFin && !errores.horaFin, 'Fecha de fin posterior al inicio'],
    [!errores.lugar && !errores.enlace, a.modalidad === 'virtual' ? 'Enlace de acceso para modalidad virtual' : a.modalidad === 'hibrida' ? 'Lugar y enlace para modalidad híbrida' : 'Lugar para modalidad presencial']
  ];
  return {
    titulo: 'Revisar antes de publicar',
    html: disenoAdmin('/admin/actividades',
      migas([['Administración', '/admin'], ['Actividades y avisos', '/admin/actividades'], ['Revisar']]) +
      '<div class="adm-cab"><div><h1>Revisar antes de publicar</h1><p>Así verá la comunidad esta actividad en el calendario.</p></div>' +
      '<div class="adm-acciones">' + (a.estado === 'borrador' ? '<a class="btn btn-secundario" href="#/admin/editar/' + a.id + '">' + ico('lapiz') + 'Editar borrador</a>' : '') +
      '<button class="btn btn-primario" type="button" data-accion="publicar" data-id="' + a.id + '">' + ico('ok') + 'Publicar</button></div></div>' +
      '<div id="resultado-publicar">' + tomarAviso() + '</div>' +
      '<div class="form-rejilla"><section class="tarjeta vista-previa" aria-label="Vista previa">' +
      '<div class="tarjeta-cab"><span style="color:var(--tinta-2);font-weight:700">Vista previa</span>' + insigniaEstado(a.estado) + '</div>' +
      '<div class="dlg-titulo-fila">' + sello(a) + '<div>' + insigniaModalidad(a.modalidad) +
      '<h2 class="titulo-serif" style="font-size:clamp(1.625rem,1.3rem + 1vw,2rem);color:var(--tinta);margin-top:8px">' + esc(a.nombre) + '</h2></div></div>' +
      '<p class="dlg-desc">' + esc(a.descripcion) + '</p>' +
      '<ul class="datos">' + datos.map(x => '<li><span class="datos-ico">' + ico(x[0]) + '</span><span><span class="datos-etq">' + x[1] + '</span><br><span class="datos-val">' + x[2] + '</span></span></li>').join('') + '</ul></section>' +
      '<div class="adm-columna"><section class="tarjeta" aria-labelledby="t-val"><h2 class="h-sans" id="t-val">Validación previa</h2><ul class="revision">' +
      comprobaciones.map(c => '<li class="' + (c[0] ? 'ok' : 'mal') + '">' + ico(c[0] ? 'ok' : 'alerta') + '<span>' + c[1] + '</span></li>').join('') + '</ul>' +
      (valida && a.estado === 'borrador' ? '<div class="lista-para">' + alertaHtml({ tipo: 'exito', titulo: 'Lista para publicar', texto: 'Al publicarla aparecerá en el calendario y se podrá consultar su detalle.' }) + '</div>' : '') +
      '</section><section class="tarjeta alerta-info" style="border:0"><p style="color:var(--tinta-2)">Publicar no envía notificaciones. La comunidad la verá al consultar el calendario.</p></section></div></div>')
  };
}

function publicar(id) {
  const a = buscarActividad(id);
  const caja = document.getElementById('resultado-publicar');
  if (!a) return;
  if (a.estado !== 'borrador') {
    // RF03 CA8: no se crea un duplicado.
    caja.innerHTML = alertaHtml({ tipo: 'aviso', rol: 'alert', id: 'alerta-publicar', titulo: 'Esta actividad ya está publicada', texto: 'No se creó un duplicado.' });
    document.getElementById('alerta-publicar').focus();
    return;
  }
  const errores = validarActividad(valoresDeActividad(a));
  if (Object.keys(errores).length) {
    // RF03 CA3: con datos incoherentes no se publica.
    caja.innerHTML = alertaHtml({ tipo: 'error', rol: 'alert', id: 'alerta-publicar', titulo: 'No se pudo publicar', texto: 'Hay datos por corregir. La actividad sigue como Borrador y no aparece en el calendario.', extra: '<p><a href="#/admin/editar/' + a.id + '">Editar borrador</a></p>' });
    document.getElementById('alerta-publicar').focus();
    return;
  }
  a.estado = 'publicada';
  guardar();
  // El calendario se abre en el mes de la actividad recién publicada y la resalta.
  ui.resaltar = a.id;
  ui.mes = { anio: aFecha(a.inicio).getFullYear(), mes: aFecha(a.inicio).getMonth() };
  ui.pestana = 'actividades';
  ui.filtroEstado = 'todas';
  ui.aviso = {
    tipo: 'exito', rol: 'status', titulo: 'Actividad publicada correctamente',
    texto: '«' + esc(a.nombre) + '» ya aparece en el calendario y se puede consultar su detalle.',
    extra: '<p style="margin-top:8px"><a href="#/calendario">Ver en el calendario</a></p>'
  };
  navegar('/admin/actividades');
}

function pNoEncontrado() {
  return { titulo: 'No disponible', html: disenoAdmin(null, htmlFuera('#/admin/actividades', 'Esta actividad ya no está disponible', 'Puede que se haya publicado o eliminado. Vuelve al listado de actividades.')) };
}

function pFueraAdmin() {
  return { titulo: 'Fuera de esta prueba', html: disenoAdmin(null, htmlFuera('#/admin')), volverAtras: true };
}

/* ---------- Diálogos ---------- */

const app = document.getElementById('app');
const capa = document.getElementById('capa-dialogo');
let dialogo = null;   // { clave, previo, alCerrar }

function abrirDialogo({ clave, html, clase, etiqueta, alCerrar }) {
  cerrarDialogo({ silencioso: true, sinFoco: true });
  const previo = document.activeElement;
  capa.innerHTML = '<div class="dlg-fondo" data-accion="cerrar-dialogo"></div>' +
    '<div class="dlg ' + clase + '" role="dialog" aria-modal="true" tabindex="-1" ' + (etiqueta ? 'aria-label="' + etiqueta + '"' : 'aria-labelledby="dlg-titulo"') + '>' + html + '</div>';
  capa.hidden = false;
  app.inert = true;
  document.body.classList.add('sin-desplazamiento');
  dialogo = { clave, previo, alCerrar };
  (capa.querySelector('[data-foco]') || capa.querySelector('.dlg')).focus();
}

function cerrarDialogo(op) {
  op = op || {};
  if (!dialogo) return;
  const d = dialogo;
  if (!op.silencioso && d.alCerrar) { d.alCerrar(); return; }   // el router lo cerrará
  dialogo = null;
  capa.innerHTML = '';
  capa.hidden = true;
  app.inert = false;
  document.body.classList.remove('sin-desplazamiento');
  if (!op.sinFoco && d.previo && document.contains(d.previo)) d.previo.focus();
}

/* ---------- Rutas ---------- */

const actual = { base: null };

function navegar(ruta) {
  if (location.hash === '#' + ruta) render();
  else location.hash = ruta;
}

function leerRuta() {
  let h = location.hash.slice(1);
  try { h = decodeURIComponent(h); } catch (e) { /* se usa tal cual */ }
  if (!h.startsWith('/')) h = '/inicio';
  const m = h.match(/^(.*?)\/(a|p)\/([^/]+)$/);
  return m ? { base: m[1] || '/inicio', capa: m[2], id: m[3] } : { base: h, capa: null, id: null };
}

function pagina(base) {
  let m;
  if (base === '/inicio') return pInicio();
  if (base === '/calendario') return pCalendario();
  if (base === '/directorio') return pDirectorio();
  if (base === '/acceso') return pAcceso();
  if (base === '/admin') return pAdmin();
  if (base === '/admin/actividades') return pActividades();
  if (base === '/admin/crear') return pFormulario(null);
  if ((m = base.match(/^\/admin\/editar\/(.+)$/))) return pFormulario(m[1]);
  if ((m = base.match(/^\/admin\/revisar\/(.+)$/))) return pRevisar(m[1]);
  if (base.startsWith('/admin')) return pFueraAdmin();
  return pFuera();
}

function render() {
  const r = leerRuta();
  if (r.base.startsWith('/admin') && !estado.sesion) {
    // Sin sesión, el panel lleva a la pantalla de inicio de sesión (RNF04).
    ui.despuesDeEntrar = r.base;
    location.replace('#/acceso');
    return;
  }
  if (dialogo && dialogo.clave === 'menu') cerrarDialogo({ silencioso: true, sinFoco: true });

  const nueva = r.base !== actual.base;
  if (nueva) {
    cerrarDialogo({ silencioso: true, sinFoco: true });
    const p = pagina(r.base);
    app.innerHTML = p.html;
    document.title = p.titulo + ' · DOCE (prototipo)';
    actual.base = r.base;
    if (p.montar) p.montar();
    window.scrollTo(0, 0);
    const destino = document.querySelector('#contenido [role="alert"][tabindex="-1"], #contenido [role="status"][tabindex="-1"]') || document.getElementById('contenido');
    if (destino) destino.focus({ preventScroll: true });
  }
  sincronizarCapa(r);
  prueba.alCambiarPantalla(r);
}

function sincronizarCapa(r) {
  const clave = r.capa ? r.capa + ':' + r.id : null;
  if (dialogo && dialogo.clave === clave) return;
  if (dialogo) cerrarDialogo({ silencioso: true });
  if (!clave) return;
  const volver = () => navegar(r.base);
  if (r.capa === 'a') {
    const a = buscarActividad(r.id);
    const visible = a && (a.estado === 'publicada' || a.estado === 'cancelada');
    abrirDialogo({ clave, clase: 'dlg-lateral', html: visible ? htmlDetalle(a) : htmlNoDisponible('Detalle de la actividad'), alCerrar: volver });
  } else {
    const p = PERSONAS.find(x => x.id === r.id);
    abrirDialogo({ clave, clase: 'dlg-centro', html: p ? htmlFicha(p) : htmlNoDisponible('Ficha de contacto'), alCerrar: volver });
  }
}

/* ---------- Acciones (delegadas) ---------- */

const ACCIONES = {
  'saltar'(el, e) { e.preventDefault(); const c = document.getElementById('contenido'); if (c) c.focus(); },
  'abrir-menu'() { abrirMenuMovil(); },
  'cerrar-dialogo'() { cerrarDialogo(); },
  'mes-anterior'() { cambiarMes(-1); repintarCalendario('mes-anterior'); },
  'mes-siguiente'() { cambiarMes(1); repintarCalendario('mes-siguiente'); },
  'mes-hoy'() { ui.mes = { anio: HOY.getFullYear(), mes: HOY.getMonth() }; repintarCalendario('mes-hoy'); },
  'vista-mes'() { ui.vista = 'mes'; repintarCalendario('vista-mes'); },
  'vista-lista'() { ui.vista = 'lista'; repintarCalendario('vista-lista'); },
  'area'(el) {
    ui.area = el.dataset.area;
    document.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c === el)));
    repintarPersonas();
  },
  'menu-admin'(el) {
    const lat = document.getElementById('lateral');
    const abierta = lat.classList.toggle('abierta');
    el.setAttribute('aria-expanded', String(abierta));
  },
  'salir'() { estado.sesion = false; guardar(); navegar('/inicio'); },
  'pestana'(el) {
    ui.pestana = el.dataset.pestana;
    document.querySelectorAll('[role="tab"]').forEach(t => t.setAttribute('aria-selected', String(t === el)));
    const panel = document.getElementById('panel-lista');
    panel.setAttribute('aria-labelledby', el.id);
    panel.innerHTML = htmlListaAdmin();
    montarListaAdmin();
  },
  'filtro-estado'(el) {
    ui.filtroEstado = el.dataset.estado;
    el.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === el)));
    document.getElementById('tabla-act').innerHTML = htmlTablaActividades();
  },
  'ir-campo'(el, e) {
    e.preventDefault();
    const k = el.dataset.campo;
    const control = k === 'modalidad' ? document.querySelector('input[name="modalidad"]') : document.getElementById('f-' + k);
    if (control) control.focus();
  },
  'publicar'(el) { publicar(el.dataset.id); }
};

function cambiarMes(delta) {
  const d = new Date(ui.mes.anio, ui.mes.mes + delta, 1);
  ui.mes = { anio: d.getFullYear(), mes: d.getMonth() };
}

document.addEventListener('click', e => {
  // Prueba: cuenta antes de que la acción cambie la pantalla.
  prueba.contarClic(e);
  const el = e.target.closest('[data-accion]');
  if (el && ACCIONES[el.dataset.accion]) { ACCIONES[el.dataset.accion](el, e); return; }
  // Un enlace dentro del menú del celular cierra el menú, aunque apunte a la página actual.
  if (dialogo && dialogo.clave === 'menu' && e.target.closest('.dlg a')) cerrarDialogo({ silencioso: true, sinFoco: true });
  // Volver desde "fuera de esta prueba" regresa a la pantalla anterior.
  const volver = e.target.closest('.fuera-caja .btn');
  if (volver && history.length > 1 && prueba.pantallaAnterior()) { e.preventDefault(); history.back(); }
});

document.addEventListener('keydown', e => {
  if (e.key === 'F2') { e.preventDefault(); prueba.alternarPanel(); return; }
  if (e.key === 'Escape') {
    if (!prueba.panel.hidden && prueba.panel.contains(document.activeElement)) { prueba.cerrarPanel(); return; }
    if (dialogo) { e.preventDefault(); cerrarDialogo(); }
  }
  // Mantiene el foco dentro del diálogo abierto.
  if (e.key === 'Tab' && dialogo) {
    const focos = [...capa.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]')];
    if (!focos.length) return;
    const primero = focos[0];
    const ultimo = focos[focos.length - 1];
    if (e.shiftKey && (document.activeElement === primero || document.activeElement === capa.querySelector('.dlg'))) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }
});

/* ==========================================================================
   Modo prueba
   Se abre con F2 (o con ?prueba en la dirección). Mide clics y tiempo desde
   que se elige una tarea hasta llegar a su pantalla final, y guarda los
   resultados para descargarlos como CSV.
   ========================================================================== */

const TAREAS = {
  1: { nombre: 'Detalle de la próxima actividad', limiteClics: 3, limiteSeg: 60 },
  2: { nombre: 'Horario y ubicación de Jorge Uc Tun', limiteClics: 3, limiteSeg: 60 },
  3: { nombre: 'Crear y publicar una actividad', limiteClics: null, limiteSeg: 180 }
};

const prueba = {
  panel: document.getElementById('panel-prueba'),
  activa: null,
  resultados: leer(CLAVE_RESULTADOS) || [],
  participante: '',
  ultimas: [],

  alternarPanel() { if (this.panel.hidden) this.abrirPanel(); else this.cerrarPanel(); },

  abrirPanel() {
    this.pintar();
    this.panel.hidden = false;
    const p = this.panel.querySelector('#prueba-participante');
    if (p) p.focus();
  },

  cerrarPanel() { this.panel.hidden = true; },

  pintar() {
    const a = this.activa;
    const estadoTexto = a
      ? '<strong>En curso: tarea ' + a.tarea + '.</strong> ' + TAREAS[a.tarea].nombre + '<br>Clics: ' + a.clics + ' · Tiempo: ' + Math.round((performance.now() - a.t0) / 1000) + ' s'
      : 'No hay ninguna tarea en curso.';
    const filas = this.resultados.slice(-8).reverse().map(r =>
      '<tr><td>' + esc(r.participante) + '</td><td>' + r.tarea + '</td><td>' + r.segundos + ' s</td><td>' + r.clics + '</td><td>' + (r.completada === 'sí' ? (r.cumple_rnf01 === 'sí' ? 'Cumple' : 'No cumple') : 'Abandonada') + '</td></tr>').join('');
    this.panel.innerHTML =
      '<h2 id="panel-prueba-titulo">Modo prueba</h2>' +
      '<button class="btn-icono cerrar-panel" type="button" data-prueba="cerrar" aria-label="Cerrar el panel de prueba">' + ico('cerrar') + '</button>' +
      '<p class="estado-prueba" aria-live="polite">' + estadoTexto + '</p>' +
      '<div class="campo"><label for="prueba-participante">Participante</label>' +
      '<input class="entrada" id="prueba-participante" type="text" placeholder="P1, P2…" value="' + esc(this.participante) + '" autocomplete="off"></div>' +
      '<div class="tareas" role="group" aria-label="Iniciar tarea">' +
      Object.keys(TAREAS).map(n => '<button class="btn btn-secundario" type="button" data-prueba="iniciar" data-tarea="' + n + '">Iniciar tarea ' + n + ': ' + TAREAS[n].nombre + '</button>').join('') + '</div>' +
      '<div class="acciones">' + (a ? '<button class="btn btn-secundario" type="button" data-prueba="abandonar">Abandonar tarea</button>' : '') +
      '<button class="btn btn-primario" type="button" data-prueba="csv"' + (this.resultados.length ? '' : ' disabled') + '>Descargar CSV (' + this.resultados.length + ')</button>' +
      '<button class="btn btn-fantasma" type="button" data-prueba="borrar"' + (this.resultados.length ? '' : ' disabled') + '>Borrar resultados</button></div>' +
      (filas ? '<div class="tabla-res"><table><caption class="solo-lector">Últimos resultados</caption><thead><tr><th>Part.</th><th>Tarea</th><th>Tiempo</th><th>Clics</th><th>Resultado</th></tr></thead><tbody>' + filas + '</tbody></table></div>' : '') +
      '<p class="nota">Al iniciar una tarea se reinician los datos de ejemplo y la sesión, y se abre el inicio. F2 abre y cierra este panel.</p>';
  },

  iniciar(n) {
    const campo = this.panel.querySelector('#prueba-participante');
    this.participante = campo ? campo.value.trim() : this.participante;
    if (!this.participante) {
      campo.setAttribute('aria-invalid', 'true');
      campo.focus();
      return;
    }
    // Datos y sesión desde cero para que todas las personas empiecen igual.
    estado = datosIniciales();
    guardar();
    Object.assign(ui, { mes: { anio: HOY.getFullYear(), mes: HOY.getMonth() }, vista: window.innerWidth < 960 ? 'lista' : 'mes', resaltar: null, area: 'todas', busqueda: '', aviso: null, pestana: 'actividades', filtroEstado: 'todas', busquedaAdmin: '' });
    this.cerrarPanel();
    actual.base = null;
    cerrarDialogo({ silencioso: true, sinFoco: true });
    this.activa = { tarea: Number(n), participante: this.participante, inicio: new Date().toISOString(), t0: performance.now(), clics: 0, pantallas: [] };
    this.ultimas = [];
    navegar('/inicio');
  },

  contarClic(e) {
    if (!this.activa || this.panel.contains(e.target)) return;
    // Al tocar la etiqueta de un botón de opción, el navegador manda un segundo clic al botón: no se cuenta dos veces.
    if (e.target.matches('input[type="radio"]') && e.detail === 0) return;
    this.activa.clics += 1;
  },

  pantallaAnterior() { return this.ultimas.length > 1; },

  alCambiarPantalla(r) {
    const nombre = r.base + (r.capa ? '/' + r.capa + '/' + r.id : '');
    this.ultimas.push(nombre);
    const a = this.activa;
    if (!a) return;
    if (a.pantallas[a.pantallas.length - 1] !== nombre) a.pantallas.push(nombre);
    const proxima = proximas()[0];
    const fin =
      (a.tarea === 1 && r.capa === 'a' && proxima && r.id === proxima.id) ||
      (a.tarea === 2 && r.capa === 'p' && r.id === 'jorge-uc') ||
      (a.tarea === 3 && r.base === '/calendario' && estado.actividades.some(x => x.creadaEnPrototipo && x.estado === 'publicada'));
    if (fin) this.terminar(true);
  },

  terminar(completada) {
    const a = this.activa;
    if (!a) return;
    this.activa = null;
    const t = TAREAS[a.tarea];
    const segundos = Math.round((performance.now() - a.t0) / 100) / 10;
    const cumple = completada && segundos <= t.limiteSeg && (t.limiteClics == null || a.clics <= t.limiteClics);
    this.resultados.push({
      participante: a.participante, tarea: a.tarea, descripcion: t.nombre, inicio: a.inicio,
      segundos, clics: a.clics, completada: completada ? 'sí' : 'no', cumple_rnf01: cumple ? 'sí' : 'no',
      limite: (t.limiteClics ? '≤ ' + t.limiteClics + ' clics y ' : '') + '≤ ' + t.limiteSeg + ' s',
      ancho_px: window.innerWidth, pantallas: a.pantallas.join(' > ')
    });
    escribir(CLAVE_RESULTADOS, this.resultados);
    if (completada) this.avisar('Tarea terminada. ¡Gracias!');
    if (!this.panel.hidden) this.pintar();
  },

  avisar(texto) {
    const caja = document.getElementById('aviso-prueba');
    caja.textContent = texto;
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => { caja.textContent = ''; }, 4000);
  },

  descargarCSV() {
    const columnas = ['participante', 'tarea', 'descripcion', 'inicio', 'segundos', 'clics', 'completada', 'cumple_rnf01', 'limite', 'ancho_px', 'pantallas'];
    const celda = v => { const s = String(v == null ? '' : v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const csv = '﻿' + [columnas.join(',')].concat(this.resultados.map(r => columnas.map(c => celda(r[c])).join(','))).join('\r\n');
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    enlace.download = 'resultados-prueba-doce-' + new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-') + '.csv';
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
  }
};

prueba.panel.addEventListener('click', e => {
  const b = e.target.closest('[data-prueba]');
  if (!b) return;
  const accion = b.dataset.prueba;
  if (accion === 'cerrar') prueba.cerrarPanel();
  else if (accion === 'iniciar') prueba.iniciar(b.dataset.tarea);
  else if (accion === 'abandonar') { prueba.terminar(false); prueba.pintar(); }
  else if (accion === 'csv') prueba.descargarCSV();
  else if (accion === 'borrar' && confirm('¿Borrar todos los resultados guardados en este navegador? No se puede deshacer.')) {
    prueba.resultados = [];
    escribir(CLAVE_RESULTADOS, []);
    prueba.pintar();
  }
});
prueba.panel.addEventListener('input', e => { if (e.target.id === 'prueba-participante') { prueba.participante = e.target.value; e.target.removeAttribute('aria-invalid'); } });

/* ---------- Arranque ---------- */

window.addEventListener('hashchange', render);
render();
if (/[?&]prueba\b/.test(location.search)) prueba.abrirPanel();
