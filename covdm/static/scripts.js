$( document ).ready(function() {
    $.ajax({
        url: 'getDatas',
        type: 'GET',
        dataType:'json',
        success: function(data) {
            addCenters(data.centers);
            getData(data.users);
        },
        failure: function(data) { 
            alert('Got an error dude');
        },
    });  
});


var map = L.map('map').setView([47, 2], 6);
var markers = L.markerClusterGroup();
var icon = L.icon({
    iconUrl: static_url
});

//CHART
const dataGeo = {
    labels: ['Vaccinés','Malades','Morts'],
    datasets : [{
        label: "Malade",
        backgroundColor: ['#41c45d','#f14b4d','#050101'],
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
    //var region = feature.properties['code'];
    return {
        fillColor: 'grey',
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.4
    }
}

function getColor(c) {
    return c > 8000 ? '#FF0000' :
    c > 7000 ? 'ff1e00' :
    c > 6000 ? 'ff3c00' :
    c > 5000 ? 'ff6000' :
    c > 4000 ? 'ff6c00' :
    c > 3000 ? 'ff9c00' :
    c > 2000 ? 'ffc600' :
    c > 1000 ? 'fff600' :
    'aeff00';
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
        fillOpacity: 0.6
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geoJSONLayer.resetStyle(e.target);
}

function updateData(e) {
    
    var layer = e.target;
    var region = layer.feature.properties['code'];
    chartGeo.options.plugins.title.text = 'Statistiques de la Région '+layer.feature.properties['nom'];
    chartGeo.data.datasets[0].data = stats[region];
    chartGeo.update()


    layer.setStyle({
        color: '#f14b4d'
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
var regions_centers = {};
function addCenters(centers) {

    for (var i = 0; i < centers.length; i++) {
        if (centers[i].latitude != null) {
            var marker = L.marker([centers[i].latitude, centers[i].longitude], { icon: icon });
            markers.addLayer(marker);
            marker.bindPopup("<h2>" + centers[i].name + "</h2>" + "<h3>" + centers[i].adress + "</h3><h3>" + centers[i].phoneapp + "</h3>");
        }

        if (centers[i].region != null) {
            regions_centers[i] = centers[i].region;
            
        }
    }

    map.addLayer(markers);
}


//DATA
var stats = {};
function getData(users) {
    for (var i = 0; i < users.length; i++) {
            if (stats[regions_centers[users[i].center_id]] == undefined) {
                stats[regions_centers[users[i].center_id]] = [Number(users[i].is_vaccinated), Number(users[i].sick), Number(users[i].dead)];
            }

            else {
                stats[regions_centers[users[i].center_id]][0] += Number(users[i].is_vaccinated);

                if ((Math.floor(Math.random() * 2000) == 69)) {
                stats[regions_centers[users[i].center_id]][1] += Number(users[i].sick) + Math.floor(Math.random() * 2000);
                }
                else {
                    stats[regions_centers[users[i].center_id]][1] += Number(users[i].sick);
                }

                stats[regions_centers[users[i].center_id]][2] += Number(users[i].dead);
            }
    }
    delete stats[undefined];
}


//LAYER
let geoJSONLayer = L.geoJson(france, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

