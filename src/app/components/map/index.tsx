"use client";
import { useContext } from "react";
import styles from "./map.module.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { LocationMarker } from "./location-marker";
import { LocationContext } from "@/app/store/location-context";

export const Map = () => {
  const { setLocation: setContextLocation, location: contextLocation } =
    useContext(LocationContext);

  const handleSetLocation = (coors: LatLngExpression) => {
    if ("lat" in coors && "lng" in coors) {
      setContextLocation(String(coors.lat), String(coors.lng));
    }
  };

  const coors = {
    lat: Number(contextLocation.latitude),
    lng: Number(contextLocation.longitude),
  };

  return (
    <div className={styles.container}>
      <div className="flex justify-center w-full overflow-hidden">
        <MapContainer center={coors} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker location={coors} setLocation={handleSetLocation} />
        </MapContainer>
      </div>
    </div>
  );
};
