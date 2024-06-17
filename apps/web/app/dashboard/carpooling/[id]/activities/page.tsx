import Pagination from '@/app/ui/common/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/activities/table';
import { CreateActivity } from '@/app/ui/activities/buttons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchActivitiesPages } from '@/app/lib/data';
// import { usePathname } from 'next/navigation';

import { headers } from 'next/headers';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { activitiesPath, sitesPath } from '@/app/lib/utils';
export const metadata: Metadata = {
  title: 'Activities',
};

export default async function Page({
  searchParams,
  params,
}: {
  params: { id: number };
  searchParams?: {
    id: string;
    query?: string;
    page?: string;
  };
}) {
  const siteId = params.id;

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchActivitiesPages(query, siteId);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* The breadcrumps helps the user see his current location. sites/Create Invoice  */}
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'Sites',
              href: sitesPath(),
            },
            {
              label: 'Activities',
              href: activitiesPath(siteId),
              active: true,
            },
          ]}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search activities..." />
        <CreateActivity siteId={siteId} />
      </div>

      {/* Shows the activities loading */}
      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} siteId={siteId} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
