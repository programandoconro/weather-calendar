"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Location } from "@/app/model";
import styles from "./location-banner.module.css";

export function LocationBanner({ initialLocation }: { initialLocation: Location }) {
  const storeLocation = useSelector((state: RootState) => state.coordinates);
  const location = storeLocation.label ? storeLocation : {
    ...storeLocation,
    latitude: storeLocation.latitude || initialLocation.latitude,
    longitude: storeLocation.longitude || initialLocation.longitude,
  };

  const lat = Number(location.latitude);
  const lon = Number(location.longitude);

  if (isNaN(lat) || isNaN(lon)) return null;

  const coords = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  const shortName = location.label?.split(",").slice(0, 2).join(",").trim();

  return (
    <div className={styles.banner}>
      {shortName ? (
        <>
          <span className={styles.name}>{shortName}</span>
          <span className={styles.coords}>{coords}</span>
        </>
      ) : (
        <span className={styles.coords}>{coords}</span>
      )}
    </div>
  );
}
