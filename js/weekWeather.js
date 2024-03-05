const weekWeatherApi = () => {
  const weekWeatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=vapour_pressure_deficit&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_hours&timezone=Asia%2FTokyo";

  fetch(weekWeatherUrl) 
  .then ((response) => {
    return response.json();
  })
  .then ((weekWeather) => {
  createWeekWeather(weekWeather);
  createWeekDate(".daily_time",weekWeather,"daily");
  });
}

const createWeekWeather = (Weather) => {
  createText(".current_MaxTemp",Weather,"daily","temperature_2m_max",);
  createText(".current_MinTemp",Weather,"daily","temperature_2m_min",);  
  createWeekTemp(".daily_maxTemp",Weather,"temperature_2m_max");
  createWeekTemp(".daily_minTemp",Weather,"temperature_2m_min");
  checkWeekWeatherCode(Weather);
}

const createWeekDate = (el,weather,obj) => {
  const els = document.querySelectorAll(el);
  for(let i = 0; i < els.length; i++) {
    const value = weather[obj].time[i];
    const pattern = /[\/\.\- T]/
    const dates = value.split(pattern);
    const mm = dates[1].replace(/^0+/, '');
    const dd = dates[2].replace(/^0+/, '');
    els[i].textContent = `${mm}/${dd}`;
  }
}

const createWeekTemp = (el,weather,obj) => {
  const els = document.querySelectorAll(el);
  for(let i = 0; i < els.length; i++) {
    const value = weather.daily[obj][i];
    els[i].textContent = `${value}℃`;
  }
}

const checkWeekWeatherCode = (weather) => {
  const weekWeather = document.querySelectorAll(".daily_weather");
  const code = weather.daily.weather_code;
  for(let i = 0; i < weekWeather.length; i++) {
    checkHourlyWeatherCode(weekWeather[i],code[i]);
  }
}


