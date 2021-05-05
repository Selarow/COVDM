var map = L.map('map').setView([47, 2], 6);
var markers = L.markerClusterGroup();
var data = [{"id": 0, "name": "CH DU HAUT BUGEY - GEOVREISSET", "address": "1 RTE DE VEYZIAT 01108 OYONNAX CEDEX", "longitude": 5.62734768997551, "latitude": 46.2750589149894, "sampling": "", "public": "Personnel soignant/patients hospitalisés dans l'etablissement", "timetable": "", "checkapp": "", "phoneapp": "", "webapp": "", "restricted": ""},
{"id": 1, "name": "Def", "address": "Def 52", "longitude": 7.27287780162723, "latitude": 43.7394118428928, "sampling": "", "public": "", "timetable": "", "checkapp": "", "phoneapp": "", "webapp": "", "restricted": ""},
{"id": 2, "name": "Ghi", "address": "Ghi 53", "longitude": 7.1172322292086, "latitude": 43.6011346134398, "sampling": "", "public": "", "timetable": "", "checkapp": "", "phoneapp": "", "webapp": "", "restricted": ""}]


function style(feature) {
    return {
        fillColor: '#000000',
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.4
    }
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: setHighlight,
        mouseout: resetHighlight,
        click: updateData
    });
}

function setHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#666666',
        fillOpacity: 0.5
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geoJSONLayer.resetStyle(e.target);
}

function updateData(e) {
    var layer = e.target;

    layer.setStyle({
        color: '#FF0000'
    });
}

//MAP
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid2h5c2lnbnVwIiwiYSI6ImNra3drcnl0aDR0a2IydnF0bnpxaHZ6MHkifQ.DaHm2wRVOQo7fXz7yLC2KA'
}).addTo(map);


//CENTERS
for (var i = 0; i < data.length; i++) {
    var marker = L.marker([data[i].latitude, data[i].longitude]);
    markers.addLayer(marker);
    marker.bindPopup(data[i].name);
}

map.addLayer(markers);


//LAYER
let geoJSONLayer = L.geoJson(france, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
