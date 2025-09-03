const products = [
    { id: 1, name: "Manzana Fuji", price: 1200, category: "Frutas", img: "img/prod1.jpg", badge: "Fresco" },
    { id: 2, name: "Zanahoria Orgánica", price: 900, category: "Verduras", img: "img/prod2.jpg" },
    { id: 3, name: "Quínoa Orgánica", price: 4500, category: "Orgánicos", img: "img/prod3.jpg" },
    { id: 4, name: "Leche Entera", price: 1400, category: "Lácteos", img: "img/prod4.jpg" },
    { id: 5, name: "Plátano Cavendish", price: 800, category: "Frutas", img: "img/prod5.jpg" },
    { id: 9, name: "Pimienta Tricolores", price: 700, category: "Orgánicos", img: "img/prod9.jpg"},
    { id: 7, name: "Miel Orgánica", price: 5000, category: "Orgánicos", img: "img/prod7.jpg" },
    { id: 8, name: "Espinaca Fresca", price: 700, category: "Verduras", img: "img/prod8.jpg" }, 
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

        col.innerHTML = `
        <div class="card product-card h-100">
            <img src="${p.img}" alt="${p.name}" class="product-img card-img-top">
                <div class="card-body d-flex flex-column">
                <h6 class="card-title">${p.name}</h6>
                    <p class="mb-2 small text-muted">${p.category} ${p.badge ? ` • ${p.badge}` : ''}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                    <div class="price">${formatPrice(p.price)}</div>
                    <button class="btn btn-sm btn-success add-to-cart" 
                    data-id="${p.id}" 
                    data-name="${p.name}" 
                    data-price="${p.price}">
                        Agregar
                    </button>
                </div>  
            </div>
        </div>
        `;
        productsContainer.appendChild(col);
    });
}

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