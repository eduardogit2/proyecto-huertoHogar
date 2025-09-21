let productos = [];
const productosIniciales = [
    { id: 100, nombre: "Manzana Fuji", precio: 1200, categoria: "Frutas", imagen: "img/prod1.jpg", etiqueta: "Fresco", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el fértil Valle del Maule. Son perfectas para consumir como un snack saludable, o para usar en postres horneados y jugos naturales. Su textura firme y su sabor equilibrado entre dulce y ácido las hacen irresistibles.", stock: 150, origen: "Valle del Maule, Chile", unidad: "kg", resenas: [{ usuario: "Ana M.", calificacion: 5, texto: "Excelente calidad." }, { usuario: "Pedro V.", calificacion: 4, texto: "Muy buenas." }] },
    { id: 200, nombre: "Naranjas Valencia", precio: 1000, categoria: "Frutas", imagen: "img/prod2.jpg", etiqueta: "Fresco", descripcion: "Naranjas Valencia excepcionalmente jugosas y ricas en vitamina C. Provenientes de la soleada Región de Coquimbo, estas naranjas son ideales para zumos frescos y revitalizantes. Su sabor dulce y cítrico las hace perfectas para cualquier momento del día.", stock: 200, origen: "Región de Coquimbo, Chile", unidad: "kg", resenas: [{ usuario: "María P.", calificacion: 5, texto: "Muy jugosas." }, { usuario: "Juan F.", calificacion: 4, texto: "Sabor muy bueno." }] },
    { id: 300, nombre: "Plátano Cavendish", precio: 800, categoria: "Frutas", imagen: "img/prod3.jpg", descripcion: "Plátanos Cavendish maduros y naturalmente dulces, cultivados en la región de Guayas, Ecuador. Son el snack energético ideal para el desayuno o después de entrenar. Ricos en potasio y vitaminas esenciales, te ayudarán a mantener tu energía a lo largo del día.", stock: 250, origen: "Guayas, Ecuador", unidad: "kg", resenas: [{ usuario: "Sofía G.", calificacion: 5, texto: "Muy frescos." }] },
    { id: 400, nombre: "Zanahoria Orgánica", precio: 900, categoria: "Verduras", imagen: "img/prod4.jpg", descripcion: "Zanahorias orgánicas y crujientes, cultivadas sin pesticidas en la Región de O'Higgins. Son una excelente fuente de vitamina A y fibra. Ideales para ensaladas, sopas o para disfrutar como un snack saludable. Su sabor natural y dulce es incomparable.", stock: 100, origen: "Región de O'Higgins, Chile", unidad: "kg", resenas: [{ usuario: "Carolina V.", calificacion: 5, texto: "Frescas y con un sabor intenso." }] },
    { id: 500, nombre: "Espinaca Fresca", precio: 700, categoria: "Verduras", imagen: "img/prod5.jpg", descripcion: "Espinacas frescas y nutritivas, cultivadas con prácticas orgánicas en la región de Ñuble, Chile. Son perfectas para ensaladas, batidos verdes y salteados. Su textura tierna y su alto valor nutricional las convierten en un ingrediente esencial para una dieta sana.", stock: 80, origen: "Ñuble, Chile", unidad: "bolsa", resenas: [{ usuario: "Roberta A.", calificacion: 4, texto: "Buena cantidad." }] },
    { id: 600, nombre: "Pimiento Tricolores", precio: 1500, categoria: "Orgánicos", imagen: "img/prod6.jpg", descripcion: "Pimientos rojos, amarillos y verdes, seleccionados por su calidad y frescura. Cultivados en la Región de Valparaíso, son ideales para salteados, ensaladas y guisos. Añaden un toque vibrante de color, sabor y antioxidantes a cualquier receta.", stock: 120, origen: "Región de Valparaíso, Chile", unidad: "kg", resenas: [{ usuario: "Diego B.", calificacion: 5, texto: "Colores vibrantes y muy frescos." }] },
    { id: 700, nombre: "Miel Orgánica", precio: 5000, precioConDescuento: 4500, categoria: "Orgánicos", imagen: "img/prod7.jpg", etiqueta: "Oferta", descripcion: "Miel pura y 100% orgánica, producida por apicultores locales de la Región de Aysén, Chile. Con un sabor y aroma inigualables, es un endulzante natural perfecto para tés, yogures y postres. Es rica en antioxidantes y propiedades saludables.", stock: 50, origen: "Aysén, Chile", unidad: "frasco", resenas: [{ usuario: "Antonia D.", calificacion: 5, texto: "Un sabor exquisito." }] },
    { id: 800, nombre: "Quínoa Orgánica", precio: 4500, precioConDescuento: 4000, categoria: "Orgánicos", imagen: "img/prod8.jpg", etiqueta: "Oferta", descripcion: "Quínoa orgánica de alta calidad, proveniente de Cajamarca, Perú. Un superalimento versátil y libre de gluten, ideal para ensaladas, guisos o como sustituto de arroz. Es una fuente completa de proteínas y fibra que te ayudará a mantener una dieta equilibrada y nutritiva.", stock: 75, origen: "Cajamarca, Perú", unidad: "bolsa", resenas: [{ usuario: "Fernanda L.", calificacion: 5, texto: "Excelente para mis ensaladas." }] },
    { id: 900, nombre: "Leche Entera", precio: 1400, precioConDescuento: 1250, categoria: "Lácteos", imagen: "img/prod9.jpg", etiqueta: "Oferta", descripcion: "Leche entera fresca y cremosa, producida en la Región de Los Lagos, Chile. Con un sabor auténtico y completa en nutrientes esenciales como calcio y proteínas, es ideal para el desayuno o para preparar tus recetas favoritas.", stock: 90, origen: "Los Lagos, Chile", unidad: "litro", resenas: [{ usuario: "Pablo Q.", calificacion: 5, texto: "Muy buena y fresca." }] }
];

const contenedorProductos = document.getElementById('contenedorProductos');
const listaCategorias = document.getElementById('listaCategorias');
const rangoPrecio = document.getElementById('rangoPrecio');
const valorPrecio = document.getElementById('valorPrecio');
const botonLimpiarFiltros = document.getElementById('limpiarFiltros');
const campoBusqueda = document.getElementById('campoBusqueda');
const mensajeSinResultados = document.getElementById('sinResultados');
const elementoDescripcionCategoria = document.getElementById('descripcionCategoria');
const contadorCarrito = document.getElementById("contadorCarrito");
const itemsCarrito = document.getElementById("itemsCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const modalDetalleProducto = new bootstrap.Modal(document.getElementById('modalDetalleProducto'));
const tituloModal = document.getElementById('tituloModalDetalleProducto');
const contenidoModal = document.getElementById('contenidoModalDetalleProducto');
const botonCompartir = document.getElementById('botonCompartirProducto');
const botonLimpiarCarrito = document.getElementById("botonLimpiarCarrito");
const botonIrAPagar = document.getElementById('botonIrAPagar');
const formularioResena = document.getElementById('formulario-resena');

let categoriaActual = 'Todas';
let precioMaximoActual = rangoPrecio ? Number(rangoPrecio.value) : 10000;
let consultaActual = '';
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let idProductoActual = null;

const descripcionesCategorias = {
    'Todas': 'Explora nuestra amplia selección de productos frescos y de alta calidad para tu hogar. HuertoHogar te ofrece una experiencia de compra única, con productos directamente del campo y de proveedores locales, garantizando sabor, frescura y la mejor calidad en cada compra.',
    'Frutas': 'Deliciosas y jugosas frutas de temporada, directamente del huerto a tu mesa. Nuestra selección de frutas se cultiva y cosecha en el punto óptimo de madurez para asegurar su sabor, frescura y máximo valor nutricional. Ideales para disfrutar solas, en ensaladas o como ingrediente en postres y jugos.',
    'Verduras': 'Las verduras más frescas y nutritivas para una alimentación sana y equilibrada. Desde hortalizas de hoja hasta raíces crujientes, cada verdura es seleccionada por su calidad y frescura, ofreciendo una excelente fuente de vitaminas, minerales y fibra. Perfectas para ensaladas, guisos y cualquier plato saludable.',
    'Lácteos': 'Productos lácteos cremosos y frescos, perfectos para tu desayuno y recetas. HuertoHogar te ofrece una gama de leches, yogures y quesos que provienen de granjas locales, lo que garantiza su frescura y un sabor auténtico. Ricos en calcio y nutrientes, son el complemento ideal para una dieta equilibrada.',
    'Orgánicos': 'Productos cultivados de forma natural, para una opción más saludable y sostenible. Nuestra selección de productos orgánicos está libre de pesticidas y químicos, lo que garantiza un sabor auténtico y el máximo de beneficios saludables. Son la elección perfecta para quienes buscan opciones alimenticias que promuevan el bienestar y respeten el medio ambiente.'
};

function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos'));
    if (productosGuardados) {
        productos = productosGuardados;
    } else {
        productos = productosIniciales;
        guardarProductos();
    }
}

function obtenerEstrellasCalificacion(calificacion) {
    return '⭐'.repeat(calificacion);
}

function renderizarResenas(resenas) {
    const contenedorResenas = document.getElementById('contenedor-resenas');
    if (!contenedorResenas) return;
    contenedorResenas.innerHTML = '';
    if (resenas.length === 0) {
        contenedorResenas.innerHTML = '<p class="text-muted fst-italic text-center">Este producto no tiene reseñas. ¡Sé el primero en dejar una!</p>';
    } else {
        resenas.forEach(resena => {
            const divResena = document.createElement('div');
            divResena.className = 'card card-body mb-2';
            divResena.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong>${resena.usuario}</strong>
                    <span class="text-warning">${obtenerEstrellasCalificacion(resena.calificacion)}</span>
                </div>
                <p class="mb-0">${resena.texto}</p>`;
            contenedorResenas.appendChild(divResena);
        });
    }
}

function renderizarCategorias() {
    if (!listaCategorias) return;
    const categoriasUnicas = ['Todas', ...new Set(productos.map(p => p.categoria))];
    listaCategorias.innerHTML = '';
    categoriasUnicas.forEach(cat => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-categoria', cat);
        li.textContent = cat;
        if (cat === categoriaActual) {
            li.classList.add('active');
        }
        li.addEventListener('click', () => {
            categoriaActual = cat;
            renderizarCategorias();
            renderizarProductos();
            if (elementoDescripcionCategoria) {
                elementoDescripcionCategoria.textContent = descripcionesCategorias[cat] || '';
                elementoDescripcionCategoria.style.display = 'block';
            }
        });
        listaCategorias.appendChild(li);
    });
}

function renderizarProductos() {
    if (!contenedorProductos) return;

    const precioMaximo = precioMaximoActual;
    const consulta = consultaActual.trim().toLowerCase();
    const esPaginaPrincipal = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

    let filtrados = productos.filter(p => {
        const categoriaOK = (categoriaActual === 'Todas') || (p.categoria === categoriaActual);
        const precioOK = p.precio <= precioMaximo;
        const consultaOK = p.nombre.toLowerCase().includes(consulta) || p.descripcion.toLowerCase().includes(consulta);
        return categoriaOK && precioOK && consultaOK;
    });

    if (esPaginaPrincipal) {
        filtrados = filtrados.filter(p => p.etiqueta === 'Oferta').slice(0, 3);
    }

    contenedorProductos.innerHTML = '';

    if (filtrados.length === 0) {
        if (mensajeSinResultados) mensajeSinResultados.style.display = 'block';
        return;
    } else {
        if (mensajeSinResultados) mensajeSinResultados.style.display = 'none';
    }

    filtrados.forEach(p => {
        const columna = document.createElement('div');
        columna.className = 'col-sm-6 col-md-4 mb-4';
        const calificacionPromedio = p.resenas.length > 0 ? (p.resenas.reduce((acc, r) => acc + r.calificacion, 0) / p.resenas.length).toFixed(1) : 'Sin valorar';
        const textoResena = p.resenas.length > 0 ? `(${p.resenas.length})` : '';
        const porcentajeDescuento = p.precioConDescuento ? Math.round(((p.precio - p.precioConDescuento) / p.precio) * 100) : 0;
        const insigniaDescuento = porcentajeDescuento > 0 ? `<span class="badge bg-success ms-2">-${porcentajeDescuento}%</span>` : '';
        const precioFinal = p.precioConDescuento !== undefined ? p.precioConDescuento : p.precio;
        const precioMostrado = formatearPrecio(precioFinal);
        const precioOriginalMostrado = formatearPrecio(p.precio);

        columna.innerHTML = `
            <div class="card tarjeta-producto h-100 shadow-sm" style="cursor: pointer;" data-id="${p.id}">
                <img src="${p.imagen}" alt="${p.nombre}" class="imagen-producto card-img-top">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center mb-1">${p.nombre}</h5>
                    <p class="text-center text-muted fw-light fst-italic mb-2">${p.origen}</p>
                    <div class="text-center mb-2">
                        <span class="small text-warning">${obtenerEstrellasCalificacion(Math.round(calificacionPromedio))}</span>
                        <span class="small text-muted">${calificacionPromedio} ${textoResena}</span>
                    </div>
                    <p class="card-text text-center descripcion-producto">${p.descripcion.substring(0, 70)}...</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                        ${p.precioConDescuento !== undefined
                            ? `<span class="precio fw-bold" style="color: #FFD700;">${precioMostrado}</span><small class="text-muted text-decoration-line-through ms-2">${precioOriginalMostrado}</small>${insigniaDescuento}`
                            : `<span class="precio fw-bold">${precioMostrado}</span>`}
                        <span class="text-success fw-bold small">Stock: <span class="stock-disponible">${p.stock} ${p.unidad}</span></span>
                    </div>
                </div>
            </div>`;
        contenedorProductos.appendChild(columna);
    });
}

function mostrarDetallesProducto(idProducto) {
    idProductoActual = idProducto;
    const producto = productos.find(p => p.id === parseInt(idProductoActual));
    if (!producto) {
        console.error("Producto no encontrado");
        return;
    }

    tituloModal.textContent = producto.nombre;
    const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';
    const precioFinal = producto.precioConDescuento !== undefined ? producto.precioConDescuento : producto.precio;
    const precioMostrado = formatearPrecio(precioFinal);
    const precioOriginalMostrado = formatearPrecio(producto.precio);

    contenidoModal.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid mb-3 w-100 rounded">
        <p><strong>Precio:</strong>
            ${producto.precioConDescuento !== undefined
                ? `<span style="color: #FFD700; font-weight:700;">${precioMostrado}</span><small class="text-muted text-decoration-line-through ms-2">${precioOriginalMostrado}</small>`
                : precioMostrado} por ${producto.unidad}
        </p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p><strong>Origen:</strong> ${producto.origen}</p>
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p class="mb-3"><strong>Stock disponible:</strong> <span class="stock-disponible-modal">${producto.stock}</span> ${producto.unidad}${producto.stock !== 1 ? 's' : ''}</p>
        <div class="d-flex align-items-center justify-content-between mb-4">
            <label for="cantidad-modal" class="me-2 fw-bold">Cantidad:</label>
            <input type="number" id="cantidad-modal" class="form-control w-25 text-center me-3" value="1" min="1" max="${producto.stock}">
            <button class="btn btn-primario agregar-al-carrito-modal" data-id="${producto.id}">Agregar al Carrito</button>
        </div>
        <div id="seccion-formulario-resena" style="display: none;">
            <h5>Deja tu reseña</h5>
            <form id="formulario-resena">
                <div class="mb-3">
                    <label for="calificacion-resena" class="form-label">Calificación (1-5)</label>
                    <input type="number" class="form-control" id="calificacion-resena" min="1" max="5" required>
                </div>
                <div class="mb-3">
                    <label for="texto-resena" class="form-label">Comentario</label>
                    <textarea class="form-control" id="texto-resena" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primario w-100">Enviar Reseña</button>
            </form>
        </div>
        <p id="mensaje-seccion-resena" class="text-center text-muted fst-italic mt-3" style="display: none;">Inicia sesión para dejar una reseña.</p>
        <h5 class="mt-4">Reseñas de Clientes</h5>
        <div id="contenedor-resenas"></div>
    `;

    const inputCantidad = document.getElementById('cantidad-modal');
    const botonAgregar = document.querySelector('.agregar-al-carrito-modal');
    if (producto.stock <= 0) {
        inputCantidad.value = 0;
        inputCantidad.setAttribute('disabled', 'disabled');
        botonAgregar.setAttribute('disabled', 'disabled');
        botonAgregar.textContent = 'Sin Stock';
    }

    const seccionFormularioResena = document.getElementById('seccion-formulario-resena');
    const mensajeSeccionResena = document.getElementById('mensaje-seccion-resena');
    if (seccionFormularioResena && mensajeSeccionResena) {
        if (sesionIniciada) {
            seccionFormularioResena.style.display = 'block';
            mensajeSeccionResena.style.display = 'none';
        } else {
            seccionFormularioResena.style.display = 'none';
            mensajeSeccionResena.style.display = 'block';
        }
    }
    renderizarResenas(producto.resenas);
    modalDetalleProducto.show();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    if (valorPrecio && rangoPrecio) {
        valorPrecio.textContent = Number(rangoPrecio.value).toLocaleString('es-CL');
    }

    renderizarCategorias();
    renderizarProductos();
    actualizarContadorCarrito();
    renderizarDesplegableCarrito();

    if (elementoDescripcionCategoria) {
        elementoDescripcionCategoria.textContent = descripcionesCategorias['Todas'];
        elementoDescripcionCategoria.style.display = 'block';
    }
});

if (contenedorProductos) {
    contenedorProductos.addEventListener("click", e => {
        const tarjeta = e.target.closest('.tarjeta-producto');
        if (tarjeta) {
            const idProducto = tarjeta.dataset.id;
            mostrarDetallesProducto(idProducto);
        }
    });
}

if (contenidoModal) {
    contenidoModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("agregar-al-carrito-modal")) {
            const sesionIniciada = localStorage.getItem('sesionIniciada');
            if (sesionIniciada !== 'true') {
                alert('Debes iniciar sesión para comprar.');
                modalDetalleProducto.hide();
                return;
            }
            const boton = e.target;
            const idProducto = parseInt(boton.dataset.id);
            const cantidad = parseInt(document.getElementById('cantidad-modal').value);
            const productoAAgregar = productos.find(p => p.id === idProducto);

            if (!productoAAgregar) {
                console.error("Producto no encontrado en la base de datos.");
                return;
            }

            if (cantidad <= 0) {
                alert('La cantidad debe ser mayor a 0.');
                return;
            }
            if (cantidad > productoAAgregar.stock) {
                alert(`No puedes comprar ${cantidad} ${productoAAgregar.unidad}${cantidad > 1 ? 's' : ''}. El stock disponible es de ${productoAAgregar.stock}.`);
                return;
            }
            agregarAlCarrito(productoAAgregar, cantidad);
            modalDetalleProducto.hide();
        }
    });

        contenidoModal.addEventListener('submit', (e) => {
        if (e.target.id === 'formulario-resena') {
            e.preventDefault();
            const calificacion = parseInt(document.getElementById('calificacion-resena').value);
            const textoResena = document.getElementById('texto-resena').value;
            const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

            if (calificacion < 1 || calificacion > 5) {
                alert('La valoración debe ser entre 1 y 5.');
                return;
            }
            if (!usuarioActual) {
                alert('Debes iniciar sesión para dejar una reseña.');
                return;
            }

            const nuevaResena = { usuario: usuarioActual.nombre, calificacion: calificacion, texto: textoResena };
            const productoAResenar = productos.find(p => p.id === parseInt(idProductoActual));
            if (productoAResenar) {
                productoAResenar.resenas.push(nuevaResena);
                guardarProductos();
                renderizarResenas(productoAResenar.resenas);
                renderizarProductos();
                document.getElementById('calificacion-resena').value = '';
                document.getElementById('texto-resena').value = '';
            }
        }
    });
}

