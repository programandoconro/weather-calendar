import { Forecast, WeatherForecast } from "../model";
import { utcToJapanTime } from "./utc-to-japan-time";

export default function reduceDayForecasts(
  weather: WeatherForecast
): Forecast[] {
  if (!Array.isArray(weather)) return [];

  const init: Forecast[] = [];
  const dayForecasts = weather.reduce((acc, current) => {
    const dtTxt = utcToJapanTime(new Date(current.dt_txt));

    acc.push({
      dt_txt: dtTxt,
      temp: current.main.temp,
      icon: current.weather[0].icon,
      wind: current.wind.speed,
      windGust: current.wind.gust,
      windDeg: current.wind.deg,
      description: current.weather[0].description,
      main: current.weather[0].main,
      rain: current.rain?.["3h"],
      pop: current.pop,
      feelsLike: current.main.feels_like,
      humidity: current.main.humidity,
    });

    return acc;
  }, init);

  return dayForecasts;
}
