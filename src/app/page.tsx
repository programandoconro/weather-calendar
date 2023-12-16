import Day from "./components/day";
import styles from "./page.module.css";
import { fetchWeather } from "./utils/fetch-weather";

export default async function Home() {
  const weather = await fetchWeather();

  const days = [0, 1, 2, 3, 4].map((dayIndex) => {
    return Day({ dayIndex, weather });
  });
  return (
    <div>
      <title>Weather Calendar</title>

      <main className={styles.main}>
        <div className={styles.calendar}>{days}</div>
      </main>
    </div>
  );
}
