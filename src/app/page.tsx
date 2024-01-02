import WeatherCalendar from "./components/weather-calendar";
import { fetchWeather } from "./utils/fetch-weather";
import transformData from "./utils/transform-data";

export default async function Home() {
  const weather = await fetchWeather();
  const transformedData = transformData(weather);

  return <WeatherCalendar initialData={transformedData} />;
}
