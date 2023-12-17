import { fetchWeather } from "@/app/utils/fetch-weather";

export async function GET() {
  const data = await fetchWeather();

  return Response.json({ data });
}
