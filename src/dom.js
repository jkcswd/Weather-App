import { fetchWeatherData, weatherDataProcess } from "./data";

const renderDisplay = (processedData) => {
  const display = document.querySelector('.display');
  const displayDiv = document.createElement('div');

  display.innerHTML = '';
  displayDiv.innerHTML = `
  <p>Weather: ${processedData.description}<p/>
  <p>Temperature: ${processedData.temp}<p/>
  <p>Feels like: ${processedData.feelTemp}<p/>
  <p>High: ${processedData.maxTemp}<p/>
  <p>Low: ${processedData.minTemp}<p/>
  <p>Pressure: ${processedData.pressure}<p/>
  <p>Humidity: ${processedData.humidity}<p/>
  <p>Wind Speed: ${processedData.windSpeed}<p/>
  `;
  display.appendChild(displayDiv);
}

const userWeatherListener = () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', async (e) => {
    try {
      e.preventDefault();//allows async code to execute as default behaviour 
      console.log(input.value);

      const apiData = await fetchWeatherData(input.value);
      const processedData = await weatherDataProcess(apiData);
  
      renderDisplay(processedData);

    } catch(err) {
      console.error(err) 
    }
  })
}

export default userWeatherListener