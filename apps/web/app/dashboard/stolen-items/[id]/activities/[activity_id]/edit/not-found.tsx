import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { activitiesPath, sitesPath } from '@/app/lib/utils';

// This is automatically called by the notFound()
export default function NotFound({ siteId }: { siteId: number }) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find Associated Construction activity.</p>
      <Link
        href={activitiesPath(siteId)}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
