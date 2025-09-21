// Las funciones de inicio y manejo de datos se mantienen igual, ya que no necesitan cambios.
function obtenerPublicacionesDeAlmacenamiento() {
    let publicaciones = JSON.parse(localStorage.getItem('publicacionesBlog'));
    if (!publicaciones || publicaciones.length === 0) {
        const publicacionesIniciales = [
            {
                id: 1,
                titulo: "5 Prácticas Sostenibles para tu Huerto",
                imagen: "img/blog-sostenibilidad.jpg",
                fecha: "2025-06-20",
                categoria: "Sostenibilidad",
                contenido: `<p>Crear un huerto es un acto de conexión con la naturaleza, y hacerlo de manera sostenible no solo beneficia al planeta, sino que también enriquece la calidad de tus cultivos. Aquí te compartimos cinco prácticas clave que puedes implementar fácilmente en casa para tener un huerto más amigable con el medio ambiente.</p>
<h4>1. Haz tu propio compost</h4>
<p>El compostaje es una forma fantástica de reducir tus residuos orgánicos y, a la vez, de crear un abono natural increíblemente nutritivo para tus plantas. Es un ciclo perfecto donde los restos de tu cocina y jardín se transforman en vida para tu huerto.</p>
<h4>2. Recoge agua de lluvia</h4>
<p>Instalar un sistema sencillo para recolectar agua de lluvia no solo te ayuda a ahorrar en la cuenta del agua, sino que también le da a tus plantas el mejor líquido posible: agua pura y sin químicos. Tus cultivos te lo agradecerán.</p>
<h4>3. Cultiva especies nativas</h4>
<p>Las plantas nativas de tu zona están perfectamente adaptadas al clima y al suelo. Esto las hace más resistentes a plagas y enfermedades, reduciendo la necesidad de intervenciones. Además, atraen a polinizadores locales, ayudando a mantener el ecosistema en equilibrio.</p>
<h4>4. Controla las plagas de forma natural</h4>
<p>Olvídate de los pesticidas agresivos. Puedes proteger tus plantas usando soluciones naturales, como agua con jabón potásico o aceites esenciales, o fomentando la presencia de insectos beneficiosos como mariquitas.</p>
<h4>5. Rota tus cultivos</h4>
<p>No plantes la misma especie en el mismo lugar año tras año. Al rotar los cultivos, ayudas a mantener la salud del suelo, previenes el agotamiento de nutrientes específicos y reduces la proliferación de plagas y enfermedades que se especializan en ciertos tipos de plantas.</p>
<p>¡Un huerto sostenible es un huerto feliz y productivo!</p>`
            },
            {
                id: 2,
                titulo: "Receta: Ensalada de Quínoa y Pimientos",
                imagen: "img/blog-recetas.jpg",
                fecha: "2025-06-18",
                categoria: "Recetas",
                contenido: `<p>¿Buscas una comida fresca, nutritiva y llena de sabor? Esta ensalada de quínoa y pimientos es la respuesta. Es perfecta para un almuerzo ligero o como guarnición, y lo mejor es que combina los sabores de nuestros productos más frescos. ¡Anímate a probarla!</p>
<h3>Ingredientes:</h3>
<ul>
<li>1 taza de quínoa</li>
<li>2 tazas de agua o caldo de verduras</li>
<li>1 pimiento tricolor (rojo, amarillo, verde) de HuertoHogar, picado</li>
<li>½ cebolla morada picada finamente</li>
<li>½ taza de pepino picado</li>
<li>¼ taza de perejil fresco picado</li>
<li>Jugo de 1 limón</li>
<li>2 cucharadas de aceite de oliva</li>
<li>Sal y pimienta al gusto</li>
</ul>
<h3>Preparación:</h3>
<ol>
<li>Enjuaga bien la quínoa y cocínala en agua o caldo hasta que esté tierna. Deja enfriar.</li>
<li>En un tazón grande, mezcla la quínoa enfriada con los pimientos, la cebolla, el pepino y el perejil.</li>
<li>En un recipiente pequeño, bate el jugo de limón con el aceite de oliva, sal y pimienta.</li>
<li>Vierte el aderezo sobre la ensalada y mezcla todo muy bien.</li>
</ol>
<p>¡Disfruta de una comida deliciosa y saludable!</p>`
            },
            {
                id: 3,
                titulo: "Nuestra Huella de Carbono",
                imagen: "img/blog-huella.jpg",
                fecha: "2025-06-15",
                categoria: "Sostenibilidad",
                contenido: `<p>En <strong>HuertoHogar</strong>, estamos comprometidos con el medio ambiente y con hacer nuestra parte para un futuro más verde. Por eso, nos esforzamos por reducir al máximo nuestra huella de carbono a través de decisiones conscientes en cada etapa de nuestro proceso.</p>
<h4>Apoyamos a proveedores locales</h4>
<p>Al trabajar con agricultores locales, reducimos la distancia que recorren nuestros productos. Esto no solo garantiza que recibas frutas y verduras más frescas, sino que también minimiza las emisiones de carbono del transporte a larga distancia.</p>
<h4>Usamos empaques biodegradables</h4>
<p>Hemos eliminado por completo el uso de plásticos innecesarios en nuestros empaques. En su lugar, optamos por materiales biodegradables y compostables. ¡Incluso nuestras etiquetas son eco-amigables!</p>
<h4>Optimizamos los sistemas de reparto</h4>
<p>Nuestro equipo de logística optimiza continuamente las rutas de entrega para ser más eficientes. Con menos viajes, consumimos menos combustible y generamos menos contaminación. Estamos orgullosos de ser parte de la solución, no del problema.</p>`
            },
            {
                id: 4,
                titulo: "Apoyando a Productores Locales",
                imagen: "img/blog-comunidad.jpg",
                fecha: "2025-06-10",
                categoria: "Comunidad",
                contenido: `<p>En <strong>HuertoHogar</strong>, creemos en el poder de la comunidad y en la importancia de fortalecer la economía local. Por eso, nuestra misión va más allá de vender productos de alta calidad: buscamos crear un puente entre tu hogar y las manos que cultivan los alimentos que consumes.</p>
<p>Trabajamos de la mano con agricultores y pequeños productores, ofreciéndoles una plataforma justa para que puedan compartir sus cosechas. Al comprar en HuertoHogar, estás apoyando directamente sus familias y su arduo trabajo.</p>
<p>Cada compra que haces tiene un impacto real, ayudando a preservar las tradiciones agrícolas y a asegurar que la calidad y frescura de los productos locales sigan llegando a tu mesa. Es un círculo virtuoso que beneficia a todos.</p>`
            },
            {
                id: 5,
                titulo: "Cómo Cultivar un Huerto Urbano",
                imagen: "img/blog-huerto-urbano.jpg",
                fecha: "2025-06-05",
                categoria: "Sostenibilidad",
                contenido: `<p>¿Sueñas con cultivar tus propias verduras y hierbas, pero no tienes un jardín grande? ¡No te preocupes! Un huerto urbano es la solución perfecta para cualquier balcón, terraza o ventana soleada. Con un poco de planificación y estos consejos, podrás disfrutar de tus propias cosechas en la ciudad.</p>
<h4>Consejos clave:</h4>
<ul>
<li><strong>Elige el lugar adecuado:</strong> La mayoría de las hortalizas necesitan al menos 6 horas de sol directo. Busca el rincón más soleado de tu casa.</li>
<li><strong>Macetas y drenaje:</strong> Usa macetas con agujeros en la base para un buen drenaje. El exceso de agua puede pudrir las raíces.</li><li><strong>Sustrato de calidad:</strong> Un buen sustrato es la base de un huerto sano. Invierte en uno enriquecido con compost.</li>
<li><strong>Empieza con plantas fáciles:</strong> Si eres principiante, comienza con hierbas como la menta o el orégano, o verduras como la lechuga y el rabanito. Son resistentes y crecen rápido.</li>
<li><strong>Riego y abono:</strong> Riega de forma regular, idealmente en la mañana o al atardecer. Y no olvides abonar tus plantas cada 2-4 semanas para mantenerlas fuertes y productivas.</li>
</ul>
<p>El proceso es una recompensa en sí misma. ¡Disfruta del placer de ver crecer tus propios alimentos!</p>`
            },
            {
                id: 6,
                titulo: "Batido Verde Desintoxicante",
                imagen: "img/blog-batido-verde.jpg",
                fecha: "2025-05-30",
                categoria: "Recetas",
                contenido: `<p>¿Te sientes con poca energía? Un batido verde es una forma deliciosa y rápida de recargar tu cuerpo con vitaminas y minerales esenciales. Es la bebida perfecta para un desayuno rápido o para refrescarte en la tarde, lleno de bondades de la naturaleza.</p>
<h3>Ingredientes:</h3>
<ul>
<li>1 taza de espinacas frescas de HuertoHogar</li>
<li>½ plátano Cavendish, congelado para una textura más cremosa</li>
<li>½ manzana Fuji, sin corazón</li>
<li>1 cucharada de semillas de chía o linaza</li>
<li>1 taza de agua o leche vegetal</li>
<li>Miel orgánica de HuertoHogar al gusto</li>
</ul>
<h3>Preparación:</h3>
<p>Simplemente coloca todos los ingredientes en una licuadora. Comienza con las espinacas y el líquido para que sea más fácil mezclarlos, y luego añade las frutas y semillas. Bate a alta velocidad hasta obtener una consistencia suave y homogénea.</p>
<p>¡Sirve de inmediato y a disfrutar de un shot de pura energía y bienestar!</p>`
            }
        ];
        localStorage.setItem('publicacionesBlog', JSON.stringify(publicacionesIniciales));
        return publicacionesIniciales;
    }
    return publicaciones;
}

