import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from '@/api/geocoding';
import { useDebounce } from 'use-debounce';
import SearchLocationItem from './SearchLocationItem';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

function SearchLocation() {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 300);
  const { data, isFetching, isFetched } = useQuery(
    ['search-location', debouncedKeyword],
    () => Search(debouncedKeyword),
    { enabled: debouncedKeyword.length >= 2 }
  );

  return (
    <div className="container mt-[7.5%] max-w-[80%]">
      <input
        className="p-4 w-full rounded 2xl:rounded-lg"
        type="text"
        placeholder="Search Location"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />

      <div className="p-4 text-center">
        {isFetching && (
          <ArrowPathIcon className="animate-spin mx-auto text-neutral-dark dark:text-neutral h-7 w-7 2xl:h-10 xl:w-10" />
        )}

        {!isFetching && isFetched && <p className="animate-bounce">👇🏼</p>}
      </div>

      <ul className="text-left">
        {(data ?? []).map(loc => (
          <SearchLocationItem key={loc.id} data={loc} />
        ))}
      </ul>
    </div>
  );
}

export default SearchLocation;
