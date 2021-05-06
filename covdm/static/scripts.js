var centers = $.ajax({
    url: 'getDatas',
    type: 'GET',
    dataType:'json',
    success: function(data) {
        console.log(data);
        return data;
    },
    failure: function(data) { 
        alert('Got an error dude');
    },
}); 
console.log(centers);

var map = L.map('map').setView([47, 2], 6);
var markers = L.markerClusterGroup();
var data = [{"id": 0, "name": "CH DU HAUT BUGEY - GEOVREISSET", "address": "1 RTE DE VEYZIAT 01108 OYONNAX CEDEX", "longitude": 5.62734768997551, "latitude": 46.2750589149894, "sampling": "", "public": "Personnel soignant/patients hospitalisés dans l'etablissement", "timetable": "", "checkapp": "", "phoneapp": "", "webapp": "", "restricted": ""},
{"id": 1, "name": "Def", "address": "Def 52", "longitude": 7.27287780162723, "latitude": 43.7394118428928, "sampling": "", "public": "", "timetable": "", "checkapp": "", "phoneapp": "", "webapp": "", "restricted": ""},
{"id": 2, "name": "Ghi", "address": "Ghi 53", "longitude": 7.1172322292086, "latitude": 43.6011346134398, "sampling": "", "public": "", "timetable": "", "checkapp": "", "phoneapp": "", "webapp": "", "restricted": ""}]
var dictReg = {
    "Auvergne-Rhône-Alpes": [362814,1963389,11143],
 
    "Bourgogne-Franche-Comté": [565324,743275,4597],
 
    "Bretagne": [131465,973363,1540],
 
    "Centre-Val de Loire": [251174,676421,2565],

    "Corse" : [48630,116916,198],

    "Grand Est" : [756322,1435826,9772],

    "Hauts-de-France" : [465896,2549239,19301],

    "Île-de-France" : [1698362,2549239,19301],

    "Normandie" : [314654,919724,3108],

    "Nouvelle-Aquitaine" : [263579,1755353,3586],

    'Occitanie': [397410,1628505,4264],

    "Pays de la Loire" : [213487,977421,2573],

    "Provence-Alpes-Côte d'Azur" : [448435,1381205,7638]
};


//CHART
const dataGeo = {
    labels: ['Malades','Vaccinées','Morts'],
    datasets : [{
        label: "Malade",
        backgroundColor: ['#f14b4d','#41c45d','#050101'],
        data: [5706378,16470369,105631]
    }]
};

const configGeo = {
    type: 'doughnut',
    data: dataGeo,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Statistiques Nationales'
        },
      },
      responsive: true,
      
      }
    
  };

var chartGeo = new Chart(
    document.getElementById('chart'),
    configGeo
)


//FUNCTIONS

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
    var region = layer.feature.properties['nom'];
    
    chartGeo.options.plugins.title.text = 'Statistiques de la Région '+region;
    chartGeo.data.datasets[0].data = dictReg[region];
    chartGeo.update()


    layer.setStyle({
        color: '#FF0000'
    });
}

function toForm() {
    window.location.href = "form";
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
for (var i = 0; i < centers.length; i++) {
    var marker = L.marker([centers[i].latitude, centers[i].longitude]);
    markers.addLayer(marker);
    marker.bindPopup("<h2>" + centers[i].rs + "</h2>" + "<h3>" + centers[i].adresse + "</h3><h3>" + centers[i].tel_rdv + "</h3>");
}

map.addLayer(markers);


//LAYER
let geoJSONLayer = L.geoJson(france, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

