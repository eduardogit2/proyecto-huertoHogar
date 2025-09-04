const products = [
    { id: 1, name: "Manzana Fuji", price: 1200, category: "Frutas", img: "img/prod1.jpg", badge: "Fresco", description: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.", stock: 150 },
    { id: 2, name: "Naranjas Valencia", price: 1000, category: "Frutas", img: "img/prod2.jpg", badge: "Fresco", description: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.", stock: 200 },
    { id: 3, name: "Plátano Cavendish", price: 800, category: "Frutas", img: "img/prod3.jpg", description: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.", stock: 250 },
    { id: 4, name: "Zanahoria Orgánica", price: 900, category: "Verduras", img: "img/prod4.jpg", description: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.", stock: 100 },
    { id: 5, name: "Espinaca Fresca", price: 700, category: "Verduras", img: "img/prod5.jpg", description: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.", stock: 80 },
    { id: 6, name: "Pimiento Tricolores KG", price: 1500, category: "Orgánicos", img: "img/prod6.jpg", description: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.", stock: 120 },
    { id: 7, name: "Miel Orgánica", price: 5000, category: "Orgánicos", img: "img/prod7.jpg", description: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.", stock: 50 },
    { id: 8, name: "Quínoa Orgánica", price: 4500, category: "Orgánicos", img: "img/prod8.jpg", description: "Quínoa orgánica de alta calidad, perfecta para ensaladas o como acompañamiento. Es un superalimento rico en proteínas y fibra, ideal para una dieta balanceada.", stock: 75 },
    { id: 9, name: "Leche Entera", price: 1400, category: "Lácteos", img: "img/prod9.jpg", description: "Leche fresca y cremosa, rica en calcio y vitaminas. Perfecta para el desayuno o para preparar tus recetas favoritas. Proviene de granjas locales con prácticas de producción responsable.", stock: 90 }
];

const productsContainer = document.getElementById('productsContainer');
const categoryList = document.getElementById('categoryList');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const clearBtn = document.getElementById('clearFilters');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

let currentCategory = 'Todas';
let currentMaxPrice = Number(priceRange.value);
let currentQuery = '';

function renderCategories() {
    const cats = ['Todas', ...new Set(products.map(p => p.category))];
    categoryList.innerHTML = '';
    cats.forEach(cat => {
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-action';
        li.textContent = cat;
        li.style.cursor = 'pointer';
        if (cat === currentCategory) li.classList.add('active');
        li.addEventListener('click', () => {
            currentCategory = cat;
            renderCategories();
            renderProducts();
        });
        categoryList.appendChild(li);
    });
}

const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
const modalTitle = document.getElementById('productDetailModalLabel');
const modalContent = document.getElementById('productDetailContent');

function renderProducts() {
    const maxPrice = currentMaxPrice;
    const query = currentQuery.trim().toLowerCase();

    const filtered = products.filter(p => {
        const okCategory = (currentCategory === 'Todas') || (p.category === currentCategory);
        const okPrice = p.price <= maxPrice;
        const okQuery = p.name.toLowerCase().includes(query);
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

        // Ahora toda la tarjeta es clickeable
        col.innerHTML = `
        <div class="card product-card h-100" style="cursor: pointer;" data-id="${p.id}">
            <img src="${p.img}" alt="${p.name}" class="product-img card-img-top">
            <div class="card-body d-flex flex-column">
                <h6 class="card-title">${p.name}</h6>
                <p class="mb-2 small text-muted">${p.category} ${p.badge ? ` • ${p.badge}` : ''}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <div class="price">${formatPrice(p.price)}</div>
                </div>  
            </div>
        </div>
        `;
        productsContainer.appendChild(col);
    });
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        console.error("Producto no encontrado");
        return;
    }

    modalTitle.textContent = product.name;
    modalContent.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="img-fluid mb-3">
        <p><strong>Precio:</strong> ${formatPrice(product.price)}</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p><strong>Stock:</strong> ${product.stock} kilos</p>
        <button class="btn btn-success mt-3 add-to-cart-modal" 
                data-id="${product.id}" 
                data-name="${product.name}" 
                data-price="${product.price}">
            Agregar al Carrito
        </button>
    `;

    // Muestra la ventana modal
    productDetailModal.show();
}

// Evento para abrir el modal al hacer clic en una tarjeta de producto
productsContainer.addEventListener("click", e => {
    const card = e.target.closest('.product-card');
    if (card) {
        const productId = card.dataset.id;
        showProductDetails(productId);
    }
});

// Evento para agregar al carrito desde el modal
modalContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-modal")) {
        const btn = e.target;
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price),
            quantity: 1
        };
        addToCart(product);
        productDetailModal.hide(); // Opcional: cierra el modal después de agregar al carrito
    }
});

    // Nuevo manejador de eventos para las tarjetas de producto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const productId = card.dataset.id;
            showProductDetails(productId);
        });
    });

function formatPrice(n) {
    return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
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

priceValue.textContent = Number(priceRange.value).toLocaleString('es-CL');
renderCategories();
renderProducts();



let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

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
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" data-action="decrease" data-index="${index}">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" data-action="increase" data-index="${index}">+</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = `$${total}`;
}

function addToCart(product) {
    const existing = cart.find(p => p.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartDropdown();
}


productsContainer.addEventListener("click", e => {
    // Clic en el botón "Agregar" de la tarjeta de producto
    if (e.target.classList.contains("add-to-cart")) {
        const btn = e.target;
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price),
            quantity: 1
        };
        addToCart(product);
    } 
    // Clic en la tarjeta de producto completa
    else {
        const card = e.target.closest('.product-card');
        if (card) {
            const productId = card.dataset.id;
            showProductDetails(productId);
        }
    }
});

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
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    renderCartDropdown();
});

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartDropdown();
}


updateCartCount();
renderCartDropdown();