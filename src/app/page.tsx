import Calendar from "./components/calendar";
import { fetchWeather } from "./utils/fetch-weather";
import groupByday from "./utils/group-by-day";

export default async function Home() {
  const [weather] = await Promise.all([fetchWeather()]);
  if (!weather) return <div>An error ocurred fetching the data</div>;

  const transformedData = groupByday(weather);

  return (
    <div>
      <title>Weather Calendar</title>
      <main>
        <Calendar initialForecast={transformedData} />
      </main>
    </div>
  );
}
