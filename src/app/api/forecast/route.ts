import { fetchWeather } from "@/app/utils/fetch-weather";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  const data = await fetchWeather();
  return Response.json(data);
}
