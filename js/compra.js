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

    const seccionPuntos = document.getElementById('seccionPuntos');
    const usarPuntosCheckbox = document.getElementById('usarPuntosCheckbox');
    const puntosDisponiblesSpan = document.getElementById('puntosDisponibles');

    const inputCalle = document.getElementById('calleDireccion');
    const inputCiudad = document.getElementById('ciudadDireccion');
    const inputRegion = document.getElementById('regionDireccion');
    if (!usuarioActual.direcciones) {
        usuarioActual.direcciones = [];
    }
    usuarioActual.puntos = usuarioActual.puntos || 0;

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

    if (usuarioActual.puntos > 0) {
        seccionPuntos.style.display = 'block';
        puntosDisponiblesSpan.textContent = `Tienes ${usuarioActual.puntos} puntos.`;
    }

    function actualizarTotal() {
        let totalActual = total;
        if (usarPuntosCheckbox.checked) {
            totalActual = Math.max(0, totalActual - usuarioActual.puntos);
        }
        elementoTotalFinal.textContent = formatearPrecio(totalActual);
    }

    usarPuntosCheckbox.addEventListener('change', actualizarTotal);

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

    // Función para mostrar el modal de la boleta
    function mostrarBoleta(detallesCompra) {
        // Llenar el modal con los datos
        document.getElementById('boletaId').textContent = detallesCompra.id;
        document.getElementById('boletaFecha').textContent = new Date(detallesCompra.fecha).toLocaleString();

        const boletaProductos = document.getElementById('boletaProductos');
        boletaProductos.innerHTML = '';
        detallesCompra.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} (${item.cantidad} ${item.unidad}) - ${formatearPrecio(item.precio * item.cantidad)}`;
            boletaProductos.appendChild(li);
        });

        document.getElementById('boletaTotalOriginal').textContent = formatearPrecio(detallesCompra.totalOriginal);
        document.getElementById('boletaPuntosUsados').textContent = `-${detallesCompra.puntosUsados || 0}`;
        document.getElementById('boletaTotalFinal').textContent = formatearPrecio(detallesCompra.totalFinal);
        document.getElementById('boletaPuntosGanados').textContent = detallesCompra.puntosGanados;
        document.getElementById('boletaSaldoFinal').textContent = usuarioActual.puntos;

        // Mostrar el modal
        const myModal = new bootstrap.Modal(document.getElementById('modalBoleta'));
        myModal.show();
    }

    // Función para descargar la boleta
    function descargarBoleta(detallesCompra) {
        const contenido = `
Boleta de Compra HuertoHogar
----------------------------
Pedido: #${detallesCompra.id}
Fecha: ${new Date(detallesCompra.fecha).toLocaleString()}
----------------------------
Productos:
${detallesCompra.items.map(item => `  - ${item.nombre} x ${item.cantidad} ${item.unidad} - ${formatearPrecio(item.precio * item.cantidad)}`).join('\n')}
----------------------------
Detalle:
Total original: ${formatearPrecio(detallesCompra.totalOriginal)}
Puntos usados: -${detallesCompra.puntosUsados || 0}
Total final: ${formatearPrecio(detallesCompra.totalFinal)}
----------------------------
Puntos ganados en esta compra: ${detallesCompra.puntosGanados}
Nuevo saldo de puntos: ${usuarioActual.puntos}
----------------------------
Gracias por su compra.
`;
        const blob = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Boleta_Pedido_${detallesCompra.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Evento del botón de finalizar compra
    botonFinalizar.addEventListener('click', () => {
        const metodoSeleccionado = selectorMetodoEntrega.value;
        let esValido = true;
        let mensajeAlerta = '';
        let detallesCompra = {};

        if (!metodoSeleccionado) {
            esValido = false;
            mensajeAlerta = 'Por favor, selecciona un método de entrega.';
        } else if (metodoSeleccionado === 'sucursal') {
            const sucursalSeleccionada = document.getElementById('selectorSucursal').value;
            if (!sucursalSeleccionada) {
                esValido = false;
                mensajeAlerta = 'Por favor, selecciona una sucursal para el retiro.';
            } else {
                detallesCompra = { tipoEntrega: 'retiro en sucursal', sucursal: sucursalSeleccionada };
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
                detallesCompra = { tipoEntrega: 'domicilio', direccion: direccionSeleccionada };
            }
        }

        if (!esValido) {
            alert(mensajeAlerta);
            return;
        }

        let totalCompra = total;
        let puntosGanados = 0;
        let puntosUsados = 0;

        if (usarPuntosCheckbox.checked && usuarioActual.puntos > 0) {
            puntosUsados = usuarioActual.puntos;
            totalCompra = Math.max(0, totalCompra - puntosUsados);
            usuarioActual.puntos = 0;
        }

        puntosGanados = Math.floor(totalCompra / 1000);
        usuarioActual.puntos += puntosGanados;

        detallesCompra = {
            ...detallesCompra,
            id: Date.now(),
            fecha: new Date().toISOString(),
            items: carrito,
            totalOriginal: total,
            totalFinal: totalCompra,
            puntosUsados: puntosUsados,
            puntosGanados: puntosGanados,
            estado: 'En preparación'
        };

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

        // Llama a la función para mostrar el modal de la boleta
        mostrarBoleta(detallesCompra);

        // Agrega un listener al botón de descarga dentro del evento de click de finalizar compra
        document.getElementById('btnDescargarBoleta').addEventListener('click', () => {
            descargarBoleta(detallesCompra);
        });

        // Redirecciona al usuario cuando el modal se cierra
        const modalBoletaElement = document.getElementById('modalBoleta');
        modalBoletaElement.addEventListener('hidden.bs.modal', () => {
            window.location.href = 'index.html';
        }, { once: true });
    });

    renderizarOpcionesDireccion();
    actualizarTotal();
});