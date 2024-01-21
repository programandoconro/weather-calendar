import Calendar from "./components/calendar";
import {
  fetchWeatherForecast,
  fetchCurrentWeather,
} from "./actions/fetch-weather";

export default async function Home() {
  const [weatherForecast, currentWeather] = await Promise.all([
    fetchWeatherForecast(),
    fetchCurrentWeather(),
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
