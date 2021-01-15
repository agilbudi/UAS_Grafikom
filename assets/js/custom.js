var transparentDemo = true;
var fixedTop = false;

$(window).scroll(function(e) {
    oVal = ($(window).scrollTop() / 170);
    $(".blur").css("opacity", oVal);
    
});

// api resouces
const api_url = 'https://api.kawalcorona.com/';
const api_url_indo = 'https://api.kawalcorona.com/indonesia/';
const api_url_prov = 'https://api.kawalcorona.com/indonesia/provinsi';
const api_url_indo_positif = 'https://api.kawalcorona.com/positif';
const api_url_indo_sembuh = 'https://api.kawalcorona.com/sembuh';
const api_url_indo_meninggal = 'https://api.kawalcorona.com/meninggal';
// api resouces

chartIndo();
dataGobal();

async function chartIndo(){
  const data = await dataNowIndo();
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
      labels: ['Positif', 'Dirawat', 'Sembuh', 'Meninggal'],
      datasets: [{
          label: 'Covid 19 di Indonesia',
          data: data.dataIndo,
          backgroundColor: [
              'rgba(255, 170, 33, 0.7)',
              'rgba(71, 142, 214, 0.7)',
              'rgba(33, 255, 63, 0.7)',
              'rgba(245, 27, 27, 0.7)'
          ],
          borderColor: [
              'rgba(255, 170, 33, 1)',
              'rgba(71, 142, 214, 1)',
              'rgba(33, 255, 63, 1)',
              'rgba(245, 27, 27, 1)'
          ],
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
    const response = await fetch(api_url);
    const data = await response.json();
    data.forEach(row => {
        const negara = row.attributes.Country_Region;
        const positif = row.attributes.Confirmed;
        const mati = row.attributes.Deaths;
        const sembuh = row.attributes.Recovered;
        const dirawat = row.attributes.Active;
    }); 
}
