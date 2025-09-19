document.addEventListener('DOMContentLoaded', () => {
    // Redirigir si no es admin
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html';
        return;
    }

    // --- Referencias a Elementos del DOM ---
    const blogTableBody = document.getElementById('blog-table-body');
    const noPostsMessage = document.getElementById('no-posts-message');
    const blogPostModal = new bootstrap.Modal(document.getElementById('blogPostModal'));
    const formularioBlogPost = document.getElementById('formularioBlogPost');
    const crearPostBtn = document.getElementById('crearPostBtn');
    const modalTitle = document.getElementById('blogPostModalLabel');

    // --- CORRECCIÓN: Datos Iniciales COMPLETOS ---
    const initialBlogPosts = [
        {
            id: 1,
            title: "5 Prácticas Sostenibles para tu Huerto",
            img: "img/blog-sostenibilidad.jpg",
            date: "2025-06-20",
            category: "Sostenibilidad",
            content: `<p>Implementar prácticas sostenibles en nuestro huerto ayuda a cuidar el medio ambiente...</p><ul><li>Uso de compost casero.</li><li>Recolección de agua de lluvia.</li><li>Cultivo de especies nativas.</li><li>Control de plagas de forma natural.</li><li>Rotación de cultivos.</li></ul><p>Estas acciones no solo benefician a la naturaleza, sino que también mejoran la calidad de tus productos.</p>`
        },
        {
            id: 2,
            title: "Receta: Ensalada de Quínoa y Pimientos",
            img: "img/blog-recetas.jpg",
            date: "2025-06-18",
            category: "Recetas",
            content: `<p>Una receta fresca y nutritiva para cualquier momento del día...</p><h3>Ingredientes:</h3><ul><li>1 taza de quínoa orgánica.</li><li>Pimientos tricolores de HuertoHogar.</li><li>Cebolla morada, pepino y tomate.</li><li>Aderezo de limón y aceite de oliva.</li></ul><h3>Preparación:</h3><ol><li>Cocina la quínoa según las instrucciones.</li><li>Corta las verduras en cubos pequeños.</li><li>Mezcla todo en un bol y añade el aderezo.</li></ol><p>¡Disfruta de una comida deliciosa y llena de vitaminas!</p>`
        },
        {
            id: 3,
            title: "Nuestra Huella de Carbono: El Camino Hacia la Sostenibilidad",
            img: "img/blog-huella.jpg",
            date: "2025-06-15",
            category: "Sostenibilidad",
            content: `<p>En HuertoHogar, estamos comprometidos con la reducción de nuestra huella de carbono. Te contamos cómo lo hacemos...</p><ul><li>Proveedores locales para reducir el transporte.</li><li>Empaques biodegradables.</li><li>Sistemas de reparto eficientes.</li></ul><p>Cada vez que compras con nosotros, contribuyes a un futuro más verde y limpio.</p>`
        },
        {
            id: 4,
            title: "Contribuciones a la Comunidad: Apoyando a Productores Locales",
            img: "img/blog-comunidad.jpg",
            date: "2025-06-10",
            category: "Comunidad",
            content: `<p>Creemos en el poder de la comunidad. Por eso, el 80% de nuestros productos provienen de pequeños agricultores...</p><p>Trabajamos de la mano con ellos para asegurar precios justos y una cadena de suministro transparente. Tu compra no solo te alimenta a ti, sino que también apoya a las familias que cultivan nuestros alimentos.</p>`
        },
        {
            id: 5,
            title: "Cómo Cultivar un Huerto Urbano",
            img: "img/blog-huerto-urbano.jpg",
            date: "2025-06-05",
            category: "Sostenibilidad",
            content: `<p>No necesitas un gran jardín para empezar a cultivar. Un huerto urbano es la solución perfecta para espacios pequeños.</p><p>Aquí tienes algunos consejos:</p><ul><li>Elige un lugar soleado en tu balcón o terraza.</li><li>Usa macetas con buen drenaje y sustrato de calidad.</li><li>Empieza con plantas fáciles como hierbas aromáticas, lechugas o rabanitos.</li><li>Riega con regularidad y abona cada 2-3 semanas.</li></ul><p>¡Disfruta de tus propios productos frescos!</p>`
        },
        {
            id: 6,
            title: "Batido Verde Desintoxicante",
            img: "img/blog-batido-verde.jpg",
            date: "2025-05-30",
            category: "Recetas",
            content: `<p>Un batido lleno de nutrientes para empezar el día con energía.</p><h3>Ingredientes:</h3><ul><li>1 taza de espinacas frescas.</li><li>1 plátano maduro.</li><li>1/2 taza de yogur natural.</li><li>1/4 de taza de leche de almendras.</li><li>Un puñado de semillas de chía.</li></ul><h3>Preparación:</h3><p>Simplemente mezcla todos los ingredientes en una licuadora hasta obtener una consistencia suave. ¡Listo para servir!</p>`
        }
    ];

    // --- Funciones para manejar Datos en localStorage ---
    function getPosts() {
        const posts = localStorage.getItem('blogPosts');
        if (!posts) {
            localStorage.setItem('blogPosts', JSON.stringify(initialBlogPosts));
            return initialBlogPosts;
        }
        return JSON.parse(posts);
    }

    function savePosts(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    // --- Lógica de Renderizado ---
    function renderBlogPosts() {
        const posts = getPosts();
        blogTableBody.innerHTML = '';

        if (posts.length === 0) {
            noPostsMessage.style.display = 'block';
        } else {
            noPostsMessage.style.display = 'none';
            posts.sort((a, b) => b.id - a.id);
            posts.forEach(post => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td><span class="badge bg-primary">${post.category}</span></td>
                    <td>${post.date}</td>
                    <td>
                        <button class="btn btn-sm btn-warning editar-btn" data-id="${post.id}"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger eliminar-btn" data-id="${post.id}"><i class="bi bi-trash"></i></button>
                    </td>
                `;
                blogTableBody.appendChild(fila);
            });
        }
    }

    // --- Lógica de Eventos ---
    crearPostBtn.addEventListener('click', () => {
        formularioBlogPost.reset();
        document.getElementById('postIdEditar').value = '';
        modalTitle.textContent = 'Nueva Publicación';
        blogPostModal.show();
    });

    formularioBlogPost.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const postId = document.getElementById('postIdEditar').value;
        const posts = getPosts();

        if (postId) {
            const postIndex = posts.findIndex(p => p.id == postId);
            if (postIndex > -1) {
                posts[postIndex].title = document.getElementById('postTitulo').value;
                posts[postIndex].category = document.getElementById('postCategoria').value;
                posts[postIndex].img = document.getElementById('postImagen').value;
                posts[postIndex].content = document.getElementById('postContenido').value;
            }
        } else {
            const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
            const newPost = {
                id: newId,
                title: document.getElementById('postTitulo').value,
                category: document.getElementById('postCategoria').value,
                img: document.getElementById('postImagen').value,
                date: new Date().toISOString().slice(0, 10),
                content: document.getElementById('postContenido').value,
            };
            posts.push(newPost);
        }

        savePosts(posts);
        renderBlogPosts();
        blogPostModal.hide();
        alert('✅ Publicación guardada con éxito.');
    });

    blogTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const postId = target.dataset.id;
        
        if (target.classList.contains('editar-btn')) {
            const posts = getPosts();
            const postAEditar = posts.find(p => p.id == postId);
            if (postAEditar) {
                document.getElementById('postIdEditar').value = postAEditar.id;
                document.getElementById('postTitulo').value = postAEditar.title;
                document.getElementById('postCategoria').value = postAEditar.category;
                document.getElementById('postImagen').value = postAEditar.img;
                document.getElementById('postContenido').value = postAEditar.content;
                modalTitle.textContent = `Editando Publicación #${postAEditar.id}`;
                blogPostModal.show();
            }
        }

        if (target.classList.contains('eliminar-btn')) {
            if (confirm(`¿Estás seguro de que quieres eliminar la publicación con ID: ${postId}?`)) {
                let posts = getPosts();
                posts = posts.filter(p => p.id != postId);
                savePosts(posts);
                renderBlogPosts();
                alert('Publicación eliminada.');
            }
        }
    });

    renderBlogPosts();
});