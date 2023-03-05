import { useRouter } from 'next/router';
import Link from 'next/link';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ForecastRoot from '@/components/forecast/ForecastRoot';
import isString from 'lodash.isstring';

function Forecast() {
  const router = useRouter();
  const { location, lat, long } = router.query;

  if (!isString(location) || !isString(lat) || !isString(long)) {
    return (
      <div className="m-0 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2">
        <p>Missing and/or invalid parameters.</p>
        <Link href="/">Return Home</Link>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <ForecastRoot locationName={location} latitude={lat} longitude={long} />
    </DefaultLayout>
  );
}

export default Forecast;
