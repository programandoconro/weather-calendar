import { createContext, useState } from "react";
import { LocationState } from "../model";

const initalState: LocationState = {
  location: {
    latitude: process.env.LAT as string,
    longitude: process.env.LON as string,
  },
  setLocation: (_lat: string, _lon: string) => null,
};
export const LocationContext = createContext<LocationState>(initalState);

export default function useLocationContext(): LocationState {
  const [location, setLocation] = useState(initalState.location);

  const onLocationChange = (latitude: string, longitude: string) => {
    setLocation({ latitude, longitude });
  };

  return { location, setLocation: onLocationChange };
}
