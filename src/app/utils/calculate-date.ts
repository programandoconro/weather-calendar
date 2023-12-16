export default function calculateFromUTCDate(date: string) {
  const utcDate = new Date(date + "Z");
  const utcNow = new Date();

  const today = transformUtcToJapanTime(utcNow).getDate();
  const localDate = transformUtcToJapanTime(utcDate);
  const incomingDay = localDate.getDate();

  return {
    dayFromToday: incomingDay - today,
    localDate,
  };
}

export function transformUtcToJapanTime(utcDate: Date) {
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
