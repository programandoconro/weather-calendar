export function utcToJapanTime(date: Date, offSet = 9) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + offSet); // Japan time has 9 hours more than utc time
  return newDate;
}
