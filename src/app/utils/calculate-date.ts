export default function calculateFromUTCDate(date: string) {
  const utcDate = new Date(date + "Z");
  const incomingDay: number = utcDate.getDate();
  const currentDate = new Date().getUTCDate();

  return {
    dayFromToday: incomingDay - currentDate,
    localDate: utcDate,
  };
}
