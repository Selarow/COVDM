const labels = [
    '20 000',
    '40 000',
    '60 000',
    '80 000',
    '100 000'
];

const data = {
    labels = labels,
    datasets : [{
        label: "Evolution de la vaccination",
        backgroundColor: 'rgb(255,99,132)',
        borderColor: 'rgb(255,99,132)',
        data: [500,36554,42325,61000,95325]
    }]
};

const config = {
    type: 'line',
    data,
    options : {}
};

var vaccChart = new Chart(
    document.getElementById('myChart'),
    config
)