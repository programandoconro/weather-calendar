import { utcToJapanTime } from "./utc-to-japan-time";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function dayOfWeekInJapanese(dayFromToday: number) {
  const today = utcToJapanTime(new Date());

  switch (dayFromToday) {
    case 0: {
      const weekDay = today.getDay();
      return `今日（${WEEK_DAYS[weekDay]}）`;
    }
    case 1: {
      today.setDate(today.getDate() + 1);
      const tomorrowWeekDay = today.getDay();
      return `明日（${WEEK_DAYS[tomorrowWeekDay]}）`;
    }
    default: {
      today.setDate(today.getDate() + dayFromToday);
      const futureWeekDay = today.getDay();
      return `${dayFromToday}日後（${WEEK_DAYS[futureWeekDay]}）`;
    }
  }
}
