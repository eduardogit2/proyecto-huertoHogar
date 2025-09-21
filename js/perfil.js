document.addEventListener('DOMContentLoaded', () => {
    const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';
    if (!sesionIniciada) {
        alert('Debes iniciar sesión para ver tu perfil.');
        window.location.href = 'ingreso.html';
        return;
    }

    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
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
        const historial = usuarioActual.historial || [];
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
                    <p class="mb-1">Estado: <span class="badge bg-success">En Reparto</span></p>
                    <p class="mb-1 text-muted small">Despachado desde sucursal: ${sucursalCercana}</p>
                    <small>Productos: ${compra.items.map(item => `${item.nombre} (${item.cantidad})`).join(', ')}</small>
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm ${claseBoton} boton-seguimiento"
                            data-bs-toggle="modal" data-bs-target="#modalSeguimiento"
                            data-tipo-entrega="${tipoEntrega}" data-info="${valorDataInfo}" data-sucursal-origen="${sucursalCercana}">
                            ${textoBoton}
                        </button>
                    </div>
                `;
            } else {
                textoInfoEntrega = `Sucursal: ${compra.sucursal || 'Sin sucursal'}`;
                valorDataInfo = compra.sucursal || 'Sin sucursal';
                textoBoton = 'Ver Ubicación';
                claseBoton = 'btn-success';

                itemCompra.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Pedido #${compra.id}</h5>
                        <small>${new Date(compra.fecha).toLocaleDateString()}</small>
                    </div>
                    <p class="mb-1">Tipo de Entrega: <strong class="text-capitalize">${tipoEntrega}</strong></p>
                    <p class="mb-1">${textoInfoEntrega}</p>
                    <p class="mb-1">Estado: <span class="badge bg-primary">Listo para Retirar</span></p>
                    <small>Productos: ${compra.items.map(item => `${item.nombre} (${item.cantidad})`).join(', ')}</small>
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

        if (tipoEntrega.toLowerCase() === 'retiro en sucursal') {
            const datosSucursal = sucursales[info];
            tituloModal.textContent = 'Detalles de la Sucursal';
            if (datosSucursal) {
                contenido = `<p><strong>Sucursal:</strong> ${info}</p><p><strong>Dirección:</strong> ${datosSucursal.direccion}</p><p><strong>Estado:</strong> <span class="badge bg-primary">Listo para Retirar</span></p><div id="mapa-sucursal" style="height: 300px; width: 100%;"></div>`;
            } else {
                contenido = `<p><strong>Sucursal:</strong> ${info}</p><p>Dirección no disponible. Contacte a soporte.</p>`;
            }
        } else if (tipoEntrega.toLowerCase() === 'domicilio') {
            const sucursalOrigen = boton.getAttribute('data-sucursal-origen');
            tituloModal.textContent = 'Seguimiento del Pedido';
            contenido = `<p>Tu pedido será enviado a la dirección: <strong>${info}</strong>.</p><p><strong>Estado:</strong> <span class="badge bg-success">En Reparto</span></p><p><strong>Origen:</strong> Sucursal ${sucursalOrigen}</p><p><strong>Tiempo estimado de llegada:</strong> 1-2 días hábiles</p><div id="mapa-seguimiento" style="height: 300px; width: 100%; margin-top: 1rem;"></div>`;
        } else {
            tituloModal.textContent = 'Información del Pedido';
            contenido = `<p>No se encontró información detallada para este pedido.</p>`;
        }

        cuerpoModal.innerHTML = contenido;

        if (tipoEntrega.toLowerCase() === 'retiro en sucursal' && sucursales[info]) {
            const datosSucursal = sucursales[info];
            const opcionesMapa = { center: { lat: datosSucursal.lat, lng: datosSucursal.lng }, zoom: 15 };
            const mapa = new google.maps.Map(document.getElementById('mapa-sucursal'), opcionesMapa);
            new google.maps.marker.AdvancedMarkerElement({ position: { lat: datosSucursal.lat, lng: datosSucursal.lng }, map: mapa, title: info });
        }
        if (tipoEntrega.toLowerCase() === 'domicilio') {
            const geocodificador = new google.maps.Geocoder();
            const sucursalOrigen = boton.getAttribute('data-sucursal-origen');
            const coordsSucursal = sucursales[sucursalOrigen];
            if (coordsSucursal) {
                geocodificador.geocode({ 'address': info + ', Chile' }, (resultados, estado) => {
                    if (estado === 'OK') {
                        const ubicacionUsuario = resultados[0].geometry.location;
                        const opcionesMapa = { center: ubicacionUsuario, zoom: 12 };
                        const mapa = new google.maps.Map(document.getElementById('mapa-seguimiento'), opcionesMapa);
                        new google.maps.marker.AdvancedMarkerElement({ position: ubicacionUsuario, map: mapa, title: 'Tu Dirección' });
                        new google.maps.marker.AdvancedMarkerElement({ position: coordsSucursal, map: mapa, title: 'Sucursal de Origen' });
                    } else {
                        console.error('La geocodificación no tuvo éxito por el siguiente motivo: ' + estado);
                    }
                });
            }
        }
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

    const inputDireccion = document.getElementById('calleDireccion');
    const inputCiudad = document.getElementById('ciudadDireccion');
    const inputRegion = document.getElementById('regionDireccion');

    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocompletar = new google.maps.places.Autocomplete(inputDireccion, {
            types: ['address'],
            componentRestrictions: { 'country': 'cl' }
        });
        autocompletar.addListener('place_changed', () => {
            const lugar = autocompletar.getPlace();
            if (!lugar.geometry) return;
            inputDireccion.value = '';
            inputCiudad.value = '';
            inputRegion.value = '';
            for (const componente of lugar.address_components) {
                const tipoComponente = componente.types[0];
                switch (tipoComponente) {
                    case 'street_number':
                        inputDireccion.value = `${componente.long_name} `;
                        break;
                    case 'route':
                        inputDireccion.value += componente.long_name;
                        break;
                    case 'locality':
                        inputCiudad.value = componente.long_name;
                        break;
                    case 'administrative_area_level_1':
                        inputRegion.value = componente.long_name;
                        break;
                }
            }
        });
    } else {
        console.error("API de Google Maps Places no se ha cargado correctamente.");
    }

    cargarDatosUsuario();
    renderizarDirecciones();
    renderizarHistorialCompras();
});