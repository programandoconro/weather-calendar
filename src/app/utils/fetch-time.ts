export async function fetchTime() {
  // https://worldtimeapi.org/
  const url = "http://worldtimeapi.org/api/timezone/Asia/Tokyo";

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    return data || {};
  } catch (e) {
    console.error(e);
  }
}
