import Calendar from "./components/calendar";
import { fetchWeather } from "./actions/fetch-weather";
import { OPEN_WEATHER_URL } from "./constants/urls";

export default async function Home() {
  const [weather] = await Promise.all([fetchWeather(OPEN_WEATHER_URL)]);
  if (!weather) return <div>An error ocurred fetching the data</div>;

  return (
    <div>
      <title>Weather Calendar</title>
      <main>
        <Calendar initialForecast={weather} />
      </main>
    </div>
  );
}
