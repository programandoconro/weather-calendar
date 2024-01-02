import { Weather } from "../model";

export default function groupByday(data: Weather): Weather[] {
  const grouped = groupBy(data, (v) => {
    const date = new Date(v.dt_txt);
    date.setHours(date.getHours() + 9); // Japan's timezone
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
