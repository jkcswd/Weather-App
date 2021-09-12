import apiKey from "./secrets";

const fetchWeatherData = async city => {//works
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

const weatherDataProcess =  async data => { //works
  try {
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

  } catch (err) {
    console.log(err)
  }
  
}

const userWeatherListener = () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      console.log(input.value);

      const apiData = await fetchWeatherData(input.value);
      const processedData = await weatherDataProcess(apiData);
  
      console.log(processedData);

    } catch(err) {
      console.error(err) 
    }
  })
}

userWeatherListener(); //does not work?How?