// Este objeto contiene las coordenadas y nombres de las sucursales
const sucursales = [
    {
        id: 'map-santiago-centro',
        name: 'Sucursal Santiago Centro',
        position: { lat: -33.447487, lng: -70.665365 }
    },
    {
        id: 'map-santiago-oriente',
        name: 'Sucursal Santiago Oriente',
        position: { lat: -33.414983, lng: -70.569426 }
    },
    {
        id: 'map-santiago-poniente',
        name: 'Sucursal Santiago Poniente',
        position: { lat: -33.473531, lng: -70.766735 }
    },
    {
        id: 'map-concepcion',
        name: 'Sucursal Concepción',
        position: { lat: -36.82766, lng: -73.05036 }
    },
    {
        id: 'map-vina-del-mar',
        name: 'Sucursal Viña del Mar',
        position: { lat: -33.023215, lng: -71.551398 }
    },
    {
        id: 'map-puerto-montt',
        name: 'Sucursal Puerto Montt',
        position: { lat: -41.47294, lng: -72.93722 }
    },
    {
        id: 'map-villarrica',
        name: 'Sucursal Villarrica',
        position: { lat: -39.2842, lng: -72.2285 }
    },
    {
        id: 'map-nacimiento',
        name: 'Sucursal Nacimiento',
        position: { lat: -37.5085, lng: -72.6369 }
    },
    {
        id: 'map-valparaiso',
        name: 'Sucursal Valparaíso',
        position: { lat: -33.0458, lng: -71.6197 }
    }
];

// Esta función se ejecuta cuando la API de Google Maps se ha cargado
function initMaps() {
    sucursales.forEach(sucursal => {
        const mapOptions = {
            center: sucursal.position,
            zoom: 15,
            mapId: 'DEMO_MAP_ID' // Puedes usar un ID de mapa personalizado aquí
        };

        const mapElement = document.getElementById(sucursal.id);
        
        // Verifica que el elemento del mapa exista antes de inicializarlo
        if (mapElement) {
            const map = new google.maps.Map(mapElement, mapOptions);

            new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: sucursal.position,
                title: sucursal.name
            });
        }
    });
}