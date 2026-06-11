import { Forecast } from "../../model";
import styles from "./forecast.module.css";
import { weatherBackgroundColor } from "../../utils/weather-background-color";
import WeatherIcon from "@/app/ui/weather-icon";
import Temperature from "@/app/ui/temperature";
import Wind from "@/app/ui/wind";

export default function ForecastCard(props: { forecast: Forecast }) {
  const { forecast } = props;
  const { dt_txt, description, temp, icon, wind, rain, pop, main } = forecast;
  const isPrecip = ["Rain", "Drizzle", "Snow", "Thunderstorm"].includes(main);
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
      <h5 className={styles.time}>{formattedTime}</h5>

      <div className={styles.description}>
        <div className={styles.popup} role="dialog">
          {description}
          {(isPrecip && pop) || rain ? (
            <span style={{ textTransform: "none", display: "block" }}>
              {isPrecip && pop ? `${Math.round(pop * 100)}%` : ""}
              {isPrecip && pop && rain ? " · " : ""}
              {rain ? `${rain.toFixed(1)} mm` : ""}
            </span>
          ) : ""}
        </div>
        <WeatherIcon icon={icon} />
      </div>

      <Temperature temperature={temp} />
      <Wind wind={wind} />
    </div>
  );
}
