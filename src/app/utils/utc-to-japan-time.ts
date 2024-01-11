export function utcToJapanTime(date: Date) {
  date.setHours(date.getHours() + 9); // Japan time has 9 hours more than utc time
  return date;
}
