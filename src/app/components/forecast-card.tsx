import { Forecast } from "../model";
import Image from "next/image";
import styles from "../page.module.css";
import { weatherBackgroundColor } from "../utils/weather-background-color";

export default function ForecastBlock(props: { forecast: Forecast }) {
  const { forecast } = props;
  const { dt_txt, description, temp, icon, wind } = forecast;
  const time = dt_txt.toLocaleString().split(",")[1];
  const meridium = time.substring(time.length - 3, time.length);
  const formattedTime = time.substring(0, time.length - 6) + meridium;

  return (
    <div
      className={styles.forecast}
      style={{
        backgroundColor: `${weatherBackgroundColor(forecast.main)}`,
      }}
    >
      <h5>{`${dt_txt.getMonth() + 1}/${dt_txt.getDate()}`}</h5>
      <h5 className={styles.time}>{formattedTime}</h5>

      <div className={styles.description}>
        <div className={styles.popup} role="dialog">
          {description[0].toUpperCase() + description.slice(1)}
        </div>
        <Image
          className="image"
          width={50}
          height={50}
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="weather description image"
        />
      </div>

      <h3 className={styles.temp}>{temp} °C</h3>
      <h5 className={styles.wind}>༄ {Math.floor(wind * 3.6)} Km/h</h5>
    </div>
  );
}
