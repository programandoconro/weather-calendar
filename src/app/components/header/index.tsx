import { Button } from "@/app/ui/button";
import { useLocationUpdate } from "./use-location-update";
import style from "./header.module.css";
import { useContext, useState } from "react";
import { LocationContext } from "@/app/store/location-context";
import { Popup } from "@/app/ui/popup";

export const Header = () => {
  const { onClick, isLoading } = useLocationUpdate(true);
  const { askForLocationPermission } = useLocationUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const { location: contextLocation } = useContext(LocationContext);
  const handleToggleButton = () => {
    if (!contextLocation.latitude || !contextLocation.longitude) {
      askForLocationPermission();
      return;
    }
    setIsOpen(!isOpen);
  };
  return (
    <header className={style.container}>
      <>
        <Popup content="現在の位置情報を更新したいですか？" position="right">
          <Button
            isLoading={isLoading}
            onClick={onClick}
            imageProps={{
              width: 35,
              height: 35,
              src: "/geolocation.png",
              alt: "Update geolocation",
              priority: true,
            }}
          />
        </Popup>
      </>

      <Popup content="Open Map" position="left">
        <Button
          imageProps={{
            src: "/location-icon.png",
            width: 35,
            height: 35,
            alt: "Open Map",
            priority: true,
          }}
          onClick={handleToggleButton}
        />
      </Popup>
    </header>
  );
};
