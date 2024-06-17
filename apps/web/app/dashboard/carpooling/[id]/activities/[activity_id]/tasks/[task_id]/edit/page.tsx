import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchTaskById, fetchWorkers } from '@/app/lib/data';
import NotFound from './not-found';
import { headers } from 'next/headers';
import { tasksPath } from '@/app/lib/utils';
import EditTaskForm from '@/app/ui/tasks/edit-form';

export default async function Page({
  params,
}: {
  params: { task_id: number; activity_id: number; id: number };
}) {
  const siteId = params.id;
  const activityId = params.activity_id;
  const allworkers = await fetchWorkers();

  const id = params.task_id;
  const [task] = await Promise.all([fetchTaskById(id, activityId)]);
  if (!task || !allworkers) {
    // this a fallback that will call the not-found.tsx file found in the path
    return NotFound({ siteId: siteId, activityId: activityId });
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Tasks',
            href: tasksPath(siteId, activityId),
          },
          {
            label: 'Edit Tasks',
            href: `${tasksPath(siteId, activityId)}/edit/${id}`,
            active: true,
          },
        ]}
      />
      <EditTaskForm
        allworkers={allworkers}
        activityId={activityId}
        siteId={siteId}
        oldTask={task}
      />
    </main>
  );
}
