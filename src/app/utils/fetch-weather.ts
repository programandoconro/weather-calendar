import { Weather } from "../model";
import groupByday from "./group-by-day";

export async function fetchWeather(): Promise<Weather | undefined> {
  const lat = process.env.LAT;
  const lon = process.env.LON;
  const apiKey = process.env.API_KEY;

  const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const url = `http://api.openweathermap.org/data/2.5/forecast?${query}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    return data?.list || [];
  } catch (e) {
    console.error(e);
  }
}

export async function fetchWeatherClientSide(
  url: string
): Promise<Weather[] | null> {
  const response = await fetch(url);
  const data = await response.json();
  const transfomedData = groupByday(data);
  return transfomedData;
}
