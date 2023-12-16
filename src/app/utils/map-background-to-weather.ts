import { Forecast } from "../model";

export function mapBackgroundToWeather(weather: Forecast["main"]) {
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
      return "black";
    }
    default: {
      return "gray";
    }
  }
}
