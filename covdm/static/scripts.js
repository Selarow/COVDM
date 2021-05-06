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
    "Auvergne-Rhône-Alpes": [65324,70326,32569],
 
    "Bourgogne-Franche-Comté": [65324,70326,32569],
 
    "Bretagne": [65324,70326,32569],
 
    "Centre-Val de Loire": [65324,70326,32569],

    "Corse" : [667,2040,32569],

    "Grand Est" : [7891,7078,3444],

    "Hauts-de-France" : [65321,70325,32478],

    "Île-de-France" : [6758,7047,3478],

    "Normandie" : [1454,7455,32569],

    "Nouvelle-Aquitaine" : [45324,20326,569],

    'Occitanie': [65324,70326,32569],

    "Pays de la Loire" : [4324,100326,12569],

    "Provence-Alpes-Côte d'Azur" : [45324,90326,2569]
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
    console.log(dictReg[region]);
    chartGeo.data.datasets[0].data = dictReg[region];
    chartGeo.update()


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
    marker.bindPopup(data[i].name + "</br>" + data[i].address);
}

map.addLayer(markers);


//LAYER
let geoJSONLayer = L.geoJson(france, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

