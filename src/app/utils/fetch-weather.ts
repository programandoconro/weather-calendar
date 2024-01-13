import { Weather } from "../model";
import groupByday from "./group-by-day";

async function noCacheFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    return response.json();
  } catch (e) {
    throw new Error(`There was an error fetching ${e}`);
  }
}

export async function fetchWeather(): Promise<Weather | undefined> {
  const lat = process.env.LAT;
  const lon = process.env.LON;
  const apiKey = process.env.API_KEY;

  const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const url = `http://api.openweathermap.org/data/2.5/forecast?${query}`;

  const data = await noCacheFetch<{ list: Weather }>(url);
  return data?.list || [];
}

export async function fetchWeatherClientSide(
  url: string
): Promise<Weather[] | null> {
  const data = await noCacheFetch<Weather>(url);
  const transfomedData = groupByday(data);

  return transfomedData;
}
