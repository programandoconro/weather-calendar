import { Forecast, Weather } from "../model";
import calculateFromUTCDate from "./date-operations";

export default function populateDayForecasts(
  dayIndex: number,
  weather: Weather
): Forecast[] {
  if (!Array.isArray(weather)) return [];
  const init: Forecast[] = [];
  const dayForecasts = weather.reduce((acc, current) => {
    const dataDay = calculateFromUTCDate(current.dt_txt);
    if (dataDay.daysFromToday === dayIndex) {
      acc.push({
        dt_txt: dataDay.localDate,
        temp: current.main.temp,
        icon: current.weather[0].icon,
        wind: current.wind.speed,
        description: current.weather[0].description,
        main: current.weather[0].main,
      });
    }

    return acc;
  }, init);

  return dayForecasts;
}
