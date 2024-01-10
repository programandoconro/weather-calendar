export function utcToJapanTime(date: Date) {
  date.setHours(date.getHours() + 9);
  return date;
}
