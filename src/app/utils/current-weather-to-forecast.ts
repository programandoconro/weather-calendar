import { CurrentWeather, Forecast } from "../model";

export function currentWeatherToForecast(cw: CurrentWeather): Forecast {
  return {
    dt_txt: new Date(),
    temp: cw.main.temp,
    feelsLike: cw.main.feels_like,
    humidity: cw.main.humidity,
    icon: cw.weather[0].icon,
    wind: cw.wind.speed,
    windDeg: cw.wind.deg,
    windGust: cw.wind.gust,
    description: cw.weather[0].description,
    main: cw.weather[0].main,
    rain: cw.rain?.["1h"],
  };
}
