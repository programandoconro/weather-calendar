"use client";

import { Weather } from "../../model";
import Day from "../day";
import styles from "./calendar.module.css";
import useSWR, { SWRConfiguration } from "swr";
import { logError } from "@/app/actions/log-error";
import { fetchWeather } from "@/app/actions/fetch-weather";
import { OPEN_WEATHER_URL } from "@/app/constants/urls";

const ONE_MINUTE = 1000 * 60;

export default function Calendar(props: { initialForecast: Weather[] }) {
  const { initialForecast } = props;

  const swrConfiguration: SWRConfiguration = {
    refreshInterval: ONE_MINUTE,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    keepPreviousData: true,
    fallbackData: initialForecast,
  };

  const { data: forecast, error } = useSWR(
    OPEN_WEATHER_URL,
    fetchWeather,
    swrConfiguration
  );

  if (!forecast) {
    if (error) {
      logError(error);
    }
    return (
      <div style={{ color: "white" }}>An error ocurred fetching the data</div>
    );
  }

  const indexOfDaysToForecast = Object.keys(forecast);

  const days = indexOfDaysToForecast.map((dayIndex) => {
    return <Day key={dayIndex} weather={forecast[+dayIndex]} />;
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.card}>{days}</div>
    </div>
  );
}
