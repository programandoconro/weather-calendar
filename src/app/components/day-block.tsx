import { Block } from "../model";
import Image from "next/image";
import styles from "../page.module.css";

export default function DayBlock(props: { block: Block }) {
  const { block } = props;
  return (
    <div className={styles.block}>
      <h5>{`${block.dt_txt.getMonth() + 1}/${block.dt_txt.getDate()}`}</h5>
      <h5>{`${block.dt_txt.getHours()}:00`}</h5>
      <Image
        width={50}
        height={50}
        src={`http://openweathermap.org/img/w/${block.icon}.png`}
        alt=""
      />

      <h3>{block.temp} °C</h3>
      <h5>༄ {Math.floor(block.wind * 3.6)} Km/h</h5>
    </div>
  );
}
