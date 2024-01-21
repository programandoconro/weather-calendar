import { WeatherForecast } from "../model";
import { utcToJapanTime } from "./utc-to-japan-time";

export default function groupByday(data: WeatherForecast): WeatherForecast[] {
  const grouped = groupBy(data, (v) => {
    const date = utcToJapanTime(new Date(v.dt_txt));
    return date.getDate().toString();
  });

  return Object.values(grouped).map((v) => v);
}

const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