// Variables globales se mantienen igual
let publicacionesBlog = obtenerPublicacionesDeAlmacenamiento();
const descripcionesCategorias = {
    "Todos": "Explora todos los artículos de nuestro blog, desde recetas saludables hasta consejos de sostenibilidad, pensados para ti y para el planeta.",
    "Sostenibilidad": "Artículos sobre prácticas ecológicas, cuidado del medio ambiente y cómo puedes reducir tu huella de carbono, un pequeño paso a la vez.",
    "Recetas": "Inspírate con recetas frescas y nutritivas que puedes preparar con nuestros productos. ¡Comidas deliciosas que te harán sentir bien!",
    "Comunidad": "Conoce de cerca cómo trabajamos con pequeños productores locales y las iniciativas que apoyamos para fortalecer nuestra comunidad."
};

let categoriaActual = 'Todos';

const comentariosIniciales = {
    '1': [{ usuario: "Ana", texto: "¡Muy buenos consejos! Empezaré a hacer mi propio compost." }, { usuario: "Carlos", texto: "La rotación de cultivos es clave, ¡gracias!" }],
    '4': [{ usuario: "Pedro", texto: "Es genial saber que apoyan a los pequeños productores." }, { usuario: "María", texto: "Me encanta este tipo de iniciativas." }],
    '5': [{ usuario: "Javier", texto: "Excelente guía, justo lo que necesitaba para mi balcón." }]
};

