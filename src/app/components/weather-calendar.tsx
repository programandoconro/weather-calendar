import { Weather } from "../model";
import Day from "./day";
import styles from "../page.module.css";

export default function WeatherCalendar(props: {
  weatherFetchedByServer: Weather[];
  dayOfWeekFetchedByServer: number;
}) {
  const { weatherFetchedByServer, dayOfWeekFetchedByServer } = props;

  const daysToForecast = [0, 1, 2, 3, 4, 5];

  const days = daysToForecast.map((dayIndex) => {
    return (
      <Day
        key={dayIndex}
        weather={weatherFetchedByServer[dayIndex]}
        dayOfWeekToday={dayOfWeekFetchedByServer}
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
