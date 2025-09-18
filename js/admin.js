document.addEventListener('DOMContentLoaded', () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html';
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }

    // --- Funciones de Validación ---
    function validarProductoFormulario() {
        const codigo = document.getElementById('codigoProductoEditar')?.value.trim() || '';
        const nombre = document.getElementById('nombreProductoEditar')?.value.trim() || '';
        const descripcion = document.getElementById('descripcionProductoEditar')?.value.trim() || '';
        const precio = parseFloat(document.getElementById('precioProductoEditar')?.value);
        const stock = parseInt(document.getElementById('stockProductoEditar')?.value, 10);
        const stockCritico = document.getElementById('stockCriticoProductoEditar')?.value.trim(); // Se deja como string para la validación
        const categoria = document.getElementById('categoriaProductoEditar')?.value || '';
        const descuento = parseInt(document.getElementById('descuentoProductoEditar')?.value, 10);

        // Limpiar mensajes de error previos
        document.querySelectorAll(`.error-message`).forEach(el => el.textContent = '');

        let esValido = true;
        // Validación del Código (ID)
        if (codigo.length < 3) { esValido = false; document.getElementById(`error-codigo-editar`).textContent = 'Código requerido y mínimo 3 caracteres.'; }
        if (nombre.length === 0 || nombre.length > 100) { esValido = false; document.getElementById(`error-nombre-editar`).textContent = 'Nombre requerido y máximo 100 caracteres.'; }
        if (descripcion.length > 500) { esValido = false; document.getElementById(`error-descripcion-editar`).textContent = 'Máximo 500 caracteres.'; }
        if (isNaN(precio) || precio < 0) { esValido = false; document.getElementById(`error-precio-editar`).textContent = 'Precio requerido y debe ser un número >= 0.'; }
        if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) { esValido = false; document.getElementById(`error-stock-editar`).textContent = 'Stock requerido, número entero >= 0.'; }
        
        // Validación del Stock Crítico (OPCIONAL)
        if (stockCritico !== '' && (isNaN(parseInt(stockCritico)) || parseInt(stockCritico) < 0 || !Number.isInteger(parseInt(stockCritico)))) {
            esValido = false;
            document.getElementById(`error-stock-critico-editar`).textContent = 'Stock crítico es opcional, pero si lo ingresas debe ser un número entero >= 0.';
        }
        
        if (categoria === '') { esValido = false; document.getElementById(`error-categoria-editar`).textContent = 'Selecciona una categoría.'; }
        if (isNaN(descuento) || descuento < 0 || descuento > 100 || !Number.isInteger(descuento)) { esValido = false; document.getElementById(`error-descuento-editar`).textContent = 'Descuento debe ser un número entero entre 0 y 100.'; }

        return esValido;
    }

    function validarUsuarioFormulario(elementIdPrefix) {
        const run = document.getElementById(`${elementIdPrefix}runUsuario`)?.value.trim().toUpperCase() || '';
        const nombre = document.getElementById(`${elementIdPrefix}nombreUsuario`)?.value.trim() || '';
        const apellidos = document.getElementById(`${elementIdPrefix}apellidosUsuario`)?.value.trim() || '';
        const correo = document.getElementById(`${elementIdPrefix}correoUsuario`)?.value.trim() || '';
        const tipoUsuario = document.getElementById(`${elementIdPrefix}tipoUsuario`)?.value || '';

        document.querySelectorAll(`.error-message`).forEach(el => el.textContent = '');

        let esValido = true;
        if (!validarRut(run)) { esValido = false; document.getElementById(`error-run${elementIdPrefix}`).textContent = 'RUN inválido.'; }
        if (nombre.length === 0 || nombre.length > 50) { esValido = false; document.getElementById(`error-nombre${elementIdPrefix}`).textContent = 'Nombre requerido, máximo 50 caracteres.'; }
        if (apellidos.length === 0 || apellidos.length > 100) { esValido = false; document.getElementById(`error-apellidos${elementIdPrefix}`).textContent = 'Apellidos requeridos, máximo 100 caracteres.'; }
        if (!validarEmail(correo)) { esValido = false; document.getElementById(`error-correo${elementIdPrefix}`).textContent = 'Correo inválido. Solo @duoc.cl, @profesor.duoc.cl y @gmail.com.'; }
        if (tipoUsuario === '') { esValido = false; document.getElementById(`error-tipo-usuario${elementIdPrefix}`).textContent = 'Selecciona un tipo de usuario.'; }

        return esValido;
    }

    function validarRut(rut) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) return false;
        let tmp = rut.split('-');
        let digv = tmp[1];
        let rutSolo = tmp[0];
        if (digv === 'K') digv = 'k';
        let suma = 0;
        let factor = 2;
        for (let i = rutSolo.length - 1; i >= 0; i--) { suma += parseInt(rutSolo.charAt(i)) * factor; factor = (factor === 7) ? 2 : factor + 1; }
        let dvCalculado = 11 - (suma % 11);
        if (dvCalculado === 11) dvCalculado = '0';
        if (dvCalculado === 10) dvCalculado = 'k';
        return dvCalculado.toString() === digv;
    }

    function validarEmail(email) {
        const emailRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return emailRegex.test(email);
    }

    // --- Lógica de la página de Productos ---
    const productosTableBody = document.getElementById('productos-table-body');
    const noProductsMessage = document.getElementById('no-products-message');
    const editarProductoModalEl = document.getElementById('editarProductoModal');
    let editarProductoModal = null;

    function obtenerCategoriasUnicas() {
        const productosGuardados = JSON.parse(localStorage.getItem('productsWithReviews')) || [];
        const categoriasSet = new Set(productosGuardados.map(p => p.category));
        return Array.from(categoriasSet).filter(Boolean);
    }

    if (editarProductoModalEl) {
        editarProductoModal = new bootstrap.Modal(editarProductoModalEl);
        const formularioEditarProducto = document.getElementById('formularioEditarProducto');

        function renderizarProductosAdmin() {
            const productos = JSON.parse(localStorage.getItem('productsWithReviews')) || [];
            if (productosTableBody) {
                productosTableBody.innerHTML = '';
                if (productos.length === 0) {
                    noProductsMessage.style.display = 'block';
                } else {
                    noProductsMessage.style.display = 'none';
                    productos.forEach(producto => {
                        const fila = document.createElement('tr');
                        
                        const precioFinal = producto.discountPrice !== undefined ? producto.discountPrice : producto.price;
                        const precioDisplay = precioFinal === 0 ? 'Gratis' : `$${(precioFinal || 0).toFixed(2)}`;
                        const stockCriticoAlerta = (producto.stockCritico !== null && producto.stock <= producto.stockCritico) ? '<span class="badge bg-danger ms-2">Stock Crítico</span>' : '';
                        
                        // CORRECCIÓN: Se añade la categoría y se cambia el color de la etiqueta
                        fila.innerHTML = `
                            <td>${producto.id || ''}</td>
                            <td>${producto.name}</td>
                            <td>${precioDisplay}</td>
                            <td>${producto.stock} ${stockCriticoAlerta}</td>
                            <td>${producto.category || 'N/A'}</td>
                            <td>${producto.origin || 'N/A'}</td>
                            <td><span class="badge bg-success">${producto.badge || 'Normal'}</span></td>
                            <td>
                                <button class="btn btn-sm btn-warning editar-btn" data-id="${producto.id}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-danger eliminar-btn" data-id="${producto.id}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        productosTableBody.appendChild(fila);
                    });
                }
            }
        }

        if (productosTableBody) {
            productosTableBody.addEventListener('click', (e) => {
                 if (e.target.closest('.eliminar-btn')) {
                    const productId = parseInt(e.target.closest('.eliminar-btn').dataset.id);
                    if (confirm(`¿Estás seguro de que quieres eliminar el producto con ID: ${productId}?`)) {
                        let productos = JSON.parse(localStorage.getItem('productsWithReviews')) || [];
                        productos = productos.filter(p => p.id !== productId);
                        localStorage.setItem('productsWithReviews', JSON.stringify(productos));
                        renderizarProductosAdmin();
                        alert('Producto eliminado.');
                    }
                }
                
                if (e.target.closest('.editar-btn')) {
                    const productId = parseInt(e.target.closest('.editar-btn').dataset.id);
                    const productos = JSON.parse(localStorage.getItem('productsWithReviews')) || [];
                    const productoAEditar = productos.find(p => p.id === productId);

                    if (productoAEditar) {
                        const descuento = productoAEditar.discountPrice ? Math.round(((productoAEditar.price - productoAEditar.discountPrice) / productoAEditar.price) * 100) : 0;

                        document.getElementById('productoIdEditar').value = productoAEditar.id;
                        document.getElementById('codigoProductoEditar').value = productoAEditar.id;
                        document.getElementById('nombreProductoEditar').value = productoAEditar.name;
                        document.getElementById('descripcionProductoEditar').value = productoAEditar.description || '';
                        document.getElementById('precioProductoEditar').value = productoAEditar.price;
                        document.getElementById('stockProductoEditar').value = productoAEditar.stock;
                        document.getElementById('stockCriticoProductoEditar').value = productoAEditar.stockCritico || '';
                        document.getElementById('descuentoProductoEditar').value = descuento;
                        document.getElementById('origenProductoEditar').value = productoAEditar.origin || '';
                        document.getElementById('unitProductoEditar').value = productoAEditar.unit || '';
                        document.getElementById('badgeProductoEditar').value = productoAEditar.badge || '';
                        
                        const categoriaSelect = document.getElementById('categoriaProductoEditar');
                        const categorias = obtenerCategoriasUnicas();
                        categoriaSelect.innerHTML = '<option value="" selected disabled>Selecciona una categoría</option>';
                        
                        categorias.forEach(cat => {
                            const option = document.createElement('option');
                            option.value = cat;
                            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                            if (cat === productoAEditar.category) {
                                option.selected = true;
                            }
                            categoriaSelect.appendChild(option);
                        });
                        
                        editarProductoModal.show();
                    } else {
                        alert('Producto no encontrado.');
                    }
                }
            });
        }

        if (formularioEditarProducto) {
            formularioEditarProducto.addEventListener('submit', (evento) => {
                evento.preventDefault();
                const oldId = parseInt(document.getElementById('productoIdEditar').value);
                let productos = JSON.parse(localStorage.getItem('productsWithReviews')) || [];
                const productoIndex = productos.findIndex(p => p.id === oldId);

                if (productoIndex !== -1) {
                    const precio = parseFloat(document.getElementById('precioProductoEditar').value);
                    const descuento = parseInt(document.getElementById('descuentoProductoEditar').value, 10);
                    const stockCritico = document.getElementById('stockCriticoProductoEditar').value.trim();

                    productos[productoIndex] = {
                        ...productos[productoIndex],
                        id: parseInt(document.getElementById('codigoProductoEditar').value.trim()),
                        name: document.getElementById('nombreProductoEditar').value.trim(),
                        description: document.getElementById('descripcionProductoEditar').value.trim(),
                        price: precio,
                        stock: parseInt(document.getElementById('stockProductoEditar').value, 10),
                        stockCritico: stockCritico === '' ? null : parseInt(stockCritico, 10),
                        category: document.getElementById('categoriaProductoEditar').value,
                        origin: document.getElementById('origenProductoEditar').value.trim(),
                        unit: document.getElementById('unitProductoEditar').value.trim(),
                        badge: document.getElementById('badgeProductoEditar').value.trim(),
                        discountPrice: descuento > 0 ? precio * (1 - descuento / 100) : undefined
                    };
                    
                    localStorage.setItem('productsWithReviews', JSON.stringify(productos));
                    renderizarProductosAdmin();
                    alert('✅ Producto editado con éxito.');
                    editarProductoModal.hide();
                }
            });
        }
        renderizarProductosAdmin();
    }

     // --- Lógica de la página de Usuarios (sin cambios) ---
    // ...
});

    // --- Lógica de la página de Usuarios ---
    const usuariosTableBody = document.getElementById('usuarios-table-body');
    const noUsersMessage = document.getElementById('no-users-message');
    const editarUsuarioModalEl = document.getElementById('editarUsuarioModal');
    let editarUsuarioModal = null;

    if (editarUsuarioModalEl) {
        editarUsuarioModal = new bootstrap.Modal(editarUsuarioModalEl);
        const formularioEditarUsuario = document.getElementById('formularioEditarUsuario');

        function renderizarUsuariosAdmin() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (usuariosTableBody) {
                usuariosTableBody.innerHTML = '';
                if (users.length === 0) {
                    noUsersMessage.style.display = 'block';
                } else {
                    noUsersMessage.style.display = 'none';
                    users.forEach(user => {
                        const fila = document.createElement('tr');
                        const userRol = user.isAdmin ? 'Administrador' : (user.isVendedor ? 'Vendedor' : 'Cliente');
                        fila.innerHTML = `
                            <td>${user.rut || 'N/A'}</td>
                            <td>${user.nombre} ${user.apellidos || ''}</td>
                            <td>${user.email}</td>
                            <td>${userRol}</td>
                            <td>
                                <button class="btn btn-sm btn-warning editar-btn" data-email="${user.email}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-danger eliminar-btn" data-email="${user.email}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        usuariosTableBody.appendChild(fila);
                    });
                }
            }
        }

        if (usuariosTableBody) {
            usuariosTableBody.addEventListener('click', (e) => {
                if (e.target.closest('.eliminar-btn')) {
                    const userEmail = e.target.closest('.eliminar-btn').dataset.email;
                    if (confirm(`¿Estás seguro de que quieres eliminar al usuario con correo: ${userEmail}?`)) {
                        let users = JSON.parse(localStorage.getItem('users')) || [];
                        users = users.filter(u => u.email !== userEmail);
                        localStorage.setItem('users', JSON.stringify(users));
                        renderizarUsuariosAdmin();
                        alert('Usuario eliminado.');
                    }
                }

                if (e.target.closest('.editar-btn')) {
                    const userEmail = e.target.closest('.editar-btn').dataset.email;
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userAEditar = users.find(u => u.email === userEmail);

                    if (userAEditar) {
                        document.getElementById('usuarioEmailEditar').value = userAEditar.email;
                        document.getElementById('runUsuarioEditar').value = userAEditar.rut || '';
                        document.getElementById('nombreUsuarioEditar').value = userAEditar.nombre;
                        document.getElementById('apellidosUsuarioEditar').value = userAEditar.apellidos || '';
                        document.getElementById('correoUsuarioEditar').value = userAEditar.email;
                        
                        let userRole = 'cliente';
                        if (userAEditar.isAdmin) userRole = 'administrador';
                        else if (userAEditar.isVendedor) userRole = 'vendedor';
                        document.getElementById('tipoUsuarioEditar').value = userRole;

                        editarUsuarioModal.show();
                    } else {
                        alert('Usuario no encontrado.');
                    }
                }
            });
        }

        if (formularioEditarUsuario) {
            formularioEditarUsuario.addEventListener('submit', (evento) => {
                evento.preventDefault();
                if (validarUsuarioFormulario('Editar')) {
                    const email = document.getElementById('usuarioEmailEditar').value;
                    const run = document.getElementById('runUsuarioEditar').value.trim().toUpperCase();
                    const nombre = document.getElementById('nombreUsuarioEditar').value.trim();
                    const apellidos = document.getElementById('apellidosUsuarioEditar').value.trim();
                    const tipoUsuario = document.getElementById('tipoUsuarioEditar').value;

                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex(u => u.email === email);

                    if (userIndex !== -1) {
                        users[userIndex].rut = run;
                        users[userIndex].nombre = nombre;
                        users[userIndex].apellidos = apellidos;
                        users[userIndex].isAdmin = tipoUsuario === 'administrador';
                        users[userIndex].isVendedor = tipoUsuario === 'vendedor';

                        localStorage.setItem('users', JSON.stringify(users));
                        renderizarUsuariosAdmin();

                        alert('✅ Usuario editado con éxito.');
                        editarUsuarioModal.hide();
                    }
                }
            });
        }

        renderizarUsuariosAdmin();
    }