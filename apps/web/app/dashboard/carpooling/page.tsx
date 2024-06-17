import Pagination from '@/app/ui/common/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/stolen-items/table';
import { DeclareStolenItem } from '@/app/ui/stolen-items/buttons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchStolenItemsPages } from '@/app/lib/data';


export const metadata: Metadata = {
  title: 'Stolen Items',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sortBy?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy || '';
  const totalPages = await fetchStolenItemsPages(query);

  const sortingOptions = [
    { value: 'oldest', label: 'Oldest' },
    { value: 'newest', label: 'Newest' },
  ];

  const fields = [
    { name: 'location', placeholder: 'Location' },
    {
      name: 'destination',
      placeholder: 'Destination',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Stolen Items</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search sortOptions={sortingOptions} fields={fields} />
        <DeclareStolenItem />
      </div>

      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
