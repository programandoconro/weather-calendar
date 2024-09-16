"use client";

import styles from "./calendar.module.css";
import { CurrentWeather, WeatherForecast } from "../../model";
import Day from "../day";
import CurrentWeatherCard from "../current-weather-card";
import { logError } from "@/app/actions/log-error";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "@/app/actions/fetch-weather";
import { useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { Header } from "../header";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useBrowserGeolocation } from "../../hooks/use-browser-geolocation";

const ONE_MINUTE = 1000 * 60;

export function Calendar(props: {
  initialForecast: WeatherForecast[];
  initialCurrentWeather: CurrentWeather;
}) {
  const { initialForecast, initialCurrentWeather } = props;
  const location = useSelector((state: RootState) => state.coordinates);
  const { getUserCurrentPosition } = useBrowserGeolocation();

  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      getUserCurrentPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swrConfiguration: SWRConfiguration = {
    refreshInterval: ONE_MINUTE,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    keepPreviousData: true,
  };

  const fetchCurrent = () => {
    return fetchCurrentWeather({ location });
  };
  const fetchForecast = () => {
    return fetchWeatherForecast({ location });
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
    <div className={styles.calendar}>
      <div className={styles.card}>
        <Header />
        <h2 className={styles.current}>今の天気：</h2>
        <CurrentWeatherCard currentWeather={currentWeather} />
        <h1 className={styles.forecast}>天気予報</h1>
        {forecasts}
      </div>
    </div>
  );
}
