'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  HomeModernIcon,
  UserIcon,
  MapPinIcon,
  TagIcon,
TruckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
// To get the pathname of the current page(Must be a Client Component)
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Stolen Items', href: '/dashboard/stolen-items', icon: TagIcon },
  { name: 'Carpooling', href: '/dashboard/carpooling', icon: TruckIcon },
  { name: 'House Renting', href: '/dashboard/house-renting', icon: HomeIcon },
  { name: 'My Profile', href: '/dashboard/profile', icon: UserIcon },
  {
    name: 'About Us',
    href: '/dashboard/about-us',
    icon: InformationCircleIcon,
  },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          // use Link for navigation instead of <a> to avoid the full page refresh
          // The link also prefetches the page linked
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
