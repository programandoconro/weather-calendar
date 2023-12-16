import { Forecast, Weather } from "../model";
import populateDayForecasts from "../utils/populate-day-forecasts";
import styles from "../page.module.css";
import ForecastBlock from "./forecast-card";
import { dayOfWeek } from "../utils/date-operations";

export default function Day(props: { dayIndex: number; weather: Weather }) {
  const { dayIndex, weather } = props;
  const weatherByDay: Forecast[] = populateDayForecasts(dayIndex, weather);

  const blocks = weatherByDay.map((forecast, index) => (
    <ForecastBlock forecast={forecast} key={index} />
  ));

  return (
    <div className={styles.cell} key={dayIndex}>
      {weatherByDay.length > 0 && (
        <>
          <h2>{dayOfWeek(dayIndex)}</h2>
          {blocks}
        </>
      )}
    </div>
  );
}
