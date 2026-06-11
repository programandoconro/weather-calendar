import { Popup } from "./popup";

type Props = {
  temperature: number;
  feelsLike: number;
  humidity: number;
};

export default function Temperature({ temperature, feelsLike, humidity }: Props) {
  const content = (
    <span style={{ textTransform: "none" }}>
      Feels like {feelsLike}°C
      <br />
      Humidity {humidity}%
    </span>
  );

  return (
    <Popup content={content}>
      <h3>{temperature}°C</h3>
    </Popup>
  );
}
