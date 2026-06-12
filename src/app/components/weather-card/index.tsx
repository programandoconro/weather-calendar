import { Forecast } from "../../model";
import styles from "./weather-card.module.css";
import { weatherBackgroundColor } from "../../utils/weather-background-color";
import WeatherIcon from "@/app/ui/weather-icon";
import Temperature from "@/app/ui/temperature";
import Wind from "@/app/ui/wind";

type Props = {
  forecast: Forecast;
  label?: string;
};

export default function WeatherCard({ forecast, label }: Props) {
  const { dt_txt, description, temp, icon, wind, rain, pop, main: weatherMain } = forecast;

  const timeLabel = label ?? (() => {
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
          {(rain || (pop && ["Rain", "Drizzle", "Snow", "Thunderstorm"].includes(weatherMain))) && (
            <span style={{ textTransform: "none", display: "block" }}>
              {rain ? `${rain.toFixed(1)} mm` : ""}
              {rain && pop ? " · " : ""}
              {pop && ["Rain", "Drizzle", "Snow", "Thunderstorm"].includes(weatherMain)
                ? `${Math.round(pop * 100)}%`
                : ""}
            </span>
          )}
        </div>
        <WeatherIcon icon={icon} />
      </div>

      <Temperature temperature={temp} />
      <Wind wind={wind} />
    </div>
  );
}
