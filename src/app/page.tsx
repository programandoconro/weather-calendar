import WeatherCalendar from "./components/weather-calendar";
import { fetchWeather } from "./utils/fetch-weather";

export default async function Home() {
  const weather = await fetchWeather();

  return <WeatherCalendar initialData={weather} />;
}
