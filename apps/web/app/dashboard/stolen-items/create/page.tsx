import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { stolenItemsPath } from '@/app/lib/utils';
import StolenItemDeclareForm from '@/app/ui/stolen-items/create-form';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function Page() {
  return (
    <main>
      {/* The breadcrumps helps the user see his current location. stolen items/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stolen Items', href: stolenItemsPath() },
          {
            label: 'Declare Stolen Item',
            href: `${stolenItemsPath()}/create`,
            active: true,
          },
        ]}
      />
      <StolenItemDeclareForm />
    </main>
  );
}
