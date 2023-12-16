export async function getData() {
  const lat = process.env.LAT;
  const lon = process.env.LON;
  const APPID = process.env.API_KEY;

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric`,
      {
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    return data?.list || [];
  } catch (e) {
    console.error(e);
  }
}