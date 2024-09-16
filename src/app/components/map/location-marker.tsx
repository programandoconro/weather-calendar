"use client";
import { useMemo, useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../store/reducers/coordinates";
import { Location } from "../../model";

const ICON = L.icon({
  iconUrl: "/location-icon.png",
  iconSize: [50, 50],
});

export function LocationMarker(props: { coordinates: Location }) {
  const dispatch = useDispatch();
  const map = useMapEvents({
    click(e) {
      map.locate();
      dispatch(
        setCoordinates({
          latitude: e.latlng.lat.toString(),
          longitude: e.latlng.lng.toString(),
        })
      );
    },
  });
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker?.getLatLng();
          dispatch(
            setCoordinates({
              latitude: lat.toString(),
              longitude: lng.toString(),
            })
          );
        }
      },
    }),
    [dispatch]
  );
  const location: LatLngExpression = {
    lat: Number(props.coordinates.latitude),
    lng: Number(props.coordinates.longitude),
  };
  return (
    <Marker
      ref={markerRef}
      icon={ICON}
      position={location}
      draggable
      eventHandlers={eventHandlers}
    />
  );
}
