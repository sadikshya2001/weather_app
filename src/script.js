import API_KEY from './config.js';

//event listener to get the location of the input 
document.getElementById("location-input").addEventListener('change', async () => {
    //getting the users entered location
    const location = document.getElementById("location-input").value;

    // fetching the weather data
    const weatherData = await getWeatherData(location);


    //displaying the weather data on the page 
    displayWeatherData(weatherData);

});


const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}


function getBackgroundColor(temperature){
    if(temperature < 0){
        return 'lightblue';
    }else if (temperature < 10){
        return 'lightgreen';
    }else if (temperature < 20){
        return 'lightyellow';
    }else if (temperature < 30){
        return 'lightsalmon';
    }else{
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if(Object.keys(data).length == 0){
        weatherDataElement.innerHTML = "Please enter a location for viewing the weather.";
    }else{

        const temperatureCelsius = Math.floor(data.main.temp - 273.15);
        const backgroundColor = getBackgroundColor(temperatureCelsius);
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${temperatureCelsius}°C</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>        
        `;

    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}

