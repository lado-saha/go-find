import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import ItemCreationForm from '@/app/ui/items/create-form';

export default async function Page() {
  // We get all the customers first

  return (
    <main>
      {/* The breadcrumps helps the user see his current location. sites/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stolen Items', href: '/dashboard/items' },
          {
            label: 'Declare Stolen Item',
            href: '/dashboard/sites/create',
            active: true,
          },
        ]}
      />
      <ItemCreationForm />
    </main>
  );
}
