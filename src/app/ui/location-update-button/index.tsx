import { useContext, useState } from "react";
import styles from "./location-button.module.css";
import { LocationContext } from "@/app/store/location-context";
import Image from "next/image";

export default function LocationUpdateButton() {
  const { setLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);
  function onClick() {
    setIsLoading(true);
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
      setIsLoading(false);
    });
  }
  return (
    <div className={styles.container}>
      <button type="button" tabIndex={0} onClick={onClick}>
        {isLoading ? (
          <span className={styles.loader}></span>
        ) : (
          <Image
            className="location-icon"
            width={35}
            height={35}
            src="/location-icon.png"
            alt="Location icon"
            priority
          />
        )}
      </button>

      <div className={styles.popup} role="dialog">
        現在の位置情報を更新したいですか？
      </div>
    </div>
  );
}
