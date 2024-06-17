import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { carpoolingPath } from '@/app/lib/utils';
import TripDeclareForm from '@/app/ui/carpooling/create_trip_form';

export default async function Page() {
  return (
    <main>
      {/* The breadcrumps helps the user see his current location. stolen items/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carpooling', href: carpoolingPath() },
          {
            label: 'Declare a Trip',
            href: `${carpoolingPath()}/create`,
            active: true,
          },
        ]}
      />
      <TripDeclareForm />
    </main>
  );
}
