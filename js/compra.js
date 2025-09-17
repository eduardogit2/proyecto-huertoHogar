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
    const deliveryMethodSelect = document.getElementById('deliveryMethod');
    const sucursalSection = document.getElementById('sucursalSection');
    const addressSection = document.getElementById('addressSection');

    // Inicializar los campos de dirección si el usuario ya los tiene
    if (currentUser.direccion) {
        document.getElementById('userAddress').value = currentUser.direccion.calle || '';
        document.getElementById('userCity').value = currentUser.direccion.comuna || '';
        document.getElementById('userRegion').value = currentUser.direccion.region || '';
    }
    
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
        if (!productInfo) return;

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

    // Lógica para mostrar/ocultar secciones
    deliveryMethodSelect.addEventListener('change', (e) => {
        if (e.target.value === 'sucursal') {
            sucursalSection.style.display = 'block';
            addressSection.style.display = 'none';
        } else if (e.target.value === 'domicilio') {
            sucursalSection.style.display = 'none';
            addressSection.style.display = 'block';
        } else {
            sucursalSection.style.display = 'none';
            addressSection.style.display = 'none';
        }
    });

    // Evento de clic en Finalizar Compra
    checkoutBtn.addEventListener('click', () => {
        const selectedMethod = deliveryMethodSelect.value;
        const purchaseDetails = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cart,
            total: total,
            method: selectedMethod
        };
        
        let isValid = true;
        let alertMessage = '';

        if (!selectedMethod) {
            isValid = false;
            alertMessage = 'Por favor, selecciona un método de entrega.';
        } else if (selectedMethod === 'sucursal') {
            const selectedSucursal = document.getElementById('selectSucursal').value;
            if (!selectedSucursal) {
                isValid = false;
                alertMessage = 'Por favor, selecciona una sucursal para el retiro.';
            } else {
                purchaseDetails.sucursal = selectedSucursal;
            }
        }else if (selectedMethod === 'domicilio') {
            const address = document.getElementById('userAddress').value;
            const city = document.getElementById('userCity').value;
            const region = document.getElementById('userRegion').value;

            if (!address || !city || !region) {
                isValid = false;
                alertMessage = 'Por favor, completa todos los campos de la dirección.';
            } else {
                purchaseDetails.direccion = {
                    calle: address,
                    comuna: city,
                    region: region
                };
                // Guarda la dirección en el perfil del usuario para futuras compras
                currentUser.direccion = {
                    calle: address,
                    comuna: city,
                    region: region
                };
            }
        }

        if (!isValid) {
            alert(alertMessage);
            return;
        }

        // Si la validación pasa, actualiza y guarda el historial de compra
        if (!currentUser.historial) {
            currentUser.historial = [];
        }
        currentUser.historial.push(purchaseDetails);

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            allUsers[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(allUsers));
        }
        
        localStorage.removeItem('cart');
        alert('¡Compra finalizada con éxito! Gracias por tu pedido.');
        window.location.href = 'index.html';
    });
});

// Obtener elementos del formulario
const deliveryMethodSelect = document.getElementById('deliveryMethod');
const sucursalSection = document.getElementById('sucursalSection');
const addressSection = document.getElementById('addressSection');
const savedAddressRadioContainer = document.getElementById('savedAddressRadioContainer');
const useSavedAddressRadio = document.getElementById('useSavedAddress');
const useNewAddressRadio = document.getElementById('useNewAddress');
const savedAddressText = document.getElementById('savedAddressText');
const checkoutBtn = document.getElementById('checkout-btn');

// Lógica para mostrar/ocultar secciones
deliveryMethodSelect.addEventListener('change', (event) => {
    const selectedMethod = event.target.value;
    if (selectedMethod === 'sucursal') {
        sucursalSection.style.display = 'block';
        addressSection.style.display = 'none';
    } else if (selectedMethod === 'domicilio') {
        sucursalSection.style.display = 'none';
        addressSection.style.display = 'block';
    } else {
        sucursalSection.style.display = 'none';
        addressSection.style.display = 'none';
    }
});

// Lógica para el perfil de usuario y la dirección guardada
document.addEventListener('DOMContentLoaded', () => {
    // Simular que el usuario está logueado y obtener su perfil
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Si hay un usuario logueado y tiene una dirección guardada...
    if (currentUser && currentUser.address) {
        // Mostrar la opción de usar la dirección guardada
        savedAddressRadioContainer.style.display = 'block';
        savedAddressText.textContent = `${currentUser.address}, ${currentUser.city}, ${currentUser.region}`;
    }
});

// Lógica para cambiar entre dirección guardada y nueva
useSavedAddressRadio.addEventListener('change', () => {
    if (useSavedAddressRadio.checked) {
        addressSection.style.display = 'none';
    }
});

useNewAddressRadio.addEventListener('change', () => {
    if (useNewAddressRadio.checked) {
        addressSection.style.display = 'block';
    }
});

// Evento al hacer clic en "Finalizar Compra"
checkoutBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Obtener la dirección según la opción seleccionada
    let finalAddress = null;
    if (deliveryMethodSelect.value === 'domicilio') {
        if (useSavedAddressRadio.checked) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.address) {
                finalAddress = {
                    address: currentUser.address,
                    city: currentUser.city,
                    region: currentUser.region
                };
            }
        } else {
            finalAddress = {
                address: document.getElementById('userAddress').value,
                city: document.getElementById('userCity').value,
                region: document.getElementById('userRegion').value
            };
        }
    }
    
    // Aquí puedes continuar con el proceso de compra usando la dirección en la variable 'finalAddress'
    console.log('Dirección final seleccionada:', finalAddress);
    // ... tu código para finalizar la compra
});