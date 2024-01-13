"use client";

import { Weather } from "../../model";
import Day from "../day";
import styles from "./calendar.module.css";
import useSWR from "swr";
import { fetchWeatherClientSide } from "@/app/utils/fetch-weather";

const ONE_MINUTE = 1000 * 60;

export default function Calendar(props: { initialForecast: Weather[] }) {
  const { initialForecast } = props;

  const { data: forecast } = useSWR("/api/forecast", fetchWeatherClientSide, {
    refreshInterval: ONE_MINUTE,
    fallbackData: initialForecast,
  });

  if (!forecast) return null;

  const indexOfDaysToForecast = [0, 1, 2, 3, 4, 5];

  const days = indexOfDaysToForecast.map((dayIndex) => {
    return <Day key={dayIndex} weather={forecast[dayIndex]} />;
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.card}>{days}</div>
    </div>
  );
}
