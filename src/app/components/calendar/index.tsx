"use client";

import styles from "./calendar.module.css";
import { CurrentWeather, WeatherForecast } from "../../model";
import Day from "../day";
import CurrentWeatherCard from "../current-weather-card";
import LocationUpdateButton from "../location-update-button";
import { logError } from "@/app/actions/log-error";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "@/app/actions/fetch-weather";
import { useEffect } from "react";
import useLocationContext, {
  LocationContext,
} from "@/app/store/location-context";
import useSWR, { SWRConfiguration } from "swr";

const ONE_MINUTE = 1000 * 60;

export default function Calendar(props: {
  initialForecast: WeatherForecast[];
  initialCurrentWeather: CurrentWeather;
}) {
  const { initialForecast, initialCurrentWeather } = props;
  const { location, setLocation } = useLocationContext();

  const swrConfiguration: SWRConfiguration = {
    refreshInterval: ONE_MINUTE,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    keepPreviousData: true,
  };

  const { latitude, longitude } = location;
  const fetchCurrent = () => {
    return fetchCurrentWeather(latitude, longitude);
  };
  const fetchForecast = () => {
    return fetchWeatherForecast(latitude, longitude);
  };

  const {
    data: forecast,
    error: forecastError,
    mutate: mutateForecast,
  } = useSWR("url for forecast weather in server action", fetchForecast, {
    ...swrConfiguration,
    fallbackData: initialForecast,
  });

  const {
    data: currentWeather,
    error: currentError,
    mutate: mutateCurrent,
  } = useSWR("url for current weather in server action", fetchCurrent, {
    ...swrConfiguration,
    fallbackData: initialCurrentWeather,
  });

  useEffect(() => {
    mutateCurrent();
    mutateForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
    <LocationContext.Provider value={{ location, setLocation }}>
      <div className={styles.calendar}>
        <div className={styles.card}>
          <LocationUpdateButton />
          <h2 className={styles.current}>今の天気：</h2>
          <CurrentWeatherCard currentWeather={currentWeather} />
          <h1 className={styles.forecast}>天気予報</h1>
          {forecasts}
        </div>
      </div>
    </LocationContext.Provider>
  );
}
