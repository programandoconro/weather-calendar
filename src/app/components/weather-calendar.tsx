"use client";
import { useEffect, useState } from "react";
import { Weather } from "../model";
import Day from "./day";
import styles from "../page.module.css";

export default function WeatherCalendar(props: { initialData: Weather }) {
  const { initialData } = props;
  const [weather, setWeather] = useState(initialData);

  useEffect(() => {
    async function fetchForecast() {
      const response = await fetch("api/forecast", {
        cache: "no-store",
      });
      const json = await response.json();

      setWeather(json.data);
    }
    const fetchInterval = setInterval(() => fetchForecast(), 1000 * 60);

    return () => clearInterval(fetchInterval);
  }, []);

  const days = [0, 1, 2, 3, 4].map((dayIndex) => {
    return Day({ dayIndex, weather });
  });

  return (
    <div>
      <title>Weather Calendar</title>

      <main className={styles.main}>
        <div className={styles.calendar}>{days}</div>
      </main>
    </div>
  );
}
