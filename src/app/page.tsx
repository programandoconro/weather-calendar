import Cell from "./components/cell";
import styles from "./page.module.css";
import { getData } from "./utils/get-data";

export default async function Home() {
  const data = await getData();

  const cells = [0, 1, 2, 3, 4].map((dayFromToday) => {
    return Cell({ dayFromToday, weather: data });
  });
  return (
    <div>
      <title>Weather Calendar</title>

      <main className={styles.main}>
        <div className={styles.calendar}>{cells}</div>
      </main>
    </div>
  );
}
