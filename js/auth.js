document.addEventListener('DOMContentLoaded', () => {
    // --- Función para mostrar alertas de Bootstrap (Accesible globalmente en este script) ---
    function showAlert(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        if (alertContainer) {
            alertContainer.innerHTML = '';
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
            alertDiv.setAttribute('role', 'alert');
            alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            alertContainer.appendChild(alertDiv);
        }
    }

    // --- Funciones de validación ---
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidPassword(pwd) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasLowerCase = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd);
        return pwd.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }

    // --- LÓGICA DE REGISTRO (en registro.html) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const pwd = document.getElementById('pwd').value;
            const pwd2 = document.getElementById('pwd2').value;

            if (pwd !== pwd2) {
                showAlert('Las contraseñas no coinciden.', 'danger');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Por favor, introduce un correo electrónico con un formato válido.', 'danger');
                return;
            }

            if (!isValidPassword(pwd)) {
                showAlert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.', 'danger');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                showAlert('El correo electrónico ya está registrado.', 'warning');
                return;
            }

            users.push({ nombre, email, pwd });
            localStorage.setItem('users', JSON.stringify(users));

            showAlert('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // --- LÓGICA DE INICIO DE SESIÓN (en login.html) ---
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
                showAlert(`¡Bienvenido de nuevo, ${user.nombre}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showAlert('Credenciales incorrectas.', 'danger');
            }
        });
    }

    // --- LÓGICA DE LA BARRA DE NAVEGACIÓN (en todas las páginas) ---
    window.updateAuthUI = function() {
        const authButtons = document.getElementById('authButtons');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (authButtons) {
            authButtons.innerHTML = ''; 

            if (isLoggedIn && currentUser) {
                const welcomeMessage = document.createElement('span');
                welcomeMessage.className = 'nav-link text-main me-2';
                welcomeMessage.textContent = `Hola, ${currentUser.nombre}`;
                authButtons.appendChild(welcomeMessage);

                const logoutButton = document.createElement('button');
                logoutButton.className = 'btn btn-sm btn-primary';
                logoutButton.textContent = 'Cerrar Sesión';
                logoutButton.addEventListener('click', () => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('cart');
                    window.location.href = 'index.html';
                });
                authButtons.appendChild(logoutButton);

            } else {
                const loginButton = document.createElement('a');
                loginButton.className = 'btn btn-sm btn-primary';
                loginButton.href = 'login.html';
                loginButton.textContent = 'Iniciar Sesión';
                authButtons.appendChild(loginButton);

                const registerButton = document.createElement('a');
                registerButton.className = 'btn btn-sm btn-primary';
                registerButton.href = 'registro.html';
                registerButton.textContent = 'Registrarse';
                authButtons.appendChild(registerButton);
            }
        }
    }

    // Llamada inicial para renderizar la UI
    updateAuthUI();
});