import { utcToJapanTime } from "./utc-to-japan-time";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;
const FUTURE_DAYS_LOOKUP: Record<number, string> = {
  0: "今日",
  1: "明日",
  2: "２日後",
  3: "３日後",
  4: "４日後",
  5: "５日後",
} as const;

export function dayOfWeekInJapanese(date: Date) {
  const japanTime = utcToJapanTime(date);
  console.log({ japanTime });
  const index = +japanTime.getDay().toLocaleString();

  const futureDays = Object.keys(FUTURE_DAYS_LOOKUP).find((day) =>
    isFutureDate(japanTime, +day)
  );

  if (futureDays === undefined) {
    return "";
  }

  return `${FUTURE_DAYS_LOOKUP[+futureDays]}（${WEEK_DAYS[index]}）`;
}

function isFutureDate(date: Date, futureDays: number) {
  const futureDate = utcToJapanTime(new Date());
  futureDate.setDate(futureDate.getDate() + futureDays);

  const localFutureDate = futureDate.toLocaleDateString();
  const localIncomingDate = date.toLocaleDateString();
  console.log({ localFutureDate, localIncomingDate });

  return localFutureDate === localIncomingDate;
}
