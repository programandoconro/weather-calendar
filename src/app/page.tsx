import WeatherCalendar from "./components/weather-calendar";
import { fetchTime } from "./utils/fetch-time";
import { fetchWeather } from "./utils/fetch-weather";
import groupByday from "./utils/group-by-day";

export default async function Home() {
  const weather = await fetchWeather();
  const day = await fetchTime();
  const dayNumber = day?.day_of_week;
  const transformedData = groupByday(weather);

  return <WeatherCalendar initialWeather={transformedData} day={dayNumber} />;
}
