import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import Form from '@/app/ui/activities/create-form';
import { headers } from 'next/headers';
import { activitiesPath } from '@/app/lib/utils';

export default async function Page({ params }: { params: { id: number } }) {
  const siteId = params.id;
  return (
    <main>
      {/* The breadcrumps helps the user see his current location. sites/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Activity', href: activitiesPath(siteId) },
          {
            label: 'Add an Activity',
            href: `${activitiesPath(siteId)}/create`,
            active: true,
          },
        ]}
      />
      <Form siteId={siteId} />
    </main>
  );
}
