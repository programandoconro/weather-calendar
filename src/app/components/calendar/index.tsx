"use client";
import store from "@/app/store";
import { Provider } from "react-redux";
import ErrorBoundary from "../error-boundary";
import { Calendar } from "./calendar";
import { CurrentWeather, WeatherForecast } from "@/app/model";

export default function CalendarContainer(props: {
  initialForecast: WeatherForecast[];
  initialCurrentWeather: CurrentWeather;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Calendar {...props} />
      </Provider>
    </ErrorBoundary>
  );
}
