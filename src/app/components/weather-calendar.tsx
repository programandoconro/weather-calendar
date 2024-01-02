"use client";
import { useEffect, useState } from "react";
import { Weather } from "../model";
import Day from "./day";
import styles from "../page.module.css";
import transformData from "../utils/transform-data";

export default function WeatherCalendar(props: { initialData: Weather[] }) {
  const [weather, setWeather] = useState<Weather[]>(props.initialData);

  useEffect(() => {
    async function fetchForecast() {
      const response = await fetch("api/forecast", {
        cache: "no-store",
      });
      const json = await response.json();
      const data: Weather = json.data;
      const transformedData = transformData(data);

      setWeather(transformedData);
    }
    fetchForecast();
    const fetchInterval = setInterval(() => fetchForecast(), 1000 * 60);

    return () => clearInterval(fetchInterval);
  }, []);

  const days = [0, 1, 2, 3, 4, 5].map((dayIndex) => {
    return (
      <Day key={dayIndex} weather={weather[dayIndex]} dayIndex={dayIndex} />
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
