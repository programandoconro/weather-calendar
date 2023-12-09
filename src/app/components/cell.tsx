import { Block, Weather } from "../model";
import populateCell from "../utils/populate-cell";
import styles from "../page.module.css";
import DayBlock from "./day-block";

export default function Cell(props: {
  dayFromToday: number;
  weather: Weather;
}) {
  const { dayFromToday, weather } = props;
  const weatherByDay: Block[] = populateCell(dayFromToday, weather);

  const blocks = weatherByDay.map((block, index) => (
    <DayBlock block={block} key={index} />
  ));

  return (
    <div className={styles.cell} key={dayFromToday}>
      <h2>
        {dayFromToday === 0
          ? "今日"
          : dayFromToday === 1
          ? "明日"
          : `${dayFromToday}日後`}
      </h2>
      {blocks}
    </div>
  );
}
