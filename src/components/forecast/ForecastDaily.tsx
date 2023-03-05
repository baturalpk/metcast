import { GetDailyForecastDataFor } from '@/api/forecast';
import { context } from './ForecastRoot';
import dayjs from 'dayjs';
import { FC, PropsWithChildren, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import CurrentWeatherIcon from './CurrentWeatherIcon';
import { InterpretWeatherCode } from '@/utils/weather';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import CurrentWeatherDetails from './CurrentWeatherDetails';

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="container mx-auto w-[65%] my-4 p-4 border-4 rounded-2xl">
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

  const { current_weather, daily_units } = response.data;
  const weatherStatus = InterpretWeatherCode(
    response.data.current_weather.weathercode
  );

  return (
    <Container>
      <div className="flex flex-col items-center justify-evenly md:flex-row">
        <CurrentWeatherIcon
          className="w-32 p-2 flex-none motion-safe:animate-updown"
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
      <div className="">{'TODO: 5 days summary'}</div>
    </Container>
  );
}

export default ForecastDaily;
