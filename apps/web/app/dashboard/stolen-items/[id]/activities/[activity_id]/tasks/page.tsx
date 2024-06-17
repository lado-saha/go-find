import Pagination from '@/app/ui/common/pagination';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchTasksPages } from '@/app/lib/data';

import { headers } from 'next/headers';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { activitiesPath, sitesPath, tasksPath } from '@/app/lib/utils';
import TaskTable from '@/app/ui/tasks/table';
import { CreateTaskButton } from '@/app/ui/tasks/buttons';
export const metadata: Metadata = {
  title: 'Tasks',
};
export default async function Page({
  searchParams,
  params,
}: {
  params: {
    id: number;
    activity_id: number;
    task_id: number;
  };
  searchParams: {
    id: number;
    activity_id: number;
    task_id: number;
    query?: string;
    page?: string;
  };
}) {
  const siteId = params.id;
  const activityId = params.activity_id;

  const query = searchParams.query || '';
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = await fetchTasksPages(query, activityId);
  console.log('Totla page= ' + totalPages);

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
            },
            {
              label: 'Tasks',
              href: tasksPath(siteId, activityId),
              active: true,
            },
          ]}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search tasks..." />
        <CreateTaskButton siteId={siteId} activityId={activityId} />
      </div>

      {/* Shows the activities loading */}
      <Suspense key={query + currentPage}>
        <TaskTable
          query={query}
          activityId={activityId}
          currentPage={currentPage}
          siteId={siteId}
        />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
