import { fetchWeatherData, weatherDataProcess } from "./data";

const userWeatherListener = () => {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', async (e) => {
    try {
      e.preventDefault();//allows async code to execute as default behaviour 
      console.log(input.value);

      const apiData = await fetchWeatherData(input.value);
      const processedData = await weatherDataProcess(apiData);
  
      console.log(processedData);

    } catch(err) {
      console.error(err) 
    }
  })
}

export default userWeatherListener