import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchWorkers } from '@/app/lib/data';
import { headers } from 'next/headers';
import { tasksPath } from '@/app/lib/utils';
import CreateTaskForm from '@/app/ui/tasks/create-form';
import Error from '../error';

export default async function Page({
  params,
}: {
  params: { task_id: number; activity_id: number; id: number };
}) {
  const siteId = params.id;
  const activityId = params.activity_id;
  const allWorkers = await fetchWorkers();
  if (!allWorkers) {
    throw EvalError;
  }

  return (
    <main>
      {/* The breadcrumps helps the user see his current location. sites/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: tasksPath(siteId, activityId) },
          {
            label: 'Add a Task',
            href: `${tasksPath(siteId, activityId)}/create`,
            active: true,
          },
        ]}
      />
      <CreateTaskForm
        allworkers={allWorkers}
        activityId={activityId}
        siteId={siteId}
      />
    </main>
  );
}
