import { useMemo, useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

const ICON = L.icon({
  iconUrl: "/location-icon.png",
  iconSize: [50, 50],
});

export function LocationMarker(props: {
  location: LatLngExpression;
  setLocation: (l: LatLngExpression) => void;
}) {
  const { location, setLocation } = props;
  const map = useMapEvents({
    click(e) {
      map.locate();
      setLocation(e.latlng);
    },
  });
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLocation(marker.getLatLng());
        }
      },
    }),
    [setLocation]
  );
  return location === null ? null : (
    <Marker
      ref={markerRef}
      icon={ICON}
      position={location}
      draggable
      eventHandlers={eventHandlers}
    ></Marker>
  );
}
