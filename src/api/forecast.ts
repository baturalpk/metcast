import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/',
});

export interface DailyForecastResponse {
  readonly latitude: number;
  readonly longitude: number;
  readonly elevation: string;
  readonly utc_offset_seconds: string;
  readonly timezone: string;
  readonly timezone_abbreviation: string;
  readonly daily: string;
  readonly daily_units: string;
  readonly current_weather: string;
}

const extractISODateString = (date: Date) => date.toISOString().split('T')[0];

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
        'weathercode',
      ],
    },
  });
  return resp;
}

export interface HourlyForecastResponse {
  readonly latitude: number;
  readonly longitude: number;
  readonly elevation: string;
  readonly utc_offset_seconds: string;
  readonly timezone: string;
  readonly timezone_abbreviation: string;
  readonly hourly: string;
  readonly hourly_units: string;
  readonly current_weather: string;
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
      current_weather: true,
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
