export type Weather = {
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
