const products = [
    { id: 1, name: "Manzana Fuji", price: 1200, category: "Frutas", img: "img/prod1.jpg", badge: "Fresco", description: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.", stock: 150, origin: "Valle del Maule, Chile", unit: "kg" },
    { id: 2, name: "Naranjas Valencia", price: 1000, category: "Frutas", img: "img/prod2.jpg", badge: "Fresco", description: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.", stock: 200, origin: "Región de Coquimbo, Chile", unit: "kg" },
    { id: 3, name: "Plátano Cavendish", price: 800, category: "Frutas", img: "img/prod3.jpg", description: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.", stock: 250, origin: "Guayas, Ecuador", unit: "kg" },
    { id: 4, name: "Zanahoria Orgánica", price: 900, category: "Verduras", img: "img/prod4.jpg", description: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.", stock: 100, origin: "Región de O'Higgins, Chile", unit: "kg" },
    { id: 5, name: "Espinaca Fresca", price: 700, category: "Verduras", img: "img/prod5.jpg", description: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.", stock: 80, origin: "Ñuble, Chile", unit: "bolsa" },
    { id: 6, name: "Pimiento Tricolores", price: 1500, category: "Orgánicos", img: "img/prod6.jpg", description: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.", stock: 120, origin: "Región de Valparaíso, Chile", unit: "kg" },
    { id: 7, name: "Miel Orgánica", price: 5000, category: "Orgánicos", img: "img/prod7.jpg", description: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.", stock: 50, origin: "Aysén, Chile", unit: "frasco" },
    { id: 8, name: "Quínoa Orgánica", price: 4500, category: "Orgánicos", img: "img/prod8.jpg", description: "Quínoa orgánica de alta calidad, perfecta para ensaladas o como acompañamiento. Es un superalimento rico en proteínas y fibra, ideal para una dieta balanceada.", stock: 75, origin: "Cajamarca, Perú", unit: "bolsa" },
    { id: 9, name: "Leche Entera", price: 1400, category: "Lácteos", img: "img/prod9.jpg", description: "Leche fresca y cremosa, rica en calcio y vitaminas. Perfecta para el desayuno o para preparar tus recetas favoritas. Proviene de granjas locales con prácticas de producción responsable.", stock: 90, origin: "Los Lagos, Chile", unit: "litro" }
];

const productsContainer = document.getElementById('productsContainer');
const categoryList = document.getElementById('categoryList');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const clearBtn = document.getElementById('clearFilters');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const authButtons = document.getElementById('authButtons');

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

        col.innerHTML = `
        <div class="card product-card h-100 shadow-sm" style="cursor: pointer;" data-id="${p.id}">
            <img src="${p.img}" alt="${p.name}" class="product-img card-img-top">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-center mb-1">${p.name}</h5>
                <p class="text-center text-muted fw-light fst-italic mb-2">${p.origin}</p>
                <p class="card-text text-center product-description">${p.description.substring(0, 70)}...</p>
                <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                    <span class="price fw-bold">${formatPrice(p.price)}</span>
                    <span class="text-success fw-bold small">Stock: <span class="stock-display ">${p.stock} ${p.unit}${p.unit === 'bolsa' || p.unit === 'litro' || p.unit ==='frasco' ? 's' : ''}</span></span>
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
        <img src="${product.img}" alt="${product.name}" class="img-fluid mb-3 w-100 rounded">
        <p><strong>Precio:</strong> ${formatPrice(product.price)} por ${product.unit}</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Origen:</strong> ${product.origin}</p>
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p class="mb-3"><strong>Stock disponible:</strong> <span class="stock-display-modal">${product.stock}</span> ${product.unit}${product.stock > 1 ? 's': ''}</p>
        
        <div class="d-flex align-items-center justify-content-between">
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

    productDetailModal.show();
}

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
            alert(`No puedes comprar ${quantity} ${productToAdd.unit}${quantity > 1 ? 's' : ''}. El stock disponible es de ${productToAdd.stock} ${productToAdd.unit}${productToAdd.stock > 1 ? 's' : ''}.`);
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
        const product = products.find(p => p.id === item.id); // Encuentra el producto para obtener la unidad
        if (!product) return; // Si el producto no existe, no lo renderiza

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
        // Ahora usa el nombre completo del usuario
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
        // Usuario no logueado: mostrar botones de login y registro
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


priceValue.textContent = Number(priceRange.value).toLocaleString('es-CL');
renderCategories();
renderProducts();
updateCartCount();
renderCartDropdown();
updateAuthUI();