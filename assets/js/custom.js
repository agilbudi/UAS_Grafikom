var transparentDemo = true;
var fixedTop = false;

$(window).scroll(function(e) {
    oVal = ($(window).scrollTop() / 170);
    $(".blur").css("opacity", oVal);
    
});

// api resouces
const api_url = 'https://api.kawalcorona.com';
const api_url_indo = 'https://api.kawalcorona.com/indonesia/';
const api_url_prov = 'https://api.kawalcorona.com/indonesia/provinsi/';
const api_url_global_positif = 'https://api.kawalcorona.com/positif/';
const api_url_global_sembuh = 'https://api.kawalcorona.com/sembuh/';
const api_url_global_meninggal = 'https://api.kawalcorona.com/meninggal/';
// api resouces

chartIndo();
chartGlobal();

async function chartIndo(){
  const data = await dataNowIndo();
  var bacgroundColor = ['rgba(255, 170, 33, 0.7)','rgba(71, 142, 214, 0.7)','rgba(33, 255, 63, 0.7)','rgba(245, 27, 27, 0.7)'];
  var borderColor = ['rgba(255, 170, 33, 1)','rgba(71, 142, 214, 1)','rgba(33, 255, 63, 1)','rgba(245, 27, 27, 1)'];
  const ctx = document.getElementById('chartIndo').getContext('2d');
  const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
      labels: ['Positif', 'Dirawat', 'Sembuh', 'Meninggal'],
      datasets: [{
          label: 'Covid 19 di Indonesia',
          data: data.dataIndo,
          backgroundColor: bacgroundColor,
          borderColor: borderColor,
          borderWidth: 1
      }]
      },
        options: {
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            }
          },
          legend: {
            display: true,
            labels: {
                fontColor: 'rgb(46, 11, 161)'
            }
          }
        }
  });
}
async function chartGlobal(){
  const data = await dataGobal();
  var backgroundColor = ['rgba(255, 170, 33, 0.7)','rgba(33, 255, 63, 0.7)','rgba(245, 27, 27, 0.7)'];
  var borderColor = ['rgba(255, 170, 33, 1)','rgba(33, 255, 63, 1)','rgba(245, 27, 27, 1)'];

  const ctx = document.getElementById('chartGlobal').getContext('2d');
  const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Positif', 'Sembuh', 'Meninggal'],
      datasets: [
        {
          label: 'Total',
          data: data.dataGlobal,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        }
    ]
      },
        options: {
          layout: {
            padding: {
                left: 5,
                right: 5,
                top: 20,
                bottom: 5
            }
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return value + '.000';
                    }
                }
            }]
        }
        }
  });
}

async function dataNowIndo() {
    const dataIndo = [];
    const response = await fetch(api_url_indo);
    const data = await response.json();
    data.forEach(row =>{
      dataIndo.push(parseInt(row.positif.replace(/,/g, '')));
      dataIndo.push(parseInt(row.dirawat.replace(/,/g, '')));
      dataIndo.push(parseInt(row.sembuh.replace(/,/g, '')));
      dataIndo.push(parseInt(row.meninggal.replace(/,/g, '')));
    });
    return {dataIndo};
}

async function dataGobal() {
    const dataGlobal = [];

    const positif = await fetch(api_url_global_positif);
    const sembuh = await fetch(api_url_global_sembuh);
    const mati = await fetch(api_url_global_meninggal);
    const dataPositif = await positif.json();
    const dataSembuh = await sembuh.json();
    const dataMati = await mati.json();

    dataGlobal.push(parseFloat(dataPositif.value.replace(/,/g, '.')));
    dataGlobal.push(parseFloat(dataSembuh.value.replace(/,/g, '.')));
    dataGlobal.push(parseFloat(dataMati.value.replace(/,/g, '.')));
    return{dataGlobal};
}

