const input = document.getElementById("input-box");
const search = document.getElementById("search");

const celsius = document.getElementById("celsius");
const fahrenheight = document.getElementById("fahrenheight");

const cityCountry = document.getElementById("city-country");
const dOT = document.getElementById("date-and-time");


const typeOfWeather = document.getElementById("type-of-weather");
const weatherImage = document.getElementById("weather-image");

const temp = document.getElementById("temp");
const minTemp = document.getElementById("min");
const maxTemp = document.getElementById("max");

const realFeel = document.getElementById("real-feel-temp");
const humidity = document.getElementById("humidity-percentage");
const wind = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure-level");

let currentCity = "Banjul";

const apiKey = "1e76f4166e7ac1e5f82edde1a9d5433b"
const units = "metric";

search.addEventListener("click", () => {
    if (input.value == "") {
        alert("Please input a city");
    } else {
        currentCity = input.value;
        checkWeather();
        input.value = "";
    }
});
input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        if (input.value == "") {
            alert("Please input a city");
        } else {
            currentCity = input.value;
            checkWeather();
            input.value = "";
        }
    }
})

function checkWeather() {
    const response =
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`)
        .then(response => response.json())
        .then(data => {
            updateWeatherData(data);
            console.log(data);
        }).catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function updateWeatherData(data) {
    cityCountry.innerHTML = data.name;
    typeOfWeather.textContent = data.weather[0].main;
    if (data.weather[0].main == "Clear") {
        weatherImage.src = "images/clear.png"
    }
    if (data.weather[0].main == "Clouds") {
        weatherImage.src = "images/clouds.png"
    }
    if (data.weather[0].main == "Drizzle") {
        weatherImage.src = "images/drizzle.png"
    }
    if (data.weather[0].main == "Rain") {
        weatherImage.src = "images/rain.png"
    }
    if (data.weather[0].main == "Snow") {
        weatherImage.src = "images/snow.png"
    }

    temp.textContent = Math.round(data.main.temp);
    minTemp.textContent = Math.round(data.main.temp_min);
    maxTemp.textContent = Math.round(data.main.temp_max);
    realFeel.textContent = Math.round(data.main.feels_like);
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;
    pressure.textContent = data.main.pressure;

    const date = new Date();
    dOT.innerHTML = date;

}

checkWeather();