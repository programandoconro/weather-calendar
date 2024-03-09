import { CSSProperties } from "react";
import { Forecast } from "../model";

export function weatherBackgroundColor(
  weather: Forecast["main"]
): CSSProperties["color"] {
  switch (weather) {
    case "Clear": {
      return "#345693"; // Dark Blue
    }
    case "Clouds": {
      return "#444444"; // Dark Gray
    }
    case "Rain": {
      return "#1F2F3F"; // Dark Slate Blue
    }
    case "Snow": {
      return "#36454F"; // Darker Slate Gray
    }
    case "Thunderstorm": {
      return "#1A2A3A"; // Very Dark Slate Blue
    }
    case "Mist": {
      return "#2F2F2F"; // Darker Gray
    }
    case "Shower Rain": {
      return "#293742"; // Very Dark Blue
    }
    case "Few Clouds": {
      return "#3C3C3C"; // Slightly Darker Gray
    }
    case "Scattered Clouds": {
      return "#2E2E2E"; // Darker Gray
    }
    default: {
      return "black"; // Default Color
    }
  }
}
