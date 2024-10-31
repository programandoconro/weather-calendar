"use client";
import { useEffect } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useBrowserGeolocation } from "../../hooks/use-browser-geolocation";

import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ToastContainer } from "react-toastify";

import { LocationMarker } from "./location-marker";
import { InputSearch } from "@/app/components/map/input-search";

import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";

export const Map = () => {
  const { getUserCurrentPosition } = useBrowserGeolocation();
  const coordinates = useSelector((state: RootState) => state.coordinates);
  const hasCoordinates = coordinates.latitude && coordinates.longitude;

  useEffect(() => {
    if (!hasCoordinates) {
      getUserCurrentPosition();
    }
  }, [hasCoordinates, getUserCurrentPosition]);

  if (!hasCoordinates) return <div>Error getting coordinates</div>;

  const centerLocation: LatLngExpression = {
    lat: Number(coordinates.latitude),
    lng: Number(coordinates.longitude),
  };

  return (
    <div className={styles.container}>
      <InputSearch />
      <div className={styles.home}>
        <Link href="/">
          <Button
            imageProps={{
              src: "/home.png",
              width: 35,
              height: 35,
              priority: true,
              alt: "Home icon",
            }}
          />
        </Link>
      </div>
      <div className="flex justify-center w-full overflow-hidden">
        <MapContainer center={centerLocation} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker coordinates={coordinates} />
        </MapContainer>
      </div>
      <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
};
