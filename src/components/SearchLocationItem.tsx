import { GeoSearchResult } from '@/api/geocoding';
import Link from 'next/link';

export interface SearchLocationItemProps {
  data: GeoSearchResult;
}

function SearchLocationItem({
  data: { name, latitude, longitude },
}: SearchLocationItemProps) {
  return (
    <Link href={`/forecast/${name}?lat=${latitude}&long=${longitude}`}>
      <li
        className="mt-2 mb-2 p-4 transition hover:scale-[.975]
          font-bold text-neutral dark:text-neutral-dark 
          rounded bg-neutral-dark dark:bg-neutral"
      >
        {name} {'>'} {latitude}, {longitude}
      </li>
    </Link>
  );
}

export default SearchLocationItem;
