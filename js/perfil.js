document.addEventListener('DOMContentLoaded', () => {

    // Redirección si no hay sesión
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Debes iniciar sesión para ver tu perfil.');
        window.location.href = 'login.html';
        return;
    }

    // VARIABLES
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileForm = document.getElementById('profileForm');
    const profileNombreInput = document.getElementById('profileNombre');
    const profileEmailInput = document.getElementById('profileEmail');
    const profilePasswordInput = document.getElementById('profilePassword');
    const profileRutInput = document.getElementById('profileRut'); // Nuevo campo de RUT
    const addressForm = document.getElementById('addressForm');
    const addressesContainer = document.getElementById('addressesContainer'); // Contenedor para direcciones dinámicas
    const purchaseHistoryContainer = document.getElementById('purchase-history');
    const noHistoryMessage = document.getElementById('no-history-message');

    // Función de validación de RUT (copiada de auth.js)
    function validarRut(rut) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
            return false;
        }
        let tmp = rut.split('-');
        let digv = tmp[1];
        let rutSolo = tmp[0];
        if (digv == 'K') digv = 'k';
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

    // Función para guardar los datos en localStorage
    function saveCurrentUser(updatedUser) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(u => u.email === updatedUser.email);
        if (userIndex !== -1) {
            allUsers[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(allUsers));
        }
    }

    // Cargar datos del usuario al iniciar la página
    function loadUserData() {
        profileNombreInput.value = currentUser.nombre || '';
        profileEmailInput.value = currentUser.email || '';
        profileRutInput.value = currentUser.rut || '';
    }

    // Renderizar direcciones
    function renderAddresses() {
        addressesContainer.innerHTML = '';
        const addresses = currentUser.addresses || [];
        if (addresses.length === 0) {
            addressesContainer.innerHTML = '<p class="text-muted">No tienes direcciones guardadas.</p>';
        } else {
            addresses.forEach((addr, index) => {
                const addressCard = document.createElement('div');
                addressCard.className = 'card mb-2 shadow-sm p-3';
                addressCard.innerHTML = `
                    <p class="mb-1 fw-bold">Dirección #${index + 1}</p>
                    <p class="mb-1">${addr.calle}, ${addr.ciudad}, ${addr.region}</p>
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm btn-info edit-address-btn" data-index="${index}">Editar</button>
                        <button type="button" class="btn btn-sm btn-danger delete-address-btn" data-index="${index}">Eliminar</button>
                    </div>
                `;
                addressesContainer.appendChild(addressCard);
            });
        }
    }

    // Cargar y renderizar el historial de compras
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

    // Manejar el envío del formulario de perfil
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newNombre = profileNombreInput.value;
        const newPassword = profilePasswordInput.value;
        const newRut = profileRutInput.value;

        // Validaciones
        if (!validarRut(newRut)) {
            alert('El RUT ingresado no es válido.');
            return;
        }
        if (newPassword && (newPassword.length < 4 || newPassword.length > 10)) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        // Actualizar datos del usuario
        currentUser.nombre = newNombre;
        currentUser.rut = newRut;
        if (newPassword) {
            currentUser.pwd = newPassword;
        }
        
        saveCurrentUser(currentUser);
        alert('Datos personales actualizados con éxito.');
    });

    // Manejar el envío del formulario de dirección (agregar/editar)
    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const calle = document.getElementById('addressCalle').value;
        const ciudad = document.getElementById('addressCiudad').value;
        const region = document.getElementById('addressRegion').value;

        if (!currentUser.addresses) {
            currentUser.addresses = [];
        }

        const isEditing = addressForm.dataset.editing === 'true';

        if (isEditing) {
            const index = parseInt(addressForm.dataset.index);
            currentUser.addresses[index] = { calle, ciudad, region };
        } else {
            currentUser.addresses.push({ calle, ciudad, region });
        }

        saveCurrentUser(currentUser);
        renderAddresses();
        addressForm.reset();
        delete addressForm.dataset.editing;
        delete addressForm.dataset.index;
        document.querySelector('#addressForm button[type="submit"]').textContent = 'Guardar Dirección';
        alert('Dirección guardada con éxito.');
    });

    // Delegación de eventos para botones de edición y eliminación
    addressesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-address-btn')) {
            const index = e.target.dataset.index;
            const addressToEdit = currentUser.addresses[index];
            document.getElementById('addressCalle').value = addressToEdit.calle;
            document.getElementById('addressCiudad').value = addressToEdit.ciudad;
            document.getElementById('addressRegion').value = addressToEdit.region;
            addressForm.dataset.editing = 'true';
            addressForm.dataset.index = index;
            document.querySelector('#addressForm button[type="submit"]').textContent = 'Actualizar Dirección';
            // Cambiar a la pestaña de dirección
            document.getElementById('address-tab').click();
        }
        if (e.target.classList.contains('delete-address-btn')) {
            const index = e.target.dataset.index;
            if (confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
                currentUser.addresses.splice(index, 1);
                saveCurrentUser(currentUser);
                renderAddresses();
                alert('Dirección eliminada.');
            }
        }
    });

    // Llama a las funciones iniciales para cargar los datos
    loadUserData();
    renderAddresses();
    renderPurchaseHistory();
});