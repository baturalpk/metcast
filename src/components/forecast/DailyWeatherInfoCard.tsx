import { WeatherDescription } from '@/utils/weather';

export interface DailyWeatherInfoCardProps {
  time: Date;
  dominantStatus: WeatherDescription;
  maxTemp: number;
  minTemp: number;
  maxApparentTemp: number;
  minApparentTemp: number;
  meanPrecProb: number;
  maxWindspeed: number;
  temperatureUnit: string;
  speedUnit: string;
  precipitationUnit: string;
}

function DailyWeatherInfoCard(props: DailyWeatherInfoCardProps) {
  return (
    <div
      className="mx-auto flex flex-col justify-center items-center w-full md:w-[70%] xl:w-full
        rounded-lg border-2 border-neutral-dark dark:border-neutral
        py-6 sm:p-4 text-xs sm:text-sm 2xl:text-md
        transition
        hover:bg-neutral-dark hover:dark:bg-neutral hover:text-neutral hover:dark:text-neutral-dark"
    >
      <p>{props.time.toDateString()}</p>
      <b className="pb-4 text-base">
        {WeatherDescription[props.dominantStatus]}
      </b>
      <p></p>
      <table className="w-[65%] text-left">
        <tbody>
          <tr>
            <th className="pr-4">🌡️</th>
            <td className="text-right">
              <p>
                {props.maxTemp}
                {props.temperatureUnit} / {props.minTemp}
                {props.temperatureUnit}
              </p>
            </td>
          </tr>
          <tr>
            <th className="pr-4">🤒</th>
            <td className="text-right">
              <p>
                {props.maxApparentTemp}
                {props.temperatureUnit} / {props.minApparentTemp}
                {props.temperatureUnit}
              </p>
              <p></p>
            </td>
          </tr>
          <tr>
            <th className="pr-8">☔</th>
            <td className="text-right">
              {props.meanPrecProb}
              {props.precipitationUnit}
            </td>
          </tr>
          <tr>
            <th className="pr-8">💨</th>
            <td className="text-right">
              {props.maxWindspeed} {props.speedUnit}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DailyWeatherInfoCard;
