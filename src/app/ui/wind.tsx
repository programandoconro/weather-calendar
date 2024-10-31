export default function Wind(props: { wind: number }) {
  const wind = Math.floor(props.wind * 3.6);
  return (
    <h5
      style={{
        transform: "translateY(5px)",
      }}
    >
      ༄ {wind} Km/h
    </h5>
  );
}
