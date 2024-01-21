"use client";

import { CurrentWeather, WeatherForecast } from "../../model";
import Day from "../day";
import styles from "./calendar.module.css";
import useSWR, { SWRConfiguration } from "swr";
import { logError } from "@/app/actions/log-error";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "@/app/actions/fetch-weather";
import CurrentWeatherCard from "../current-weather-card";

const ONE_MINUTE = 1000 * 60;

export default function Calendar(props: {
  initialForecast: WeatherForecast[];
  initialCurrentWeather: CurrentWeather;
}) {
  const { initialForecast, initialCurrentWeather } = props;

  const swrConfiguration: SWRConfiguration = {
    refreshInterval: ONE_MINUTE,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    keepPreviousData: true,
  };

  const { data: forecast, error: forecastError } = useSWR(
    "url for forecast weather in server action",
    fetchWeatherForecast,
    { ...swrConfiguration, fallbackData: initialForecast }
  );

  const { data: currentWeather, error: currentError } = useSWR(
    "url for current weather in server action",
    fetchCurrentWeather,
    { ...swrConfiguration, fallbackData: initialCurrentWeather }
  );

  if (!forecast || !currentWeather) {
    if (forecastError) {
      logError(forecastError);
    }
    if (currentError) {
      logError(currentError);
    }
    return (
      <div style={{ color: "white" }}>
        An error ocurred fetching the weather data
      </div>
    );
  }

  const indexOfDaysToForecast = Object.keys(forecast);

  const forecasts = indexOfDaysToForecast.map((dayIndex) => {
    return <Day key={dayIndex} weather={forecast[+dayIndex]} />;
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.card}>
        <CurrentWeatherCard currentWeather={currentWeather} />
        {forecasts}
      </div>
    </div>
  );
}
