export function utcToJapanTime(utcDate: Date): Date {
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
