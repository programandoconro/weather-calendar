import { Forecast, Weather } from "../model";
import reduceDayForecasts from "../utils/reduce-day-forecasts";
import styles from "../page.module.css";
import ForecastBlock from "./forecast-card";
import { dayOfWeek } from "../utils/day-of-week";

export default function Day(props: { weather: Weather; dayOfToday: number }) {
  const { weather, dayOfToday } = props;
  if (!weather) return;

  const weatherByDay: Forecast[] = reduceDayForecasts(weather);

  const blocks = weatherByDay?.map((forecast, index) => (
    <ForecastBlock forecast={forecast} key={index} />
  ));

  const incomingDate = new Date(weatherByDay[0]?.dt_txt);
  const incomingDay = incomingDate.getDate();
  const dayDifference = incomingDay - dayOfToday;

  return (
    <div className={styles.day}>
      <h2>{dayOfWeek(dayDifference)}</h2>
      {blocks}
    </div>
  );
}
