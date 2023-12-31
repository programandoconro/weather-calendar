import { CSSProperties } from "react";
import { Forecast } from "../model";

export function weatherBackgroundColor(
  weather: Forecast["main"]
): CSSProperties["color"] {
  switch (weather) {
    case "Clear": {
      return "#444499";
    }
    case "Clouds": {
      return "#444";
    }
    case "Rain": {
      return "#222";
    }
    case "Snow": {
      return "gray";
    }
    default: {
      return "darkred";
    }
  }
}
