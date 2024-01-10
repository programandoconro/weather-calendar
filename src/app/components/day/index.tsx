import { Forecast, Weather } from "../../model";
import reduceDayForecasts from "../../utils/reduce-day-forecasts";
import styles from "./day.module.css";
import ForecastCard from "../forecast-card";
import { dayOfWeekInJapanese } from "../../utils/day-of-week";
import { daysDifference } from "@/app/utils/days-difference";

export default function Day(props: { weather: Weather }) {
  const { weather } = props;
  if (!weather) return;

  const weatherByDay: Forecast[] = reduceDayForecasts(weather);

  const blocks = weatherByDay?.map((forecast, index) => (
    <ForecastCard forecast={forecast} key={index} />
  ));

  const incomingDate = new Date(weatherByDay[0]?.dt_txt);
  incomingDate.setHours(incomingDate.getHours() + 9);
  const dateNow = new Date();
  dateNow.setHours(dateNow.getHours() + 9);

  const dayDifference = daysDifference(incomingDate, dateNow);

  return (
    <div className={styles.day}>
      <h2>{dayOfWeekInJapanese(dayDifference)}</h2>
      {blocks}
    </div>
  );
}
