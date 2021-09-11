import apiKey from "./secrets";

const fetchWeatherData = async city => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, 
      { mode: 'cors' }
      );
    const dataPromise =  await response.json();
    
    return dataPromise
  } catch (err) {
    console.log(err);
  }
}

const weatherDataProcess =  async data => {

  const weatherData = await data;

  let weatherObject = {
    description: weatherData.weather[0].description,
    temp: weatherData.main.temp,
    feelTemp: weatherData.main.feels_like,
    maxTemp: weatherData.main.temp_max,
    minTemp: weatherData.main.temp_min,
    pressure: weatherData.main.pressure,
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed
  };
  return weatherObject
}

const fetchUserWeather = () => {
  const button = document.querySelector('button')
  const input = document.querySelector('input')

  button.addEventListener('click', () => {
    weatherDataProcess(fetchWeatherData(input.value));

  })
}
weatherDataProcess(fetchWeatherData('london'));