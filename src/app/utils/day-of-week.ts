import { FUTURE_DAYS_LOOKUP, WEEK_DAYS } from "../constants/japan-dates";
import { utcToJapanTime } from "./utc-to-japan-time";

export function dayOfWeekInJapanese(date: Date) {
  const futureDays = Object.keys(FUTURE_DAYS_LOOKUP).find((day) =>
    isFutureDate(date, +day)
  );

  if (futureDays === undefined) {
    return "";
  }

  const index = +date.getDay().toLocaleString();

  const dayOfWeek = `（${WEEK_DAYS[index]}）`;
  const logicalDay = `${"\xa0".repeat(2)}${FUTURE_DAYS_LOOKUP[+futureDays]}`;

  return `${logicalDay}${dayOfWeek}`;
}

function isFutureDate(date: Date, futureDays: number) {
  let futureDate = new Date();
  if (typeof window === "undefined") {
    futureDate = utcToJapanTime(new Date());
  }
  futureDate.setDate(futureDate.getDate() + futureDays);

  return futureDate.toDateString() === date.toDateString();
}
