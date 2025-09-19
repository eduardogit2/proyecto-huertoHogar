// --- Lógica para cargar los posts desde localStorage ---
// Función para obtener los posts. Si no existen en localStorage, usa los datos iniciales y los guarda.
function getBlogPostsFromStorage() {
    let posts = JSON.parse(localStorage.getItem('blogPosts'));

    // Si no hay nada en localStorage, se usa la data inicial como fallback y se guarda.
    if (!posts || posts.length === 0) {
        // --- CORRECCIÓN: Datos Iniciales COMPLETOS ---
        const initialBlogPosts = [
            {
                id: 1,
                title: "5 Prácticas Sostenibles para tu Huerto",
                img: "img/blog-sostenibilidad.jpg",
                date: "2025-06-20",
                category: "Sostenibilidad",
                content: `
            <p>Implementar prácticas sostenibles en nuestro huerto no solo ayuda a cuidar el medio ambiente, sino que también fortalece la salud de nuestras plantas y la calidad de los alimentos que cosechamos. Aquí te detallamos cinco prácticas clave que puedes empezar a aplicar hoy mismo.</p>
            <h4>1. Uso de compost casero</h4>
            <p>El compostaje es una forma fantástica de reciclar desechos orgánicos de tu cocina y jardín. Transforma restos de frutas, verduras y hojas secas en un abono rico en nutrientes que mejora la estructura del suelo y reduce la necesidad de fertilizantes químicos.</p>
            <h4>2. Recolección de agua de lluvia</h4>
            <p>Instalar un sistema de recolección de agua de lluvia es una manera eficiente de conservar agua potable. Esta agua es naturalmente suave, libre de cloro y perfecta para regar tus plantas, que la prefieren por sobre el agua del grifo.</p>
            <h4>3. Cultivo de especies nativas</h4>
            <p>Las plantas nativas están adaptadas al clima y suelo de tu región. Esto significa que requieren menos agua, son más resistentes a plagas locales y promueven la biodiversidad atrayendo a polinizadores como abejas y mariposas.</p>
            <h4>4. Control de plagas de forma natural</h4>
            <p>En lugar de pesticidas, puedes introducir insectos beneficiosos como las chinitas (mariquitas) para controlar pulgones, o usar barreras físicas y trampas. Plantar hierbas aromáticas como la albahaca o la menta también ayuda a repeler insectos no deseados.</p>
            <h4>5. Rotación de cultivos</h4>
            <p>No plantes la misma especie en el mismo lugar año tras año. La rotación de cultivos previene el agotamiento de nutrientes específicos del suelo y ayuda a interrumpir los ciclos de vida de plagas y enfermedades.</p>
            <p>Estas acciones no solo benefician a la naturaleza, sino que también mejoran la calidad y el sabor de tus productos. ¡Un huerto sostenible es un huerto feliz!</p>
        `
            },
            {
                id: 2,
                title: "Receta: Ensalada de Quínoa y Pimientos",
                img: "img/blog-recetas.jpg",
                date: "2025-06-18",
                category: "Recetas",
                content: `
            <p>Una receta fresca, colorida y nutritiva para cualquier momento del día. Esta ensalada es rica en proteínas, vitaminas y es perfecta como plato principal o como acompañamiento.</p>
            <h3>Ingredientes:</h3>
            <ul>
                <li>1 taza de quínoa orgánica.</li>
                <li>1 pimiento rojo, 1 amarillo y 1 verde de <strong>HuertoHogar</strong>.</li>
                <li>1/2 cebolla morada picada finamente.</li>
                <li>1 pepino mediano, sin semillas y en cubos.</li>
                <li>1 taza de tomates cherry, cortados por la mitad.</li>
                <li>Un puñado de perejil fresco picado.</li>
                <li><strong>Para el aderezo:</strong> 1/4 taza de aceite de oliva virgen extra, el jugo de 1 limón, sal y pimienta al gusto.</li>
            </ul>
            <h3>Preparación:</h3>
            <ol>
                <li>Cocina la quínoa según las instrucciones del paquete. Una vez lista, déjala enfriar a temperatura ambiente.</li>
                <li>Mientras la quínoa se enfría, corta los pimientos, la cebolla, el pepino y los tomates.</li>
                <li>En un bol grande, mezcla la quínoa ya fría con todas las verduras picadas y el perejil.</li>
                <li>En un frasco pequeño, mezcla los ingredientes del aderezo y agita bien.</li>
                <li>Vierte el aderezo sobre la ensalada y revuelve suavemente para combinar todo.</li>
            </ol>
            <p>¡Sirve inmediatamente y disfruta de una comida deliciosa y llena de vitaminas!</p>
        `
            },
            {
                id: 3,
                title: "Nuestra Huella de Carbono: El Camino Hacia la Sostenibilidad",
                img: "img/blog-huella.jpg",
                date: "2025-06-15",
                category: "Sostenibilidad",
                content: `
            <p>En <strong>HuertoHogar</strong>, estamos profundamente comprometidos con la reducción de nuestra huella de carbono. Creemos que cada pequeña acción cuenta para construir un futuro más verde. Te contamos cómo lo hacemos:</p>
            <h4>Proveedores locales para reducir el transporte</h4>
            <p>Al trabajar principalmente con agricultores de nuestra región, disminuimos drásticamente las distancias que nuestros productos deben recorrer. Menos transporte significa menos emisiones de CO2 y alimentos más frescos para ti.</p>
            <h4>Empaques biodegradables y compostables</h4>
            <p>Hemos eliminado el plástico de un solo uso en nuestros empaques. Utilizamos materiales reciclados, biodegradables y compostables que puedes agregar a tu propia compostera, cerrando así el ciclo de la materia orgánica.</p>
            <h4>Sistemas de reparto eficientes</h4>
            <p>Optimizamos nuestras rutas de entrega para que nuestros vehículos recorran la menor distancia posible. Además, estamos en proceso de incorporar bicicletas de carga para las entregas en zonas céntricas, apostando por una logística de cero emisiones.</p>
            <p>Cada vez que compras con nosotros, no solo eliges productos de calidad, sino que también te sumas a un movimiento que contribuye activamente a un futuro más verde y limpio para todos.</p>
        `
            },
            {
                id: 4,
                title: "Contribuciones a la Comunidad: Apoyando a Productores Locales",
                img: "img/blog-comunidad.jpg",
                date: "2025-06-10",
                category: "Comunidad",
                content: `
            <p>Creemos firmemente en el poder de la comunidad y en la importancia de fortalecer la economía local. Por eso, más del 80% de nuestros productos provienen de pequeños y medianos agricultores de la región del Biobío.</p>
            <p>Trabajamos de la mano con ellos para asegurar precios justos y una cadena de suministro transparente. Esto no solo garantiza que recibas productos frescos y de temporada, sino que también apoya directamente a las familias que con dedicación y esfuerzo cultivan nuestros alimentos.</p>
            <p>Al elegir <strong>HuertoHogar</strong>, te conviertes en un eslabón vital de esta cadena de valor. Tu compra tiene un impacto real: ayuda a preservar las tradiciones agrícolas locales, fomenta un comercio más ético y contribuye al desarrollo sostenible de nuestra comunidad.</p>
        `
            },
            {
                id: 5,
                title: "Cómo Cultivar un Huerto Urbano exitoso",
                img: "img/blog-huerto-urbano.jpg",
                date: "2025-06-05",
                category: "Sostenibilidad",
                content: `
            <p>¡No necesitas un gran jardín para empezar a cultivar! Un huerto urbano en tu balcón, terraza o incluso en una ventana soleada es la solución perfecta para disfrutar de tus propios alimentos en espacios pequeños.</p>
            <p>Aquí tienes algunos consejos clave para el éxito:</p>
            <ul>
                <li><strong>Elige el lugar adecuado:</strong> Busca un espacio que reciba al menos 5-6 horas de luz solar directa al día. La orientación norte es ideal.</li>
                <li><strong>Macetas y drenaje:</strong> Usa macetas con buen drenaje para evitar que las raíces se pudran. Asegúrate de que tengan agujeros en la base.</li>
                <li><strong>Sustrato de calidad:</strong> Invierte en un buen sustrato. Una mezcla de compost, fibra de coco y perlita proporcionará los nutrientes y la aireación que tus plantas necesitan.</li>
                <li><strong>Empieza con plantas fáciles:</strong> Si eres principiante, comienza con cultivos sencillos y de rápido crecimiento como hierbas aromáticas (albahaca, ciboulette), lechugas, espinacas o rabanitos.</li>
                <li><strong>Riego y abono:</strong> Riega con regularidad, pero sin encharcar. Toca la tierra para sentir la humedad. Abona cada 2-3 semanas durante la temporada de crecimiento con un fertilizante orgánico.</li>
            </ul>
            <p>Cultivar tus alimentos es una experiencia increíblemente gratificante. ¡Disfruta del proceso y del sabor incomparable de tus propios productos frescos!</p>
        `
            },
            {
                id: 6,
                title: "Batido Verde Desintoxicante y Energético",
                img: "img/blog-batido-verde.jpg",
                date: "2025-05-30",
                category: "Recetas",
                content: `
            <p>Un batido lleno de nutrientes para empezar el día con energía o para recuperarte después de hacer ejercicio. Es delicioso, fácil de preparar y está cargado de vitaminas y minerales.</p>
            <h3>Ingredientes:</h3>
            <ul>
                <li>1 taza de espinacas frescas.</li>
                <li>1 plátano maduro congelado (para una textura más cremosa).</li>
                <li>1/2 manzana verde.</li>
                <li>1/2 taza de yogur natural sin azúcar.</li>
                <li>1/4 de taza de leche de almendras (o la que prefieras).</li>
                <li>1 cucharada de semillas de chía.</li>
                <li>Opcional: una cucharadita de miel o sirope de arce si lo prefieres más dulce.</li>
            </ul>
            <h3>Preparación:</h3>
            <p>Simplemente mezcla todos los ingredientes en una licuadora de alta velocidad hasta obtener una consistencia suave y homogénea. Si queda muy espeso, puedes añadir un poco más de leche. ¡Listo para servir y disfrutar al instante!</p>
        `
            }
        ];
        localStorage.setItem('blogPosts', JSON.stringify(initialBlogPosts));
        return initialBlogPosts;
    }
    return posts;
}

// Carga los posts desde la función que maneja el localStorage
let blogPosts = getBlogPostsFromStorage();

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