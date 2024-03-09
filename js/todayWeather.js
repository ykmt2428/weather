const createTodayWeather = (Weather) => {
  createText(".current_humidity",Weather,"current","relative_humidity_2m");
  createText(".current_temp",Weather,"current","temperature_2m");  
  createText(".current_windSpeed",Weather,"current","wind_speed_10m");
  createText(".current_rain",Weather,"current","rain");
  createBackground(Weather);
  checkCurrentWeatherCode(Weather);
}

const createBackground = (weather) => {
  if(weather.current.is_day === 1) {
    return ;
  }
    const body = document.getElementById('body');
    const min = document.querySelector('.current_MinTemp');
    body.style.background = "linear-gradient(#0C1F5A, #ACBEE2)";
    min.style.color = "#00ABFF"
}

const checkCurrentWeatherCode = (weather) => {
  const weatherCode = weather.current.weather_code;
  const currentWeather = document.querySelector('.current_Weather');
  switch(weatherCode) {
    case 0:
    case 1:
    case 2:
    case 3:
      currentWeather.setAttribute("src","image/mainicon/mainicon_sun.png");
    break;

    case 45:
    case 48:
      currentWeather.setAttribute("src","image/mainicon/cloud_icon.png");
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
      currentWeather.setAttribute("src","image/mainicon/mainicon_heavyrain.png");
    break;

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      currentWeather.setAttribute("src","image/mainicon/mainicon_snow.png");
    break; 

    case 95:
    case 96:
    case 99:
      currentWeather.setAttribute("src","image/mainicon/mainicon_thunder.png");
    break;

    default:
      currentWeather.setAttribute("src","image/mainicon/mainicon_sun.png");
    break;
  }
}
