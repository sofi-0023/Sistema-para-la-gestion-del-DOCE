/* A01 Inicio de sesión (RF11, RNF04). */
(function () {
  'use strict';

  var html = DOCE.util.html;
  var U = DOCE.util;
  var C = DOCE.componentes;
  var icono = DOCE.icono;
  var CLAVE = 'intentos';

  /* ---------- Intentos por cuenta (existan o no, para no revelar cuentas) ---------- */

  function registro(usuario) {
    var todos = DOCE.almacen.leer(CLAVE, {});
    var r = todos[U.normalizar(usuario)] || { n: 0, hasta: 0 };
    if (r.hasta && Date.now() >= r.hasta) r = { n: 0, hasta: 0 };
    return r;
  }
  function guardarRegistro(usuario, r) {
    var todos = DOCE.almacen.leer(CLAVE, {});
    if (r) todos[U.normalizar(usuario)] = r; else delete todos[U.normalizar(usuario)];
    DOCE.almacen.escribir(CLAVE, todos);
  }

  // 'correcta' | 'invalida' | 'bloqueada'
  function autenticar(usuario, contrasena) {
    var r = registro(usuario);
    if (r.hasta) return 'bloqueada';
    var c = DOCE.config.credenciales;
    if (U.normalizar(usuario) === c.usuario && contrasena === c.contrasena) {
      guardarRegistro(usuario, null);
      return 'correcta';
    }
    r.n++;
    if (r.n >= DOCE.config.intentosMaximos) r.hasta = Date.now() + DOCE.config.minutosBloqueo * 60000;
    guardarRegistro(usuario, r);
    return r.hasta ? 'bloqueada' : 'invalida';
  }

  /* ---------- Mensajes ---------- */

  function bloqueada(hasta) {
    var d = new Date(hasta);
    var hora = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    return {
      tipo: 'error', titulo: 'Cuenta bloqueada por 15 minutos',
      texto: 'Se hicieron 5 intentos fallidos seguidos. Podrás intentarlo de nuevo cuando termine ese tiempo, a las ' + hora + '.'
    };
  }

  var INVALIDAS = { tipo: 'error', titulo: 'Credenciales inválidas, intente de nuevo', texto: 'Revisa tu usuario y contraseña. Por seguridad no indicamos cuál de los dos es incorrecto.' };
  var CONEXION = { tipo: 'error', titulo: C.MENSAJE_CONEXION, texto: 'Revisa tu conexión a internet.' };

  function mensajeInicial(estado) {
    switch (estado) {
      case 'invalidas': return INVALIDAS;
      case 'error': return CONEXION;
      case 'bloqueada': return bloqueada(Date.now() + DOCE.config.minutosBloqueo * 60000);
      case 'expirada': return { tipo: 'aviso', titulo: 'Tu sesión expiró', texto: 'Se cerró después de 30 minutos sin actividad. Vuelve a iniciar sesión para continuar con la operación.' };
      case 'protegido': return { tipo: 'info', titulo: 'Inicia sesión para continuar', texto: 'Esta página es solo para el personal autorizado del DOCE.' };
      case 'sin-permisos': return { tipo: 'error', titulo: 'No tienes los permisos correspondientes', texto: 'Solo una cuenta de administración puede registrar, modificar o eliminar líneas de ayuda. Inicia sesión para continuar.' };
      default: return null;
    }
  }

  DOCE.rutas.agregar('/acceso', {
    titulo: 'Acceso para el personal del DOCE', marco: 'limpio',
    vista: function (ctx) {
      var m = mensajeInicial(ctx.estado);
      return html`<div class="acceso-pagina"><div class="tarjeta acceso-tarjeta">
        <a class="marca" href="#/inicio"><img src="img/logo-doce-color.svg" alt="" width="39" height="48"><span><span class="marca-nombre">DOCE</span><span class="marca-texto">Panel de administración</span></span></a>
        <div><h1 class="acceso-titulo" tabindex="-1">Acceso para el personal del DOCE</h1><p class="secundario">Ingresa tus credenciales para gestionar el contenido.</p></div>
        <form class="pila" novalidate data-acceso>
          <div data-resumen>${m ? C.alerta(m) : ''}</div>
          ${C.campo({ id: 'usuario', etiqueta: 'Usuario o correo institucional', marcador: 'Escribe tu usuario', autocompletar: 'username' })}
          ${C.campo({ id: 'contrasena', etiqueta: 'Contraseña', tipo: 'password', marcador: 'Escribe tu contraseña', autocompletar: 'current-password' })}
          <button type="submit" class="boton boton-primario boton-ancho">${icono('candado')}Iniciar sesión</button>
          <button type="button" class="boton boton-fantasma boton-ancho" data-cancelar>Cancelar</button>
        </form>
        <p class="acceso-nota">${icono('info', 'icono-s')}<span>Solo personal autorizado. Tu sesión se cierra tras 30 minutos sin actividad.</span></p>
      </div></div>`;
    },
    montar: function (ctx, raiz) {
      var form = raiz.querySelector('[data-acceso]');
      // Con sesión activa no se vuelve a pedir el acceso
      if (!ctx.estado && DOCE.sesion.activa()) { DOCE.rutas.ir('#/admin', true); return; }

      DOCE.formulario.vigilar(form);

      function vacios(d) {
        var e = {};
        if (!d.usuario) e.usuario = 'Escribe tu usuario.';
        if (!form.contrasena.value) e.contrasena = 'Escribe tu contraseña.';
        return e;
      }
      var textosVacios = { titulo: 'Faltan datos para iniciar sesión', texto: 'No se envió la información. Llena los campos marcados.' };

      function error(alerta, marcar) {
        DOCE.formulario.limpiar(form);
        DOCE.formulario.aviso(form, alerta);
        [].forEach.call(form.querySelectorAll('input'), function (i) {
          if (marcar) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
        });
        document.dispatchEvent(new CustomEvent('doce:errores', { detail: { campos: ['acceso'] } }));
      }

      if (ctx.estado === 'campos') DOCE.formulario.mostrar(form, vacios({ usuario: '' }), textosVacios);

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var d = DOCE.formulario.leer(form);
        if (!DOCE.formulario.mostrar(form, vacios(d), textosVacios)) return;
        if (ctx.estado === 'error') { error(CONEXION); return; }
        var r = autenticar(d.usuario, form.contrasena.value);
        if (r === 'bloqueada') { form.contrasena.value = ''; error(bloqueada(registro(d.usuario).hasta)); return; }
        if (r === 'invalida') { form.contrasena.value = ''; error(INVALIDAS, true); return; }
        DOCE.sesion.abrir();
        var destino = ctx.consulta.get('destino') || '';
        DOCE.rutas.ir(/^#\/admin(\/|\?|$)/.test(destino) ? destino : '#/admin', true);
      });

      form.querySelector('[data-cancelar]').addEventListener('click', function () {
        form.reset();
        DOCE.rutas.ir('#/inicio');
      });
    }
  });
})();
