import { GetDailyForecastDataFor } from '@/api/forecast';
import { context } from './ForecastRoot';
import dayjs from 'dayjs';
import { FC, PropsWithChildren, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import CurrentWeatherIcon from './CurrentWeatherIcon';
import { InterpretWeatherCode } from '@/utils/weather';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import DailyWeatherInfoCard from './DailyWeatherInfoCard';

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="container mx-auto w-[90%] sm:w-[65%] my-4 p-4 border-4 rounded-2xl">
    {children}
  </div>
);

function ForecastDaily() {
  const { latitude, longitude } = useContext(context);

  const dateFrom = dayjs();
  const dateUntil = dateFrom.add(5, 'days');
  const {
    data: response,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ['forecast-details-daily', { latitude, longitude }],
    () =>
      GetDailyForecastDataFor(
        latitude,
        longitude,
        dateFrom.toDate(),
        dateUntil.toDate()
      ),
    { refetchOnWindowFocus: false }
  );

  if (isFetching) {
    return (
      <Container>
        <ArrowPathIcon className="animate-spin w-32 h-32 mx-auto" />
      </Container>
    );
  }

  if (isError || !response?.data) {
    return (
      <Container>
        <p>An error has occurred!</p>
        <button
          className="mt-4 px-4 py-2 rounded-lg bg-primary dark:bg-primary-dark hover:scale-90 transition ease-in"
          onClick={() => refetch()}
        >
          Try Again
        </button>
      </Container>
    );
  }

  const { current_weather, daily_units, daily } = response.data;
  const weatherStatus = InterpretWeatherCode(
    response.data.current_weather.weathercode
  );

  return (
    <Container>
      <div className="flex flex-col items-center justify-evenly md:flex-row">
        <CurrentWeatherIcon
          className="w-32 p-2 flex-none motion-safe:animate-updown hover:animate-[spin_0.5s]"
          status={weatherStatus}
        />
        <CurrentWeatherDetails
          status={weatherStatus}
          conditions={current_weather}
          precipitationUnit={daily_units.precipitation_probability_max}
          speedUnit={daily_units.windspeed_10m_max}
          temperatureUnit={daily_units.temperature_2m_max}
        />
      </div>
      <div className="grid grid-cols-1 justify-center xl:grid-cols-2 2xl:grid-cols-3 gap-4 m-4">
        {daily.time.map((v, i) => (
          <DailyWeatherInfoCard
            key={i}
            time={new Date(v)}
            dominantStatus={InterpretWeatherCode(daily.weathercode[i])}
            maxTemp={daily.temperature_2m_max[i]}
            minTemp={daily.temperature_2m_min[i]}
            maxApparentTemp={daily.apparent_temperature_max[i]}
            minApparentTemp={daily.apparent_temperature_min[i]}
            meanPrecProb={daily.precipitation_probability_mean[i]}
            maxWindspeed={daily.windspeed_10m_max[i]}
            temperatureUnit={daily_units.temperature_2m_max}
            speedUnit={daily_units.windspeed_10m_max}
            precipitationUnit={daily_units.precipitation_probability_max}
          />
        ))}
      </div>
    </Container>
  );
}

export default ForecastDaily;
