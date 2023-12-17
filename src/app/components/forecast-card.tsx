import { Forecast } from "../model";
import Image from "next/image";
import styles from "../page.module.css";
import { weatherBackgroundColor } from "../utils/weather-background-color";

export default function ForecastBlock(props: { forecast: Forecast }) {
  const { forecast } = props;
  return (
    <div
      className={styles.forecast}
      style={{
        backgroundColor: `${weatherBackgroundColor(forecast.main)}`,
      }}
    >
      <h5>{`${
        forecast.dt_txt.getMonth() + 1
      }/${forecast.dt_txt.getDate()}`}</h5>
      <h5>{`${forecast.dt_txt.toLocaleString().split(",")[1]}`}</h5>

      <div className={styles.description}>
        <Image
          width={50}
          height={50}
          src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
          alt="weather description image"
        />
        <dialog className={styles.dialog} open={true}>
          {forecast.description[0].toUpperCase() +
            forecast.description.slice(1)}
        </dialog>
      </div>

      <h3>{forecast.temp} °C</h3>
      <h5>༄ {Math.floor(forecast.wind * 3.6)} Km/h</h5>
    </div>
  );
}
