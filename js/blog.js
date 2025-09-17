// La estructura de datos 'blogPosts' con comentarios iniciales
// Los comentarios se manejarán en localStorage, pero esta estructura sirve como base inicial.
let blogPosts = [
    {
        id: 1,
        title: "5 Prácticas Sostenibles para tu Huerto",
        img: "img/blog-sostenibilidad.jpg",
        date: "2025-06-20",
        category: "Sostenibilidad",
        content: `
            <p>Implementar prácticas sostenibles en nuestro huerto ayuda a cuidar el medio ambiente...</p>
            <ul>
                <li>Uso de compost casero.</li>
                <li>Recolección de agua de lluvia.</li>
                <li>Cultivo de especies nativas.</li>
                <li>Control de plagas de forma natural.</li>
                <li>Rotación de cultivos.</li>
            </ul>
            <p>Estas acciones no solo benefician a la naturaleza, sino que también mejoran la calidad de tus productos.</p>
        `
    },
    {
        id: 2,
        title: "Receta: Ensalada de Quínoa y Pimientos",
        img: "img/blog-recetas.jpg",
        date: "2025-06-18",
        category: "Recetas",
        content: `
            <p>Una receta fresca y nutritiva para cualquier momento del día...</p>
            <h3>Ingredientes:</h3>
            <ul>
                <li>1 taza de quínoa orgánica.</li>
                <li>Pimientos tricolores de HuertoHogar.</li>
                <li>Cebolla morada, pepino y tomate.</li>
                <li>Aderezo de limón y aceite de oliva.</li>
            </ul>
            <h3>Preparación:</h3>
            <ol>
                <li>Cocina la quínoa según las instrucciones.</li>
                <li>Corta las verduras en cubos pequeños.</li>
                <li>Mezcla todo en un bol y añade el aderezo.</li>
            </ol>
            <p>¡Disfruta de una comida deliciosa y llena de vitaminas!</p>
        `
    },
    {
        id: 3,
        title: "Nuestra Huella de Carbono: El Camino Hacia la Sostenibilidad",
        img: "img/blog-huella.jpg",
        date: "2025-06-15",
        category: "Sostenibilidad",
        content: `
            <p>En HuertoHogar, estamos comprometidos con la reducción de nuestra huella de carbono. Te contamos cómo lo hacemos...</p>
            <ul>
                <li>Proveedores locales para reducir el transporte.</li>
                <li>Empaques biodegradables.</li>
                <li>Sistemas de reparto eficientes.</li>
            </ul>
            <p>Cada vez que compras con nosotros, contribuyes a un futuro más verde y limpio.</p>
        `
    },
    {
        id: 4,
        title: "Contribuciones a la Comunidad: Apoyando a Productores Locales",
        img: "img/blog-comunidad.jpg",
        date: "2025-06-10",
        category: "Comunidad",
        content: `
            <p>Creemos en el poder de la comunidad. Por eso, el 80% de nuestros productos provienen de pequeños agricultores...</p>
            <p>Trabajamos de la mano con ellos para asegurar precios justos y una cadena de suministro transparente. Tu compra no solo te alimenta a ti, sino que también apoya a las familias que cultivan nuestros alimentos.</p>
        `
    },
    {
        id: 5,
        title: "Cómo Cultivar un Huerto Urbano",
        img: "img/blog-huerto-urbano.jpg",
        date: "2025-06-05",
        category: "Sostenibilidad",
        content: `
            <p>No necesitas un gran jardín para empezar a cultivar. Un huerto urbano es la solución perfecta para espacios pequeños.</p>
            <p>Aquí tienes algunos consejos:</p>
            <ul>
                <li>Elige un lugar soleado en tu balcón o terraza.</li>
                <li>Usa macetas con buen drenaje y sustrato de calidad.</li>
                <li>Empieza con plantas fáciles como hierbas aromáticas, lechugas o rabanitos.</li>
                <li>Riega con regularidad y abona cada 2-3 semanas.</li>
            </ul>
            <p>¡Disfruta de tus propios productos frescos!</p>
        `
    },
    {
        id: 6,
        title: "Batido Verde Desintoxicante",
        img: "img/blog-batido-verde.jpg",
        date: "2025-05-30",
        category: "Recetas",
        content: `
            <p>Un batido lleno de nutrientes para empezar el día con energía.</p>
            <h3>Ingredientes:</h3>
            <ul>
                <li>1 taza de espinacas frescas.</li>
                <li>1 plátano maduro.</li>
                <li>1/2 taza de yogur natural.</li>
                <li>1/4 de taza de leche de almendras.</li>
                <li>Un puñado de semillas de chía.</li>
            </ul>
            <h3>Preparación:</h3>
            <p>Simplemente mezcla todos los ingredientes en una licuadora hasta obtener una consistencia suave. ¡Listo para servir!</p>
        `
    }
];

// Descripción para cada categoría
const categoryDescriptions = {
    "Todos": "Explora todos los artículos de nuestro blog, desde recetas saludables hasta consejos de sostenibilidad.",
    "Sostenibilidad": "Artículos sobre prácticas ecológicas, cuidado del medio ambiente y cómo reducir tu huella de carbono.",
    "Recetas": "Inspiración culinaria con recetas frescas y nutritivas que puedes preparar con nuestros productos.",
    "Comunidad": "Conoce cómo trabajamos con productores locales y las iniciativas que apoyamos."
};

let currentCategory = 'Todos';

// --- Lógica para cargar y guardar los comentarios ---

