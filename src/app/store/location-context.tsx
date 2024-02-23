import { createContext, useState } from "react";
import { Location } from "../model";

const initalState: Location = {
  location: {
    latitude: process.env.LAT || "",
    longitude: process.env.LON || "",
  },
  setLocation: (lat: string, lon: string) => null,
};
export const LocationContext = createContext<Location>(initalState);

export default function useLocationContext(): Location {
  const [location, setLocation] = useState(initalState.location);

  const onLocationChange = (latitude: string, longitude: string) => {
    setLocation({ latitude, longitude });
  };

  return { location, setLocation: onLocationChange };
}
