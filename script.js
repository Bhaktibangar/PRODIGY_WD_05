const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '6f87235239881c3aa63886ce020d86ae';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '500px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return;
            }

            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');

            // Set weather image based on conditions
            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = 'img/sunny.png';
                    break;
                case 'rain':
                    image.src = 'img/Rain.png';
                    break;
                case 'snow':
                    image.src = 'img/Snow.png';
                    break;
                case 'clouds':
                    image.src = 'img/cloudy.png';
                    break;
                case 'haze':
                    image.src = 'img/haze.png';
                    break;
                case 'rain-shower':
                    image.src = 'img/rain-shower.png';
                    break;
                default:
                    image.src = 'img/clean.png';
                    break;
            }

            temperature.innerHTML = `${json.main.temp.toFixed(1)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            // Cloning info logic
            cloneInfo('.info-weather', elCloneInfoWeather);
            cloneInfo('.info-humidity', elCloneInfoHumidity);
            cloneInfo('.info-wind', elCloneInfoWind);
        })
        .catch(error => console.error('Error fetching the weather data:', error));
});

function cloneInfo(selector, element) {
    const infoElement = document.querySelector(selector);
    const elClone = infoElement.cloneNode(true);

    elClone.classList.add('active-clone');

    setTimeout(() => {
        infoElement.insertAdjacentElement("afterend", elClone);
    }, 2200);

    const clones = document.querySelectorAll(`${selector}.active-clone`);
    if (clones.length > 1) {
        clones[0].classList.remove('active-clone');
        setTimeout(() => {
            clones[0].remove();
        }, 2200);
    }
}
