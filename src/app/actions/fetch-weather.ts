"use server";
import { unstable_noStore } from "next/cache";
import { Weather } from "../model";
import groupByday from "../utils/group-by-day";

async function noCacheFetch<T>(
  url: string,
  method: "PUT" | "GET" | "POST"
): Promise<T> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      method,
    });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    return response.json();
  } catch (e) {
    throw new Error(`There was an error fetching ${e}`);
  }
}

export async function fetchWeather(
  url: string
): Promise<Weather[] | undefined> {
  unstable_noStore();
  const lat = process.env.LAT;
  const lon = process.env.LON;
  const apiKey = process.env.API_KEY;

  const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const OPEN_WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?${query}`;

  const data = await noCacheFetch<{ list: Weather }>(OPEN_WEATHER_URL, "GET");
  if (!data) return;
  const response = groupByday(data.list);
  return response;
}
