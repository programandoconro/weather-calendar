"use client";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import store from "../store";
import ErrorBoundary from "../components/error-boundary";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "../ui/spinner";

const MapPage = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../components/map").then((module) => module.Map), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    []
  );
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Map />
      </Provider>
    </ErrorBoundary>
  );
};

export default MapPage;
