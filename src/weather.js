import * as config from './config.js';

const API_KEY = config.API_KEY;

export function initWeather() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
}

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    // Fetch the weather data from the OpenWeatherMap API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = document.getElementById('temp');
            const city = document.getElementById('city');
            temp.innerText = `${Math.round(data.main.temp)}°C`; // Display the temperature in Celsius, rounded to the nearest whole number
            city.innerText = data.name;

            const weatherCondition = data.weather[0].main.toLowerCase();
            document.body.style.backgroundImage = `url('images/${weatherCondition}.jpg')`;

            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";

            console.log(weatherCondition);
        })
}

function onGeoError() {
    alert("Can't find you. No weather for you!");
}