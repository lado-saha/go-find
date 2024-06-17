import Form from '@/app/ui/activities/edit-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { notFound, usePathname, useRouter } from 'next/navigation';
import { fetchActivityById } from '@/app/lib/data';
import NotFound from './not-found';
import { headers } from 'next/headers';
import { activitiesPath } from '@/app/lib/utils';

export default async function Page({
  params,
}: {
  params: { activity_id: number; id: number };
}) {
  const siteId = params.id;
  const id = params.activity_id;
  const [activity] = await Promise.all([fetchActivityById(id, siteId)]);
  if (!activity) {
    // this a fallback that will call the not-found.tsx file found in the path
    return NotFound({ siteId });
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Activities',
            href: activitiesPath(siteId),
          },
          {
            label: 'Edit Activity',
            href: `${activitiesPath(siteId)}/${id}/edit`,

            active: true,
          },
        ]}
      />
      <Form activity={activity} siteId={siteId} />
    </main>
  );
}
