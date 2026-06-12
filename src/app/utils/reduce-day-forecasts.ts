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
      feelsLike: current.main.feels_like,
      humidity: current.main.humidity,
      icon: current.weather[0].icon,
      wind: current.wind.speed,
      windDeg: current.wind.deg,
      windGust: current.wind.gust,
      description: current.weather[0].description,
      main: current.weather[0].main,
      rain: current.rain?.["3h"],
      pop: current.pop,
    });

    return acc;
  }, init);

  return dayForecasts;
}
