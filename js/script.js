/* Datos de ejemplo: agrega/edita estos productos según necesites */
const products = [
    { id: 1, name: "Manzana Fuji", price: 1200, category: "Frutas", img: "img/prod1.jpg", badge: "Fresco" },
    { id: 2, name: "Zanahoria Orgánica", price: 900, category: "Verduras", img: "img/prod2.jpg" },
    { id: 3, name: "Quínoa Orgánica", price: 4500, category: "Orgánicos", img: "img/prod3.jpg" },
    { id: 4, name: "Leche Entera", price: 1400, category: "Lácteos", img: "img/prod4.jpg" },
    { id: 5, name: "Plátano Cavendish", price: 800, category: "Frutas", img: "img/prod5.jpg" },
    { id: 6, name: "Pan Integral", price: 3500, category: "Panadería", img: "img/prod6.jpg" },
    { id: 7, name: "Miel Orgánica", price: 5000, category: "Orgánicos", img: "img/prod7.jpg" },
    { id: 8, name: "Espinaca Fresca", price: 700, category: "Verduras", img: "img/prod8.jpg" },
    {
        id: 8, name: "Pimienta Tricolores", price: 700, category: "Orgánicos", img: "img/prod9.jpg"
    }
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

/* Renders */
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

/* Controles UI */
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

/* Init */
priceValue.textContent = Number(priceRange.value).toLocaleString('es-CL');
renderCategories();
renderProducts();


// ==============================
// Carrito de compras - HuertoHogar
// ==============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Actualizar contador
function updateCartCount() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Renderizar carrito en dropdown
function renderCartDropdown() {
    if (cart.length === 0) {
        cartItems.innerHTML = `<span class="text-muted">Tu carrito está vacío</span>`;
        cartTotal.textContent = "$0";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
      <div class="d-flex justify-content-between mb-2">
        <span>${item.name} (x${item.quantity})</span>
        <span>$${item.price * item.quantity}</span>
      </div>
    `;
    });

    cartTotal.textContent = `$${total}`;
}

// Agregar al carrito
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

// Detectar clicks en botones "Agregar al carrito"
document.addEventListener("click", e => {
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

// Inicializar al cargar
updateCartCount();
renderCartDropdown();
