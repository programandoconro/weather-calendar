import { Forecast, Weather } from "../model";
import populateDayForecasts from "../utils/populate-day-forecasts";
import styles from "../page.module.css";
import ForecastBlock from "./forecast-card";
import { dayOfWeek } from "../utils/date-operations";

export default function Day(props: { weather: Weather; dayIndex: number }) {
  const { weather, dayIndex } = props;
  const weatherByDay: Forecast[] = populateDayForecasts(weather);

  const blocks = weatherByDay
    .reverse()
    .map((forecast, index) => (
      <ForecastBlock forecast={forecast} key={index} />
    ));

  return (
    <>
      {weatherByDay.length > 0 && (
        <div className={styles.day}>
          <h2>{dayOfWeek(dayIndex)}</h2>
          {blocks}
        </div>
      )}
    </>
  );
}
