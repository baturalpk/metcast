import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/',
});

const extractISODateString = (date: Date) => date.toISOString().split('T')[0];

export interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_probability_max: number[];
  precipitation_probability_mean: number[];
  windspeed_10m_max: number[];
  weathercode: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  precipitation_probability_max: string;
  precipitation_probability_min: string;
  precipitation_probability_mean: string;
  windspeed_10m_max: string;
  weathercode: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
}

export interface DailyForecastResponse {
  readonly latitude: number;
  readonly longitude: number;
  readonly elevation: number;
  readonly utc_offset_seconds: number;
  readonly timezone: string;
  readonly timezone_abbreviation: string;
  readonly daily: Daily;
  readonly daily_units: DailyUnits;
  readonly current_weather: CurrentWeather;
}

export async function GetDailyForecastDataFor(
  latitude: string | number,
  longitude: string | number,
  startDate: Date,
  endDate: Date,
  tz?: string
): Promise<AxiosResponse<DailyForecastResponse>> {
  const resp = await client.get<DailyForecastResponse>('/forecast', {
    params: {
      latitude,
      longitude,
      timezone: tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      start_date: extractISODateString(startDate),
      end_date: extractISODateString(endDate),
      current_weather: true,
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'precipitation_probability_max',
        'precipitation_probability_min',
        'precipitation_probability_mean',
        'windspeed_10m_max',
        'weathercode',
      ],
    },
  });
  return resp;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  apparent_temperature: number[];
  cloudcover: number[];
  windspeed_10m: number[];
  winddirection_10m: number[];
  windgusts_10m: number[];
  precipitation_probability: number[];
  weathercode: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  apparent_temperature: string;
  cloudcover: string;
  windspeed_10m: string;
  winddirection_10m: string;
  windgusts_10m: string;
  precipitation_probability: string;
  weathercode: string;
}

export interface HourlyForecastResponse {
  readonly latitude: number;
  readonly longitude: number;
  readonly elevation: number;
  readonly utc_offset_seconds: number;
  readonly timezone: string;
  readonly timezone_abbreviation: string;
  readonly hourly: Hourly;
  readonly hourly_units: HourlyUnits;
}

export async function GetTodaysHourlyForecastDataFor(
  latitude: string | number,
  longitude: string | number,
  tz?: string
): Promise<AxiosResponse<HourlyForecastResponse>> {
  const today = extractISODateString(new Date());
  const resp = await client.get<HourlyForecastResponse>('/forecast', {
    params: {
      latitude,
      longitude,
      timezone: tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      current_weather: false,
      start_date: today,
      end_date: today,
      hourly: [
        'temperature_2m',
        'relativehumidity_2m',
        'apparent_temperature',
        'cloudcover',
        'windspeed_10m',
        'winddirection_10m',
        'windgusts_10m',
        'precipitation_probability',
        'weathercode',
      ],
    },
  });
  return resp;
}

export interface ErrorResponse {
  error: boolean;
  reason: string;
}
