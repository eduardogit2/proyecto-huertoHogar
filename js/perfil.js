document.addEventListener('DOMContentLoaded', () => {
    const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';
    if (!sesionIniciada) {
        alert('Debes iniciar sesión para ver tu perfil.');
        window.location.href = 'ingreso.html';
        return;
    }

    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const elementoPuntos = document.getElementById('puntos-fidelizacion');
    const formularioPerfil = document.getElementById('formularioPerfil');
    const inputNombrePerfil = document.getElementById('nombrePerfil');
    const inputCorreoPerfil = document.getElementById('correoPerfil');
    const inputContrasenaPerfil = document.getElementById('contrasenaPerfil');
    const inputRutPerfil = document.getElementById('rutPerfil');
    const formularioDireccion = document.getElementById('formularioDireccion');
    const contenedorDirecciones = document.getElementById('contenedorDirecciones');
    const contenedorHistorialCompras = document.getElementById('historial-compras');
    const mensajeSinHistorial = document.getElementById('mensaje-sin-historial');

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

    const estadosPedido = ['Confirmado', 'En preparación', 'En camino', 'Entregado'];
    const diasEntrega = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    function encontrarSucursalMasCercana(direccionUsuario) {
        if (!direccionUsuario) return 'Desconocida';
        const region = direccionUsuario.split(',').pop().trim().toLowerCase();
        if (region.includes('metropolitana')) return 'Santiago Centro';
        if (region.includes('valparaíso')) return 'Valparaíso';
        if (region.includes('biobío')) return 'Concepción';
        if (region.includes('los lagos')) return 'Puerto Montt';
        if (region.includes('la araucanía')) return 'Villarrica';
        return 'Santiago Centro';
    }

    function validarRut(rut) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) return false;
        let partes = rut.split('-');
        let digitoVerificador = partes[1];
        let rutSinDigito = partes[0];
        if (digitoVerificador == 'K') digitoVerificador = 'k';
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
    function formatearPrecio(numero) {
        return numero.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    }

    function guardarUsuarioActual(usuarioActualizado) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));
        const todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const indiceUsuario = todosLosUsuarios.findIndex(u => u.correo === usuarioActualizado.correo);
        if (indiceUsuario !== -1) {
            todosLosUsuarios[indiceUsuario] = usuarioActualizado;
            localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios));
        }
    }

    function cargarDatosUsuario() {
        inputNombrePerfil.value = usuarioActual.nombre || '';
        inputCorreoPerfil.value = usuarioActual.correo || '';
        inputRutPerfil.value = usuarioActual.rut || '';
        usuarioActual.puntos = usuarioActual.puntos || 0;
        elementoPuntos.textContent = `Puntos de fidelización: ${usuarioActual.puntos}`;
    }

    function renderizarDirecciones() {
        contenedorDirecciones.innerHTML = '';
        if (!usuarioActual.direcciones) {
            usuarioActual.direcciones = [];
            guardarUsuarioActual(usuarioActual);
        }
        if (usuarioActual.direcciones.length === 0) {
            contenedorDirecciones.innerHTML = '<p class="text-muted">No tienes direcciones guardadas.</p>';
        } else {
            usuarioActual.direcciones.forEach((dir, indice) => {
                const tarjetaDireccion = document.createElement('div');
                tarjetaDireccion.className = 'card mb-2 shadow-sm p-3';
                tarjetaDireccion.innerHTML = `
                    <p class="mb-1 fw-bold">Dirección #${indice + 1}</p>
                    <p class="mb-1">${dir.calle}, ${dir.ciudad}, ${dir.region}</p>
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm btn-info boton-editar-direccion" data-indice="${indice}">Editar</button>
                        <button type="button" class="btn btn-sm btn-danger boton-eliminar-direccion" data-indice="${indice}">Eliminar</button>
                    </div>
                `;
                contenedorDirecciones.appendChild(tarjetaDireccion);
            });
        }
    }

    function renderizarHistorialCompras() {
        const historial = usuarioActual.historial.map(compra => {
            if (!compra.estado) {
                return { ...compra, estado: 'Listo para Retirar' };
            }
            return compra;
        }) || [];
        
        contenedorHistorialCompras.innerHTML = '';
        if (historial.length === 0) {
            mensajeSinHistorial.style.display = 'block';
            return;
        }
        mensajeSinHistorial.style.display = 'none';
        historial.forEach(compra => {
            const itemCompra = document.createElement('div');
            itemCompra.className = 'list-group-item list-group-item-action mb-2';
            const tipoEntrega = compra.tipoEntrega || 'Retiro en Sucursal';
            let textoInfoEntrega = '';
            let valorDataInfo = '';
            let textoBoton = 'Ver más';
            let claseBoton = '';

            const estadoActual = compra.estado; 
            let claseEstado = '';
            switch (estadoActual) {
                case 'En preparación':
                    claseEstado = 'bg-warning text-dark';
                    break;
                case 'En camino':
                    claseEstado = 'bg-info text-dark';
                    break;
                case 'Entregado':
                    claseEstado = 'bg-success';
                    break;
                case 'Listo para Retirar':
                    claseEstado = 'bg-primary';
                    break;
                case 'Retirado':
                    claseEstado = 'bg-secondary';
                    break;
                default:
                    claseEstado = 'bg-primary';
            }

            // NUEVA LÓGICA: MOSTRAR DETALLES DE BOLETA
            const detallesBoleta = `
                <div class="row small text-muted mt-2">
                    <div class="col-6">
                        <p class="mb-0">Total original: <strong>${formatearPrecio(compra.totalOriginal)}</strong></p>
                        <p class="mb-0">Puntos usados: <strong>${compra.puntosUsados || 0}</strong></p>
                    </div>
                    <div class="col-6 text-end">
                        <p class="mb-0">Puntos ganados: <strong>${compra.puntosGanados || 0}</strong></p>
                        <p class="mb-0">Total final: <strong>${formatearPrecio(compra.totalFinal)}</strong></p>
                    </div>
                </div>
            `;
            
            if (tipoEntrega.toLowerCase() === 'domicilio') {
                const sucursalCercana = encontrarSucursalMasCercana(compra.direccion);
                textoInfoEntrega = `Dirección: ${compra.direccion || 'Sin dirección'}`;
                valorDataInfo = compra.direccion || 'Sin dirección';
                textoBoton = 'Ver Seguimiento';
                claseBoton = 'btn-success';

                itemCompra.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Pedido #${compra.id}</h5>
                        <small>${new Date(compra.fecha).toLocaleDateString()}</small>
                    </div>
                    <p class="mb-1">Tipo de Entrega: <strong class="text-capitalize">${tipoEntrega}</strong></p>
                    <p class="mb-1">${textoInfoEntrega}</p>
                    <p class="mb-1">Estado: <span class="badge ${claseEstado}">${estadoActual}</span></p>
                    <p class="mb-1 text-muted small">Despachado desde sucursal: ${sucursalCercana}</p>
                    <small>Productos: ${compra.items.map(item => `${item.nombre} (${item.cantidad})`).join(', ')}</small>
                    ${detallesBoleta}
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm ${claseBoton} boton-seguimiento"
                            data-bs-toggle="modal" data-bs-target="#modalSeguimiento"
                            data-tipo-entrega="${tipoEntrega}" data-info="${valorDataInfo}" data-sucursal-origen="${sucursalCercana}"
                            data-estado="${estadoActual}">
                            ${textoBoton}
                        </button>
                    </div>
                `;
            } else { 
                textoInfoEntrega = `Sucursal: ${compra.sucursal || 'Sin sucursal'}`;
                valorDataInfo = compra.sucursal || 'Sin sucursal';
                textoBoton = 'Ver Ubicación';
                claseBoton = 'btn-success';
                
                const estadoRetiro = estadoActual;
                const claseRetiro = estadoRetiro === 'Retirado' ? 'bg-secondary' : 'bg-primary';

                itemCompra.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Pedido #${compra.id}</h5>
                        <small>${new Date(compra.fecha).toLocaleDateString()}</small>
                    </div>
                    <p class="mb-1">Tipo de Entrega: <strong class="text-capitalize">${tipoEntrega}</strong></p>
                    <p class="mb-1">${textoInfoEntrega}</p>
                    <p class="mb-1">Estado: <span class="badge ${claseRetiro}">${estadoRetiro}</span></p>
                    <small>Productos: ${compra.items.map(item => `${item.nombre} (${item.cantidad})`).join(', ')}</small>
                    ${detallesBoleta}
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm ${claseBoton} boton-seguimiento"
                            data-bs-toggle="modal" data-bs-target="#modalSeguimiento"
                            data-tipo-entrega="${tipoEntrega}" data-info="${valorDataInfo}">
                            ${textoBoton}
                        </button>
                    </div>
                `;
            }
            contenedorHistorialCompras.appendChild(itemCompra);
        });
    }

    const modalSeguimiento = document.getElementById('modalSeguimiento');
    modalSeguimiento.addEventListener('shown.bs.modal', evento => {
        const boton = evento.relatedTarget;
        const tipoEntrega = boton.getAttribute('data-tipo-entrega');
        const info = boton.getAttribute('data-info');
        const tituloModal = document.getElementById('tituloModalSeguimiento');
        const cuerpoModal = document.getElementById('cuerpoModalSeguimiento');
        let contenido = '';
        const sucursalKeys = Object.keys(sucursales);
        const sucursalRandom = sucursalKeys[Math.floor(Math.random() * sucursalKeys.length)];
        const datosSucursalRandom = sucursales[sucursalRandom];

        if (tipoEntrega.toLowerCase() === 'retiro en sucursal') {
            const datosSucursal = sucursales[info];
            tituloModal.textContent = 'Detalles de la Sucursal';
            if (datosSucursal) {
                const urlOpenStreetMap = `https://www.openstreetmap.org/export/embed.html?bbox=${datosSucursal.lng - 0.01},${datosSucursal.lat - 0.005},${datosSucursal.lng + 0.01},${datosSucursal.lat + 0.005}&marker=${datosSucursal.lat},${datosSucursal.lng}&zoom=15`;
                contenido = `<p><strong>Sucursal:</strong> ${info}</p><p><strong>Dirección:</strong> ${datosSucursal.direccion}</p><p><strong>Estado:</strong> <span class="badge bg-primary">Listo para Retirar</span></p><iframe width="100%" height="300" frameborder="0" style="border:0" src="${urlOpenStreetMap}" allowfullscreen></iframe>`;
            } else {
                contenido = `<p><strong>Sucursal:</strong> ${info}</p><p>Dirección no disponible. Contacte a soporte.</p>`;
            }
        } else if (tipoEntrega.toLowerCase() === 'domicilio') {
            const sucursalOrigen = boton.getAttribute('data-sucursal-origen');
            const estadoPedido = boton.getAttribute('data-estado');
            const fechaEntregaPreferida = diasEntrega[Math.floor(Math.random() * diasEntrega.length)];
            tituloModal.textContent = 'Seguimiento del Pedido';

            let mapaHtml = '';
            if (estadoPedido === 'En camino') {
                const urlOpenStreetMap = `https://www.openstreetmap.org/export/embed.html?bbox=${datosSucursalRandom.lng - 0.01},${datosSucursalRandom.lat - 0.005},${datosSucursalRandom.lng + 0.01},${datosSucursalRandom.lat + 0.005}&marker=${datosSucursalRandom.lat},${datosSucursalRandom.lng}&zoom=15`;
                mapaHtml = `<iframe width="100%" height="300" frameborder="0" style="border:0" src="${urlOpenStreetMap}" allowfullscreen></iframe>`;
            } else {
                mapaHtml = `<p class="text-center text-muted">El mapa de seguimiento estará disponible una vez que el pedido esté 'En camino'.</p>`;
            }

            contenido = `
                <p>Tu pedido será enviado a la dirección: <strong>${info}</strong>.</p>
                <p><strong>Estado:</strong> <span class="badge ${estadoPedido === 'Entregado' ? 'bg-success' : 'bg-info text-dark'}">${estadoPedido}</span></p>
                <p><strong>Origen:</strong> Sucursal ${sucursalOrigen}</p>
                <p><strong>Fecha de entrega preferida:</strong> ${fechaEntregaPreferida}</p>
                <p><strong>Tiempo estimado:</strong> ${estadoPedido === 'Entregado' ? '¡Pedido entregado!' : '1-2 días hábiles'}</p>
                ${mapaHtml}
            `;

        } else {
            tituloModal.textContent = 'Información del Pedido';
            contenido = `<p>No se encontró información detallada para este pedido.</p>`;
        }

        cuerpoModal.innerHTML = contenido;
    });

    formularioPerfil.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoNombre = inputNombrePerfil.value;
        const nuevaContrasena = inputContrasenaPerfil.value;
        const nuevoRut = inputRutPerfil.value;

        if (!validarRut(nuevoRut)) {
            alert('El RUT ingresado no es válido.');
            return;
        }
        if (nuevaContrasena && (nuevaContrasena.length < 4 || nuevaContrasena.length > 10)) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        usuarioActual.nombre = nuevoNombre;
        usuarioActual.rut = nuevoRut;
        if (nuevaContrasena) {
            usuarioActual.contrasena = nuevaContrasena;
        }
        guardarUsuarioActual(usuarioActual);
        alert('Datos personales actualizados con éxito.');
    });

    formularioDireccion.addEventListener('submit', (e) => {
        e.preventDefault();
        const calle = document.getElementById('calleDireccion').value.trim();
        const ciudad = document.getElementById('ciudadDireccion').value.trim();
        const region = document.getElementById('regionDireccion').value.trim();

        const esDuplicado = usuarioActual.direcciones.some(dir =>
            dir.calle === calle && dir.ciudad === ciudad && dir.region === region
        );
        const estaEditando = formularioDireccion.dataset.editando === 'true';

        if (!estaEditando && esDuplicado) {
            alert('Esta dirección ya existe en tu lista.');
            return;
        }
        if (estaEditando) {
            const indice = parseInt(formularioDireccion.dataset.indice);
            usuarioActual.direcciones[indice] = { calle, ciudad, region };
        } else {
            usuarioActual.direcciones.push({ calle, ciudad, region });
        }

        guardarUsuarioActual(usuarioActual);
        renderizarDirecciones();
        formularioDireccion.reset();
        delete formularioDireccion.dataset.editando;
        delete formularioDireccion.dataset.indice;
        document.querySelector('#formularioDireccion button[type="submit"]').textContent = 'Guardar Dirección';
        alert('Dirección guardada con éxito.');
    });

    contenedorDirecciones.addEventListener('click', (e) => {
        if (e.target.classList.contains('boton-editar-direccion')) {
            const indice = e.target.dataset.indice;
            const direccionAEditar = usuarioActual.direcciones[indice];
            document.getElementById('calleDireccion').value = direccionAEditar.calle;
            document.getElementById('ciudadDireccion').value = direccionAEditar.ciudad;
            document.getElementById('regionDireccion').value = direccionAEditar.region;
            formularioDireccion.dataset.editando = 'true';
            formularioDireccion.dataset.indice = indice;
            document.querySelector('#formularioDireccion button[type="submit"]').textContent = 'Actualizar Dirección';
            document.getElementById('pestana-direccion').click();
        }
        if (e.target.classList.contains('boton-eliminar-direccion')) {
            const indice = e.target.dataset.indice;
            if (confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
                usuarioActual.direcciones.splice(indice, 1);
                guardarUsuarioActual(usuarioActual);
                renderizarDirecciones();
                alert('Dirección eliminada.');
            }
        }
    });

    cargarDatosUsuario();
    renderizarDirecciones();
    renderizarHistorialCompras();
});