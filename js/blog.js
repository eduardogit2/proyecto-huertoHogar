// La estructura de datos 'blogPosts' que te di en el punto 1.
const blogPosts = [
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
    }
];

// Función para renderizar los posts en la página
function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    
    blogPosts.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-4';

        col.innerHTML = `
            <div class="card h-100 shadow-sm blog-card">
                <img src="${post.img}" class="card-img-top blog-img" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text text-muted small">${post.date} | Categoría: ${post.category}</p>
                    <div class="blog-content-summary">${post.content.substring(0, 150)}...</div>
                    <button class="btn btn-primary mt-3 read-more" data-post-id="${post.id}">Leer más</button>
                </div>
            </div>
        `;
        blogContainer.appendChild(col);
    });
}

// Llama a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', renderBlogPosts);