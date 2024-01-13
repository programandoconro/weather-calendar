const lat = process.env.LAT;
const lon = process.env.LON;
const apiKey = process.env.API_KEY;

const query = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
export const OPEN_WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?${query}`;
