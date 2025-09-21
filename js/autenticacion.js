document.addEventListener('DOMContentLoaded', () => {

    function validarRut(rut) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
            return false;
        }
        let partes = rut.split('-');
        let digitoVerificador = partes[1];
        let rutSinDigito = partes[0];
        if (digitoVerificador === 'K') digitoVerificador = 'k';

        let suma = 0;
        let factor = 2;
        for (let i = rutSinDigito.length - 1; i >= 0; i--) {
            suma += parseInt(rutSinDigito.charAt(i)) * factor;
            factor = (factor === 7) ? 2 : factor + 1;
        }
        let dvCalculado = 11 - (suma % 11);
        if (dvCalculado === 11) dvCalculado = '0';
        if (dvCalculado === 10) dvCalculado = 'k';
        return dvCalculado.toString() === digitoVerificador;
    }

    function validarCorreo(correo) {
        const expresionRegular = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return expresionRegular.test(correo);
    }

    function obtenerUsuariosEInicializarAdmin() {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioAdmin = usuarios.find(u => u.esAdmin);

        if (!usuarioAdmin) {
            const nuevoAdmin = {
                id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
                nombre: 'Admin',
                correo: 'admin@huertohogar.cl',
                contrasena: 'admin',
                esAdmin: true
            };
            usuarios.push(nuevoAdmin);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
        return usuarios;
    }

    const formularioRegistro = document.getElementById('formularioRegistro');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const rut = document.getElementById('rut').value;
            const contrasena = document.getElementById('contrasena').value;
            const contrasena2 = document.getElementById('contrasena2').value;

            if (!validarRut(rut)) {
                alert('El RUT ingresado no es válido.');
                return;
            }
            if (contrasena.length < 4 || contrasena.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                return;
            }
            if (contrasena !== contrasena2) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            if (!validarCorreo(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                return;
            }

            const usuarios = obtenerUsuariosEInicializarAdmin();
            if (usuarios.find(usuario => usuario.correo === correo)) {
                alert('El correo electrónico ya está registrado.');
                return;
            }

            const nuevoUsuario = { nombre, correo, rut, contrasena, historial: [], esAdmin: false };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'ingreso.html';
        });
    }

    const formularioIngreso = document.getElementById('formularioIngreso');
    if (formularioIngreso) {
        formularioIngreso.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;

            if (contrasena.length < 4 || contrasena.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                return;
            }

            if (correo !== 'admin@huertohogar.cl' && !validarCorreo(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                return;
            }

            const usuarios = obtenerUsuariosEInicializarAdmin();
            const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

            if (usuario) {
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('usuarioActual', JSON.stringify(usuario));
                alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);

                if (usuario.esAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('Credenciales incorrectas.');
            }
        });
    }

    function actualizarInterfazAutenticacion() {
        const botonesAutenticacion = document.getElementById('botonesAutenticacion');
        const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (botonesAutenticacion) {
            botonesAutenticacion.innerHTML = '';
            if (sesionIniciada && usuarioActual) {
                let enlacePerfil = `<li><a class="dropdown-item" href="perfil.html">Mi Perfil</a></li>`;
                let enlaceAdmin = '';

                if (usuarioActual.esAdmin) {
                    enlaceAdmin = `<li><a class="dropdown-item" href="admin.html">Panel de Admin</a></li>`;
                }

                botonesAutenticacion.innerHTML = `
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="menuDesplegableUsuario" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: var(--color-texto-principal);">
                            Hola, ${usuarioActual.nombre}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuDesplegableUsuario">
                            ${enlacePerfil}
                            ${enlaceAdmin}
                            <li><hr class="dropdown-divider"></li>
                            <li><button id="botonCerrarSesion" class="dropdown-item">Cerrar sesión</button></li>
                        </ul>
                    </div>
                `;
                document.getElementById('botonCerrarSesion').addEventListener('click', () => {
                    localStorage.removeItem('sesionIniciada');
                    localStorage.removeItem('usuarioActual');
                    localStorage.removeItem('carrito');
                    alert('Has cerrado sesión.');
                    window.location.href = 'index.html';
                });
            } else {
                botonesAutenticacion.innerHTML = `
                    <a href="ingreso.html" class="btn btn-sm btn-acento" style="background-color: var(--color-primario);">
                        <span style="color:#fff;">Iniciar sesión</span>
                    </a>
                    <a href="registro.html" class="btn btn-sm btn-acento" style="background-color: var(--color-primario);">
                        <span style="color:#fff;">Regístrate</span>
                    </a>
                `;
            }
        }
    }

    if (!window.location.pathname.includes('admin')) {
        actualizarInterfazAutenticacion();
    }
});