"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./map.module.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { LocationMarker } from "./location-marker";
import { LocationContext } from "@/app/store/location-context";
import { useLocationUpdate } from "@/app/ui/location-update-button/use-location-update";
import { OpenMapButton } from "@/app/ui/open-map-button";

export const Map = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLocation: setContextLocation, location: contextLocation } =
    useContext(LocationContext);
  const { askForLocationPermission } = useLocationUpdate();
  useEffect(() => {
    askForLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetLocation = (coors: LatLngExpression) => {
    if ("lat" in coors && "lng" in coors) {
      setContextLocation(String(coors.lat), String(coors.lng));
    }
  };
  const handleToggleButton = () => {
    if (!contextLocation.latitude || !contextLocation.longitude) {
      askForLocationPermission();
      return;
    }
    setIsOpen(!isOpen);
  };

  const coors = {
    lat: Number(contextLocation.latitude),
    lng: Number(contextLocation.longitude),
  };

  return (
    <>
      {isOpen ? (
        <div className={styles.container}>
          <OpenMapButton
            isOpen={isOpen}
            handleToggleButton={handleToggleButton}
          />
          <div className="flex justify-center w-full overflow-hidden">
            <MapContainer center={coors} zoom={13} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker
                location={coors}
                setLocation={handleSetLocation}
              />
            </MapContainer>
          </div>
        </div>
      ) : (
        <OpenMapButton
          isOpen={isOpen}
          handleToggleButton={handleToggleButton}
        />
      )}
    </>
  );
};
