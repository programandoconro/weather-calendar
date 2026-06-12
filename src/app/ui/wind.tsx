export default function Wind({ wind }: { wind: number }) {
  const kmh = Math.floor(wind * 3.6);
  return <h5><span style={{ lineHeight: 1 }}>༄</span> {kmh} Km/h</h5>;
}
