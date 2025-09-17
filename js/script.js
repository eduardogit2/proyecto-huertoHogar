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

const productsContainer = document.getElementById('productsContainer');
const categoryList = document.getElementById('categoryList');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const clearBtn = document.getElementById('clearFilters');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const authButtons = document.getElementById('authButtons');
const categoryDescriptionEl = document.getElementById('categoryDescription');

let currentCategory = 'Todas';
let currentMaxPrice = Number(priceRange.value);
let currentQuery = '';
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
const modalTitle = document.getElementById('productDetailModalLabel');
const modalContent = document.getElementById('productDetailContent');

let currentProductId = null;

const categoryDescriptions = {
    'Todas': 'Explora nuestra amplia selección de productos frescos y de alta calidad para tu hogar.',
    'Frutas': 'Deliciosas y jugosas frutas de temporada, directamente del huerto a tu mesa.',
    'Verduras': 'Las verduras más frescas y nutritivas para una alimentación sana y equilibrada.',
    'Lácteos': 'Productos lácteos cremosos y frescos, perfectos para tu desayuno y recetas.',
    'Orgánicos': 'Productos cultivados de forma natural, sin pesticidas ni químicos, para una opción más saludable.'
};

function saveProducts() {
    localStorage.setItem('productsWithReviews', JSON.stringify(products));
}

function loadProducts() {
    const savedProducts = JSON.parse(localStorage.getItem('productsWithReviews'));
    if (savedProducts) {
        savedProducts.forEach(savedProduct => {
            const originalProduct = products.find(p => p.id === savedProduct.id);
            if (originalProduct) {
                originalProduct.reviews = savedProduct.reviews;
            }
        });
    }
}

function getStarRating(rating) {
    const fullStar = '⭐';
    return fullStar.repeat(rating);
}

function renderReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = '';
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p class="text-muted fst-italic text-center">Este producto no tiene reseñas aún. ¡Sé el primero en dejar una!</p>';
    } else {
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'card card-body mb-2';
            reviewDiv.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong>${review.user}</strong>
                    <span class="text-warning">${getStarRating(review.rating)}</span>
                </div>
                <p class="mb-0">${review.text}</p>
            `;
            reviewsContainer.appendChild(reviewDiv);
        });
    }
}

function renderCategories() {
    const uniqueCategories = ['Todas', ...new Set(products.map(p => p.category))];
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';

    uniqueCategories.forEach(cat => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-category', cat);
        li.textContent = cat;

        if (cat === currentCategory) {
            li.classList.add('active');
        }

        li.addEventListener('click', () => {
            currentCategory = cat;
            renderCategories();
            renderProducts();

            categoryDescriptionEl.textContent = categoryDescriptions[cat] || '';
            categoryDescriptionEl.style.display = 'block';
        });
        categoryList.appendChild(li);
    });
}

function renderProducts() {
    const maxPrice = currentMaxPrice;
    const query = currentQuery.trim().toLowerCase();

    const filtered = products.filter(p => {
        const okCategory = (currentCategory === 'Todas') || (p.category === currentCategory);
        const okPrice = p.price <= maxPrice;
        const okQuery = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        return okCategory && okPrice && okQuery;
    });

    productsContainer.innerHTML = '';
    if (filtered.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    filtered.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 mb-4';

        const averageRating = p.reviews.length > 0
            ? (p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length).toFixed(1)
            : 'Sin valorar';
        const reviewText = p.reviews.length > 0 ? `(${p.reviews.length})` : '';

        col.innerHTML = `
        <div class="card product-card h-100 shadow-sm" style="cursor: pointer;" data-id="${p.id}">
            <img src="${p.img}" alt="${p.name}" class="product-img card-img-top">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-center mb-1">${p.name}</h5>
                <p class="text-center text-muted fw-light fst-italic mb-2">${p.origin}</p>
                <div class="text-center mb-2">
                    <span class="small text-warning">${getStarRating(Math.round(averageRating))}</span>
                    <span class="small text-muted">${averageRating} ${reviewText}</span>
                </div>
                <p class="card-text text-center product-description">${p.description.substring(0, 70)}...</p>
                <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                    <span class="price fw-bold">${formatPrice(p.price)}</span>
                    <span class="text-success fw-bold small">Stock: <span class="stock-display ">${p.stock} ${p.unit}${p.unit === 'bolsa' || p.unit === 'litro' || p.unit === 'frasco' ? 's' : ''}</span></span>
                </div>
            </div>
        </div>
        `;
        productsContainer.appendChild(col);
    });
}

function showProductDetails(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === parseInt(currentProductId));
    if (!product) {
        console.error("Producto no encontrado");
        return;
    }

    modalTitle.textContent = product.name;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    document.getElementById('productDetailContent').innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="img-fluid mb-3 w-100 rounded">
        <p><strong>Precio:</strong> ${formatPrice(product.price)} por ${product.unit}</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Origen:</strong> ${product.origin}</p>
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p class="mb-3"><strong>Stock disponible:</strong> <span class="stock-display-modal">${product.stock}</span> ${product.unit}${product.stock > 1 ? 's' : ''}</p>
        
        <div class="d-flex align-items-center justify-content-between mb-4">
            <label for="quantity-modal" class="me-2 fw-bold">Cantidad:</label>
            <input type="number" id="quantity-modal" class="form-control w-25 text-center me-3" value="1" min="1" max="${product.stock}">
            <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">
                Agregar al Carrito
            </button>
        </div>
    `;

    const quantityInput = document.getElementById('quantity-modal');
    const addToCartBtn = document.querySelector('.add-to-cart-modal');
    if (product.stock <= 0) {
        quantityInput.value = 0;
        quantityInput.setAttribute('disabled', 'disabled');
        addToCartBtn.setAttribute('disabled', 'disabled');
        addToCartBtn.textContent = 'Sin Stock';
    }

    const reviewFormSection = document.getElementById('review-form-section');
    const reviewSectionMessage = document.getElementById('review-section-message');
    if (isLoggedIn) {
        reviewFormSection.style.display = 'block';
        reviewSectionMessage.style.display = 'none';
    } else {
        reviewFormSection.style.display = 'none';
        reviewSectionMessage.style.display = 'block';
    }

    renderReviews(product.reviews);

    productDetailModal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rating = parseInt(document.getElementById('review-rating').value);
            const reviewText = document.getElementById('review-text').value;
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            if (rating < 1 || rating > 5) {
                alert('La valoración debe ser entre 1 y 5.');
                return;
            }

            const newReview = {
                user: currentUser.nombre,
                rating: rating,
                text: reviewText
            };

            const productToReview = products.find(p => p.id === parseInt(currentProductId));
            productToReview.reviews.push(newReview);

            saveProducts();

            renderReviews(productToReview.reviews);
            renderProducts();

            document.getElementById('review-rating').value = '';
            document.getElementById('review-text').value = '';
        });
    }

    priceValue.textContent = Number(priceRange.value).toLocaleString('es-CL');
    renderCategories();
    renderProducts();
    updateCartCount();
    renderCartDropdown();
    updateAuthUI();
    if (categoryDescriptionEl) {
        categoryDescriptionEl.textContent = categoryDescriptions['Todas'];
        categoryDescriptionEl.style.display = 'block';
    }
});


productsContainer.addEventListener("click", e => {
    const card = e.target.closest('.product-card');
    if (card) {
        const productId = card.dataset.id;
        showProductDetails(productId);
    }
});

modalContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-modal")) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            alert('Debes iniciar sesión para comprar.');
            productDetailModal.hide();
            return;
        }

        const btn = e.target;
        const productId = parseInt(btn.dataset.id);
        const quantity = parseInt(document.getElementById('quantity-modal').value);
        const productToAdd = products.find(p => p.id === productId);

        if (quantity <= 0) {
            alert('La cantidad debe ser mayor a 0.');
            return;
        }
        if (quantity > productToAdd.stock) {
            alert(`No puedes comprar ${quantity} ${productToAdd.unit}${quantity > 1 ? 's' : ''}. El stock disponible es de ${productToAdd.stock} ${productToAdd.stock > 1 ? 's' : ''}.`);
            return;
        }

        addToCart(productToAdd, quantity);
        productDetailModal.hide();
    }
});

