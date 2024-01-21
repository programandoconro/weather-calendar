"use client";

import { CurrentWeather, WeatherForecast } from "../../model";
import Day from "../day";
import styles from "./calendar.module.css";
import useSWR, { SWRConfiguration } from "swr";
import { logError } from "@/app/actions/log-error";
import { fetchWeatherForecast } from "@/app/actions/fetch-weather";
import Current from "../current";

const ONE_MINUTE = 1000 * 60;

export default function Calendar(props: {
  initialForecast: WeatherForecast[];
  currentWeather: CurrentWeather;
}) {
  const { initialForecast, currentWeather } = props;

  const swrConfiguration: SWRConfiguration = {
    refreshInterval: ONE_MINUTE,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    keepPreviousData: true,
    fallbackData: initialForecast,
  };

  const { data: forecast, error } = useSWR(
    "url in server action",
    fetchWeatherForecast,
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

  const forecasts = indexOfDaysToForecast.map((dayIndex) => {
    return <Day key={dayIndex} weather={forecast[+dayIndex]} />;
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.card}>
        <Current currentWeather={currentWeather} />
        {forecasts}
      </div>
    </div>
  );
}
