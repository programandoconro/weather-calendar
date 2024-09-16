import store from "@/app/store";
import { setCoordinates } from "@/app/store/reducers/coordinates";

export const useBrowserGeolocation = () => {
  const successCallback = (loc: GeolocationPosition) => {
    const { latitude, longitude } = loc.coords;
    if (latitude && longitude) {
      store.dispatch(
        setCoordinates({
          latitude: String(latitude),
          longitude: String(longitude),
        })
      );
    } else {
      alert("位置情報の取得は問題がありました。");
    }
  };

  const errorCallback = (error: GeolocationPositionError) => {
    if (error.PERMISSION_DENIED) {
      alert(error.message + " 位置情報を有効にしてください");
    }
  };

  function getUserCurrentPosition() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      maximumAge: 60000,
    });
  }

  return {
    getUserCurrentPosition,
  };
};
