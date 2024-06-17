import { cwd } from 'process';
import { Revenue } from './definitions';
export const stolenItemsPath = () => {
  return '/dashboard/stolen-items';
};
export const carpoolingPath = () => {
  return '/dashboard/carpooling';
};
export const sitesPath = () => {
  return '/dashboard/sites';
};
export const activitiesPath = (siteId: number) => {
  return `${sitesPath()}/${siteId}/activities`;
};
export const tasksPath = (siteId: number, activityId: number) => {
  return `${activitiesPath(siteId)}/${activityId}/tasks`;
};
export const getBucket = (name: string): string => {
  return `public/bucket/${name}`;
};

export const getFileExtension = (file: File): string => {
  return file.name.split('.').slice(-1)[0];
};

export const formatCurrency = (amount: number | undefined) => {
  return amount == undefined
    ? '-'
    : (amount / 100)
        .toLocaleString('fr-CM', {
          style: 'currency',
          currency: 'XAF',
        })
        .replace('XAF', 'FCFA');
};
export function getFileLocalPath(file: File): string {
  const filePath = URL.createObjectURL(file);
  return filePath;
}
export async function getFileFromLocalPath(localPath: string): Promise<File> {
  const response = await fetch(localPath);
  const blob = await response.blob();
  const fileName = localPath.split('/').pop() || 'unknown';
  const fileType = blob.type;
  return new File([blob], fileName, { type: fileType });
}

export const formatDateToLocal = (
  dateStr: string | undefined,
  locale: string = 'en-CM', // Set locale to fr-CM for Cameroon
) => {
  if (dateStr == undefined) return '-';
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
