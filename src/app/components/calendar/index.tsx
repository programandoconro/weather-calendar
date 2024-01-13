"use client";

import { Weather } from "../../model";
import Day from "../day";
import styles from "./calendar.module.css";
import useSWR, { SWRConfiguration } from "swr";
import { fetchWeatherClientSide } from "@/app/utils/fetch-weather";

const ONE_MINUTE = 1000 * 60;
const ROUTE = "/api/forecast";

export default function Calendar(props: { initialForecast: Weather[] }) {
  const { initialForecast } = props;

  const swrConfiguration: SWRConfiguration = {
    refreshInterval: ONE_MINUTE,
    fallbackData: initialForecast,
    revalidateOnMount: true,
    refreshWhenHidden: true,
    revalidateOnFocus: true,
  };

  const { data: forecast, error } = useSWR(
    ROUTE,
    fetchWeatherClientSide,
    swrConfiguration
  );

  if (error || !forecast) {
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
