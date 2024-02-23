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
        alert(
          `位置情報は更新されました。緯度は：${latitude}です。軽度は：${longitude}です。`
        );
      }
    });
  }
  return (
    <button onClick={onClick} className={styles.container}>
      <span className="material-symbols-outlined">my_location</span>
    </button>
  );
}
