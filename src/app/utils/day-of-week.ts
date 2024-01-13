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
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + futureDays);

  return futureDate.toDateString() === date.toDateString();
}
