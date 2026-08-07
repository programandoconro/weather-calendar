"use client";
import store from "@/app/store";
import { Provider } from "react-redux";
import ErrorBoundary from "../error-boundary";
import { Calendar } from "./calendar";
import { CurrentWeather, Location, WeatherForecast } from "@/app/model";

export default function CalendarContainer(props: {
  initialForecast: WeatherForecast[];
  initialCurrentWeather: CurrentWeather;
  initialLocation: Location;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Calendar {...props} />
      </Provider>
    </ErrorBoundary>
  );
}
