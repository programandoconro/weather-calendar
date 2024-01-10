import { Time, Weather } from "../../model";
import Day from "../day";
import styles from "./calendar.module.css";

export default function Calendar(props: { weatherForecast: Weather[] }) {
  const { weatherForecast } = props;

  const indexOfDaysToForecast = [0, 1, 2, 3, 4, 5];

  const days = indexOfDaysToForecast.map((dayIndex) => {
    return <Day key={dayIndex} weather={weatherForecast[dayIndex]} />;
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.card}>{days}</div>
    </div>
  );
}
