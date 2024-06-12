// import { deleteItem } from '@/app/lib/actions';
// import { deleteItem } from '@/app/lib/actions';
import { ChartBarIcon, ChartBarSquareIcon } from '@heroicons/react/20/solid';
import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateItem() {
  return (
    <Link
      href="/dashboard/items/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Item</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateItem({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/items/${id}/edit`}
      className="text-md flex h-10 items-center rounded-lg border px-2 font-medium hover:bg-gray-100"
    >
      <span className="hidden md:block">Update</span>{' '}
      <PencilIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function DetailsItem({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/items/${id}/details`}
      className="text-md flex h-10 items-center rounded-lg border px-2 font-medium hover:bg-gray-100"
    >
      <span className="hidden md:block">See more</span>{' '}
      <PencilIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function DeleteItem({ id }: { id: number }) {
  // const deleteItemWithId = deleteItem.bind(null, id);
  // const deleteItemWithId = deleteItem.bind(null, id.toString());

  return (
    <form action={() => {}}>
      <button className="rounded-md border  bg-red-300 p-2 hover:bg-red-500">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
