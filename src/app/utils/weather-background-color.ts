import { Forecast } from "../model";

export function weatherBackgroundColor(weather: Forecast["main"]) {
  switch (weather) {
    case "Clear": {
      return "blue";
    }
    case "Clouds": {
      return "purple";
    }
    case "Rain": {
      return "red";
    }
    case "Snow": {
      return "lightgray";
    }
    default: {
      return "black";
    }
  }
}
