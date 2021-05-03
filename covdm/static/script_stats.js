//------------------------------Chart 1, Vaccination number per day-----------------


const labelVAC = [
    'Janvier 2021',
    'Février 2021',
    'Mars 2021',
    'Avril 2021'
];

const dataVAC = {
    labels: labelVAC,
    datasets : [{
        label: "Evolution de la vaccination en France",
        backgroundColor: 'rgb(255,13,70)',
        borderColor: 'rgb(255,13,70)',
        data: [0,32631,55681,11256]
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
        backgroundColor: 'rgb(255,13,70)',
        borderColor: 'rgb(255,0,0)',
        data: [65324,50326,32569,30569,29865,27569,26539]
    },
    {   label:"Mort",
        backgroundColor: 'rgb(0,0,0)',
        borderColor: 'rgb(255,255,255)',
        data: [124,126,169,172,1365,1269,1339]
    },
    {   label: "Vaccinés",
        backgroundColor: 'rgb(30,255,99)',
        borderColor: 'rgb(0,255,0)',
        data : [0,0,9652,1235,3365,9269,8339]
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
          text: 'Chart.js Bar Chart - Stacked'
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

