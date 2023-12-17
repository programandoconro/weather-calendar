import { Forecast } from "../model";

export function weatherBackgroundColor(weather: Forecast["main"]) {
  switch (weather) {
    case "Clear": {
      return "blue";
    }
    case "Clouds": {
      return "gray";
    }
    case "Rain": {
      return "purple";
    }
    case "Snow": {
      return "lightgray";
    }
    default: {
      return "black";
    }
  }
}
