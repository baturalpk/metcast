import { GeoSearchResult } from '@/api/geocoding';
import Link from 'next/link';

export interface SearchLocationItemProps {
  data: GeoSearchResult;
}

function SearchLocationItem({
  data: { name, latitude, longitude, country, country_code },
}: SearchLocationItemProps) {
  return (
    <Link
      className="no-underline"
      href={`/forecast/${name}?lat=${latitude}&long=${longitude}`}
    >
      <li
        className="mb-3 px-6 py-4 transition hover:scale-[.975]
          font-bold text-neutral dark:text-neutral-dark 
          rounded 2xl:rounded-lg bg-neutral-dark dark:bg-neutral"
      >
        {name}, {country}({country_code}) {'@'} [{latitude}, {longitude}]
      </li>
    </Link>
  );
}

export default SearchLocationItem;
