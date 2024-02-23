import styles from "./location-button.module.css";

export default function LocationButton() {
  function onClick() {
    navigator.geolocation.getCurrentPosition((location) =>
      alert(location.coords.latitude)
    );
  }
  return (
    <button onClick={onClick} className={styles.container}>
      <span className="material-symbols-outlined">my_location</span>
    </button>
  );
}
