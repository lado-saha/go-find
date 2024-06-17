import Form from '@/app/ui/sites/edit-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchStolenItemById } from '@/app/lib/data';
import { sitesPath } from '@/app/lib/utils';
import NotFound from './not-found';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [site] = await Promise.all([fetchStolenItemById(id)]);
  if (!site) {
    // this a fallback that will call the not-found.tsx file found in the path
    return NotFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sites', href: sitesPath() },
          {
            label: 'Edit Site',
            href: `${sitesPath()}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form site={site} />
    </main>
  );
}
