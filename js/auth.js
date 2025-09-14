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
            
            // Verifica si el usuario existe y si la contraseña coincide
            if (user && user.pwd === pwd) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                showAlert(`¡Bienvenido de nuevo, ${user.nombre}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Si el usuario no se encuentra o la contraseña no coincide
                showAlert('Credenciales incorrectas.', 'danger');
            }
        });
    }
});