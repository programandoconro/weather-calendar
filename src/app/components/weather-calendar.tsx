import { Weather } from "../model";
import Day from "./day";
import styles from "../page.module.css";

export default function WeatherCalendar(props: {
  weatherForecast: Weather[];
  currentDayOfYear: number;
}) {
  const { weatherForecast, currentDayOfYear } = props;
  const indexOfDaysToForecast = [0, 1, 2, 3, 4, 5];

  const days = indexOfDaysToForecast.map((dayIndex) => {
    return (
      <Day
        key={dayIndex}
        weather={weatherForecast[dayIndex]}
        currentDayOfYear={currentDayOfYear}
      />
    );
  });

  return (
    <div>
      <title>Weather Calendar</title>

      <main className={styles.calendar}>
        <div className={styles.card}>{days}</div>
      </main>
    </div>
  );
}
