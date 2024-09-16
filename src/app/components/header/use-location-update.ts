import { LocationContext } from "@/app/store/location-context";
import { useContext, useState } from "react";

export const useLocationUpdate = (showSuccessMessage?: boolean) => {
  const { setLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);

  const successCallback = (loc: GeolocationPosition) => {
    const { latitude, longitude } = loc.coords;
    if (latitude && longitude) {
      setLocation(String(latitude), String(longitude));
      showSuccessMessage &&
        alert(
          `位置情報は更新されました。緯度は：${latitude}です。軽度は：${longitude}です。`
        );
    } else {
      alert("位置情報の取得は問題がありました。");
    }
    setIsLoading(false);
  };

  const errorCallback = (error: GeolocationPositionError) => {
    if (error.PERMISSION_DENIED) {
      alert(error.message + " 位置情報を有効にしてください");
      setIsLoading(false);
    }
  };

  function askForLocationPermission() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      maximumAge: 60000,
    });
  }

  function onClick() {
    setIsLoading(true);
    askForLocationPermission();
  }

  return {
    isLoading,
    setIsLoading,
    onClick,
    askForLocationPermission,
  };
};
