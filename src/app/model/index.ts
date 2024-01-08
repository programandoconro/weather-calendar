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

export type Time = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_offset: number;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string; // "2024-01-07T23:47:06.651110+00:00";
  utc_offset: string; // "+09:00";
  week_number: number;
};