function updateCartCount() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function renderCartDropdown() {
    if (cart.length === 0) {
        cartItems.innerHTML = `<span class="text-muted">Tu carrito está vacío</span>`;
        cartTotal.textContent = "$0";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${formatPrice(item.price)} x ${item.quantity} ${product.unit}${item.quantity > 1 ? 's' : ''}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" data-action="decrease" data-index="${index}">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" data-action="increase" data-index="${index}">+</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = formatPrice(total);
}

function addToCart(product, quantity) {
    const productIndex = products.findIndex(p => p.id === product.id);
    products[productIndex].stock -= quantity;
    const existingCartItem = cart.find(item => item.id === product.id);
    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            stock: product.stock
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartDropdown();
    renderProducts();
}

cartItems.addEventListener("click", (e) => {
    e.stopPropagation();
    const target = e.target;
    if (target.dataset.action === "decrease" || target.dataset.action === "increase") {
        const index = parseInt(target.dataset.index);
        const amount = target.dataset.action === "increase" ? 1 : -1;
        changeQuantity(index, amount);
    }
});

document.getElementById("clearCartBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    cart.forEach(item => {
        const product = products.find(p => p.id === parseInt(item.id));
        if (product) {
            product.stock += item.quantity;
        }
    });
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    renderCartDropdown();
    renderProducts();
});

function changeQuantity(index, amount) {
    const item = cart[index];
    const product = products.find(p => p.id === parseInt(item.id));
    if (!product) return;

    if (amount > 0) {
        if (product.stock <= 0) {
            alert("No hay más stock disponible de este producto.");
            return;
        }
        product.stock -= amount;
        item.quantity += amount;
    } else {
        if (item.quantity <= 1) {
            product.stock += item.quantity;
            cart.splice(index, 1);
        } else {
            product.stock -= amount;
            item.quantity += amount;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartDropdown();
    renderProducts();
}

priceRange.addEventListener('input', (e) => {
    currentMaxPrice = Number(e.target.value);
    priceValue.textContent = currentMaxPrice.toLocaleString('es-CL');
    renderProducts();
});

clearBtn.addEventListener('click', () => {
    currentCategory = 'Todas';
    currentMaxPrice = Number(priceRange.max);
    priceRange.value = currentMaxPrice;
    priceValue.textContent = currentMaxPrice.toLocaleString('es-CL');
    searchInput.value = '';
    currentQuery = '';
    renderCategories();
    renderProducts();
});

document.getElementById('searchBtn').addEventListener('click', () => {
    currentQuery = searchInput.value;
    renderProducts();
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        currentQuery = searchInput.value;
        renderProducts();
    }
});

function formatPrice(n) {
    return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
}

function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (isLoggedIn === 'true' && currentUser) {
        authButtons.innerHTML = `
            <span class="d-flex align-items-center me-2" style="color: var(--color-text-main);">Hola, ${currentUser.nombre}</span>
            <button id="logoutBtn" class="btn btn-sm" style="background-color: var(--color-primary); color: #fff;">Cerrar sesión</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            alert('Has cerrado sesión.');
            window.location.reload();
        });
    } else {
        authButtons.innerHTML = `
            <a href="login.html" class="btn btn-accent btn-sm" style="background-color: var(--color-primary);">
                <span style="color:#fff;">Iniciar sesión</span>
            </a>
            <a href="registro.html" class="btn btn-accent btn-sm" style="background-color: var(--color-primary);">
                <span style="color:#fff;">Regístrate</span>
            </a>
        `;
    }
}

document.getElementById('goToCheckoutBtn').addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        alert('Debes iniciar sesión para continuar con la compra.');
    } else if (cart.length === 0) {
        alert('Tu carrito está vacío. ¡Agrega productos para continuar!');
    } else {
        window.location.href = 'compra.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareProductBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const productTitle = document.getElementById('productDetailModalLabel').textContent;
            const productUrl = window.location.href;
            const fullText = `${productTitle} - ${productUrl}`;

            const isMobile = /Mobi|Android/i.test(navigator.userAgent);

            if (isMobile && navigator.share) {
                try {
                    await navigator.share({
                        title: `Mira este producto: ${productTitle}`,
                        text: "Lo encontré en HuertoHogar 🌱",
                        url: productUrl
                    });
                } catch (err) {
                    console.log("Error al compartir:", err);
                }
            } else {
                try {
                    await navigator.clipboard.writeText(fullText);
                    alert("📋 Enlace copiado al portapapeles");
                } catch (err) {
                    alert("❌ No se pudo copiar el enlace, copia manualmente:\n" + fullText);
                }
            }
        });
    }
});


