import { Forecast, Weather } from "../model";

export default function populateDayForecasts(weather: Weather): Forecast[] {
  if (!Array.isArray(weather)) return [];
  const init: Forecast[] = [];
  const dayForecasts = weather.reduce((acc, current) => {
    const dtTxt = new Date(current.dt_txt);
    dtTxt.setHours(dtTxt.getHours() + 9);

    acc.push({
      dt_txt: dtTxt,
      temp: current.main.temp,
      icon: current.weather[0].icon,
      wind: current.wind.speed,
      description: current.weather[0].description,
      main: current.weather[0].main,
    });

    return acc;
  }, init);

  return dayForecasts;
}
