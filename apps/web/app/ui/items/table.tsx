import {
  UpdateItem,
  DeleteItem,
} from '@/app/ui/items/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredItems } from '@/app/lib/data';
import Status from '../common/status';
import {
  formatGeoString,
  getStatusFromText as toStatusModel,
} from '@/app/lib/models';
import { HomeModernIcon, MapIcon, MapPinIcon } from '@heroicons/react/20/solid';
import {
  // fetchCompletionPercentageForItem,
  // fetchTotalBudgetForItem,
  // fetchTotalDurationForItem,
} from '@/app/lib/stats_data';

/**
 * This is the lis view of an a item. should presnet the item and then show general stats obtained from it childres(Activity -> tasks)
 * Remeber that this the first page the manager sees and
 * @param param0
 * @returns
 */
export default async function ItemsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const items = await fetchfiltereditems(query, currentpage);
  // return (
  //   <div classname="mt-6 flow-root">
  //     <div classname="min-w-full align-middle">
  //       <div classname="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 w-full">
  //         {items?.map(async (item) => {
  //           const numactivities = item.activities?.length || 0;
  //           const numtasks =
  //             item.activities?.reduce(
  //               (total, activity) => total + (activity.tasks?.length || 0),
  //               0,
  //             ) || 0;
  //           const numworkers = new set(
  //             item.activities?.flatmap(
  //               (activity) =>
  //                 activity.tasks?.flatmap((task) => task.workers) || [],
  //             ) || [],
  //           ).size;

  //           return (
  //             <div
  //               key={item.id}
  //               classname="mb-4 overflow-hidden rounded-lg bg-gray-50 p-6 shadow-sm"
  //             >
  //               <div classname="mb-4 flex flex-col items-start justify-between border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
  //                 <div classname="flex items-center space-x-4">
  //                   <homemodernicon classname="h-12 w-12 text-gray-500" />
  //                   <div>
  //                     <h2 classname="text-2xl font-semibold text-gray-800">
  //                       {item.name}
  //                     </h2>
  //                     <p classname="text-sm text-gray-600">
  //                       {item.town}, {item.region}, {item.country}
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <status
  //                   status={await fetchcompletionpercentageforitem(item.id)}
  //                   // classname="mt-2 sm:mt-0"
  //                 />
  //               </div>
  //               <div classname="grid grid-cols-1 gap-6">
  //                 <div classname="space-y-4">
  //                   <div>
  //                     <h3 classname="text-lg font-medium text-gray-800">
  //                       item details
  //                     </h3>
  //                     <p classname="text-sm text-gray-600">
  //                       started on: {formatdatetolocal(date())}
  //                     </p>
  //                     <p classname="text-sm font-medium text-gray-800">
  //                       budget:{' '}
  //                       {formatcurrency(await fetchtotalbudgetforitem(item.id))}
  //                     </p>
  //                     <p classname="text-sm text-gray-600">
  //                       duration:{' '}
  //                       <span classname="font-medium text-gray-800">
  //                         {await fetchtotaldurationforitem(item.id)} days
  //                       </span>
  //                     </p>
  //                     <p classname="text-sm text-gray-600">
  //                       completion percentage:{' '}
  //                       <span classname="font-medium text-green-600">
  //                         {await fetchcompletionpercentageforitem(item.id)}%
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div>
  //                     <h3 classname="text-lg font-medium text-gray-800">
  //                       statistics
  //                     </h3>
  //                     <p classname="text-sm text-gray-600">
  //                       total activities:{' '}
  //                       <span classname="font-medium text-gray-800">
  //                         {numactivities}
  //                       </span>
  //                     </p>
  //                     <p classname="text-sm text-gray-600">
  //                       total tasks:{' '}
  //                       <span classname="font-medium text-gray-800">
  //                         {numtasks}
  //                       </span>
  //                     </p>
  //                     <p classname="text-sm text-gray-600">
  //                       total workers:{' '}
  //                       <span classname="font-medium text-gray-800">
  //                         {numworkers}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div classname="flex items-center space-x-4">
  //                     <mappinicon classname="h-8 w-6 text-gray-500" />
  //                     <p classname="text-gray-702 text-sm italic">
  //                       {formatgeostring(item)}
  //                     </p>
  //                   </div>
  //                   <div classname="fill mt-4 flex space-x-2 sm:mt-0">
  //                     <consultitemsactivities id={item.id} />
  //                     <consultstatistics id={item.id} />
  //                     <updateitem id={item.id} />
  //                     <deleteitem id={item.id} />
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}
