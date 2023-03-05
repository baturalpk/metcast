import { WeatherDescription } from '@/utils/weather';

export interface CurrentWeatherIconProps {
  className?: string;
  status: WeatherDescription | undefined;
}

function CurrentWeatherIcon({ className, status }: CurrentWeatherIconProps) {
  let linkToResource = '/weather/';

  switch (status) {
    case WeatherDescription.ClearSky:
      linkToResource += 'sun.svg';
      break;
    case WeatherDescription.Cloudy:
      linkToResource += 'cloud.svg';
      break;
    case WeatherDescription.Foggy:
      linkToResource += 'fog.svg';
      break;
    case WeatherDescription.Rainy:
      linkToResource += 'rain.svg';
      break;
    case WeatherDescription.Snowy:
      linkToResource += 'snow.svg';
      break;
    case WeatherDescription.Thunderstorm:
      linkToResource += 'thunder.svg';
      break;
    default:
      linkToResource += 'unknown.svg';
      break;
  }

  return (
    <svg className={className}>
      <use href={linkToResource + '#root'}></use>
    </svg>
  );
}

export default CurrentWeatherIcon;
