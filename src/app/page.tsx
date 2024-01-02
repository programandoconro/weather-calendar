import WeatherCalendar from "./components/weather-calendar";
import { fetchWeather } from "./utils/fetch-weather";
import groupByday from "./utils/group-by-day";

export default async function Home() {
  const weather = await fetchWeather();
  const transformedData = groupByday(weather);

  return <WeatherCalendar initialData={transformedData} />;
}
