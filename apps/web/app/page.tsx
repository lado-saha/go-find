import ChronomanLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, CameraIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';
import { auth } from '@/auth';
import {
  CloudIcon,
  FilmIcon,
  HomeIcon,
  PhoneIcon,
} from '@heroicons/react/20/solid';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRightIcon } from '@heroicons/react/solid';
// import styles from './Page.module.css'; // Import custom styles if any

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* Add your logo or branding here */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className={styles.shape} />
          <h1 className="text-2xl font-bold text-gray-800 md:text-4xl">
            Welcome to GoFindV2
          </h1>
          <p className="text-xl text-gray-800 md:text-2xl md:leading-normal">
            This app was created by the class 3GI-2026. The contributors are:
          </p>
          <ul className="list-disc pl-5 text-lg text-gray-700 md:text-xl md:leading-normal">
            <li>
              <strong>Abakar</strong> - 21p245
            </li>
            <li>
              <strong>Lado</strong> - 21p295
            </li>
            <li>
              <strong>Fresnel</strong> - 21p223
            </li>
          </ul>
          <p className="mt-4 text-lg text-gray-700 md:text-xl md:leading-normal">
            <strong>Project Title:</strong> GoFind
            <br />
            <strong>General Objective:</strong> To propose a flexible and
            uniform platform for finding an object (electronic, house, or car)
            for purchase or rental.
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-3">
              <FilmIcon className="h-6 w-6 text-blue-500" />
              <p className="text-gray-700">
                Identify an object as stolen: Search the app to check if a
                second-hand item has been reported stolen. The app can alert the
                owner.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <CameraIcon className="h-6 w-6 text-blue-500" />
              <p className="text-gray-700">
                Carpooling: Declare your trip and find potential passengers for
                a long journey. Anyone wishing to travel can search for a trip
                and join.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <HomeIcon className="h-6 w-6 text-blue-500" />
              <p className="text-gray-700">
                Co-location: List your house or free rooms in a tourist area or
                village for rent. Anyone interested can search and rent.
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="mt-4 flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Login/Signup</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>

          <p className="mt-4 text-gray-400">
            Created using Next.js, Spring Boot, Electron.js, and H2 Database
            2024
          </p>
        </div>
      </div>
    </main>
  );
}
