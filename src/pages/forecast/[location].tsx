import { useRouter } from 'next/router';

function Forecast() {
  const router = useRouter();
  const { location, lat, long } = router.query;

  return (
    <>
      Location: {location}
      <br />
      Lat: {lat} {'<>'} Long: {long}
    </>
  );
}

export default Forecast;
