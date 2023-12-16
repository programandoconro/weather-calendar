export default function calculateFromUTCDate(date: string) {
  const utcDate = new Date(date + "Z");
  const utcNow = new Date();

  const today = utcToJapanTime(utcNow).getDate();
  const localDate = utcToJapanTime(utcDate);
  const incomingDay = localDate.getDate();

  return {
    dayFromToday: incomingDay - today,
    localDate,
  };
}

export function utcToJapanTime(utcDate: Date) {
  const jstFormatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const jstTimeString = jstFormatter.format(utcDate);
  const japanTime = new Date(jstTimeString);

  return japanTime;
}

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function dayOfWeek(dayFromToday: number) {
  const utcDate = new Date().toUTCString();
  const day = utcToJapanTime(new Date(utcDate));

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
