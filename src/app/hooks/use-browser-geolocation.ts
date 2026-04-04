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
      alert(
        "位置情報の取得は問題がありました。東京の位置情報を使います。There was an error getting the coordinates, Tokyo geolocation will be used"
      );
    }
  };

  const errorCallback = (error: GeolocationPositionError) => {
    if (error.PERMISSION_DENIED) {
      alert(
        error.message +
          " 位置情報を有効にしてください。東京の位置情報を使います。"
      );
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
