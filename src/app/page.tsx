import Calendar from "./components/calendar";
import {
  fetchWeatherForecast,
  fetchCurrentWeather,
} from "./actions/fetch-weather";

export default async function Home() {
  const lat = process.env.LAT || "";
  const lon = process.env.LON || "";
  const [weatherForecast, currentWeather] = await Promise.all([
    fetchWeatherForecast(lat, lon),
    fetchCurrentWeather(lat, lon),
  ]);

  if (!weatherForecast || !currentWeather)
    return (
      <div style={{ color: "white" }}>An error ocurred while fetching data</div>
    );

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
