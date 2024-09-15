import styles from "./location-button.module.css";
import Image from "next/image";
import { useLocationUpdate } from "./use-location-update";

export default function LocationUpdateButton() {
  const { onClick, isLoading } = useLocationUpdate(true);

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
            src="/geolocation.png"
            alt="Update geolocation"
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
