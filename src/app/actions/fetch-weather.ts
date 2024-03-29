"use server";
import { unstable_noStore as noStore } from "next/cache";
import {
  CurrentWeather,
  currentWeatherSchema,
  LocationState,
  WeatherForecast,
  weatherForecastSchema,
} from "../model";
import groupByday from "../utils/group-by-day";

async function noCacheFetch<T>(
  url: string,
  method: "PUT" | "GET" | "POST"
): Promise<T> {
  noStore();
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

const getQuery = (props: Pick<LocationState, "location">) => {
  const { latitude, longitude } = props.location;
  const lat = latitude || process.env.LAT;
  const lon = longitude || process.env.LON;
  const apiKey = process.env.API_KEY;
  const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return { query };
};

export async function fetchWeatherForecast(
  props: Pick<LocationState, "location">
): Promise<WeatherForecast[] | undefined> {
  const { query } = getQuery(props);
  const URL = `http://api.openweathermap.org/data/2.5/forecast?${query}`;

  const data = await noCacheFetch<{ list: WeatherForecast }>(URL, "GET");

  try {
    const validatedResponse: WeatherForecast = weatherForecastSchema.parse(
      data?.list
    );
    return groupByday(validatedResponse);
  } catch (e) {
    return undefined;
  }
}

export async function fetchCurrentWeather(
  props: Pick<LocationState, "location">
): Promise<CurrentWeather | undefined> {
  const { query } = getQuery(props);
  const URL = `http://api.openweathermap.org/data/2.5/weather?${query}`;

  const response = await noCacheFetch<CurrentWeather>(URL, "GET");
  if (!response) return;

  try {
    const validatedResponse = currentWeatherSchema.parse(response);

    return validatedResponse;
  } catch {
    return undefined;
  }
}
