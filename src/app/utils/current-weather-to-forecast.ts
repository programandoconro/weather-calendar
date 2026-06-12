import { CurrentWeather, Forecast } from "../model";

export function currentWeatherToForecast(cw: CurrentWeather): Forecast {
  return {
    dt_txt: new Date(),
    temp: cw.main.temp,
    icon: cw.weather[0].icon,
    wind: cw.wind.speed,
    description: cw.weather[0].description,
    main: cw.weather[0].main,
    rain: cw.rain?.["1h"],
  };
}
