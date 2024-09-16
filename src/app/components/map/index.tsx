"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { LocationMarker } from "./location-marker";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useBrowserGeolocation } from "../../hooks/use-browser-geolocation";
import { useSelector } from "react-redux";
import styles from "./map.module.css";

export const Map = () => {
  const { getUserCurrentPosition } = useBrowserGeolocation();
  useEffect(() => {
    getUserCurrentPosition();
  }, []);

  const coordinates = useSelector((state: RootState) => state.coordinates);

  if (!coordinates.latitude || !coordinates.longitude) return <div>Error</div>;

  const centerLocation: LatLngExpression = {
    lat: Number(coordinates.latitude),
    lng: Number(coordinates.longitude),
  };

  return (
    <div className={styles.container}>
      <div className="flex justify-center w-full overflow-hidden">
        <MapContainer center={centerLocation} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker coordinates={coordinates} />
        </MapContainer>
      </div>
    </div>
  );
};
