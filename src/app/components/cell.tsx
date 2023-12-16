import { Forecast, Weather } from "../model";
import populateCell from "../utils/populate-cell";
import styles from "../page.module.css";
import ForecastBlock from "./forecast-block";
import { getDayOfWeek } from "../utils/get-day-of-week";

export default function Cell(props: {
  dayFromToday: number;
  weather: Weather;
}) {
  const { dayFromToday, weather } = props;
  const weatherByDay: Forecast[] = populateCell(dayFromToday, weather);

  const blocks = weatherByDay.map((forecast, index) => (
    <ForecastBlock forecast={forecast} key={index} />
  ));

  return (
    <div className={styles.cell} key={dayFromToday}>
      <h2>{getDayOfWeek(dayFromToday)}</h2>
      {blocks}
    </div>
  );
}
