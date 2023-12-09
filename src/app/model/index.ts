export type Weather = {
  dt_txt: string;
  main: { temp: string };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}[];

export type Block = {
  dt_txt: Date;
  temp: string;
  icon: string;
  wind: number;
  description: string;
};