function actualizarContadorCarrito() {
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
}

function renderizarDesplegableCarrito() {
    if (!itemsCarrito) return;
    
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = `<span class="text-muted">Tu carrito está vacío</span>`;
        if (totalCarrito) totalCarrito.textContent = "$0";
        return;
    }
    
    itemsCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((item, indice) => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;
        total += item.precio * item.cantidad;
        itemsCarrito.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>${formatearPrecio(item.precio)} x ${item.cantidad} ${producto.unidad}${item.cantidad > 1 ? 's' : ''}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" data-accion="disminuir" data-indice="${indice}">-</button>
                    <span class="mx-2">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" data-accion="aumentar" data-indice="${indice}">+</button>
                </div>
            </div>`;
    });
    if (totalCarrito) totalCarrito.textContent = formatearPrecio(total);
}

function agregarAlCarrito(producto, cantidad) {
    const indiceProducto = productos.findIndex(p => p.id === producto.id);
    productos[indiceProducto].stock -= cantidad;
    const precioFinal = producto.precioConDescuento !== undefined ? producto.precioConDescuento : producto.precio;
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: precioFinal, cantidad: cantidad, unidad: producto.unidad });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    guardarProductos(); 
    actualizarContadorCarrito();
    renderizarDesplegableCarrito();
    renderizarProductos();
}

if (itemsCarrito) {
    itemsCarrito.addEventListener("click", (e) => {
        e.stopPropagation();
        const objetivo = e.target;
        if (objetivo.dataset.accion === "disminuir" || objetivo.dataset.accion === "aumentar") {
            const indice = parseInt(objetivo.dataset.indice);
            const cantidad = objetivo.dataset.accion === "aumentar" ? 1 : -1;
            cambiarCantidad(indice, cantidad);
        }
    });
}

if (botonLimpiarCarrito) {
    botonLimpiarCarrito.addEventListener("click", (e) => {
        e.stopPropagation();
        carrito.forEach(item => {
            const producto = productos.find(p => p.id === parseInt(item.id));
            if (producto) {
                producto.stock += item.cantidad;
            }
        });
        localStorage.removeItem("carrito");
        carrito = [];
        guardarProductos(); 
        actualizarContadorCarrito();
        renderizarDesplegableCarrito();
        renderizarProductos();
    });
}

function cambiarCantidad(indice, cantidad) {
    const item = carrito[indice];
    const producto = productos.find(p => p.id === parseInt(item.id));
    if (!producto) return;

    if (cantidad > 0) {
        if (producto.stock <= 0) {
            alert("No hay más stock disponible de este producto.");
            return;
        }
        producto.stock -= cantidad;
        item.cantidad += cantidad;
    } else {
        if (item.cantidad <= 1) {
            producto.stock += 1;
            carrito.splice(indice, 1);
        } else {
            producto.stock += 1;
            item.cantidad -= 1;
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    guardarProductos(); 
    actualizarContadorCarrito();
    renderizarDesplegableCarrito();
    renderizarProductos();
}

if (rangoPrecio) {
    rangoPrecio.addEventListener('input', (e) => {
        precioMaximoActual = Number(e.target.value);
        if (valorPrecio) valorPrecio.textContent = precioMaximoActual.toLocaleString('es-CL');
        renderizarProductos();
    });
}

if (botonLimpiarFiltros) {
    botonLimpiarFiltros.addEventListener('click', () => {
        categoriaActual = 'Todas';
        precioMaximoActual = Number(rangoPrecio.max);
        rangoPrecio.value = precioMaximoActual;
        if (valorPrecio) valorPrecio.textContent = precioMaximoActual.toLocaleString('es-CL');
        if (campoBusqueda) campoBusqueda.value = '';
        consultaActual = '';
        renderizarCategorias();
        renderizarProductos();
    });
}

const botonBuscar = document.getElementById('botonBuscar');
if (botonBuscar) {
    botonBuscar.addEventListener('click', () => {
        consultaActual = campoBusqueda.value;
        renderizarProductos();
    });
}

if (campoBusqueda) {
    campoBusqueda.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            consultaActual = campoBusqueda.value;
            renderizarProductos();
        }
    });
}

function formatearPrecio(n) {
    if (n === 0) {
        return "Gratis";
    }
    return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
}

if (botonIrAPagar) {
    botonIrAPagar.addEventListener('click', () => {
        const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';
        if (!sesionIniciada) {
            alert('Debes iniciar sesión para continuar con la compra.');
        } else if (carrito.length === 0) {
            alert('Tu carrito está vacío. ¡Agrega productos para continuar!');
        } else {
            window.location.href = 'compra.html';
        }
    });
}