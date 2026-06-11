import { bounds } from "leaflet";
import { z } from "zod";

export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
export const weatherForecastSchema = z.array(
  z.object({
    dt_txt: z.string(),
    main: z.object({
      temp: z.number(),
      feels_like: z.number(),
      humidity: z.number(),
    }),
    weather: z.array(
      z.object({
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
    wind: z.object({
      speed: z.number(),
    }),
    rain: z.object({ "3h": z.number() }).optional(),
    pop: z.number().optional(),
  })
);

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;
export const currentWeatherSchema = z.object({
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
  }),
  rain: z.object({ "1h": z.number() }).optional(),
});

export type Forecast = {
  dt_txt: Date;
  temp: number;
  icon: string;
  wind: number;
  description: string;
  main: string;
  rain?: number;
  pop?: number;
  feelsLike: number;
  humidity: number;
};

export type Hours = number;

export type LocationState = {
  location: Location;
  setLocation: (lat: string, lon: string) => void;
};

export type Location = {
  latitude: string;
  longitude: string;
};
