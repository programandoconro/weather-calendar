export type WeatherForecast = {
  dt_txt: string;
  main: { temp: string };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}[];

export type Forecast = {
  dt_txt: Date;
  temp: string;
  icon: string;
  wind: number;
  description: string;
  main: string;
};

export type CurrentWeather = {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
};

export type Hours = number;
