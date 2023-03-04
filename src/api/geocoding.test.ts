import { AxiosError } from 'axios';
import { ErrorResponse, Search } from './geocoding';

describe('api/geocoding', () => {
  it('Search for (Istanbul)', async () => {
    const keyword = 'Istanbul';
    const count = 5;
    try {
      const { data, status } = await Search(keyword, count);
      expect(status).toBe(200);

      const { results } = data;
      expect(results.length).toBeLessThanOrEqual(count);
      for (const loc of results) {
        expect(Object.values(loc).every(v => !!v)).toBeTruthy();
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.debug('ErrorReason:', err.response?.data.reason);
      throw error;
    }
  });
});

export {};
