const products = [
    {
        id: 1,
        name: "Manzana Fuji",
        price: 1200,
        category: "Frutas",
        img: "img/prod1.jpg",
        badge: "Fresco",
        description: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.",
        stock: 150,
        origin: "Valle del Maule, Chile",
        unit: "kg",
        reviews: [
            { user: "Ana M.", rating: 5, text: "Excelente calidad, muy crujientes y dulces." },
            { user: "Pedro V.", rating: 4, text: "Muy buenas, pero me gustaría que tuvieran un sabor más intenso." },
            { user: "Luis R.", rating: 5, text: "Las mejores manzanas que he probado. ¡Repetiré!" }
        ]
    },
    {
        id: 2,
        name: "Naranjas Valencia",
        price: 1000,
        category: "Frutas",
        img: "img/prod2.jpg",
        badge: "Fresco",
        description: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.",
        stock: 200,
        origin: "Región de Coquimbo, Chile",
        unit: "kg",
        reviews: [
            { user: "María P.", rating: 5, text: "Muy jugosas y perfectas para el jugo de la mañana." },
            { user: "Juan F.", rating: 4, text: "Sabor muy bueno, aunque algunas venían un poco pequeñas." },
            { user: "Sofía C.", rating: 5, text: "Me encantaron. Dulces y sin semillas. Las recomiendo." }
        ]
    },
    {
        id: 3,
        name: "Plátano Cavendish",
        price: 800,
        category: "Frutas",
        img: "img/prod3.jpg",
        description: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
        stock: 250,
        origin: "Guayas, Ecuador",
        unit: "kg",
        reviews: [
            { user: "Sofía G.", rating: 5, text: "Plátanos muy frescos y a un buen precio." },
            { user: "Carlos E.", rating: 4, text: "Ideales para batidos, maduran rápido." }
        ]
    },
    {
        id: 4,
        name: "Zanahoria Orgánica",
        price: 900,
        category: "Verduras",
        img: "img/prod4.jpg",
        description: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.",
        stock: 100,
        origin: "Región de O'Higgins, Chile",
        unit: "kg",
        reviews: [
            { user: "Carolina V.", rating: 5, text: "Frescas y con un sabor intenso. Mis hijos las comen con gusto." },
            { user: "Felipe T.", rating: 5, text: "El tamaño es perfecto y el precio muy conveniente." }
        ]
    },
    {
        id: 5,
        name: "Espinaca Fresca",
        price: 700,
        category: "Verduras",
        img: "img/prod5.jpg",
        description: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.",
        stock: 80,
        origin: "Ñuble, Chile",
        unit: "bolsa",
        reviews: [
            { user: "Roberta A.", rating: 4, text: "Buena cantidad, ideal para ensaladas." }
        ]
    },
    {
        id: 6,
        name: "Pimiento Tricolores",
        price: 1500,
        category: "Orgánicos",
        img: "img/prod6.jpg",
        description: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.",
        stock: 120,
        origin: "Región de Valparaíso, Chile",
        unit: "kg",
        reviews: [
            { user: "Diego B.", rating: 5, text: "Perfectos para decorar mis platos. Colores vibrantes y muy frescos." }
        ]
    },
    {
        id: 7,
        name: "Miel Orgánica",
        price: 5000,
        category: "Orgánicos",
        img: "img/prod7.jpg",
        description: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.",
        stock: 50,
        origin: "Aysén, Chile",
        unit: "frasco",
        reviews: [
            { user: "Antonia D.", rating: 5, text: "Un sabor exquisito. La mejor miel que he comprado." },
            { user: "Gabriel H.", rating: 5, text: "Muy buena calidad. La uso todos los días en mi desayuno." }
        ]
    },
    {
        id: 8,
        name: "Quínoa Orgánica",
        price: 4500,
        category: "Orgánicos",
        img: "img/prod8.jpg",
        description: "Quínoa orgánica de alta calidad, perfecta para ensaladas o como acompañamiento. Es un superalimento rico en proteínas y fibra, ideal para una dieta balanceada.",
        stock: 75,
        origin: "Cajamarca, Perú",
        unit: "bolsa",
        reviews: [
            { user: "Fernanda L.", rating: 5, text: "Excelente para mis ensaladas. Se cocina muy rápido." },
            { user: "Ignacio M.", rating: 4, text: "Buen producto, llego a tiempo y bien empaquetado." }
        ]
    },
    {
        id: 9,
        name: "Leche Entera",
        price: 1400,
        category: "Lácteos",
        img: "img/prod9.jpg",
        description: "Leche fresca y cremosa, rica en calcio y vitaminas. Perfecta para el desayuno o para preparar tus recetas favoritas. Proviene de granjas locales con prácticas de producción responsable.",
        stock: 90,
        origin: "Los Lagos, Chile",
        unit: "litro",
        reviews: [
            { user: "Pablo Q.", rating: 5, text: "Muy buena y fresca. El sabor es superior a las del supermercado." }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (isLoggedIn !== 'true' || !currentUser) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html'; 
        return; 
    }

    const purchaseSummary = document.getElementById('purchase-summary');
    const finalTotalElement = document.getElementById('final-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const noProductsMessage = document.getElementById('no-products-message');
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    function formatPrice(n) {
        return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    }

    if (cart.length === 0) {
        noProductsMessage.style.display = 'block';
        checkoutBtn.style.display = 'none';
        finalTotalElement.textContent = formatPrice(0);
        return;
    }

    cart.forEach(item => {
        const productInfo = products.find(p => p.id === item.id);
        if (!productInfo) return; // Si no encuentra el producto, no hace nada.

        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'd-flex justify-content-between align-items-center border-bottom py-2';

        const unitDisplay = item.quantity > 1 && (productInfo.unit === 'bolsa' || productInfo.unit === 'litro' || productInfo.unit === 'frasco' || productInfo.unit === 'kg')
            ? productInfo.unit + 's' 
            : productInfo.unit;

        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p class="mb-0 text-muted small">${formatPrice(item.price)} x ${item.quantity} ${unitDisplay}</p>
            </div>
            <span>${formatPrice(item.price * item.quantity)}</span>
        `;
        purchaseSummary.appendChild(itemDiv);
    });

    finalTotalElement.textContent = formatPrice(total);

checkoutBtn.addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const newPurchase = {
        id: Date.now(), // Un ID único para la compra
        date: new Date().toISOString(),
        items: cart,
        total: total
    };
    
    // Agrega la compra al historial del usuario
    if (!currentUser.historial) {
        currentUser.historial = [];
    }
    currentUser.historial.push(newPurchase);

    // Guarda el usuario actualizado en el localStorage principal y en el de todos los usuarios
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = allUsers.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        allUsers[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(allUsers));
    }
    
    // Ahora sí, limpia el carrito y redirige
    localStorage.removeItem('cart');
    alert('¡Compra finalizada con éxito! Gracias por tu pedido.');
    window.location.href = 'index.html';
});
});