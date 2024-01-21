import Image from "next/image";

export default function WeatherIcon(props: { icon: string }) {
  return (
    <Image
      width={50}
      height={50}
      src={`http://openweathermap.org/img/w/${props.icon}.png`}
      alt={`Weather icon ${props.icon}`}
    />
  );
}
