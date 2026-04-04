"use client";
import { useEffect, useMemo, useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../../store/reducers/coordinates";
import { Location } from "../../model";
import { RootState } from "@/app/store";
import { toastError, toastSuccess } from "./toast-messages";

const ICON = L.icon({
  iconUrl: "/location-icon.png",
  iconSize: [50, 50],
});

export function LocationMarker(props: { coordinates: Location }) {
  const dispatch = useDispatch();
  const coordinates = useSelector((state: RootState) => state.coordinates);
  const map = useMapEvents({
    click(e) {
      handleClick(e);
    },
  });

  useEffect(() => {
    map.setView([Number(coordinates.latitude), Number(coordinates.longitude)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const handleClick = (e: L.LeafletMouseEvent) => {
    map.locate();
    if (e.latlng.lat && e.latlng.lng) {
      dispatch(
        setCoordinates({
          latitude: e.latlng.lat.toString(),
          longitude: e.latlng.lng.toString(),
        })
      );
      toastSuccess({
        latitude: e.latlng.lat.toFixed(8),
        longitude: e.latlng.lng.toFixed(8),
      });
    } else {
      toastError();
    }
  };

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
          toastSuccess({ latitude: lat.toFixed(8), longitude: lng.toFixed(8) });
        } else {
          toastError();
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
