const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function dayOfWeekInJapanese(date: Date) {
  const index = +date.getDay().toLocaleString();

  switch (true) {
    case isFutureDate(date, 0): {
      return `今日（${WEEK_DAYS[index]}）`;
    }
    case isFutureDate(date, 1): {
      return `明日（${WEEK_DAYS[index]}）`;
    }
    case isFutureDate(date, 2): {
      return `２日後（${WEEK_DAYS[index]}）`;
    }
    case isFutureDate(date, 3): {
      return `３日後（${WEEK_DAYS[index]}）`;
    }
    case isFutureDate(date, 4): {
      return `４日後（${WEEK_DAYS[index]}）`;
    }
    case isFutureDate(date, 5): {
      return `５日後（${WEEK_DAYS[index]}）`;
    }
  }
}

function isFutureDate(date: Date, futureDays: number) {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + futureDays);

  if (futureDate.toLocaleDateString() === date.toLocaleDateString()) {
    return true;
  }
  return false;
}
