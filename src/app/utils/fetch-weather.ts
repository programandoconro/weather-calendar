export async function fetchWeather() {
  const lat = process.env.LAT;
  const lon = process.env.LON;
  const apiKey = process.env.API_KEY;

  const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const url = `http://api.openweathermap.org/data/2.5/forecast?${query}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    return data?.list || [];
  } catch (e) {
    console.error(e);
  }
}
