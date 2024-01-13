import { utcToJapanTime } from "./utc-to-japan-time";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;
const FUTURE_DAYS_LOOKUP: Record<number, string> = {
  0: "今日",
  1: "明日",
  2: "明後日",
  3: "３日後",
  4: "４日後",
  5: "５日後",
} as const;

export function dayOfWeekInJapanese(date: Date) {
  const japanDate = utcToJapanTime(date);
  const index = +japanDate.getDay().toLocaleString();

  const futureDays = Object.keys(FUTURE_DAYS_LOOKUP).find((day) =>
    isFutureDate(japanDate, +day)
  );

  if (futureDays === undefined) {
    return "";
  }

  const dayOfWeek = `（${WEEK_DAYS[index]}）`;
  const logicalDay = `${FUTURE_DAYS_LOOKUP[+futureDays]}`;

  return `${logicalDay}${dayOfWeek}`;
}

function isFutureDate(date: Date, futureDays: number) {
  const futureDate = utcToJapanTime(new Date());
  futureDate.setDate(futureDate.getDate() + futureDays);

  return futureDate.toDateString() === date.toDateString();
}
