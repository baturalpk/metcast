import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import {
  ErrorResponse,
  GetDailyForecastDataFor,
  GetTodaysHourlyForecastDataFor,
} from './forecast';

describe('api/forecast', () => {
  it('GetDailyForecastDataFor (Istanbul Airport, last 5 days)', async () => {
    const today = dayjs();
    const dateUntil = today.add(5, 'days').toDate();

    try {
      const { status } = await GetDailyForecastDataFor(
        41.2629,
        28.74242,
        today.toDate(),
        dateUntil
      );
      expect(status).toBe(200);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.debug('Reason:', err.response?.data.reason);
      throw error;
    }
  });

  it('GetTodaysHourlyForecastDataFor (Istanbul Airport, hourly)', async () => {
    try {
      const { status } = await GetTodaysHourlyForecastDataFor(
        41.2629,
        28.74242
      );
      expect(status).toBe(200);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.debug('ErrorReason:', err.response?.data.reason);
      throw error;
    }
  });
});

export {};
