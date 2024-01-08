export const daysDifference = (futureDate: Date, currentDate: Date): number => {
  const incomingDay = daysFrom1970(futureDate);
  const currentDay = daysFrom1970(currentDate);

  const difference = incomingDay - currentDay;

  return difference;
};

function daysFrom1970(date: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstEpochDate = new Date(1970, 0, 0);

  const dateDifference = Number(date) - Number(firstEpochDate);
  const daysFromFirstEpoch = Math.floor(dateDifference / oneDay);

  return daysFromFirstEpoch;
}
