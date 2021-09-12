import apiKey from "./secrets";

const fetchWeatherData = async city => {//works
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, 
      { mode: 'cors' }
      );
    const dataPromise =  await response.json();

    console.log(dataPromise);
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

    console.log(weatherObject);
    return weatherObject

  } catch (err) {
    console.log(err)
  }
  
}

const userWeatherListener = () => { //does not work
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', async (e) => {
    if (!e.isTrusted) return // do nothing for second click
    try {
      e.preventDefault();
      console.log(input.value);

      const apiData = await fetchWeatherData(input.value);
      const processedData = await weatherDataProcess(apiData);
  
      console.log(processedData);
      button.click();
      
    } catch(err) {
      console.error(err) 
    }
  })
}

weatherDataProcess(fetchWeatherData('london')); //works
userWeatherListener(); //does not work?How?