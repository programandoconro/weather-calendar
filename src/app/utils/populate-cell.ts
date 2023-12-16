import { Forecast, Weather } from "../model";
import calculateFromUTCDate from "./calculate-date";

export default function populateCell(
  dayFromToday: number,
  weather: Weather
): Forecast[] {
  if (!Array.isArray(weather)) return [];
  const result = [];
  for (let dayWeather of weather) {
    const dataCell = calculateFromUTCDate(dayWeather.dt_txt);
    if (dataCell.dayFromToday === dayFromToday) {
      result.push({
        dt_txt: dataCell.localDate,
        temp: dayWeather.main.temp,
        icon: dayWeather.weather[0].icon,
        wind: dayWeather.wind.speed,
        description: dayWeather.weather[0].description,
        main: dayWeather.weather[0].main,
      });
    }
  }
  return result;
}
