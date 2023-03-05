export enum WeatherDescription {
  ClearSky,
  Cloudy,
  Foggy,
  Rainy,
  Snowy,
  Thunderstorm,
}

export function InterpretWeatherCode(wmoCode: number): WeatherDescription {
  if ([1, 2, 3].includes(wmoCode)) {
    return WeatherDescription.Cloudy;
  }
  if ([45, 48].includes(wmoCode)) {
    return WeatherDescription.Foggy;
  }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(wmoCode)) {
    return WeatherDescription.Rainy;
  }
  if ([71, 73, 75, 77, 85, 86].includes(wmoCode)) {
    return WeatherDescription.Snowy;
  }
  if ([95, 96, 99].includes(wmoCode)) {
    return WeatherDescription.Thunderstorm;
  }
  return WeatherDescription.ClearSky;
}
