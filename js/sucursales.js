const sucursales = [
    { id: 'mapa-santiago-centro', nombre: 'Sucursal Santiago Centro', posicion: { lat: -33.447487, lng: -70.665365 } },
    { id: 'mapa-santiago-oriente', nombre: 'Sucursal Santiago Oriente', posicion: { lat: -33.414983, lng: -70.569426 } },
    { id: 'mapa-santiago-poniente', nombre: 'Sucursal Santiago Poniente', posicion: { lat: -33.473531, lng: -70.766735 } },
    { id: 'mapa-concepcion', nombre: 'Sucursal Concepción', posicion: { lat: -36.82766, lng: -73.05036 } },
    { id: 'mapa-vina-del-mar', nombre: 'Sucursal Viña del Mar', posicion: { lat: -33.023215, lng: -71.551398 } },
    { id: 'mapa-puerto-montt', nombre: 'Sucursal Puerto Montt', posicion: { lat: -41.47294, lng: -72.93722 } },
    { id: 'mapa-villarrica', nombre: 'Sucursal Villarrica', posicion: { lat: -39.2842, lng: -72.2285 } },
    { id: 'mapa-nacimiento', nombre: 'Sucursal Nacimiento', posicion: { lat: -37.5085, lng: -72.6369 } },
    { id: 'mapa-valparaiso', nombre: 'Sucursal Valparaíso', posicion: { lat: -33.0458, lng: -71.6197 } }
];

function iniciarMapas() {
    sucursales.forEach(sucursal => {
        const opcionesMapa = {
            center: sucursal.posicion,
            zoom: 15,
            mapId: 'DEMO_MAP_ID'
        };
        const elementoMapa = document.getElementById(sucursal.id);
        if (elementoMapa) {
            const mapa = new google.maps.Map(elementoMapa, opcionesMapa);
            new google.maps.marker.AdvancedMarkerElement({
                map: mapa,
                position: sucursal.posicion,
                title: sucursal.nombre
            });
        }
    });
}