import { useContext, useState } from "react";
import styles from "./location-button.module.css";
import { LocationContext } from "@/app/store/location-context";
import Image from "next/image";

export default function LocationUpdateButton() {
  const { setLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);

  const successCallback = (loc: GeolocationPosition) => {
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
  };

  const errorCallback = (error: GeolocationPositionError) => {
    if (error.PERMISSION_DENIED) {
      alert(error.message + " 位置情報を有効にしてください");
      setIsLoading(false);
    }
  };

  function onClick() {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      maximumAge: 60000,
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
