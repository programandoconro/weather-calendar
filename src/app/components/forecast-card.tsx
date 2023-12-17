import { Forecast } from "../model";
import Image from "next/image";
import styles from "../page.module.css";
import { weatherBackgroundColor } from "../utils/weather-background-color";
import { useState } from "react";

export default function ForecastBlock(props: { forecast: Forecast }) {
  const { forecast } = props;
  const [isHover, setIsHover] = useState(false);
  function onMouseEnter() {
    setTimeout(() => {
      setIsHover(true);
    }, 300);
  }
  function onMouseLeave() {
    setTimeout(() => {
      setIsHover(false);
    }, 300);
  }
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
      <Image
        width={50}
        height={50}
        src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
        alt="weather description image"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      <h3>{forecast.temp} °C</h3>
      <h5>༄ {Math.floor(forecast.wind * 3.6)} Km/h</h5>
      <dialog className={styles.dialog} open={isHover}>
        {forecast.description[0].toUpperCase() + forecast.description.slice(1)}
      </dialog>
    </div>
  );
}
