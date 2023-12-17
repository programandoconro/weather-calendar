import { Forecast } from "../model";
import Image from "next/image";
import styles from "../page.module.css";
import { weatherBackgroundColor } from "../utils/weather-background-color";

export default function ForecastBlock(props: { forecast: Forecast }) {
  const { forecast } = props;
  const time = forecast.dt_txt.toLocaleString().split(",")[1];
  const meridium = time.substring(time.length - 3, time.length);
  const formattedTime = time.substring(0, time.length - 6) + meridium;
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
      <h5>{formattedTime}</h5>

      <div className={styles.description}>
        <div className={styles.popup} role="dialog">
          {forecast.description[0].toUpperCase() +
            forecast.description.slice(1)}
        </div>
        <Image
          className="image"
          width={50}
          height={50}
          src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
          alt="weather description image"
        />
      </div>

      <h3>{forecast.temp} °C</h3>
      <h5 className={styles.wind}>༄ {Math.floor(forecast.wind * 3.6)} Km/h</h5>
    </div>
  );
}
