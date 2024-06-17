import GoFindLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';
import { auth } from '@/auth';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Chronoman.</strong> This app was created by{' '}
            <strong>3GC-2026</strong> to help you schedule all the tasks in your
            construction site.
          </p>

          <p className={`md:text-1xl text-xl text-gray-400 md:leading-normal`}>
            Created using Nextjs, Springboot, Electronjs, and H2 db 2024
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Supervisor: ING. ENYEUGE GERMAIN{' '}
            </h2>
            <h2 className="text-lg font-semibold text-gray-800">Creators:</h2>
            <ul className="list-inside list-disc text-gray-600">
              <li>DJI MAFOTIE HYEDIDA YDA (Chef) - 21P348</li>
              <li>DJONTU DJOUKA ROSELINE JULIE - 21P179</li>
              <li>ENAMA NGUEME JEAN - 23P777</li>
              <li>MADEFO FENKAM CHANELE - 21P326</li>
              <li>MAHOU ARLETTE SONIA - 21P379</li>
              <li>MERATA ROBERT BRICE - 21P305</li>
              <li>NGNOUPAYE TIOMELA IVAN - 21P129</li>
              <li>NTOUGOUNG DJOULDE MAC-LAUREL (Sous-chef) - 21P173</li>
              <li>TAWAMBA NAGNI GHISLAIN - 21P060</li>
              <li>TSALA NOAH - 21P102</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* We load images stored in the public bucket */}
          <Image
            src="/img_creators.jpg"
            width={1024}
            height={760}
            className="hidden md:block" /* Hide it from small screen */
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {/* Mobile version */}
          <Image
            src="/img_creators.jpg"
            width={560}
            height={620}
            className="block md:hidden" /* Notice the md: is for desktop */
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
