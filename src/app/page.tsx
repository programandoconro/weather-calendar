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

  if (!weatherForecast)
    return <div>An error ocurred while fetching the weather forecast data</div>;

  if (!currentWeather)
    return <div>An error ocurred while fetching the current weather data</div>;

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
