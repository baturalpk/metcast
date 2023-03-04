import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1/',
});

export interface GeoSearchResult {
  readonly id: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly country: string;
  readonly country_code: string;
}

export interface SearchResponse {
  readonly results: GeoSearchResult[];
}

export async function Search(
  keyword: string,
  count?: number
): Promise<AxiosResponse<SearchResponse>> {
  const resp = await client.get<SearchResponse>('/search', {
    params: {
      name: keyword,
      count: count ?? 5,
    },
  });
  return resp;
}

export interface ErrorResponse {
  error: boolean;
  reason: string;
}
