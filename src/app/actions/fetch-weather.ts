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
import { logError } from "./log-error";

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
      const error = new Error("Failed to fetching data, response not ok");
      logError(error);
      throw new Error("failed to fetch");
    }
    return response.json();
  } catch (e) {
    const error = new Error(`There was an error fetching ${e}`);
    logError(error);
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

  if (!data?.list) {
    const error = new Error("Failed to fetch weather forecast");
    logError(error);
    return;
  }

  try {
    const validatedResponse: WeatherForecast = weatherForecastSchema.parse(
      data?.list
    );
    return groupByday(validatedResponse);
  } catch (e) {
    const error = new Error(`Failed to validate weather forecast ${e}`);
    logError(error);
    return undefined;
  }
}

export async function fetchCurrentWeather(
  props: Pick<LocationState, "location">
): Promise<CurrentWeather | undefined> {
  const { query } = getQuery(props);
  const URL = `http://api.openweathermap.org/data/2.5/weather?${query}`;

  const response = await noCacheFetch<CurrentWeather>(URL, "GET");
  if (!response.main.temp) {
    const error = new Error("Failed to fetch current weather");
    logError(error);
    return;
  }

  try {
    const validatedResponse = currentWeatherSchema.parse(response);

    return validatedResponse;
  } catch (e) {
    const error = new Error(`Failed to validate current weather data${e}`);
    logError(error);
    return undefined;
  }
}
