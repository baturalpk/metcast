import { CurrentWeather } from '@/api/forecast';
import { WeatherDescription } from '@/utils/weather';

export interface CurrentWeatherDetailsProps {
  status: WeatherDescription;
  conditions: CurrentWeather;
  temperatureUnit: string;
  speedUnit: string;
  precipitationUnit: string;
}

function ForecastDetails(props: CurrentWeatherDetailsProps) {
  const { conditions } = props;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 py-6 text-left">
      <p className="font-bold text-primary dark:text-primary-dark">
        {WeatherDescription[props.status]}
      </p>
      <p className="">
        <b>Temperature: </b>
        {conditions.temperature}
        {props.temperatureUnit}
      </p>
      <p>
        <b>Wind Direction: </b>
        {conditions.winddirection}
        {'°'}
      </p>
      <p>
        <b>Wind Speed: </b>
        {conditions.windspeed} {props.speedUnit}
      </p>
    </div>
  );
}

export default ForecastDetails;
