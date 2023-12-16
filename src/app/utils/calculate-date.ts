export default function calculateFromUTCDate(date: string) {
  const utcDate = new Date(date + "Z");
  const utcNow = new Date();

  // Create an Intl.DateTimeFormat object with Japanese locale and Asia/Tokyo time zone
  const jstFormatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // Format the UTC time in Japan Standard Time
  const jstTimeString = jstFormatter.format(utcNow);
  const today = new Date(jstTimeString).getDate();
  const transformedIncomingDate = jstFormatter.format(utcDate);
  const localDate = new Date(transformedIncomingDate);
  const incomingDay = localDate.getDate();

  return {
    dayFromToday: incomingDay - today,
    localDate,
  };
}
