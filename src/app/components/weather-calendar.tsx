"use client";
import { useEffect, useState } from "react";
import { Weather } from "../model";
import Day from "./day";
import styles from "../page.module.css";
import groupByday from "../utils/group-by-day";

export default function WeatherCalendar(props: {
  weatherFetchedByServer: Weather[];
  dayOfWeekFetchedByServer: number;
}) {
  const { weatherFetchedByServer, dayOfWeekFetchedByServer } = props;
  const [weather, setWeather] = useState<Weather[]>(weatherFetchedByServer);
  const [dayOfWeek, setDayOfWeek] = useState<number>(dayOfWeekFetchedByServer);

  useEffect(() => {
    const { signal } = new AbortController();

    async function fetchByClient() {
      const [weatherData, timeData] = await Promise.all([
        fetch("api/forecast", {
          cache: "no-cache",
          signal,
        })
          .then((response) => response.json())
          .catch((e) => {
            console.log(e);
          }),
        fetch("api/time", {
          cache: "no-cache",
          signal,
        })
          .then((response) => response.json())
          .catch((e) => {
            console.log(e);
          }),
      ]);
      const dayOfWeekFetchedByClient = timeData?.data?.day_of_week;
      setDayOfWeek(Number(dayOfWeekFetchedByClient));

      const weatherFetchedByClient: Weather = weatherData.data;
      const transformedData = groupByday(weatherFetchedByClient);

      setWeather(transformedData);
    }
    const fetchInterval = setInterval(() => fetchByClient(), 1000 * 60);

    return () => clearInterval(fetchInterval);
  }, []);

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

export const dynamic = "force-dynamic";
