"use client";
import { useEffect, useState } from "react";
import { Weather, Milliseconds } from "../model";
import Day from "./day";
import styles from "../page.module.css";
import groupByday from "../utils/group-by-day";
import useSWR from "swr";

export default function WeatherCalendar(props: {
  weatherFetchedByServer: Weather[];
  dayOfWeekFetchedByServer: number;
}) {
  const { weatherFetchedByServer, dayOfWeekFetchedByServer } = props;
  const [weather, setWeather] = useState<Weather[]>(weatherFetchedByServer);
  const [dayOfWeek, setDayOfWeek] = useState<number>(dayOfWeekFetchedByServer);

  async function fetcher<T>(url: string): Promise<{ data: T }> {
    const response = await fetch(url);
    return response.json();
  }

  const refreshInterval: Milliseconds = 1000 * 60;

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useSWR("/api/forecast", fetcher<Weather>, {
    refreshInterval,
  });

  const {
    data: dayOfWeekData,
    error: dayOfWeekError,
    isLoading: dayOfWeekLoading,
  } = useSWR("/api/time", fetcher<{ day_of_week: number }>, {
    refreshInterval,
  });

  useEffect(() => {
    if (!weatherLoading && !weatherError) {
      const weatherFetchedByClient: Weather | undefined = weatherData?.data;
      if (!weatherFetchedByClient) return;
      const transformedData = groupByday(weatherFetchedByClient);
      setWeather(transformedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  useEffect(() => {
    if (!dayOfWeekLoading && !dayOfWeekError) {
      const dayOfWeekFetchedByClient = dayOfWeekData?.data?.day_of_week;
      setDayOfWeek(Number(dayOfWeekFetchedByClient));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfWeekData]);

  const daysToForecast = [0, 1, 2, 3, 4, 5];

  const days = daysToForecast.map((dayIndex) => {
    return (
      <Day
        key={dayIndex}
        weather={weather[dayIndex]}
        dayOfWeekToday={dayOfWeek}
      />
    );
  });

  return (
    <div>
      <title>Weather Calendar</title>

      <main className={styles.calendar}>
        <div className={styles.card}>{days}</div>
      </main>
    </div>
  );
}
