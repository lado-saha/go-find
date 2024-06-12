import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function GoFindV2Logo() {
  return (
    <div className={` flex flex-row items-center leading-none text-white`}>
      <MagnifyingGlassIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="ml-2 text-[32px]">GoFindV2</p>
    </div>
  );
}
