import { Popup } from "./popup";

type Props = {
  wind: number;
  gust?: number;
  deg?: number;
};

const DEG_TO_COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function toCompass(deg: number) {
  return DEG_TO_COMPASS[Math.round(deg / 45) % 8];
}

export default function Wind({ wind, gust, deg }: Props) {
  const kmh = Math.floor(wind * 3.6);
  const gustKmh = gust ? Math.floor(gust * 3.6) : undefined;

  const content = (
    <span>
      {gustKmh && <span style={{ display: "block" }}>Gust {gustKmh} km/h</span>}
      {deg !== undefined && <span style={{ display: "block" }}>From {toCompass(deg)}</span>}
    </span>
  );

  return (
    <Popup content={content} position="left">
      <h5 style={{ transform: "translateY(5px)" }}>༄ {kmh} km/h</h5>
    </Popup>
  );
}
