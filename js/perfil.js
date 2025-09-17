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
    const profileRutInput = document.getElementById('profileRut');
    const addressForm = document.getElementById('addressForm');
    const addressesContainer = document.getElementById('addressesContainer');
    const purchaseHistoryContainer = document.getElementById('purchase-history');
    const noHistoryMessage = document.getElementById('no-history-message');

    // DATOS DE SUCURSALES (CORREGIDOS para coincidir con el historial de compras)
    const sucursales = {
        'Santiago Centro': { lat: -33.447487, lng: -70.665365, direccion: 'Av. Libertador 123, Santiago' },
        'Santiago Oriente': { lat: -33.414983, lng: -70.569426, direccion: 'Av. Apoquindo 456, Las Condes' },
        'Santiago Poniente': { lat: -33.473531, lng: -70.766735, direccion: 'Av. Pajaritos 789, Maipú' },
        'Concepción': { lat: -36.82766, lng: -73.05036, direccion: 'Av. O’Higgins 321' },
        'Viña del Mar': { lat: -33.023215, lng: -71.551398, direccion: 'Av. Valparaíso 654' },
        'Puerto Montt': { lat: -41.47294, lng: -72.93722, direccion: 'Mall Paseo Costanera Piso 2 Local 21' },
        'Villarrica': { lat: -39.2842, lng: -72.2285, direccion: 'Calle Fresia 75, Villarrica' },
        'Nacimiento': { lat: -37.5085, lng: -72.6369, direccion: 'Calle El Roble 10, Nacimiento' },
        'Valparaíso': { lat: -33.0458, lng: -71.6197, direccion: 'Calle Condell 500, Valparaíso' }
    };
    
    // Función para encontrar la sucursal más cercana basándose en la región de la dirección del usuario
    function findNearestSucursal(userAddress) {
        if (!userAddress) return 'Desconocida';
        const region = userAddress.split(',').pop().trim().toLowerCase();

        if (region.includes('metropolitana')) return 'Santiago Centro';
        if (region.includes('valparaíso')) return 'Valparaíso';
        if (region.includes('biobío')) return 'Concepción';
        if (region.includes('los lagos')) return 'Puerto Montt';
        if (region.includes('la araucanía')) return 'Villarrica';
        if (region.includes('coquimbo')) return 'Coquimbo';
        if (region.includes('o\'higgins')) return 'Santiago Poniente'; // Suponemos una sucursal cercana
        return 'Santiago Centro'; // Sucursal por defecto
    }
    
    // Función de validación de RUT
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
        if (!currentUser.addresses) {
            currentUser.addresses = [];
            saveCurrentUser(currentUser);
        }
        
        if (currentUser.addresses.length === 0) {
            addressesContainer.innerHTML = '<p class="text-muted">No tienes direcciones guardadas.</p>';
        } else {
            currentUser.addresses.forEach((addr, index) => {
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

            const tipoEntrega = purchase.tipoEntrega || 'Retiro en Sucursal';
            
            let entregaInfoText = '';
            let dataInfoValue = '';
            let buttonText = 'Ver más';
            let buttonClass = '';

            if (tipoEntrega.toLowerCase() === 'domicilio') {
                const nearestSucursal = findNearestSucursal(purchase.direccion);
                entregaInfoText = `Dirección: ${purchase.direccion || 'Sin dirección'}`;
                dataInfoValue = purchase.direccion || 'Sin dirección';
                buttonText = 'Ver Seguimiento';
                buttonClass = 'btn-success'; // CAMBIO A COLOR VERDE

                purchaseItem.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Pedido #${purchase.id}</h5>
                        <small>${new Date(purchase.date).toLocaleDateString()}</small>
                    </div>
                    <p class="mb-1">Tipo de Entrega: <strong class="text-capitalize">${tipoEntrega}</strong></p>
                    <p class="mb-1">${entregaInfoText}</p>
                    <p class="mb-1">Estado: <span class="badge bg-success">En Reparto</span></p>
                    <p class="mb-1 text-muted small">Despachado desde sucursal: ${nearestSucursal}</p>
                    <small>Productos: ${purchase.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</small>
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm ${buttonClass} track-btn" 
                            data-bs-toggle="modal" 
                            data-bs-target="#trackingModal"
                            data-tipo-entrega="${tipoEntrega}" 
                            data-info="${dataInfoValue}"
                            data-sucursal-origen="${nearestSucursal}">
                            ${buttonText}
                        </button>
                    </div>
                `;
            } else {
                entregaInfoText = `Sucursal: ${purchase.sucursal || 'Sin sucursal'}`;
                dataInfoValue = purchase.sucursal || 'Sin sucursal';
                buttonText = 'Ver Ubicación';
                buttonClass = 'btn-success';

                purchaseItem.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Pedido #${purchase.id}</h5>
                        <small>${new Date(purchase.date).toLocaleDateString()}</small>
                    </div>
                    <p class="mb-1">Tipo de Entrega: <strong class="text-capitalize">${tipoEntrega}</strong></p>
                    <p class="mb-1">${entregaInfoText}</p>
                    <p class="mb-1">Estado: <span class="badge bg-primary">Listo para Retirar</span></p>
                    <small>Productos: ${purchase.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</small>
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm ${buttonClass} track-btn" 
                            data-bs-toggle="modal" 
                            data-bs-target="#trackingModal"
                            data-tipo-entrega="${tipoEntrega}" 
                            data-info="${dataInfoValue}">
                            ${buttonText}
                        </button>
                    </div>
                `;
            }

            purchaseHistoryContainer.appendChild(purchaseItem);
        });
    }

    // Lógica para mostrar la información del pedido en el modal
    const trackingModal = document.getElementById('trackingModal');
    trackingModal.addEventListener('shown.bs.modal', event => {
        const button = event.relatedTarget;
        const tipoEntrega = button.getAttribute('data-tipo-entrega');
        const info = button.getAttribute('data-info');
        const modalTitle = document.getElementById('trackingModalTitle');
        const modalBody = document.getElementById('trackingModalBody');

        let content = '';
        if (tipoEntrega.toLowerCase() === 'retiro en sucursal') {
            const sucursalData = sucursales[info];
            modalTitle.textContent = 'Detalles de la Sucursal';
            if (sucursalData) {
                content = `
                    <p><strong>Sucursal:</strong> ${info}</p>
                    <p><strong>Dirección:</strong> ${sucursalData.direccion}</p>
                    <p><strong>Estado:</strong> <span class="badge bg-primary">Listo para Retirar</span></p>
                    <div id="sucursal-map" style="height: 300px; width: 100%;"></div>
                `;
            } else {
                content = `<p><strong>Sucursal:</strong> ${info}</p>
                           <p>Dirección no disponible. Contacte a soporte.</p>`;
            }
        } else if (tipoEntrega.toLowerCase() === 'domicilio') {
            const sucursalOrigen = button.getAttribute('data-sucursal-origen');
            modalTitle.textContent = 'Seguimiento del Pedido';
            content = `<p>Tu pedido será enviado a la dirección: <strong>${info}</strong>.</p>
                       <p><strong>Estado:</strong> <span class="badge bg-success">En Reparto</span></p>
                       <p><strong>Origen:</strong> Sucursal ${sucursalOrigen}</p>
                       <p><strong>Tiempo estimado de llegada:</strong> 1-2 días hábiles</p>
                       <div id="tracking-map" style="height: 300px; width: 100%; margin-top: 1rem;"></div>`; // AÑADIDO: Elemento para el mapa de seguimiento
        } else {
            modalTitle.textContent = 'Información del Pedido';
            content = `<p>No se encontró información detallada para este pedido.</p>`;
        }
        
        modalBody.innerHTML = content;

        if (tipoEntrega.toLowerCase() === 'retiro en sucursal' && sucursales[info]) {
            const sucursalData = sucursales[info];
            const mapOptions = {
                center: { lat: sucursalData.lat, lng: sucursalData.lng },
                zoom: 15
            };
            const map = new google.maps.Map(document.getElementById('sucursal-map'), mapOptions);
            
            new google.maps.marker.AdvancedMarkerElement({
                position: { lat: sucursalData.lat, lng: sucursalData.lng },
                map: map,
                title: info
            });
        }
        // AÑADIDO: Lógica para mostrar el mapa de seguimiento a domicilio
        if (tipoEntrega.toLowerCase() === 'domicilio') {
            const geocoder = new google.maps.Geocoder();
            const sucursalOrigen = button.getAttribute('data-sucursal-origen');
            const sucursalCoords = sucursales[sucursalOrigen];

            if (sucursalCoords) {
                geocoder.geocode({ 'address': info + ', Chile' }, (results, status) => {
                    if (status === 'OK') {
                        const userLocation = results[0].geometry.location;
                        const mapOptions = {
                            center: userLocation,
                            zoom: 12
                        };
                        const map = new google.maps.Map(document.getElementById('tracking-map'), mapOptions);

                        // Marcador para la dirección del usuario
                        new google.maps.marker.AdvancedMarkerElement({
                            position: userLocation,
                            map: map,
                            title: 'Tu Dirección'
                        });

                        // Marcador para la sucursal de origen
                        new google.maps.marker.AdvancedMarkerElement({
                            position: sucursalCoords,
                            map: map,
                            title: 'Sucursal de Origen'
                        });
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        }
    });

    // Manejar el envío del formulario de perfil
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newNombre = profileNombreInput.value;
        const newPassword = profilePasswordInput.value;
        const newRut = profileRutInput.value;

        if (!validarRut(newRut)) {
            alert('El RUT ingresado no es válido.');
            return;
        }
        if (newPassword && (newPassword.length < 4 || newPassword.length > 10)) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

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
        const calle = document.getElementById('addressCalle').value.trim();
        const ciudad = document.getElementById('addressCiudad').value.trim();
        const region = document.getElementById('addressRegion').value.trim();

        const isDuplicate = currentUser.addresses.some(addr => 
            addr.calle === calle && addr.ciudad === ciudad && addr.region === region
        );

        const isEditing = addressForm.dataset.editing === 'true';

        if (!isEditing && isDuplicate) {
            alert('Esta dirección ya existe en tu lista.');
            return;
        }
        
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

    // Lógica para autocompletar la dirección con Google Maps Places API
    const addressInput = document.getElementById('addressCalle');
    const cityInput = document.getElementById('addressCiudad');
    const regionInput = document.getElementById('addressRegion');

    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocomplete = new google.maps.places.Autocomplete(addressInput, {
            types: ['address'],
            componentRestrictions: { 'country': 'cl' } // Restringe los resultados a Chile
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) {
                return;
            }

            // Limpiar campos
            addressInput.value = '';
            cityInput.value = '';
            regionInput.value = '';

            // Obtener componentes de la dirección y rellenar los campos
            for (const component of place.address_components) {
                const componentType = component.types[0];

                switch (componentType) {
                    case 'street_number': {
                        addressInput.value = `${component.long_name} `;
                        break;
                    }
                    case 'route': {
                        addressInput.value += component.long_name;
                        break;
                    }
                    case 'locality': { // Ciudad
                        cityInput.value = component.long_name;
                        break;
                    }
                    case 'administrative_area_level_1': { // Región
                        regionInput.value = component.long_name;
                        break;
                    }
                }
            }
        });
    } else {
        console.error("Google Maps Places API no se ha cargado correctamente.");
    }

    // Llama a las funciones iniciales para cargar los datos
    loadUserData();
    renderAddresses();
    renderPurchaseHistory();
});