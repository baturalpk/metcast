import CurrentWeatherIcon from '@/components/forecast/CurrentWeatherIcon';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import SearchLocation from '@/components/SearchLocation';
import { WeatherDescription } from '@/utils/weather';

function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center max-w-screen text-center">
        <div className="h-[10vw] w-[10vw] max-h-[7rem] max-w-[7rem] relative mt-[25%] lg:mt-[7.5%]">
          <CurrentWeatherIcon
            className="h-full w-full motion-safe:animate-leftright-full"
            status={WeatherDescription.Thunderstorm}
          />
        </div>
        <h1 className="text-7xl sm:text-8xl md:text-9xl mb-[5%]">
          metcast
          <span className="text-primary dark:text-primary-dark">.</span>
        </h1>
        <SearchLocation />
      </div>
    </DefaultLayout>
  );
}

export default Home;
