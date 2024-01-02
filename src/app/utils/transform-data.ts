import { Weather } from "../model";

export default function transformData(data: Weather): Weather[] {
  let index = 8;
  const result: Weather[] = [[], [], [], [], [], []];
  let counter = 5;
  data.reverse().forEach((weather) => {
    result[counter].push(weather);
    index--;
    if (index < 1) {
      counter--;
      index = 8;
    }
  });
  return result;
}
