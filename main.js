import './style.css'
import Swal from 'sweetalert2'

const form = document.querySelector('.city-form');
const app = document.getElementById('app')
const Days_15 = document.createElement('div')
// const Swal = require('sweetalert2')
Days_15.classList.add("Next-15-Days")

function createCard(Icon, Temp, OtherStuff,Date, CardContainer) {
    const CurrentContainer = document.createElement('div');
    const icon = document.createElement('img')
    const date = document.createElement('p')
    const temp = document.createElement('p');
    const otherStuff = document.createElement('p');
    const container = document.createElement('div');
    container.append(icon,date, temp);
    container.classList.add('container');
    CurrentContainer.append(container, otherStuff);
    CurrentContainer.classList.add('Card');
    icon.src = Icon;
    date.innerHTML = Date
    temp.innerHTML = Temp;
    otherStuff.innerHTML = OtherStuff;
    CardContainer.append(CurrentContainer)
}

async function fetchApi(Api) {
    try {
        let response = (await (await fetch(Api)).json());
        let iconNow = `/icons/${response.currentConditions.icon}.svg`
        let tempNow = `Temp: ${response.currentConditions.temp} &#92; Feels like:${response.currentConditions.feelslike}`
        let otherStuffNow = `wind Speed: ${response.currentConditions.windspeed}<br>Wind Direction: ${response.currentConditions.winddir}<br>humidity : ${response.currentConditions.humidity}`
        let date = `${response.days[0].datetime}`
        console.log(response);


        for (let i = 1; i < 15; i++) {
            let icon = `/icons/${response.days[i].icon}.svg`
            let tempNow = `Temp: ${response.days[i].temp} &#92; Feels like:${response.days[i].feelslike}`
            let otherStuffNow = `wind Speed: ${response.days[i].windspeed}<br>Wind Direction: ${response.days[i].winddir}<br>humidity : ${response.days[i].humidity}`
            let date = `${response.days[i].datetime}`

            createCard(icon, tempNow, otherStuffNow, date, Days_15);
        }

        createCard(iconNow, tempNow, otherStuffNow, date, app);
        app.append(Days_15)

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: "Enter a valid city name please",
            icon: 'error',
            confirmButtonText: 'OK',
        })
        console.log(error);
    } finally {
        console.log('process Finished')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let key = '3CKDCJ63H3WH72KPQD9P75U36';
    const city = formData.get('city');
    let endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${key}&contentType=json`;
    if (app.querySelector('.Card')) {
        app.querySelector('.Card').remove()
        app.querySelector('.Next-15-Days').remove()
    }
    fetchApi(endpoint)

})

for (let i = 0; i < 15; i++) {
}