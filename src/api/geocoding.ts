import axios from 'axios';

const client = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1/',
});

export interface GeoSearchResult {
  readonly id: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
}

export async function Search(keyword: string): Promise<GeoSearchResult[]> {
  const { data } = await client.get('/search', {
    params: {
      name: keyword,
      count: 5,
    },
  });
  return data.results as GeoSearchResult[];
}
