import { CurrentWeather } from "@/app/model";
import Image from "next/image";
import styles from "./current.module.css";
import { weatherBackgroundColor } from "@/app/utils/weather-background-color";

export default function Current(props: { currentWeather: CurrentWeather }) {
  const { currentWeather } = props;
  const { icon, description, main } = currentWeather.weather[0];

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: weatherBackgroundColor(main) }}
    >
      <h5>現在天気</h5>
      <div className={styles.icon}>
        <Image
          width={50}
          height={50}
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="Current weather"
        />
        <div className={styles.popup} role="dialog">
          {description}
        </div>
      </div>
      <h3>{currentWeather.main.temp}°C</h3>
      <h5 className={styles.wind}>
        ༄ {currentWeather.wind.speed.toFixed(0)} Km/h
      </h5>
    </div>
  );
}
