import { fetchWeatherData, weatherDataProcess } from "./data";

const iconLookupTable = {
  "Clouds" : "wi-cloud",
  "Clear": "wi-day-sunny",
  "Snow": "wi-snow",
  "Rain": "wi-rain",
  "Drizzle": "wi-showers",
  "Thunderstorm": "wi-thunderstorm",
  "Mist": "wi-fog",
  "Smoke": "wi-smoke",
  "Haze": "wi-day-haze",
  "Dust": "wi-dust",
  "Fog": "wi-fog",
  "Sand": "wi-dust",
  "Ash": "wi-dust",
  "Squall": "wi-strong-wind",
  "Tornado": "wi-tornado"
}

const renderDisplay = (processedData) => {
  const display = document.querySelector('.display');
  const displayDiv = document.createElement('div');

  display.innerHTML = '';
  displayDiv.innerHTML = `
  <i class="wi ${iconLookupTable[processedData.main]}" style="font-size:100px"></i>
  <p>${processedData.description}<p/>
  <p>Temperature: ${processedData.temp}°C<p/>
  <p>Feels like: ${processedData.feelTemp}°C<p/>
  <p>High: ${processedData.maxTemp}°C<p/>
  <p>Low: ${processedData.minTemp}°C<p/>
  <p>Pressure: ${processedData.pressure}hPA<p/>
  <p>Humidity: ${processedData.humidity}%<p/>
  <p>Wind Speed: ${processedData.windSpeed}m/s<p/>
  `;
  display.appendChild(displayDiv);
}

const renderError = () => {
  const display = document.querySelector('.display');
  const displayDiv = document.createElement('div');

  display.innerHTML = '';
  displayDiv.innerHTML = 'We could not find that location. Please try again.';
  display.appendChild(displayDiv);
}

const userWeatherListener = () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', async (e) => {
    try {
      e.preventDefault();// allows async code to execute as default behaviour makes it not work

      const apiData = await fetchWeatherData(input.value);
      const processedData = await weatherDataProcess(apiData);
  
      renderDisplay(processedData);

    } catch(err) {
      console.error(err) 
      renderError();
    }
  })
}

export default userWeatherListener