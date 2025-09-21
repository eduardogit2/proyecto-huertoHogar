document.addEventListener('DOMContentLoaded', () => {
    const sesionIniciada = localStorage.getItem('sesionIniciada');
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (sesionIniciada !== 'true' || !usuarioActual) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'ingreso.html';
        return;
    }

    const resumenCompra = document.getElementById('resumen-compra');
    const elementoTotalFinal = document.getElementById('total-final');
    const botonFinalizar = document.getElementById('boton-finalizar');
    const mensajeSinProductos = document.getElementById('mensaje-sin-productos');
    const selectorMetodoEntrega = document.getElementById('metodoEntrega');
    const seccionSucursal = document.getElementById('seccionSucursal');
    const seccionDireccion = document.getElementById('seccionDireccion');
    const selectorDireccion = document.getElementById('selectorDireccion');
    const camposNuevaDireccion = document.getElementById('camposNuevaDireccion');
    const checkboxGuardarDireccion = document.getElementById('checkboxGuardarDireccion');

    const inputCalle = document.getElementById('calleDireccion');
    const inputCiudad = document.getElementById('ciudadDireccion');
    const inputRegion = document.getElementById('regionDireccion');

    if (!usuarioActual.direcciones) {
        usuarioActual.direcciones = [];
    }

    function formatearPrecio(numero) {
        return numero.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    }

    function renderizarOpcionesDireccion() {
        selectorDireccion.innerHTML = '<option value="nueva" selected>Usar una nueva dirección</option>';
        if (usuarioActual.direcciones.length > 0) {
            usuarioActual.direcciones.forEach((dir, indice) => {
                const opcion = document.createElement('option');
                opcion.value = `guardada${indice}`;
                opcion.textContent = `${dir.calle}, ${dir.ciudad}, ${dir.region}`;
                selectorDireccion.appendChild(opcion);
            });
        }
    }

    selectorDireccion.addEventListener('change', (e) => {
        if (e.target.value === 'nueva') {
            camposNuevaDireccion.style.display = 'block';
        } else {
            camposNuevaDireccion.style.display = 'none';
        }
    });

    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocompletar = new google.maps.places.Autocomplete(inputCalle, {
            types: ['address'],
            componentRestrictions: { 'country': 'cl' }
        });
        autocompletar.addListener('place_changed', () => {
            const lugar = autocompletar.getPlace();
            if (!lugar.geometry) return;

            inputCalle.value = '';
            inputCiudad.value = '';
            inputRegion.value = '';

            for (const componente of lugar.address_components) {
                const tipoComponente = componente.types[0];
                switch (tipoComponente) {
                    case 'street_number':
                        inputCalle.value = `${componente.long_name} `;
                        break;
                    case 'route':
                        inputCalle.value += componente.long_name;
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

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    if (carrito.length === 0) {
        mensajeSinProductos.style.display = 'block';
        botonFinalizar.style.display = 'none';
        elementoTotalFinal.textContent = formatearPrecio(0);
        return;
    }

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const divItem = document.createElement('div');
        divItem.className = 'd-flex justify-content-between align-items-center border-bottom py-2';

        const unidadPlural = item.cantidad > 1 && ['bolsa', 'litro', 'frasco', 'kg'].includes(item.unidad)
            ? item.unidad + 's'
            : item.unidad;

        divItem.innerHTML = `
            <div>
                <strong>${item.nombre}</strong>
                <p class="mb-0 text-muted small">${formatearPrecio(item.precio)} x ${item.cantidad} ${unidadPlural}</p>
            </div>
            <span>${formatearPrecio(item.precio * item.cantidad)}</span>
        `;
        resumenCompra.appendChild(divItem);
    });

    elementoTotalFinal.textContent = formatearPrecio(total);

    selectorMetodoEntrega.addEventListener('change', (e) => {
        if (e.target.value === 'sucursal') {
            seccionSucursal.style.display = 'block';
            seccionDireccion.style.display = 'none';
        } else if (e.target.value === 'domicilio') {
            seccionSucursal.style.display = 'none';
            seccionDireccion.style.display = 'block';
            renderizarOpcionesDireccion();
        } else {
            seccionSucursal.style.display = 'none';
            seccionDireccion.style.display = 'none';
        }
    });

    botonFinalizar.addEventListener('click', () => {
        const metodoSeleccionado = selectorMetodoEntrega.value;
        let detallesCompra = {
            id: Date.now(),
            fecha: new Date().toISOString(),
            items: carrito,
            total: total
        };

        let esValido = true;
        let mensajeAlerta = '';

        if (!metodoSeleccionado) {
            esValido = false;
            mensajeAlerta = 'Por favor, selecciona un método de entrega.';
        } else if (metodoSeleccionado === 'sucursal') {
            const sucursalSeleccionada = document.getElementById('selectorSucursal').value;
            if (!sucursalSeleccionada) {
                esValido = false;
                mensajeAlerta = 'Por favor, selecciona una sucursal para el retiro.';
            } else {
                detallesCompra.tipoEntrega = 'retiro en sucursal';
                detallesCompra.sucursal = sucursalSeleccionada;
            }
        } else if (metodoSeleccionado === 'domicilio') {
            const opcionSeleccionada = selectorDireccion.value;
            let direccionSeleccionada = null;
            if (opcionSeleccionada === 'nueva') {
                const nuevaCalle = document.getElementById('calleDireccion').value.trim();
                const nuevaCiudad = document.getElementById('ciudadDireccion').value.trim();
                const nuevaRegion = document.getElementById('regionDireccion').value.trim();
                if (!nuevaCalle || !nuevaCiudad || !nuevaRegion) {
                    esValido = false;
                    mensajeAlerta = 'Por favor, completa todos los campos de la nueva dirección.';
                } else {
                    direccionSeleccionada = `${nuevaCalle}, ${nuevaCiudad}, ${nuevaRegion}`;
                    if (checkboxGuardarDireccion.checked) {
                        const esDuplicado = usuarioActual.direcciones.some(dir =>
                            `${dir.calle}, ${dir.ciudad}, ${dir.region}` === direccionSeleccionada
                        );
                        if (!esDuplicado) {
                            usuarioActual.direcciones.push({ calle: nuevaCalle, ciudad: nuevaCiudad, region: nuevaRegion });
                        }
                    }
                }
            } else {
                const indice = opcionSeleccionada.replace('guardada', '');
                const dir = usuarioActual.direcciones[indice];
                direccionSeleccionada = `${dir.calle}, ${dir.ciudad}, ${dir.region}`;
            }

            if (esValido) {
                detallesCompra.tipoEntrega = 'domicilio';
                detallesCompra.direccion = direccionSeleccionada;
            }
        }

        if (!esValido) {
            alert(mensajeAlerta);
            return;
        }

        if (!usuarioActual.historial) {
            usuarioActual.historial = [];
        }
        usuarioActual.historial.push(detallesCompra);

        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        const todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const indiceUsuario = todosLosUsuarios.findIndex(u => u.correo === usuarioActual.correo);
        if (indiceUsuario !== -1) {
            todosLosUsuarios[indiceUsuario] = usuarioActual;
            localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios));
        }

        localStorage.removeItem('carrito');
        alert('¡Compra finalizada con éxito! Gracias por tu pedido.');
        window.location.href = 'index.html';
    });
});