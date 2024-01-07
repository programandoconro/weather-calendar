import Calendar from "./components/calendar";
import { fetchTime } from "./utils/fetch-time";
import { fetchWeather } from "./utils/fetch-weather";
import groupByday from "./utils/group-by-day";

export default async function Home() {
  const [weather, day] = await Promise.all([fetchWeather(), fetchTime()]);
  const transformedData = groupByday(weather);
  const dayOfYear = day?.day_of_year;

  return (
    <div>
      <title>Weather Calendar</title>
      <main>
        <Calendar
          weatherForecast={transformedData}
          currentDayOfYear={dayOfYear}
        />
      </main>
    </div>
  );
}
