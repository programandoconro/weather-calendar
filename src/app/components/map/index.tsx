import { useState } from "react";
import styles from "./map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };

  const ToggleButton = () => (
    <button onClick={handleToggleButton}>{isOpen ? "X" : "Map"}</button>
  );
  function OpenStreetMap() {
    return (
      <div className={styles.container}>
        <ToggleButton />
        <div className="flex justify-center w-full overflow-hidden">
          <MapContainer
            center={[35.717125, 139.427917]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[35.717125, 139.427917]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  }

  return <>{isOpen ? <OpenStreetMap /> : <ToggleButton />}</>;
};
