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
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
    const addressSelect = document.getElementById('addressSelect');
    const newAddressInputs = document.getElementById('newAddressInputs');
    const saveAddressCheckbox = document.getElementById('saveAddressCheckbox');
    
    // CAMPOS DE DIRECCIÓN PARA EL AUTOCOMPLETADO
    const addressCalleInput = document.getElementById('addressCalle');
    const addressCiudadInput = document.getElementById('addressCiudad');
    const addressRegionInput = document.getElementById('addressRegion');

    if (!currentUser.addresses) {
        currentUser.addresses = [];
    }

    function formatPrice(n) {
        return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    }

    function renderAddressOptions() {
        addressSelect.innerHTML = '<option value="new" selected>Usar una nueva dirección</option>';
        if (currentUser.addresses.length > 0) {
            currentUser.addresses.forEach((addr, index) => {
                const option = document.createElement('option');
                option.value = `savedAddress${index}`;
                option.textContent = `${addr.calle}, ${addr.ciudad}, ${addr.region}`;
                addressSelect.appendChild(option);
            });
        }
    }

    addressSelect.addEventListener('change', (e) => {
        if (e.target.value === 'new') {
            newAddressInputs.style.display = 'block';
        } else {
            newAddressInputs.style.display = 'none';
        }
    });

    // Lógica para autocompletado de dirección
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocomplete = new google.maps.places.Autocomplete(addressCalleInput, {
            types: ['address'],
            componentRestrictions: { 'country': 'cl' }
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            addressCalleInput.value = '';
            addressCiudadInput.value = '';
            addressRegionInput.value = '';

            for (const component of place.address_components) {
                const componentType = component.types[0];
                switch (componentType) {
                    case 'street_number': {
                        addressCalleInput.value = `${component.long_name} `;
                        break;
                    }
                    case 'route': {
                        addressCalleInput.value += component.long_name;
                        break;
                    }
                    case 'locality': {
                        addressCiudadInput.value = component.long_name;
                        break;
                    }
                    case 'administrative_area_level_1': {
                        addressRegionInput.value = component.long_name;
                        break;
                    }
                }
            }
        });
    } else {
        console.error("Google Maps Places API no se ha cargado correctamente.");
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

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

    deliveryMethodSelect.addEventListener('change', (e) => {
        if (e.target.value === 'sucursal') {
            sucursalSection.style.display = 'block';
            addressSection.style.display = 'none';
        } else if (e.target.value === 'domicilio') {
            sucursalSection.style.display = 'none';
            addressSection.style.display = 'block';
            renderAddressOptions();
        } else {
            sucursalSection.style.display = 'none';
            addressSection.style.display = 'none';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        const selectedMethod = deliveryMethodSelect.value;
        let purchaseDetails = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cart,
            total: total
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
                purchaseDetails.tipoEntrega = 'retiro en sucursal';
                purchaseDetails.sucursal = selectedSucursal;
            }
        } else if (selectedMethod === 'domicilio') {
            const selectedOption = addressSelect.value;
            let selectedAddress = null;
            if (selectedOption === 'new') {
                const newCalle = document.getElementById('addressCalle').value.trim();
                const newCiudad = document.getElementById('addressCiudad').value.trim();
                const newRegion = document.getElementById('addressRegion').value.trim();
                if (!newCalle || !newCiudad || !newRegion) {
                    isValid = false;
                    alertMessage = 'Por favor, completa todos los campos de la nueva dirección.';
                } else {
                    selectedAddress = `${newCalle}, ${newCiudad}, ${newRegion}`;
                    if (saveAddressCheckbox.checked) {
                        const isDuplicate = currentUser.addresses.some(addr =>
                            `${addr.calle}, ${addr.ciudad}, ${addr.region}` === selectedAddress
                        );
                        if (!isDuplicate) {
                            currentUser.addresses.push({ calle: newCalle, ciudad: newCiudad, region: newRegion });
                        }
                    }
                }
            } else {
                const index = selectedOption.replace('savedAddress', '');
                const addr = currentUser.addresses[index];
                selectedAddress = `${addr.calle}, ${addr.ciudad}, ${addr.region}`;
            }

            if (isValid) {
                purchaseDetails.tipoEntrega = 'domicilio';
                purchaseDetails.direccion = selectedAddress;
            }
        }

        if (!isValid) {
            alert(alertMessage);
            return;
        }

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