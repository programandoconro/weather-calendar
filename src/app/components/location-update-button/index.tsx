import { ComponentPropsWithoutRef, useContext } from "react";
import styles from "./location-button.module.css";
import { LocationContext } from "@/app/store/location-context";

export default function LocationUpdateButton(
  props: ComponentPropsWithoutRef<"div">
) {
  const { setLocation } = useContext(LocationContext);
  function onClick() {
    navigator.geolocation.getCurrentPosition((loc) => {
      const { latitude, longitude } = loc.coords;
      if (latitude && longitude) {
        setLocation(String(latitude), String(longitude));
        alert(
          `位置情報は更新されました。緯度は：${latitude}です。軽度は：${longitude}です。`
        );
      } else {
        alert("位置情報の取得は問題がありました。");
      }
    });
  }
  return (
    <div className={styles.container}>
      <button onClick={onClick}>
        <span className="material-symbols-outlined">📍</span>
        <div className={styles.popup} role="dialog">
          現在の位置情報を更新したいですか？
        </div>
      </button>
    </div>
  );
}
