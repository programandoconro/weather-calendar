import { Forecast, Weather } from "../../model";
import reduceDayForecasts from "../../utils/reduce-day-forecasts";
import styles from "./day.module.css";
import ForecastCard from "../forecast-card";
import { dayOfWeekInJapanese } from "../../utils/day-of-week";
import { daysDifference } from "@/app/utils/days-difference";
import { utcToJapanTime } from "@/app/utils/utc-to-japan-time";

export default function Day(props: { weather: Weather }) {
  const { weather } = props;
  if (!weather) return;

  const weatherByDay: Forecast[] = reduceDayForecasts(weather);

  const blocks = weatherByDay?.map((forecast, index) => (
    <ForecastCard forecast={forecast} key={index} />
  ));

  const incomingDate = utcToJapanTime(new Date(weatherByDay[0]?.dt_txt));
  const dateNow = utcToJapanTime(new Date());

  const dayDifference = daysDifference(incomingDate, dateNow);

  return (
    <div className={styles.day}>
      <h2>{dayOfWeekInJapanese(dayDifference)}</h2>
      {blocks}
    </div>
  );
}
