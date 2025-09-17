document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA DE REGISTRO
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const pwd = document.getElementById('pwd').value;
            const pwd2 = document.getElementById('pwd2').value;
            if (pwd !== pwd2) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                alert('El correo electrónico ya está registrado.');
                return;
            }
            users.push({ nombre, email, pwd, historial: [] });
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
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);
            if (user && user.pwd === pwd) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`¡Bienvenido de nuevo, ${user.nombre}!`);
                window.location.href = 'index.html';
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
                authButtons.innerHTML = `
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: var(--color-text-main);">
                            Hola, ${currentUser.nombre}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="perfil.html">Mi Perfil</a></li>
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

    // Llama a la función para que se ejecute al cargar la página
    updateAuthUI();
});