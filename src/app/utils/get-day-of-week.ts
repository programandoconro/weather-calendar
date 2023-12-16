import { transformUtcToJapanTime } from "./calculate-date";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function getDayOfWeek(dayFromToday: number) {
  const utcDate = new Date().toUTCString();
  const day = transformUtcToJapanTime(new Date(utcDate));

  switch (dayFromToday) {
    case 0: {
      const today = day.getDay();
      return `今日（${WEEK_DAYS[today]}）`;
    }
    case 1: {
      day.setDate(day.getDate() + 1);
      const tomorrow = day.getDay();
      return `明日（${WEEK_DAYS[tomorrow]}）`;
    }
    default: {
      day.setDate(day.getDate() + dayFromToday);
      const futureDay = day.getDay();
      return `${dayFromToday}日後（${WEEK_DAYS[futureDay]}）`;
    }
  }
}
