document.addEventListener('DOMContentLoaded', () => {
    const regionesYComunas = {
        'Región de Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
        'Región de Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
        'Región de Antofagasta': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Toconao', 'María Elena', 'Tocopilla'],
        'Región de Atacama': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Freirina', 'Huasco', 'Vallenar', 'Alto del Carmen'],
        'Región de Coquimbo': ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Rio Hurtado'],
        'Región de Valparaíso': ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes', 'Calle Larga', 'San Esteban', 'Santa María', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llay-Llay', 'Panquehue', 'Putaendo', 'Santa María', 'Villa Alemana', 'Limache', 'Olmué', 'Quilpué'],
        'Región Metropolitana de Santiago': ['Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'Colina', 'Lampa', 'Tiltil', 'San Bernardo', 'Buin', 'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor'],
        'Región del Libertador General Bernardo O’Higgins': ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente de Tagua Tagua', 'Paredones', 'Pichilemu', 'Litueche', 'La Estrella', 'Navidad', 'Marchigüe', 'San Fernando', 'Chepica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz'],
        'Región del Maule': ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Longaví', 'Colbún', 'Linares', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén'],
        'Región de Ñuble': ['Chillán', 'Bulnes', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],
        'Región del Biobío': ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío'],
        'Región de La Araucanía': ['Temuco', 'Carahue', 'Cholchol', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria'],
        'Región de Los Ríos': ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'],
        'Región de Los Lagos': ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena', 'Ancud', 'Castro', 'Chaitén', 'Curaco de Vélez', 'Dalcahue', 'Futaleufú', 'Hualaihué', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao'],
        'Región Aysén del General Carlos Ibáñez del Campo': ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O’Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'],
        'Región de Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Torres del Paine', 'Natales']
    };

    const selectorRegion = document.getElementById('region');
    const selectorComuna = document.getElementById('comuna');
    const formulario = document.getElementById('formularioCrearUsuario');

    if (selectorRegion && selectorComuna) {
        for (const region in regionesYComunas) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            selectorRegion.appendChild(option);
        }

        selectorRegion.addEventListener('change', (event) => {
            const regionSeleccionada = event.target.value;
            const comunas = regionesYComunas[regionSeleccionada] || [];
            selectorComuna.innerHTML = '<option value="" selected disabled>Selecciona una comuna</option>';
            selectorComuna.disabled = false;

            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                selectorComuna.appendChild(option);
            });
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            if (validarFormularioUsuario()) {
                guardarUsuario();
            }
        });
    }

    function validarFormularioUsuario() {
        let esValido = true;
        document.querySelectorAll('.mensaje-error').forEach(el => el.textContent = '');

        const run = document.getElementById('runUsuario').value.trim().toUpperCase();
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
        if (!validarCorreo(correo)) {
            document.getElementById('error-correo').textContent = 'Correo inválido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.';
            esValido = false;
        }

        const contrasena = document.getElementById('contrasenaUsuario').value;
        if (contrasena.length < 4) {
            document.getElementById('error-contrasena').textContent = 'La contraseña debe tener al menos 4 caracteres.';
            esValido = false;
        }

        const tipoUsuario = document.getElementById('tipoUsuario').value;
        if (tipoUsuario === '') {
            document.getElementById('error-tipo-usuario').textContent = 'Debes seleccionar un tipo de usuario.';
            esValido = false;
        }

        const direccion = document.getElementById('direccionUsuario').value.trim();
        if (direccion.length === 0 || direccion.length > 300) {
            document.getElementById('error-direccion').textContent = 'La dirección es requerida (máximo 300 caracteres).';
            esValido = false;
        }
        
        const regionSeleccionada = document.getElementById('region').value;
        if (regionSeleccionada === '') {
            document.getElementById('error-region').textContent = 'Debes seleccionar una región.';
            esValido = false;
        }

        const comunaSeleccionada = document.getElementById('comuna').value;
        if (comunaSeleccionada === '') {
            document.getElementById('error-comuna').textContent = 'Debes seleccionar una comuna.';
            esValido = false;
        }

        return esValido;
    }
    
    function guardarUsuario() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const correo = document.getElementById('correoUsuario').value.trim();

        if (usuarios.some(usuario => usuario.correo === correo)) {
            alert('El correo electrónico ya está registrado.');
            return;
        }
        
        const tipoUsuario = document.getElementById('tipoUsuario').value;
        const nuevoUsuario = {
            rut: document.getElementById('runUsuario').value.trim().toUpperCase(),
            nombre: document.getElementById('nombreUsuario').value.trim(),
            apellidos: document.getElementById('apellidosUsuario').value.trim(),
            correo: correo,
            contrasena: document.getElementById('contrasenaUsuario').value,
            fechaNacimiento: document.getElementById('fechaNacimientoUsuario').value || null,
            tipo: tipoUsuario,
            region: document.getElementById('region').value,
            comuna: document.getElementById('comuna').value,
            direccion: document.getElementById('direccionUsuario').value.trim(),
            esAdmin: tipoUsuario === 'Administrador',
            esVendedor: tipoUsuario === 'Vendedor'
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('¡Usuario creado con éxito! Volviendo a la lista de usuarios.');
        window.location.href = 'admin_usuarios.html';
    }

    function validarRut(rut) {
        if (!/^[0-9]+-?[0-9kK]{1}$/.test(rut)) return false;
        
        let rutFormateado = rut.replace(/-/g, '').toUpperCase();
        let cuerpo = rutFormateado.slice(0, -1);
        let digitoVerificador = rutFormateado.slice(-1);

        if (cuerpo.length < 7) return false;

        let suma = 0;
        let factor = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * factor;
            factor = (factor === 7) ? 2 : factor + 1;
        }
        
        let dvCalculado = 11 - (suma % 11);
        dvCalculado = (dvCalculado === 11) ? '0' : ((dvCalculado === 10) ? 'K' : dvCalculado.toString());

        return dvCalculado === digitoVerificador;
    }

    function validarCorreo(correo) {
        const expresionRegular = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return expresionRegular.test(correo);
    }
});