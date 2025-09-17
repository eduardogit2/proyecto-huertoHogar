document.addEventListener('DOMContentLoaded', () => {
    // 1. Redirección si no hay sesión
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Debes iniciar sesión para ver tu perfil.');
        window.location.href = 'login.html';
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileForm = document.getElementById('profileForm');
    const profileNombreInput = document.getElementById('profileNombre');
    const profileEmailInput = document.getElementById('profileEmail');
    const profilePasswordInput = document.getElementById('profilePassword');
    const addressForm = document.getElementById('addressForm');
    const addressCalleInput = document.getElementById('addressCalle');
    const addressCiudadInput = document.getElementById('addressCiudad');
    const addressRegionInput = document.getElementById('addressRegion');
    const purchaseHistoryContainer = document.getElementById('purchase-history');
    const noHistoryMessage = document.getElementById('no-history-message');

    // 2. Cargar datos del usuario al iniciar la página
    profileNombreInput.value = currentUser.nombre || '';
    profileEmailInput.value = currentUser.email || '';
    if (currentUser.direccion) {
        addressCalleInput.value = currentUser.direccion.calle || '';
        addressCiudadInput.value = currentUser.direccion.ciudad || '';
        addressRegionInput.value = currentUser.direccion.region || '';
    }

    // 3. Función para guardar los datos en localStorage
    function saveCurrentUser(updatedUser) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(u => u.email === updatedUser.email);
        if (userIndex !== -1) {
            allUsers[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(allUsers));
        }
    }

    // 4. Manejar el envío de formularios
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.nombre = profileNombreInput.value;
        if (profilePasswordInput.value) {
            currentUser.password = profilePasswordInput.value;
        }
        saveCurrentUser(currentUser);
        alert('Datos personales actualizados con éxito.');
        updateAuthUI();
    });

    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.direccion = {
            calle: addressCalleInput.value,
            ciudad: addressCiudadInput.value,
            region: addressRegionInput.value
        };
        saveCurrentUser(currentUser);
        alert('Dirección de envío actualizada con éxito.');
    });

    // 5. Cargar y renderizar el historial de compras
    function renderPurchaseHistory() {
        const history = currentUser.historial || [];
        purchaseHistoryContainer.innerHTML = '';
        if (history.length === 0) {
            noHistoryMessage.style.display = 'block';
            return;
        }
        noHistoryMessage.style.display = 'none';
        history.forEach(purchase => {
            const purchaseItem = document.createElement('div');
            purchaseItem.className = 'list-group-item list-group-item-action mb-2';
            purchaseItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Pedido #${purchase.id}</h5>
                    <small>${new Date(purchase.date).toLocaleDateString()}</small>
                </div>
                <p class="mb-1">Total: ${purchase.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })}</p>
                <small>Productos: ${purchase.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</small>
            `;
            purchaseHistoryContainer.appendChild(purchaseItem);
        });
    }

    renderPurchaseHistory();

    // 6. Actualizar la barra de navegación para mostrar el nombre del usuario
    function updateAuthUI() {
        const authButtons = document.getElementById('authButtons');
        if (!authButtons) return;
        const updatedUser = JSON.parse(localStorage.getItem('currentUser'));
        authButtons.innerHTML = `
            <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: var(--color-text-main);">
                    Hola, ${updatedUser.nombre}
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
            alert('Has cerrado sesión.');
            window.location.href = 'index.html';
        });
    }
    updateAuthUI();
});