import { FUTURE_DAYS_LOOKUP, WEEK_DAYS } from "../constants/japan-dates";
import { getJapanTimeOffSet } from "./get-japan-time-off-set";
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

function isFutureDate(dateToCompare: Date, futureDays: number) {
  const currentDate = new Date();
  const offSet = getJapanTimeOffSet(currentDate);
  const futureDate = utcToJapanTime(currentDate, offSet);
  futureDate.setDate(futureDate.getDate() + futureDays);

  return futureDate.toDateString() === dateToCompare.toDateString();
}