function cargarComentarios() {
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentariosBlog'));
    return comentariosGuardados || comentariosIniciales;
}

function guardarComentarios(comentarios) {
    localStorage.setItem('comentariosBlog', JSON.stringify(comentarios));
}

let todosLosComentarios = cargarComentarios();

document.addEventListener('DOMContentLoaded', () => {
    const contenedorBlog = document.getElementById('contenedorBlog');
    const listaCategorias = document.getElementById('listaCategorias');
    const modalPublicacion = new bootstrap.Modal(document.getElementById('modalPublicacion'));
    const elementoDescripcionCategoria = document.getElementById('descripcionCategoria');
    const seccionFormularioComentario = document.getElementById('seccionFormularioComentario');
    const formularioComentario = document.getElementById('formularioComentario');
    const contenedorComentarios = document.getElementById('contenedorComentarios');
    const mensajeSeccionComentario = document.getElementById('mensajeSeccionComentario');
    let idPublicacionActual = null;

    function renderizarCategorias() {
        if (!listaCategorias) return;
        const categoriasUnicas = ['Todos', ...new Set(publicacionesBlog.map(p => p.categoria))];
        listaCategorias.innerHTML = '';
        categoriasUnicas.forEach(cat => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.setAttribute('data-categoria', cat);
            li.textContent = cat;

            if (cat === categoriaActual) {
                li.classList.add('active');
            }

            li.addEventListener('click', () => {
                categoriaActual = cat;
                renderizarCategorias();
                renderizarPublicacionesBlog();
            });
            listaCategorias.appendChild(li);
        });
    }

    function renderizarPublicacionesBlog() {
        if (!contenedorBlog) return;

        contenedorBlog.innerHTML = '';
        let publicacionesAMostrar = publicacionesBlog;
        if (categoriaActual !== "Todos") {
            publicacionesAMostrar = publicacionesBlog.filter(pub => pub.categoria === categoriaActual);
        }

        if (elementoDescripcionCategoria) {
            elementoDescripcionCategoria.textContent = descripcionesCategorias[categoriaActual] || '';
            elementoDescripcionCategoria.style.display = 'block';
        }

        publicacionesAMostrar.forEach(pub => {
            const columna = document.createElement('div');
            columna.className = 'col-md-6 mb-4 d-flex';

            const textoResumen = new DOMParser().parseFromString(pub.contenido, 'text/html').body.textContent;
            const resumenCorto = textoResumen.substring(0, 150).trim() + '...';

            columna.innerHTML = `
                <div class="card h-100 shadow-sm tarjeta-blog">
                    <img src="${pub.imagen}" class="tarjeta-imagen-superior imagen-blog" alt="${pub.titulo}">
                    <div class="card-body tarjeta-cuerpo">
                        <div class="contenedor-texto-tarjeta">
                            <h5 class="card-title">${pub.titulo}</h5>
                            <p class="card-text text-muted small">${pub.fecha} | Categoría: ${pub.categoria}</p>
                            <p class="resumen-contenido-blog">${resumenCorto}</p>
                        </div>
                        <button class="btn btn-primario mt-3 leer-mas" data-id-publicacion="${pub.id}">Leer más</button>
                    </div>
                </div>
            `;
            contenedorBlog.appendChild(columna);
        });
        agregarListenersLeerMas();
    }

    function mostrarPublicacionEnModal(idPublicacion) {
        idPublicacionActual = idPublicacion;
        const publicacion = publicacionesBlog.find(p => p.id === idPublicacion);

        if (publicacion) {
            document.getElementById('tituloModalPublicacion').textContent = publicacion.titulo;
            document.getElementById('imagenModalPublicacion').src = publicacion.imagen;
            document.getElementById('imagenModalPublicacion').alt = publicacion.titulo;
            document.getElementById('fechaModalPublicacion').textContent = `${publicacion.fecha} | Categoría: ${publicacion.categoria}`;
            document.getElementById('contenidoModalPublicacion').innerHTML = publicacion.contenido;
            const comentariosPublicacion = todosLosComentarios[idPublicacion] || [];
            renderizarComentarios(comentariosPublicacion);
            const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';

            if (sesionIniciada) {
                seccionFormularioComentario.style.display = 'block';
                mensajeSeccionComentario.style.display = 'none';
            } else {
                seccionFormularioComentario.style.display = 'none';
                mensajeSeccionComentario.style.display = 'block';
            }
            modalPublicacion.show();
        }
    }

    function agregarListenersLeerMas() {
        const botonesLeerMas = document.querySelectorAll('.leer-mas');
        botonesLeerMas.forEach(boton => {
            boton.addEventListener('click', (evento) => {
                const idPublicacion = parseInt(evento.target.dataset.idPublicacion);
                mostrarPublicacionEnModal(idPublicacion);
            });
        });
    }

    function renderizarComentarios(comentarios) {
        if (!contenedorComentarios) return;
        contenedorComentarios.innerHTML = '';
        if (comentarios.length === 0) {
            contenedorComentarios.innerHTML = '<p class="text-muted fst-italic text-center">Sé el primero en comentar.</p>';
        } else {
            comentarios.forEach(comentario => {
                const divComentario = document.createElement('div');
                divComentario.className = 'card tarjeta-cuerpo mb-2';
                divComentario.innerHTML = `
                    <strong>${comentario.usuario}</strong>
                    <p class="mb-0">${comentario.texto}</p>
                `;
                contenedorComentarios.appendChild(divComentario);
            });
        }
    }

    if (formularioComentario) {
        formularioComentario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';
            if (!sesionIniciada) {
                alert('Debes iniciar sesión para agregar un comentario.');
                return;
            }

            const textoComentario = document.getElementById('texto-comentario').value;
            if (textoComentario.trim() === '') {
                return;
            }

            const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
            if (!todosLosComentarios[idPublicacionActual]) {
                todosLosComentarios[idPublicacionActual] = [];
            }

            const nuevoComentario = { usuario: usuarioActual.nombre, texto: textoComentario };
            todosLosComentarios[idPublicacionActual].push(nuevoComentario);
            guardarComentarios(todosLosComentarios);
            renderizarComentarios(todosLosComentarios[idPublicacionActual]);
            document.getElementById('texto-comentario').value = '';
        });
    }

    if (typeof actualizarInterfazAutenticacion === 'function') {
        actualizarInterfazAutenticacion();
    }
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }

    renderizarCategorias();
    renderizarPublicacionesBlog();
});