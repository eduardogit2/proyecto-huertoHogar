document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para Regiones y Comunas ---
    const regionesYComunas = {
        "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
        "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
        "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
        "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
        "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Catemu", "Llay-Llay", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Putaendo", "Santa María", "Panquehue", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
        "Región Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
        "Región del Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Paredones", "Peralillo", "Peumo", "Pichilemu", "Pichidegua", "Placilla", "Requínoa", "Rengo", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Pumanque", "San Vicente", "Santa Cruz", "Litueche"],
        "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier de Loncomilla", "Villa Alegre", "Yerbas Buenas"],
        "Región de Ñuble": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
        "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
        "Región de la Araucanía": ["Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
        "Región de los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
        "Región de los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"],
        "Región de Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
        "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Torres del Paine"]
    };

    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    function cargarRegiones() {
        if(regionSelect){
            Object.keys(regionesYComunas).forEach(region => {
                const option = document.createElement('option');
                option.value = region;
                option.textContent = region;
                regionSelect.appendChild(option);
            });
        }
    }

    if(regionSelect && comunaSelect) {
        regionSelect.addEventListener('change', (e) => {
            const regionSeleccionada = e.target.value;
            const comunas = regionesYComunas[regionSeleccionada] || [];
            
            comunaSelect.innerHTML = '<option value="" selected disabled>Selecciona una comuna</option>';
            
            if (comunas.length > 0) {
                comunaSelect.disabled = false;
                comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            } else {
                comunaSelect.disabled = true;
            }
        });
    }

    cargarRegiones();

    const form = document.getElementById('formularioCrearUsuario');

    if (form) {
        form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (validarFormularioUsuario()) {
                guardarUsuario();
            }
        });
    }
    
    function validarFormularioUsuario() {
        let esValido = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        const run = document.getElementById('runUsuario').value.trim();
        if (!validarRut(run)) {
            document.getElementById('error-run').textContent = 'El RUN ingresado no es válido.';
            esValido = false;
        }

        const nombre = document.getElementById('nombreUsuario').value.trim();
        if (nombre.length === 0 || nombre.length > 50) {
            document.getElementById('error-nombre').textContent = 'El nombre es requerido (máximo 50 caracteres).';
            esValido = false;
        }

        const apellidos = document.getElementById('apellidosUsuario').value.trim();
        if (apellidos.length === 0 || apellidos.length > 100) {
            document.getElementById('error-apellidos').textContent = 'Los apellidos son requeridos (máximo 100 caracteres).';
            esValido = false;
        }
        
        const correo = document.getElementById('correoUsuario').value.trim();
        if (!validarEmail(correo)) {
            document.getElementById('error-correo').textContent = 'Correo inválido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.';
            esValido = false;
        }
        
        const direccion = document.getElementById('direccionUsuario').value.trim();
        if (direccion.length === 0 || direccion.length > 300) {
            document.getElementById('error-direccion').textContent = 'La dirección es requerida (máximo 300 caracteres).';
            esValido = false;
        }

        if (document.getElementById('tipoUsuario').value === '') { esValido = false; document.getElementById('error-tipo-usuario').textContent = 'Debes seleccionar un tipo de usuario.'; }
        if (regionSelect.value === '') { esValido = false; document.getElementById('error-region').textContent = 'Debes seleccionar una región.'; }
        if (comunaSelect.value === '') { esValido = false; document.getElementById('error-comuna').textContent = 'Debes seleccionar una comuna.'; }

        return esValido;
    }

    function guardarUsuario() {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const nuevoUsuario = {
            rut: document.getElementById('runUsuario').value.trim(),
            nombre: document.getElementById('nombreUsuario').value.trim(),
            apellidos: document.getElementById('apellidosUsuario').value.trim(),
            email: document.getElementById('correoUsuario').value.trim(),
            fechaNacimiento: document.getElementById('fechaNacimientoUsuario').value,
            tipo: document.getElementById('tipoUsuario').value,
            region: document.getElementById('region').value,
            comuna: document.getElementById('comuna').value,
            direccion: document.getElementById('direccionUsuario').value.trim(),
            isAdmin: document.getElementById('tipoUsuario').value === 'Administrador',
            isVendedor: document.getElementById('tipoUsuario').value === 'Vendedor',
            pwd: 'tempPassword123'
        };

        users.push(nuevoUsuario);
        localStorage.setItem('users', JSON.stringify(users));

        alert('✅ ¡Usuario creado con éxito!');
        window.location.href = 'admin_usuarios.html';
    }

    function validarRut(rut) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) return false;
        let tmp = rut.split('-');
        let digv = tmp[1];
        let rutSolo = tmp[0];
        if (digv === 'K') digv = 'k';
        let suma = 0;
        let factor = 2;
        for (let i = rutSolo.length - 1; i >= 0; i--) {
            suma += parseInt(rutSolo.charAt(i)) * factor;
            factor = (factor === 7) ? 2 : factor + 1;
        }
        let dvCalculado = 11 - (suma % 11);
        if (dvCalculado === 11) dvCalculado = '0';
        if (dvCalculado === 10) dvCalculado = 'k';
        return dvCalculado.toString() === digv;
    }

    function validarEmail(email) {
        const emailRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return emailRegex.test(email);
    }
});