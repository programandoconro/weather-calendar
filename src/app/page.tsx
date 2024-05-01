"use server";

import Calendar from "./components/calendar";
import {
  fetchWeatherForecast,
  fetchCurrentWeather,
} from "./actions/fetch-weather";
import { logError } from "./actions/log-error";

export default async function Home() {
  const location = {
    latitude: process.env.LAT as string,
    longitude: process.env.LON as string,
  };
  const [weatherForecast, currentWeather] = await Promise.all([
    fetchWeatherForecast({ location }),
    fetchCurrentWeather({ location }),
  ]).catch(() => []);

  if (!weatherForecast || !currentWeather) {
    const error = new Error("Coud not render the weather calendar");
    logError(error);

    return (
      <div style={{ color: "white" }}>An error ocurred while fetching data</div>
    );
  }

  return (
    <div>
      <title>Weather Calendar</title>
      <main>
        <Calendar
          initialForecast={weatherForecast}
          initialCurrentWeather={currentWeather}
        />
      </main>
    </div>
  );
}
