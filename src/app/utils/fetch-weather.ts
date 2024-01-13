import { Weather } from "../model";
import groupByday from "./group-by-day";

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

export async function fetchWeather(): Promise<Weather | undefined> {
  const lat = process.env.LAT;
  const lon = process.env.LON;
  const apiKey = process.env.API_KEY;

  const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const url = `http://api.openweathermap.org/data/2.5/forecast?${query}`;

  const data = await noCacheFetch<{ list: Weather }>(url, "GET");
  return data?.list || [];
}

export async function fetchWeatherClientSide(
  url: string
): Promise<Weather[] | null> {
  // need to use "PUT" in order to revalidate data in client side nextjs https://www.youtube.com/watch?v=fY4IHhXjn4w
  const data = await noCacheFetch<Weather>(url, "PUT");
  const transfomedData = groupByday(data);

  return transfomedData;
}
