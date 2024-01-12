export function utcToJapanTime(date: Date) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 9); // Japan time has 9 hours more than utc time
  return newDate;
}
