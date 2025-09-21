document.addEventListener('DOMContentLoaded', () => {
    const selectorCategoria = document.getElementById('categoriaProducto');

    function obtenerCategoriasUnicas() {
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        const categorias = new Set(productosGuardados.map(p => p.categoria));
        return Array.from(categorias).filter(Boolean);
    }

    function cargarCategorias() {
        if (selectorCategoria) {
            const categorias = obtenerCategoriasUnicas();
            categorias.forEach(cat => {
                const opcion = document.createElement('option');
                opcion.value = cat;
                opcion.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                selectorCategoria.appendChild(opcion);
            });
        }
    }

    cargarCategorias();

    const formulario = document.getElementById('formularioCrearProducto');
    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (validarFormulario()) {
                guardarProducto();
            }
        });
    }

    function validarFormulario() {
        let esValido = true;
        document.querySelectorAll('.mensaje-error').forEach(el => el.textContent = '');

        const codigo = document.getElementById('codigoProducto').value.trim();
        if (codigo.length < 3) {
            document.getElementById('error-codigo').textContent = 'El código es requerido y debe tener al menos 3 caracteres.';
            esValido = false;
        }

        const nombre = document.getElementById('nombreProducto').value.trim();
        if (nombre.length === 0 || nombre.length > 100) {
            document.getElementById('error-nombre').textContent = 'El nombre es requerido (máximo 100 caracteres).';
            esValido = false;
        }

        const descripcion = document.getElementById('descripcionProducto').value.trim();
        if (descripcion.length > 500) {
            document.getElementById('error-descripcion').textContent = 'La descripción no puede superar los 500 caracteres.';
            esValido = false;
        }

        const precio = document.getElementById('precioProducto').value;
        if (precio === '' || parseFloat(precio) < 0) {
            document.getElementById('error-precio').textContent = 'El precio es requerido y debe ser 0 o mayor.';
            esValido = false;
        }

        const stock = document.getElementById('stockProducto').value;
        if (stock === '' || parseInt(stock) < 0 || !Number.isInteger(Number(stock))) {
            document.getElementById('error-stock').textContent = 'El stock es requerido y debe ser un número entero mayor o igual a 0.';
            esValido = false;
        }

        const stockCritico = document.getElementById('stockCriticoProducto').value;
        if (stockCritico !== '' && (parseInt(stockCritico) < 0 || !Number.isInteger(Number(stockCritico)))) {
            document.getElementById('error-stock-critico').textContent = 'Si se ingresa, el stock crítico debe ser un número entero mayor o igual a 0.';
            esValido = false;
        }

        if (selectorCategoria.value === '') {
            document.getElementById('error-categoria').textContent = 'Debes seleccionar una categoría.';
            esValido = false;
        }

        const origen = document.getElementById('origenProducto').value.trim();
        if (origen.length === 0) {
            document.getElementById('error-origen').textContent = 'El origen es requerido.';
            esValido = false;
        }

        const unidad = document.getElementById('unidadProducto').value.trim();
        if (unidad.length === 0) {
            document.getElementById('error-unidad').textContent = 'La unidad es requerida (ej: kg, bolsa).';
            esValido = false;
        }

        return esValido;
    }

    function guardarProducto() {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const nuevoProducto = {
            id: parseInt(document.getElementById('codigoProducto').value.trim()),
            nombre: document.getElementById('nombreProducto').value.trim(),
            descripcion: document.getElementById('descripcionProducto').value.trim(),
            precio: parseFloat(document.getElementById('precioProducto').value),
            stock: parseInt(document.getElementById('stockProducto').value, 10),
            stockCritico: document.getElementById('stockCriticoProducto').value ? parseInt(document.getElementById('stockCriticoProducto').value, 10) : null,
            categoria: document.getElementById('categoriaProducto').value,
            origen: document.getElementById('origenProducto').value.trim(),
            unidad: document.getElementById('unidadProducto').value.trim(),
            etiqueta: document.getElementById('etiquetaProducto').value.trim(),
            imagen: document.getElementById('imagenProducto').value.trim() || 'img/default.jpg',
            resenas: []
        };
        productos.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productos));
        alert('¡Producto creado con éxito!');
        window.location.href = 'admin_productos.html';
    }
});