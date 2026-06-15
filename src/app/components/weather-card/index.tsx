import { Forecast } from "../../model";
import styles from "./weather-card.module.css";
import { weatherBackgroundColor } from "../../utils/weather-background-color";
import WeatherIcon from "@/app/ui/weather-icon";
import Temperature from "@/app/ui/temperature";
import Wind from "@/app/ui/wind";

const DEG_TO_CARDINAL = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const degToCardinal = (deg: number) =>
  DEG_TO_CARDINAL[Math.round(deg / 45) % 8];

type Props = {
  forecast: Forecast;
  label?: string;
};

export default function WeatherCard({ forecast, label }: Props) {
  const {
    dt_txt,
    description,
    temp,
    icon,
    wind,
    windDeg,
    windGust,
    rain,
    pop,
    feelsLike,
    humidity,
    main: weatherMain,
  } = forecast;

  const timeLabel =
    label ??
    (() => {
      const time = dt_txt.toLocaleString().split(",")[1];
      const meridium = time.substring(time.length - 3, time.length);
      return time.substring(0, time.length - 6) + meridium;
    })();

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: weatherBackgroundColor(weatherMain) }}
    >
      <h5 className={styles.label}>{timeLabel}</h5>

      <div className={styles.description}>
        <div className={styles.popup} role="dialog">
          {description}
          {(!!rain ||
            (!!pop &&
              ["Rain", "Drizzle", "Snow", "Thunderstorm"].includes(
                weatherMain,
              ))) && (
            <span style={{ textTransform: "none", display: "block" }}>
              {rain ? `${rain.toFixed(1)} mm` : ""}
              {rain && !!pop ? " · " : ""}
              {!!pop &&
              ["Rain", "Drizzle", "Snow", "Thunderstorm"].includes(weatherMain)
                ? `${Math.round(pop * 100)}%`
                : ""}
            </span>
          )}
        </div>
        <WeatherIcon icon={icon} />
      </div>

      <div className={styles.description}>
        <div className={styles.popup} role="dialog">
          <span>Feels like {feelsLike}°C</span>
          <br />
          <span>Humidity {humidity}%</span>
        </div>
        <Temperature temperature={temp} />
      </div>
      <div className={styles.description}>
        <div className={styles.popup} role="dialog">
          <span style={{ textTransform: "none" }}>
            Direction {degToCardinal(windDeg)}
          </span>
          {windGust && (
            <>
              <br />
              <span style={{ textTransform: "none" }}>
                Gust {Math.floor(windGust * 3.6)} km/h
              </span>
            </>
          )}
        </div>
        <Wind wind={wind} />
      </div>
    </div>
  );
}