// Comentarios iniciales "falsos"
const initialComments = {
    '1': [
        { user: "Ana", text: "¡Muy buenos consejos! Empezaré a hacer mi propio compost." },
        { user: "Carlos", text: "La rotación de cultivos es clave, lo he notado en mi huerto. ¡Gracias!" }
    ],
    '4': [
        { user: "Pedro", text: "Es genial saber que apoyan a los pequeños productores." },
        { user: "María", text: "Me encanta este tipo de iniciativas, ¡sigan así!" }
    ],
    '5': [
        { user: "Javier", text: "Excelente guía, justo lo que necesitaba para mi balcón." }
    ]
};

function loadComments() {
    // Intenta cargar los comentarios del localStorage. Si no hay, usa los comentarios iniciales.
    const savedComments = JSON.parse(localStorage.getItem('blogComments'));
    return savedComments || initialComments;
}

function saveComments(comments) {
    // Guarda el objeto de comentarios en el localStorage
    localStorage.setItem('blogComments', JSON.stringify(comments));
}

// Carga los comentarios guardados al iniciar el script
let allComments = loadComments();

// --- Lógica principal para controlar la página ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias a elementos del DOM
    const blogContainer = document.getElementById('blog-container');
    const categoryList = document.getElementById('categoryList');
    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    const categoryDescriptionEl = document.getElementById('category-description');
    const commentFormSection = document.getElementById('comment-form-section');
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    const commentSectionMessage = document.getElementById('comment-section-message');
    let currentPostId = null;

    // --- Lógica de Filtros y Descripción ---
    function renderCategories() {
        const uniqueCategories = ['Todos', ...new Set(blogPosts.map(p => p.category))];
        categoryList.innerHTML = '';
    
        uniqueCategories.forEach(cat => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.setAttribute('data-category', cat);
            li.textContent = cat;
    
            if (cat === currentCategory) {
                li.classList.add('active');
            }
    
            li.addEventListener('click', () => {
                currentCategory = cat;
                renderCategories();
                renderBlogPosts();
            });
            categoryList.appendChild(li);
        });
    }

    function renderBlogPosts() {
        blogContainer.innerHTML = '';
        
        let postsToShow = blogPosts;
        if (currentCategory !== "Todos") {
            postsToShow = blogPosts.filter(post => post.category === currentCategory);
        }

        categoryDescriptionEl.textContent = categoryDescriptions[currentCategory] || '';
        categoryDescriptionEl.style.display = 'block';

        postsToShow.forEach(post => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-4 d-flex'; // <<-- Agregado: 'd-flex' para que las columnas se comporten como contenedores flex

            // Crea un resumen de texto plano para evitar cortar HTML
            const summaryText = new DOMParser().parseFromString(post.content, 'text/html').body.textContent;
            const shortSummary = summaryText.substring(0, 150).trim() + '...';

            col.innerHTML = `
                <div class="card h-100 shadow-sm blog-card">
                    <img src="${post.img}" class="card-img-top blog-img" alt="${post.title}">
                    <div class="card-body">
                        <div class="card-text-container">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text text-muted small">${post.date} | Categoría: ${post.category}</p>
                            <p class="blog-content-summary">${shortSummary}</p> </div>
                        <button class="btn btn-primary mt-3 read-more" data-post-id="${post.id}">Leer más</button>
                    </div>
                </div>
            `;
            blogContainer.appendChild(col);
        });

        addReadMoreListeners();
    }
    
    // --- Lógica de la Modal ---
    function showPostInModal(postId) {
        currentPostId = postId;
        const post = blogPosts.find(p => p.id === postId);

        if (post) {
            document.getElementById('postModalLabel').textContent = post.title;
            document.getElementById('modalPostImage').src = post.img;
            document.getElementById('modalPostImage').alt = post.title;
            document.getElementById('modalPostDate').textContent = `${post.date} | Categoría: ${post.category}`;
            document.getElementById('modalPostContent').innerHTML = post.content;
            
            // Renderiza los comentarios de ese post específico
            const postComments = allComments[postId] || [];
            renderComments(postComments);
            
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (isLoggedIn) {
                commentFormSection.style.display = 'block';
                commentSectionMessage.style.display = 'none';
            } else {
                commentFormSection.style.display = 'none';
                commentSectionMessage.style.display = 'block';
            }
            
            postModal.show();
        }
    }
    
    // Función para añadir los event listeners a los botones "Leer más"
    function addReadMoreListeners() {
        const readMoreButtons = document.querySelectorAll('.read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const postId = parseInt(event.target.dataset.postId);
                showPostInModal(postId);
            });
        });
    }

    // --- Lógica de Comentarios ---
    function renderComments(comments) {
        commentsContainer.innerHTML = '';
        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="text-muted fst-italic text-center">Sé el primero en comentar.</p>';
        } else {
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'card card-body mb-2';
                commentDiv.innerHTML = `
                    <strong>${comment.user}</strong>
                    <p class="mb-0">${comment.text}</p>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        }
    }

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Debes iniciar sesión para agregar un comentario.');
            return;
        }

        const commentText = document.getElementById('comment-text').value;
        if (commentText.trim() === '') {
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // Crea un array para los comentarios si aún no existe para este post
        if (!allComments[currentPostId]) {
            allComments[currentPostId] = [];
        }

        // Agrega el nuevo comentario
        const newComment = { user: currentUser.nombre, text: commentText };
        allComments[currentPostId].push(newComment);
        
        // Guarda los comentarios actualizados en el localStorage
        saveComments(allComments);
        
        // Vuelve a renderizar los comentarios para que el nuevo aparezca
        renderComments(allComments[currentPostId]);
        document.getElementById('comment-text').value = '';
    });

    // Llama a las funciones de renderizado de la barra de navegación y el carrito
    if (typeof updateAuthUI === 'function') {
        updateAuthUI();
    }
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }

    // --- Carga inicial ---
    renderCategories();
    renderBlogPosts();
});