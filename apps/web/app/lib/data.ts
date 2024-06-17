'use server';
// The place where we load all the data
import { StolenItem, Worker } from './models';
import { getBucket } from './utils';

const BASE_URL = process.env.API_BASE_URL;

export async function fetchFile(
  bucket: string,
  fileName: string,
  fileExtension: string,
): Promise<File> {
  const fileUrl = `http://loacalhost:3000/${getBucket(bucket)}/${fileName}.${fileExtension}`;
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('File not found');
    }
    const blob = await response.blob();

    // Create a File object
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  } catch (error) {
    throw Error('Error fetching the file: ' + error);
  }
}

export async function fetchStolenItems() {
  const response = await fetch(`${BASE_URL}/stolen-item`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  try {
    if (!response.ok) {
      throw new Error('Failed to fetch stolen items.' + response.statusText);
    }

    const stolenItem: StolenItem[] = await response.json();
    return stolenItem;
  } catch (error) {
    throw new Error(`Failed to fetch stolen item`);
  }
}

export async function fetchStolenItemById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/stolen-items/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stolen item.');
    }

    const stolenItem: StolenItem = await response.json();
    return stolenItem;
  } catch (error) {
    throw new Error(`Failed to fetch site: ${error}`);
  }
}

export async function fetchStolenItemByUserId(userId: string) {
  try {
    const response = await fetch(`${BASE_URL}/stolen-items?user_id${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stolen item.');
    }

    const stolenItem: StolenItem = await response.json();
    return stolenItem;
  } catch (error) {
    throw new Error(`Failed to fetch stolen item by user id: ${error}`);
  }
}
export async function fetchFilteredStolenItems(
  query: string,
  sortBy: string,
  currentPage: number,
) {
  const size = ITEMS_PER_PAGE;
  const response = await fetch(
    `${BASE_URL}/stolen-items?query=${query}&sorBy=${sortBy}&page=${currentPage}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    console.log('Failed' + response.status);
    // throw new Error('Failed to fetch site. {}' + response.json());
  }

  const stolenItems: StolenItem[] = await response.json();
  console.log(stolenItems);
  return stolenItems;
}

export async function fetchStolenItemsPages(query: string) {
  const response = await fetch(`${BASE_URL}/sites/count?query=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.log(response.statusText);
    throw new Error(
      `Failed to fetch total number of pages.${response.statusText}`,
    );
  }

  return response.json().then((data) => {
    const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
    return totalPages;
  });
}

const ITEMS_PER_PAGE = 10;

//  Fetching Wroker

export async function fetchWorkers() {
  const response = await fetch(`${BASE_URL}/workers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  try {
    if (!response.ok) {
      throw new Error('Failed to fetch workers.' + response.statusText);
    }

    const workers: Worker[] = await response.json();
    return workers;
  } catch (error) {
    throw new Error(`Failed to fetch workers: ${error}`);
  }
}

export async function fetchWorkerById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch worker.');
    }

    const worker: Worker = await response.json();
    return worker;
  } catch (error) {
    throw new Error(`Failed to fetch worker: ${error}`);
  }
}

export async function fetchFilteredWorkers(query: string, currentPage: number) {
  const size = ITEMS_PER_PAGE;
  const response = await fetch(
    `${BASE_URL}/workers?name=${query}&page=${currentPage}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    console.log('Failed' + response.status);
    // throw new Error('Failed to fetch workers. {}' + response.json());
  }

  const workers: Worker[] = await response.json();
  console.log(workers);
  return workers;
}

export async function fetchWorkersPages(query: string) {
  const response = await fetch(`${BASE_URL}/workers/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.log(response.statusText);
    throw new Error(
      `Failed to fetch total number of pages.${response.statusText}`,
    );
  }

  return response.json().then((data) => {
    const totalPages = Math.ceil(data / ITEMS_PER_PAGE);
    return totalPages;
  });
}

// Stats for site
export async function fetchSiteCompletionPercentage(siteId: number) {
  const response = await fetch(`${BASE_URL}/api/sites/${siteId}/completion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch completion percentage.');
  }

  const percentage: number = await response.json();
  return percentage;
}

export async function fetchSizeTotalBudget(siteId: number) {
  const response = await fetch(`${BASE_URL}/api/sites/${siteId}/budget`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch total budget.');
  }

  const budget: number = await response.json();
  return budget;
}

export async function fetchWorkersFromSite(siteId: number) {
  const response = await fetch(`${BASE_URL}/api/sites/${siteId}/workers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch workers from site.');
  }

  const workers: Worker[] = await response.json();
  return workers;
}
