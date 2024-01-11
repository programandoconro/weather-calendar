import { Forecast, Weather } from "../../model";
import reduceDayForecasts from "../../utils/reduce-day-forecasts";
import styles from "./day.module.css";
import ForecastCard from "../forecast-card";
import { dayOfWeekInJapanese } from "../../utils/day-of-week";

export default function Day(props: { weather: Weather }) {
  const { weather } = props;
  if (!weather) return;

  const weatherByDay: Forecast[] = reduceDayForecasts(weather);

  const blocks = weatherByDay?.map((forecast, index) => (
    <ForecastCard forecast={forecast} key={index} />
  ));

  const firstIncomingDate = new Date(weatherByDay[0]?.dt_txt);

  return (
    <div className={styles.day}>
      <h2>{dayOfWeekInJapanese(firstIncomingDate)}</h2>
      {blocks}
    </div>
  );
}
