export default function calculateFromUTCDate(date: string) {
  const utcDate = new Date(date + "Z");
  const incomingDay: number = utcDate.getDate();
  const currentDate = new Date();

  return {
    dayFromToday: incomingDay - currentDate.getDate(),
    localDate: utcDate,
  };
}
