import Calendar from "./components/calendar";
import { fetchWeather } from "./actions/fetch-weather";

export default async function Home() {
  const [weather] = await Promise.all([fetchWeather()]);
  if (!weather) return <div>An error ocurred while fetching the data</div>;

  return (
    <div>
      <title>Weather Calendar</title>
      <main>
        <Calendar initialForecast={weather} />
      </main>
    </div>
  );
}
