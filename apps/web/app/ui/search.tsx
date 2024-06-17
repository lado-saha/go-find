'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface SearchProps {
  sortOptions: { value: string; label: string }[];
  fields: { name: string; placeholder: string }[];
}

export default function Search({
  sortOptions: sortingOptions,
  fields,
}: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [sort, setSort] = useState(
    searchParams.get('sort') || sortingOptions[0]?.value,
  );

  const handleSearch = useDebouncedCallback(
    (term: string, fieldName: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (term) {
        params.set(fieldName, term);
      } else {
        params.delete(fieldName);
      }
      if (sort) {
        params.set('sort', sort);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  const handleSortChange = (e: { target: { value: any } }) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (searchParams.get('query')) {
      params.set('query', searchParams.get('query') || '');
    }
    if (selectedSort) {
      params.set('sort', selectedSort);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0 gap-4">
      {fields.map(({ name, placeholder }) => (
        <div key={name} className="relative flex-1 flex-shrink-0">
          <label htmlFor={name} className="sr-only">
            {placeholder}
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => handleSearch(e.target.value, name)}
            defaultValue={searchParams.get(name)?.toString() || ''}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      ))}
      <div className="relative flex-shrink-0">
        <select
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          value={sort}
          onChange={handleSortChange}
        >
          {sortingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FunnelIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    </div>
  );
}
