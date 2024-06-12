import { ServerStackIcon } from '@heroicons/react/20/solid';
import { CalendarDaysIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function GoFindV2Logo() {
  return (
    <div className={` flex flex-row items-center leading-none text-white`}>
      <ServerStackIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="ml-2 text-[32px]">GoFindV2</p>
    </div>
  );
}
