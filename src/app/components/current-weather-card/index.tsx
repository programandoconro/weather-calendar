import { CurrentWeather } from "@/app/model";
import styles from "./current-wather-card.module.css";
import { weatherBackgroundColor } from "@/app/utils/weather-background-color";
import WeatherIcon from "@/app/ui/weather-icon";
import Temperature from "@/app/ui/temperature";
import Wind from "@/app/ui/wind";

export default function CurrentWeatherCard(props: {
  currentWeather: CurrentWeather;
}) {
  const { currentWeather } = props;
  const { icon, description, main } = currentWeather.weather[0];

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: weatherBackgroundColor(main) }}
    >
      <h5>現在天気：</h5>
      <div className={styles.icon}>
        <WeatherIcon icon={icon} />
        <div className={styles.popup} role="dialog">
          {description}
        </div>
      </div>
      <Temperature temperature={currentWeather.main.temp} />
      <Wind wind={currentWeather.wind.speed} />
    </div>
  );
}
