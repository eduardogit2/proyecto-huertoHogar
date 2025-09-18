document.addEventListener('DOMContentLoaded', () => {

    // FUNCIÓN DE VALIDACIÓN DE RUT
    function validarRut(rut) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
            return false;
        }
        let tmp = rut.split('-');
        let digv = tmp[1];
        let rutSolo = tmp[0];
        if (digv === 'K') digv = 'k';
        let suma = 0;
        let factor = 2;
        for (let i = rutSolo.length - 1; i >= 0; i--) {
            suma += parseInt(rutSolo.charAt(i)) * factor;
            factor = (factor === 7) ? 2 : factor + 1;
        }
        let dvCalculado = 11 - (suma % 11);
        if (dvCalculado === 11) dvCalculado = '0';
        if (dvCalculado === 10) dvCalculado = 'k';
        return dvCalculado.toString() === digv;
    }

    // FUNCIÓN DE VALIDACIÓN DE DOMINIOS DE CORREO
    function validarEmail(email) {
        const emailRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return emailRegex.test(email);
    }

    // --- FUNCIÓN CENTRAL DE GESTIÓN DE USUARIOS ---
    // Esta función se encarga de obtener los usuarios y asegurar que el usuario administrador
    // exista siempre en el localStorage.
    function getUsersAndInitializeAdmin() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const adminUser = users.find(u => u.isAdmin);
        // Si no existe un usuario administrador, lo crea y lo añade.
        if (!adminUser) {
            const newAdmin = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                nombre: 'Admin',
                email: 'admin@huertohogar.cl',
                pwd: 'admin', // Se utiliza 'pwd' para la consistencia
                isAdmin: true
            };
            users.push(newAdmin);
            localStorage.setItem('users', JSON.stringify(users));
        }
        return users;
    }

    // LÓGICA DE REGISTRO
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const rut = document.getElementById('rut').value;
            const pwd = document.getElementById('pwd').value;
            const pwd2 = document.getElementById('pwd2').value;

            // VALIDACIONES
            if (!validarRut(rut)) {
                alert('El RUT ingresado no es válido.');
                return;
            }
            if (pwd.length < 4 || pwd.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                return;
            }
            if (pwd !== pwd2) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            if (!validarEmail(email)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                return;
            }

            const users = getUsersAndInitializeAdmin();
            if (users.find(user => user.email === email)) {
                alert('El correo electrónico ya está registrado.');
                return;
            }

            // Se agregó isAdmin: false por defecto para los nuevos registros
            const newUser = { nombre, email, rut, pwd, historial: [], isAdmin: false };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        });
    }

    // LÓGICA DE INICIO DE SESIÓN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const pwd = document.getElementById('pwd').value;

            // VALIDACIONES DE INICIO DE SESIÓN
            if (pwd.length < 4 || pwd.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                return;
            }

            // 👇 Ajuste aquí: permitimos que el admin se salte la validación de dominio
            if (email !== 'admin@huertohogar.cl' && !validarEmail(email)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                return;
            }

            const users = getUsersAndInitializeAdmin();
            const user = users.find(u => u.email === email && u.pwd === pwd);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`¡Bienvenido de nuevo, ${user.nombre}!`);

                if (user.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('Credenciales incorrectas.');
            }
        });
    }


    // LÓGICA DE LA BARRA DE NAVEGACIÓN
    function updateAuthUI() {
        const authButtons = document.getElementById('authButtons');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (authButtons) {
            authButtons.innerHTML = '';
            if (isLoggedIn && currentUser) {
                let profileLink = `<li><a class="dropdown-item" href="perfil.html">Mi Perfil</a></li>`;
                let adminLink = '';

                if (currentUser.isAdmin) {
                    adminLink = `<li><a class="dropdown-item" href="admin.html">Panel de Admin</a></li>`;
                }

                authButtons.innerHTML = `
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: var(--color-text-main);">
                            Hola, ${currentUser.nombre}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            ${profileLink}
                            ${adminLink}
                            <li><hr class="dropdown-divider"></li>
                            <li><button id="logoutBtn" class="dropdown-item">Cerrar sesión</button></li>
                        </ul>
                    </div>
                `;
                document.getElementById('logoutBtn').addEventListener('click', () => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('cart');
                    alert('Has cerrado sesión.');
                    window.location.href = 'index.html';
                });
            } else {
                authButtons.innerHTML = `
                    <a href="login.html" class="btn btn-sm btn-accent" style="background-color: var(--color-primary);">
                        <span style="color:#fff;">Iniciar sesión</span>
                    </a>
                    <a href="registro.html" class="btn btn-sm btn-accent" style="background-color: var(--color-primary);">
                        <span style="color:#fff;">Regístrate</span>
                    </a>
                `;
            }
        }
    }
    
    // Ejecuta updateAuthUI solo si no estás en el panel de administración
    if (!window.location.pathname.includes('admin')) {
      updateAuthUI();
    }
});