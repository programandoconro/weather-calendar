import { WeatherForecast } from "../model";
import { utcToJapanTime } from "./utc-to-japan-time";

export default function groupByDay(data: WeatherForecast): WeatherForecast[] {
  const grouped = groupBy(data, (v) => {
    const date = utcToJapanTime(new Date(v.dt_txt));
    return date.getDate().toString();
  });

  return grouped;
}

const groupBy = <T>(array: T[], findKey: (value: T) => string): T[][] =>
  array.reduce((acc, value) => {
    const index = acc.findIndex(
      (group) => group[0] && findKey(group[0]) === findKey(value)
    );
    if (index !== -1) {
      acc[index].push(value);
    } else {
      acc.push([value]);
    }
    return acc;
  }, [] as T[][]);
