const getCurrentTime = () => {
  const  date = new Date ();
  const hourly = date.getHours();
  return hourly;
} 

const getdate = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = new Date();
  const month_name = months[day.getMonth()];
  const current_date = day.getDate();
  const hourlyDate = document.querySelector('.hourly_date');
  hourlyDate.textContent = `${month_name},${current_date}`;
}

const checkHourlyWeatherCode = (el,code) => {
  const weatherCode = code;
  switch(weatherCode) {
    case 0:
    case 1:
    case 2:
    case 3:
      weatherSun(el);
    break;

    case 45:
    case 48:
      weatherCould(el);
    break;

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      weatherRain(el);
    break;

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      weatherSnow(el);
    break;

    case 95:
    case 96:
    case 99:
      weatherThunder(el);
    break;

    default:
      weatherSun(el);
    break;
  }
}

const createHourlyTime = (weather) => {
  getdate();
  const nowHourly = `${getCurrentTime()}:00`;
  const todayHourlyArray = weather.hourly.time.slice(0,24);
  const result = todayHourlyArray.findIndex(hourly => hourly.indexOf(nowHourly) !== -1);
  const currentHourlyTimeArray = weather.hourly.time.slice(result,result + 24);
  const currentHourlyTempArray = weather.hourly.temperature_2m.slice(result,result + 24);
  const currentHourlyWeatherArray = weather.hourly.weather_code.slice(result + 1,result + 25);
  const hourlyTime = document.querySelectorAll(".hourly_time");
  const hourlyTemp = document.querySelectorAll(".hourly_temp");
  const hourlyWeather = document.querySelectorAll(".hourly_weather");
  for(let i = 0; i < hourlyTime.length; i++) {
    hourlyTime[i].textContent = currentHourlyTimeArray[i * 3].slice(11);
    hourlyTemp[i].textContent = `${currentHourlyTempArray[i * 3]}℃`;
    checkHourlyWeatherCode(hourlyWeather[i],currentHourlyWeatherArray[i * 3]);
    if(i === 0) {
      hourlyTime[i].textContent = "現在";
    }
  }
}



