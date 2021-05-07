//------------------------------Chart 1, Vaccination number per day-----------------

var centers = $.ajax({
  url:'getDatas',
  type:'GET',
  dataType:'json',
  success:function(data){
    return data;
  },
  failure: function(data){
    alert("Got an Error");
  },
});

var arr = patients[0]
var datV = [0,0,0,0,0,0];
var datS = [0,0,0,0,0,0];
var datD = [0,0,0,0,0,0];

for (var i = 1;i<100000;i++){
  var v = arr[i][0];
  var s = arr[i][1];
  var d = arr[i][2];
  var a = arr[i][5];

  if(v){
    if(a>=20 && a<30){
      datV[0]++;
    }
    else if(a>=30 && a<40){
      datV[1]++;
    }
    else if(a>=40 && a<50){
      datV[2]++;
    }
    else if(a>=50 && a<60){
      datV[3]++;
    }
    else if(a>=60 && a<70){
      datV[4]++;
    }
    else if(a>=70 && a<80){
      datV[5]++;
    }
  } 
  if(s){
    if(a>=20 && a<30){
      datS[0]++;
    }
    else if(a>=30 && a<40){
      datS[1]++;
    }
    else if(a>=40 && a<50){
      datS[2]++;
    }
    else if(a>=50 && a<60){
      datS[3]++;
    }
    else if(a>=60 && a<70){
      datS[4]++;
    }
    else if(a>=70 && a<80){
      datS[5]++;
    }
  } 
  if(d){
    if(a>=20 && a<30){
      datD[0]++;
    }
    else if(a>=30 && a<40){
      datD[1]++;
    }
    else if(a>=40 && a<50){
      datD[2]++;
    }
    else if(a>=50 && a<60){
      datD[3]++;
    }
    else if(a>=60 && a<70){
      datD[4]++;
    }
    else if(a>=70 && a<80){
      datD[5]++;
    }
  }
}


const labelVAC = [
    'Janvier 2021',
    'Février 2021',
    'Mars 2021',
    'Avril 2021'
];

const dataVAC = {
    labels: labelVAC,
    datasets : [{
        label: "Évolution de la vaccination en France",
        backgroundColor: '#41c45d',
        borderColor: '#41c45d',
        data: [0,22631,35681,81256]
    },
    {
      label: "Évolution des contaminés en France",
      backgroundColor: '#f14b4d',
      borderColor: '#f14b4d',
      fillColor:'#f14b4d',
      data: [56860,34631,40681,62503]
  },
  {
    label: "Évolution des morts en France",
    backgroundColor: '#050101',
    borderColor: '#050101',
    data: [1860,2631,1681,3503]
}]
};

const configVAC = {
    type: 'line',
    data : dataVAC,
    options : {}
};

var chartVAC = new Chart(
    document.getElementById('myChart'),
    configVAC
);

//-----------------------------Chart 2, Vaccinated per age------------------------------

const labelAGE = [
    '20-30',
    '30-40',
    '40-50',
    '50-60',
    '60-70',
    '70-80'
];

const dataAGE = {
    labels: labelAGE,
    datasets : [{
        label: "Malade",
        backgroundColor: '#f14b4d',
        borderColor: '#61040D',
        data: datS
    },
    {   label:"Mort",
        backgroundColor: '#050101',
        borderColor: '#050101',
        data: datD
    },
    {   label: "Vaccinés",
        backgroundColor: '#41c45d',
        borderColor: '#41c45d',
        data : datV
    }
    ]
};

const configAGE = {
    type: 'bar',
    data: dataAGE,
    options: {
      plugins: {
        title: {
          display: true,
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };

var chartAGE = new Chart(
    document.getElementById('myChart1'),
    configAGE
);

