const weatherApi = () => {
  const todayWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,rain,wind_direction_10m&timezone=Asia%2FTokyo`;
  const weekWeatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=vapour_pressure_deficit&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_hours&timezone=Asia%2FTokyo";
  const  hourlyWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m,weather_code&timezone=Asia%2FTokyo`;

  fetch(todayWeatherUrl) 
  .then ((response) => {
    return response.json();
  })
  .then ((todayWeather) => {
    createTodayWeather(todayWeather);
    return fetch(weekWeatherUrl);
  })
  .then((response) => {
    return response.json();
  })
  .then ((weekWeather) => {
    createWeekWeather(weekWeather);
    createWeekDate(".daily_time",weekWeather,"daily");
    return fetch (hourlyWeatherUrl);
  })
  .then((response) => {
    return response.json();
  })
  .then ((hourlyWeather) => {
    createHourlyTime(hourlyWeather);
  })
  .then(() => {
    addClass();
  })
}

const addClass = () => {
  const loadContent = document.querySelector('.load_container');
  loadContent.classList.add("none");
}

const createText = (e,weather,ob,text) => {
  const el = document.querySelector(e);
  const currentValue = weather[ob][text];
  const currentUnit = weather[`${ob}_units`][text];
  const objectLength = Object.keys(currentValue).length;
  if(objectLength) {
    el.textContent = `${currentValue[0]}${currentUnit}`;
  } else {
    el.textContent = `${currentValue}${currentUnit}`;
  }
}

const createDate = (e,weather,obj) => {
  const el = document.querySelector(e);
  const value = weather[obj].time;
  const pattern = /[\/\.\- T]/
  const dates = value.split(pattern);
  const mm = dates[1].replace(/^0+/, '');
  const dd = dates[2].replace(/^0+/, '');
  el.textContent = `${mm}/${dd}`;
}

const weatherSun = (el) => {
  el.setAttribute("src", "image/subicon/subicon_sun.png");
}
const weatherRain = (el) => {
  el.setAttribute("src", "image/subicon/subicon_rain.png");
}
const weatherCould = (el) => {
  el.setAttribute("src", "image/subicon/subicon_cloud.png");
}
const weatherSnow = (el) => {
  el.setAttribute("src", "image/subicon/subicon_snow.png");
}
const weatherThunder = (el) => {
  el.setAttribute("src", "image/subicon/subicon_thunder.png");
}

weatherApi();
setInterval (currentWeatherApi,900000);
setInterval (weekWeatherApi,900000);
setInterval (hourlyWeatherApi,900000);

