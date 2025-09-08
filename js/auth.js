document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE REGISTRO (en registro.html) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const nombre = document.getElementById('nombre').value; // <-- NUEVA LÍNEA
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
    
            // Guarda el nombre junto con el email y la contraseña
            users.push({ nombre, email, pwd }); // <-- MODIFICACIÓN
            localStorage.setItem('users', JSON.stringify(users));
    
            alert('¡Registro exitoso! Ahora puedes iniciar sesión!');
            window.location.href = 'login.html';
        });
    }

    // --- LÓGICA DE INICIO DE SESIÓN (en login.html) ---
    const loginForm = document.getElementById('loginForm');
    const alertContainer = document.getElementById('alertContainer');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const pwd = document.getElementById('pwd').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);
            
            alertContainer.innerHTML = ''; 

            if (!user) {
                showAlert('El correo electrónico no está registrado.', 'warning');
                return;
            }

            if (user.pwd !== pwd) {
                showAlert('La contraseña es incorrecta.', 'danger');
                return;
            }

            // Simular inicio de sesión exitoso
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            showAlert('¡Inicio de sesión exitoso!', 'success');
            
            // Redirigir al usuario después de un breve delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Función para mostrar alertas de Bootstrap
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertContainer.appendChild(alertDiv);
    }
});