import Calendar from "./components/calendar";
import { TIMEZONE, fetchTime } from "./utils/fetch-time";
import { fetchWeather } from "./utils/fetch-weather";
import groupByday from "./utils/group-by-day";

export default async function Home() {
  const [weather, time] = await Promise.all([
    fetchWeather(),
    fetchTime(TIMEZONE),
  ]);
  if (!weather || !time) return <div>An error ocurred fetching the data</div>;

  const transformedData = groupByday(weather);

  return (
    <div>
      <title>Weather Calendar</title>
      <main>
        <Calendar weatherForecast={transformedData} time={time} />
      </main>
    </div>
  );
}
