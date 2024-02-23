import { useContext } from "react";
import styles from "./location-button.module.css";
import { LocationContext } from "@/app/store/location-context";

export default function LocationButton() {
  const { setLocation } = useContext(LocationContext);
  function onClick() {
    navigator.geolocation.getCurrentPosition((loc) => {
      const { latitude, longitude } = loc.coords;
      if (latitude && longitude) {
        setLocation(String(latitude), String(longitude));
      }
    });
  }
  return (
    <button onClick={onClick} className={styles.container}>
      <span className="material-symbols-outlined">my_location</span>
    </button>
  );
}
