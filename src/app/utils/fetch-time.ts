import { Time } from "../model";

export async function fetchTime(timeZone: string): Promise<Time | undefined> {
  // https://worldtimeapi.org/
  const url = `http://worldtimeapi.org/api/timezone/${timeZone}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const TIMEZONE = "Asia/Tokyo";
