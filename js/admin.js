document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActual || !usuarioActual.esAdmin) {
        window.location.href = 'index.html';
        return;
    }

    const botonCerrarSesion = document.getElementById('botonCerrarSesion');
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('sesionIniciada');
            localStorage.removeItem('usuarioActual');
            localStorage.removeItem('carrito');
            window.location.href = 'index.html';
        });
    }

    const cuerpoTablaBlog = document.getElementById('cuerpoTablaBlog');
    const mensajeSinPublicaciones = document.getElementById('mensajeSinPublicaciones');
    const modalPublicacion = document.getElementById('modalPublicacionBlog') ? new bootstrap.Modal(document.getElementById('modalPublicacionBlog')) : null;
    const formularioPublicacion = document.getElementById('formularioPublicacionBlog');
    const botonCrearPublicacion = document.getElementById('botonCrearPublicacion');
    const tituloModal = document.getElementById('tituloModalPublicacion');

    if (cuerpoTablaBlog) {
        const publicacionesIniciales = [
            { id: 1, titulo: "5 Prácticas Sostenibles para tu Huerto", imagen: "img/blog-sostenibilidad.jpg", fecha: "2025-06-20", categoria: "Sostenibilidad", contenido: `<p>Implementar prácticas sostenibles...</p>` },
            { id: 2, titulo: "Receta: Ensalada de Quínoa y Pimientos", imagen: "img/blog-recetas.jpg", fecha: "2025-06-18", categoria: "Recetas", contenido: `<p>Una receta fresca y nutritiva...</p>` },
            { id: 3, titulo: "Nuestra Huella de Carbono", imagen: "img/blog-huella.jpg", fecha: "2025-06-15", categoria: "Sostenibilidad", contenido: `<p>En HuertoHogar, estamos comprometidos...</p>` },
            { id: 4, titulo: "Contribuciones a la Comunidad", imagen: "img/blog-comunidad.jpg", fecha: "2025-06-10", categoria: "Comunidad", contenido: `<p>Creemos en el poder de la comunidad...</p>` },
            { id: 5, titulo: "Cómo Cultivar un Huerto Urbano", imagen: "img/blog-huerto-urbano.jpg", fecha: "2025-06-05", categoria: "Sostenibilidad", contenido: `<p>No necesitas un gran jardín...</p>` },
            { id: 6, titulo: "Batido Verde Desintoxicante", imagen: "img/blog-batido-verde.jpg", fecha: "2025-05-30", categoria: "Recetas", contenido: `<p>Un batido lleno de nutrientes...</p>` }
        ];

        function obtenerPublicaciones() {
            const publicaciones = localStorage.getItem('publicacionesBlog');
            if (!publicaciones) {
                localStorage.setItem('publicacionesBlog', JSON.stringify(publicacionesIniciales));
                return publicacionesIniciales;
            }
            return JSON.parse(publicaciones);
        }

        function guardarPublicaciones(publicaciones) {
            localStorage.setItem('publicacionesBlog', JSON.stringify(publicaciones));
        }

        function renderizarPublicaciones() {
            const publicaciones = obtenerPublicaciones();
            cuerpoTablaBlog.innerHTML = '';

            if (publicaciones.length === 0) {
                mensajeSinPublicaciones.style.display = 'block';
            } else {
                mensajeSinPublicaciones.style.display = 'none';
                publicaciones.sort((a, b) => b.id - a.id);
                publicaciones.forEach(publicacion => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${publicacion.id}</td>
                        <td>${publicacion.titulo}</td>
                        <td><span class="badge bg-success">${publicacion.categoria}</span></td>
                        <td>${publicacion.fecha}</td>
                        <td>
                            <button class="btn btn-sm btn-warning boton-editar" data-id="${publicacion.id}"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-sm btn-danger boton-eliminar" data-id="${publicacion.id}"><i class="bi bi-trash"></i></button>
                        </td>
                    `;
                    cuerpoTablaBlog.appendChild(fila);
                });
            }
        }

        botonCrearPublicacion.addEventListener('click', () => {
            formularioPublicacion.reset();
            document.getElementById('idPublicacionEditar').value = '';
            tituloModal.textContent = 'Nueva Publicación';
            modalPublicacion.show();
        });

        formularioPublicacion.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const idPublicacion = document.getElementById('idPublicacionEditar').value;
            const publicaciones = obtenerPublicaciones();

            if (idPublicacion) {
                const indice = publicaciones.findIndex(p => p.id == idPublicacion);
                if (indice > -1) {
                    publicaciones[indice].titulo = document.getElementById('tituloPublicacion').value;
                    publicaciones[indice].categoria = document.getElementById('categoriaPublicacion').value;
                    publicaciones[indice].imagen = document.getElementById('imagenPublicacion').value;
                    publicaciones[indice].contenido = document.getElementById('contenidoPublicacion').value;
                }
            } else {
                const nuevoId = publicaciones.length > 0 ? Math.max(...publicaciones.map(p => p.id)) + 1 : 1;
                const nuevaPublicacion = {
                    id: nuevoId,
                    titulo: document.getElementById('tituloPublicacion').value,
                    categoria: document.getElementById('categoriaPublicacion').value,
                    imagen: document.getElementById('imagenPublicacion').value,
                    fecha: new Date().toISOString().slice(0, 10),
                    contenido: document.getElementById('contenidoPublicacion').value,
                };
                publicaciones.push(nuevaPublicacion);
            }

            guardarPublicaciones(publicaciones);
            renderizarPublicaciones();
            modalPublicacion.hide();
            alert('Publicación guardada con éxito.');
        });

        cuerpoTablaBlog.addEventListener('click', (evento) => {
            const objetivo = evento.target.closest('button');
            if (!objetivo) return;

            const idPublicacion = objetivo.dataset.id;

            if (objetivo.classList.contains('boton-editar')) {
                const publicaciones = obtenerPublicaciones();
                const publicacionAEditar = publicaciones.find(p => p.id == idPublicacion);
                if (publicacionAEditar) {
                    document.getElementById('idPublicacionEditar').value = publicacionAEditar.id;
                    document.getElementById('tituloPublicacion').value = publicacionAEditar.titulo;
                    document.getElementById('categoriaPublicacion').value = publicacionAEditar.categoria;
                    document.getElementById('imagenPublicacion').value = publicacionAEditar.imagen;
                    document.getElementById('contenidoPublicacion').value = publicacionAEditar.contenido;
                    tituloModal.textContent = `Editando Publicación #${publicacionAEditar.id}`;
                    modalPublicacion.show();
                }
            }

            if (objetivo.classList.contains('boton-eliminar')) {
                if (confirm(`¿Estás seguro de que quieres eliminar la publicación con ID: ${idPublicacion}?`)) {
                    let publicaciones = obtenerPublicaciones();
                    publicaciones = publicaciones.filter(p => p.id != idPublicacion);
                    guardarPublicaciones(publicaciones);
                    renderizarPublicaciones();
                    alert('Publicación eliminada.');
                }
            }
        });
        renderizarPublicaciones();
    }

    const cuerpoTablaProductos = document.getElementById('cuerpoTablaProductos');
    const mensajeSinProductos = document.getElementById('mensajeSinProductos');
    const elementoModalEditarProducto = document.getElementById('modalEditarProducto');
    let modalEditarProducto = null;

    if (elementoModalEditarProducto) {
        modalEditarProducto = new bootstrap.Modal(elementoModalEditarProducto);

        function obtenerCategoriasUnicas() {
            const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            const categorias = new Set(productosGuardados.map(p => p.categoria));
            return Array.from(categorias).filter(Boolean);
        }

        function renderizarProductosAdmin() {
            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            if (cuerpoTablaProductos) {
                cuerpoTablaProductos.innerHTML = '';
                if (productos.length === 0) {
                    mensajeSinProductos.style.display = 'block';
                } else {
                    mensajeSinProductos.style.display = 'none';
                    productos.forEach(producto => {
                        const fila = document.createElement('tr');
                        const precioFinal = producto.precioConDescuento !== undefined ? producto.precioConDescuento : producto.precio;
                        const precioMostrar = precioFinal === 0 ? 'Gratis' : `$${(precioFinal || 0).toLocaleString('es-CL')}`;
                        const alertaStockCritico = (producto.stockCritico !== null && producto.stock <= producto.stockCritico) ? '<span class="badge bg-danger ms-2">Stock Crítico</span>' : '';

                        const descuento = producto.precioConDescuento !== undefined ? Math.round(((producto.precio - producto.precioConDescuento) / producto.precio) * 100) : 0;
                        const textoDescuento = descuento > 0 ? ` (${descuento}% de dcto.)` : '';
                        
                        const etiqueta = producto.precioConDescuento !== undefined ? 'Oferta' : 'Normal';
                        
                        fila.innerHTML = `
                            <td>${producto.id || ''}</td>
                            <td>${producto.nombre}</td>
                            <td>${precioMostrar}</td>
                            <td>${producto.stock} ${alertaStockCritico}</td>
                            <td>${producto.categoria || 'N/A'}</td>
                            <td>${producto.origen || 'N/A'}</td>
                            <td>
                                <span class="badge ${etiqueta === 'Oferta' ? 'bg-warning' : 'bg-success'}">
                                    ${etiqueta} ${textoDescuento}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-warning boton-editar" data-id="${producto.id}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-danger boton-eliminar" data-id="${producto.id}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        cuerpoTablaProductos.appendChild(fila);
                    });
                }
            }
        }

        if (cuerpoTablaProductos) {
            cuerpoTablaProductos.addEventListener('click', (evento) => {
                if (evento.target.closest('.boton-eliminar')) {
                    const idProducto = parseInt(evento.target.closest('.boton-eliminar').dataset.id);
                    if (confirm(`¿Estás seguro de que quieres eliminar el producto con ID: ${idProducto}?`)) {
                        let productos = JSON.parse(localStorage.getItem('productos')) || [];
                        productos = productos.filter(p => p.id !== idProducto);
                        localStorage.setItem('productos', JSON.stringify(productos));
                        renderizarProductosAdmin();
                        alert('Producto eliminado.');
                    }
                }

                if (evento.target.closest('.boton-editar')) {
                    const idProducto = parseInt(evento.target.closest('.boton-editar').dataset.id);
                    const productos = JSON.parse(localStorage.getItem('productos')) || [];
                    const productoAEditar = productos.find(p => p.id === idProducto);
                    if (productoAEditar) {
                        const descuento = productoAEditar.precioConDescuento !== undefined ?
                            Math.round(((productoAEditar.precio - productoAEditar.precioConDescuento) / productoAEditar.precio) * 100) : 0;

                        document.getElementById('idProductoEditar').value = productoAEditar.id;
                        document.getElementById('codigoProductoEditar').value = productoAEditar.id;
                        document.getElementById('nombreProductoEditar').value = productoAEditar.nombre;
                        document.getElementById('descripcionProductoEditar').value = productoAEditar.descripcion || '';
                        document.getElementById('precioProductoEditar').value = productoAEditar.precio;
                        document.getElementById('stockProductoEditar').value = productoAEditar.stock;
                        document.getElementById('stockCriticoProductoEditar').value = productoAEditar.stockCritico || '';
                        document.getElementById('descuentoProductoEditar').value = descuento;
                        document.getElementById('origenProductoEditar').value = productoAEditar.origen || '';
                        document.getElementById('unidadProductoEditar').value = productoAEditar.unidad || '';
                        
                        const selectorCategoria = document.getElementById('categoriaProductoEditar');
                        const categorias = obtenerCategoriasUnicas();
                        selectorCategoria.innerHTML = '<option value="" selected disabled>Selecciona una categoría</option>';
                        categorias.forEach(cat => {
                            const opcion = document.createElement('option');
                            opcion.value = cat;
                            opcion.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                            if (cat === productoAEditar.categoria) {
                                opcion.selected = true;
                            }
                            selectorCategoria.appendChild(opcion);
                        });
                        modalEditarProducto.show();
                    } else {
                        alert('Producto no encontrado.');
                    }
                }
            });
        }

        const formularioEditarProducto = document.getElementById('formularioEditarProducto');
        if (formularioEditarProducto) {
            formularioEditarProducto.addEventListener('submit', (evento) => {
                evento.preventDefault();
                const idAnterior = parseInt(document.getElementById('idProductoEditar').value);
                let productos = JSON.parse(localStorage.getItem('productos')) || [];
                const indiceProducto = productos.findIndex(p => p.id === idAnterior);

                if (indiceProducto !== -1) {
                    const precio = parseFloat(document.getElementById('precioProductoEditar').value);
                    const descuento = parseInt(document.getElementById('descuentoProductoEditar').value, 10);
                    const stockCritico = document.getElementById('stockCriticoProductoEditar').value.trim();
                    
                    const precioConDescuento = descuento > 0 ? precio * (1 - descuento / 100) : undefined;
                    const etiqueta = descuento > 0 ? 'Oferta' : 'Normal';

                    productos[indiceProducto] = {
                        ...productos[indiceProducto],
                        id: parseInt(document.getElementById('codigoProductoEditar').value.trim()),
                        nombre: document.getElementById('nombreProductoEditar').value.trim(),
                        descripcion: document.getElementById('descripcionProductoEditar').value.trim(),
                        precio: precio,
                        stock: parseInt(document.getElementById('stockProductoEditar').value, 10),
                        stockCritico: stockCritico === '' ? null : parseInt(stockCritico, 10),
                        categoria: document.getElementById('categoriaProductoEditar').value,
                        origen: document.getElementById('origenProductoEditar').value.trim(),
                        unidad: document.getElementById('unidadProductoEditar').value.trim(),
                        etiqueta: etiqueta,
                        precioConDescuento: precioConDescuento
                    };
                    localStorage.setItem('productos', JSON.stringify(productos));
                    renderizarProductosAdmin();
                    alert('Producto editado con éxito.');
                    modalEditarProducto.hide();
                }
            });
        }
        renderizarProductosAdmin();
    }

    const cuerpoTablaUsuarios = document.getElementById('cuerpoTablaUsuarios');
    const mensajeSinUsuarios = document.getElementById('mensajeSinUsuarios');
    const elementoModalEditarUsuario = document.getElementById('modalEditarUsuario');
    let modalEditarUsuario = null;

    if (elementoModalEditarUsuario) {
        modalEditarUsuario = new bootstrap.Modal(elementoModalEditarUsuario);

        function renderizarUsuariosAdmin() {
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            if (cuerpoTablaUsuarios) {
                cuerpoTablaUsuarios.innerHTML = '';
                if (usuarios.length === 0) {
                    mensajeSinUsuarios.style.display = 'block';
                } else {
                    mensajeSinUsuarios.style.display = 'none';
                    usuarios.forEach(usuario => {
                        const fila = document.createElement('tr');
                        const rolUsuario = usuario.esAdmin ? 'Administrador' : (usuario.esVendedor ? 'Vendedor' : 'Cliente');
                        fila.innerHTML = `
                            <td>${usuario.rut || 'N/A'}</td>
                            <td>${usuario.nombre} ${usuario.apellidos || ''}</td>
                            <td>${usuario.correo}</td>
                            <td>${rolUsuario}</td>
                            <td>
                                <button class="btn btn-sm btn-warning boton-editar" data-correo="${usuario.correo}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-danger boton-eliminar" data-correo="${usuario.correo}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        cuerpoTablaUsuarios.appendChild(fila);
                    });
                }
            }
        }

        if (cuerpoTablaUsuarios) {
            cuerpoTablaUsuarios.addEventListener('click', (evento) => {
                if (evento.target.closest('.boton-eliminar')) {
                    const correoUsuario = evento.target.closest('.boton-eliminar').dataset.correo;
                    if (confirm(`¿Estás seguro de que quieres eliminar al usuario con correo: ${correoUsuario}?`)) {
                        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                        usuarios = usuarios.filter(u => u.correo !== correoUsuario);
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                        renderizarUsuariosAdmin();
                        alert('Usuario eliminado.');
                    }
                }

                if (evento.target.closest('.boton-editar')) {
                    const correoUsuario = evento.target.closest('.boton-editar').dataset.correo;
                    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                    const usuarioAEditar = usuarios.find(u => u.correo === correoUsuario);

                    if (usuarioAEditar) {
                        document.getElementById('idCorreoUsuario').value = usuarioAEditar.correo;
                        document.getElementById('runUsuarioEditar').value = usuarioAEditar.rut || '';
                        document.getElementById('nombreUsuarioEditar').value = usuarioAEditar.nombre;
                        document.getElementById('apellidosUsuarioEditar').value = usuarioAEditar.apellidos || '';
                        document.getElementById('correoUsuarioEditar').value = usuarioAEditar.correo;
                        
                        document.getElementById('contrasenaUsuarioEditar').value = '';

                        let rolUsuario = 'cliente';
                        if (usuarioAEditar.esAdmin) rolUsuario = 'administrador';
                        else if (usuarioAEditar.esVendedor) rolUsuario = 'vendedor';
                        document.getElementById('tipoUsuarioEditar').value = rolUsuario;

                        modalEditarUsuario.show();
                    } else {
                        alert('Usuario no encontrado.');
                    }
                }
            });
        }

        const formularioEditarUsuario = document.getElementById('formularioEditarUsuario');
        if (formularioEditarUsuario) {
            formularioEditarUsuario.addEventListener('submit', (evento) => {
                evento.preventDefault();
                
                let esValido = true;
                const run = document.getElementById('runUsuarioEditar').value.trim().toUpperCase();
                const nombre = document.getElementById('nombreUsuarioEditar').value.trim();
                const apellidos = document.getElementById('apellidosUsuarioEditar').value.trim();
                const contrasena = document.getElementById('contrasenaUsuarioEditar').value.trim();
                
                document.getElementById('error-run-editar').textContent = '';
                document.getElementById('error-nombre-editar').textContent = '';
                document.getElementById('error-apellidos-editar').textContent = '';
                document.getElementById('error-contrasena-editar').textContent = '';

                if (!validarRut(run)) {
                    document.getElementById('error-run-editar').textContent = 'El RUN ingresado no es válido.';
                    esValido = false;
                }
                
                if (nombre.length === 0 || nombre.length > 50) {
                    document.getElementById('error-nombre-editar').textContent = 'El nombre es requerido (máximo 50 caracteres).';
                    esValido = false;
                }
                
                if (apellidos.length === 0 || apellidos.length > 100) {
                    document.getElementById('error-apellidos-editar').textContent = 'Los apellidos son requeridos (máximo 100 caracteres).';
                    esValido = false;
                }
                
                if (contrasena.length > 0 && contrasena.length < 4) {
                    document.getElementById('error-contrasena-editar').textContent = 'La contraseña debe tener al menos 4 caracteres.';
                    esValido = false;
                }

                if (!esValido) {
                    return;
                }

                const correo = document.getElementById('idCorreoUsuario').value;
                const tipoUsuario = document.getElementById('tipoUsuarioEditar').value;
                
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                const indiceUsuario = usuarios.findIndex(u => u.correo === correo);

                if (indiceUsuario !== -1) {
                    usuarios[indiceUsuario].rut = run;
                    usuarios[indiceUsuario].nombre = nombre;
                    usuarios[indiceUsuario].apellidos = apellidos;
                    usuarios[indiceUsuario].esAdmin = tipoUsuario === 'administrador';
                    usuarios[indiceUsuario].esVendedor = tipoUsuario === 'vendedor';
                    
                    if (contrasena !== '') {
                        usuarios[indiceUsuario].contrasena = contrasena;
                    }

                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    renderizarUsuariosAdmin();
                    alert('Usuario editado con éxito.');
                    modalEditarUsuario.hide();
                }
            });
        }
        renderizarUsuariosAdmin();
    }
    
    function validarRut(rut) {
        if (!/^[0-9]+-?[0-9kK]{1}$/.test(rut)) return false;
        
        let rutFormateado = rut.replace(/-/g, '').toUpperCase();
        let cuerpo = rutFormateado.slice(0, -1);
        let digitoVerificador = rutFormateado.slice(-1);

        if (cuerpo.length < 7) return false;

        let suma = 0;
        let factor = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * factor;
            factor = (factor === 7) ? 2 : factor + 1;
        }
        
        let dvCalculado = 11 - (suma % 11);
        dvCalculado = (dvCalculado === 11) ? '0' : ((dvCalculado === 10) ? 'K' : dvCalculado.toString());

        return dvCalculado === digitoVerificador;
    }

    function validarCorreo(correo) {
        const expresionRegular = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return expresionRegular.test(correo);
    }
});