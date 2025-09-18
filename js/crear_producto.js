document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para Cargar Categorías en el Select ---
    const categoriaSelect = document.getElementById('categoriaProducto');

    function obtenerCategoriasUnicas() {
        const productosGuardados = JSON.parse(localStorage.getItem('productsWithReviews')) || [];
        const categoriasSet = new Set(productosGuardados.map(p => p.category));
        return Array.from(categoriasSet).filter(Boolean);
    }

    function cargarCategorias() {
        if (categoriaSelect) {
            const categorias = obtenerCategoriasUnicas();
            categorias.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                categoriaSelect.appendChild(option);
            });
        }
    }
    
    cargarCategorias();

    // --- Lógica de Validación y Creación del Producto ---
    const form = document.getElementById('formularioCrearProducto');
    if (form) {
        form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (validarFormulario()) {
                guardarProducto();
            }
        });
    }

    function validarFormulario() {
        let esValido = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = ''); // Limpiar errores previos

        // Código
        const codigo = document.getElementById('codigoProducto').value.trim();
        if (codigo.length < 3) {
            document.getElementById('error-codigo').textContent = 'El código es requerido y debe tener al menos 3 caracteres.';
            esValido = false;
        }

        // Nombre
        const nombre = document.getElementById('nombreProducto').value.trim();
        if (nombre.length === 0 || nombre.length > 100) {
            document.getElementById('error-nombre').textContent = 'El nombre es requerido (máximo 100 caracteres).';
            esValido = false;
        }

        // Descripción
        const descripcion = document.getElementById('descripcionProducto').value.trim();
        if (descripcion.length > 500) {
            document.getElementById('error-descripcion').textContent = 'La descripción no puede superar los 500 caracteres.';
            esValido = false;
        }

        // Precio
        const precio = document.getElementById('precioProducto').value;
        if (precio === '' || parseFloat(precio) < 0) {
            document.getElementById('error-precio').textContent = 'El precio es requerido y debe ser 0 o mayor.';
            esValido = false;
        }

        // Stock
        const stock = document.getElementById('stockProducto').value;
        if (stock === '' || parseInt(stock) < 0 || !Number.isInteger(Number(stock))) {
            document.getElementById('error-stock').textContent = 'El stock es requerido y debe ser un número entero mayor o igual a 0.';
            esValido = false;
        }

        // Stock Crítico
        const stockCritico = document.getElementById('stockCriticoProducto').value;
        if (stockCritico !== '' && (parseInt(stockCritico) < 0 || !Number.isInteger(Number(stockCritico)))) {
            document.getElementById('error-stock-critico').textContent = 'Si se ingresa, el stock crítico debe ser un número entero mayor o igual a 0.';
            esValido = false;
        }

        // Categoría
        if (categoriaSelect.value === '') {
            document.getElementById('error-categoria').textContent = 'Debes seleccionar una categoría.';
            esValido = false;
        }
        
        // Origen
        const origen = document.getElementById('origenProducto').value.trim();
        if (origen.length === 0) {
            document.getElementById('error-origen').textContent = 'El origen es requerido.';
            esValido = false;
        }

        // Unidad
        const unit = document.getElementById('unitProducto').value.trim();
        if (unit.length === 0) {
            document.getElementById('error-unit').textContent = 'La unidad es requerida (ej: kg, bolsa).';
            esValido = false;
        }

        return esValido;
    }
    
    function guardarProducto() {
            const productos = JSON.parse(localStorage.getItem('productsWithReviews')) || [];

            const nuevoProducto = {
                id: parseInt(document.getElementById('codigoProducto').value.trim()),
                name: document.getElementById('nombreProducto').value.trim(),
                description: document.getElementById('descripcionProducto').value.trim(),
                price: parseFloat(document.getElementById('precioProducto').value),
                stock: parseInt(document.getElementById('stockProducto').value, 10),
                stockCritico: document.getElementById('stockCriticoProducto').value ? parseInt(document.getElementById('stockCriticoProducto').value, 10) : null,
                category: document.getElementById('categoriaProducto').value,
                origin: document.getElementById('origenProducto').value.trim(),
                unit: document.getElementById('unitProducto').value.trim(),
                badge: document.getElementById('badgeProducto').value.trim(),
                img: document.getElementById('imagenProducto').value.trim() || 'img/default.jpg',
                reviews: []
            };

            productos.push(nuevoProducto);
            localStorage.setItem('productsWithReviews', JSON.stringify(productos));

            alert('✅ ¡Producto creado con éxito!');
            window.location.href = 'admin_productos.html';
        }
    });