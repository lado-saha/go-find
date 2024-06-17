// This makes sure all functions exported from here are marekd as server functions
'use server';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// We use zod for data validation
import { z } from 'zod';

import bcrypt from 'bcryptjs';
import {
  StolenItem as StolenItem,
  User,
  Worker,
  convertToPhoto,
  convertToSearchTags,
} from './models';
import { getBucket } from './utils';
import { error } from 'console';

const BASE_URL = process.env.API_BASE_URL;
const NEXT_BASE_URL = process.env.NEXT_API_BASE_URL;
// We create a form schema taking into accoun the possible errors and warning

// Assuming you have a Photo type defined somewhere
const photoSchema = z.string().url();

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// UserCreationFormSchema
// User Zod Schema
// User Zod Schema
const UserFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(9, 'Phone number must be 10 digits')
    .max(9, 'Phone number must be 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z
    .string()
    .min(6, 'Confirm Password must be at least 6 characters long'),
  birthday: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

const WorkerFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

const ItemFormSchema = z.object({
  serialNumber: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'You must describe your item'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  stolenDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  isStolen: z.boolean(),
  type: z.any().optional(),
  photos: z.any().optional(),
});

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type WorkerState = {
  errors?: {
    id?: string[];
    name?: string[];
  };
  message?: string | null;
};

export type StolenItemState = {
  errors?: {
    id?: string[];
    serialNumber?: string[];
    name?: string[];
    type?: string[];
    photos?: string[];
    description?: string[];
    brand?: string[];
    model?: string[];
    stolenDate?: string[];
    isStolen?: string[];
  };
  message?: string | null;
};

export type UserState = {
  errors?: {
    name?: string[];
    id?: string[];
    password?: string[];
    confirmPassword?: string[];
    email?: string[];
    phone?: string[];
    photos?: string[];
    birthday?: string[];
  };
  message?: string | null;
};

export type SiteState = {
  errors?: {
    id?: string[];
    name?: string[];
    latitude?: string[];
    longitude?: string[];
    town?: string[];
    country?: string[];
    region?: string[];
    description?: string[];
  };
  message?: string | null;
};

// Validators
const CreateUser = UserFormSchema.omit({ id: true }).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  },
);
// const DeclareItem = CreateItem;
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateWorker = WorkerFormSchema.omit({ id: true });
const UpdateWorker = WorkerFormSchema.omit({ id: true });

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    let path = `${BASE_URL}/users/login?email=${encodeURIComponent(email)}`;
    console.log(path);

    const response = await fetch(path);

    if (!response.ok) {
      console.log('I was not called----------------------------');
      throw new Error('Failed to fetch user.' + response.body);
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
export async function signinUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong. User may not exist';
      }
    }
  }
  revalidatePath('/login');
  redirect('/dashboard');
}

export async function signupUser(
  photoCount: number,
  imageFormData: FormData,
  prevState: UserState,

  formData: FormData,
) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phone: formData.get('phone') as string,
    birthday: formData.get('birthday') as string,

    confirmPassword: formData.get('confirmPassword') as string,
  });
  const profilePhotoFile =
    photoCount > 0 ? (imageFormData.get(`file-0`) as File) : undefined;

  const profilePhoto =
    photoCount > 0 ? convertToPhoto([profilePhotoFile!!])[0] : undefined;

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }

  const { name, email, password, phone, birthday } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: '',
      name,
      email,
      phone,
      password: hashedPassword,
      birthday: new Date(birthday),
      photo: profilePhoto,
    };

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const createdUser: User = await response.json();
    console.log(`User created: ${JSON.stringify(createdUser)}`);

    if (photoCount > 0) {
      // Upload photos using the created item's ID as the filename
      const path = getBucket('go-users');
      await uploadFile(profilePhotoFile!!, createdUser.photo!!.id, path);
    }

    // Redirect or handle success as needed
  } catch (error) {
    console.error(error);
    return { message: 'Error creating user' };
  }

  redirect('/login');
}
// Items
// // Create Item
// export async function declareStolenItem(
//   photoFiles: File[],
//   typeTags: string[],

//   prevState: ItemState,
//   formData: FormData,
// ) {
//   const session = await getSession();
//   const userId = session?.user?.id;
//   console.log('user id =' + userId);

//   if (!userId) {
//     return { message: 'User not authenticated' };
//   }

//   const validatedFields = ItemFormSchema.safeParse({
//     serialNumber: formData.get('serialNumber'),
//     name: formData.get('name'),
//     type: formData.get('type'),
//     photos: formData.getAll('photos'),
//     description: formData.get('description'),
//     brand: formData.get('brand'),
//     model: formData.get('model'),
//     isStolen: formData.get('isStolen') === 'true',
//     owner: formData.get('owner'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to create item.',
//     };
//   }

//   const item: StolenItem = {
//     id: 0,
//     ...validatedFields.data,
//   };

//   try {
//     const response = await fetch(`${BASE_URL}/items`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(item),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create item');
//     }

//     const createdItem = await response.json();
//     console.log(`Item created: ${createdItem}`);
//   } catch (error) {
//     console.error(error);
//     return { message: 'Error creating item' };
//   }
//   revalidatePath('/dashboard/items');
//   redirect('/dashboard/items');
// }

// Helper function to upload a file
async function uploadFile(file: File, generatedID: string, path: string) {
  const formData = new FormData();
  formData.append('fileName', generatedID);
  formData.append('filePath', path);
  formData.append('file', file);

  const response = await fetch(`${NEXT_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
}

// Declare stolen item
export async function declareStolenItem(
  photoCount: number,
  photoFormData: FormData,
  typeTags: string[],
  prevState: StolenItemState,
  formData: FormData,
) {
  const validatedFields = ItemFormSchema.safeParse({
    serialNumber: formData.get('serialNumber'),
    name: formData.get('name'),
    description: formData.get('description'),
    brand: formData.get('brand'),
    model: formData.get('model'),
    isStolen: true,
    stolenDate: formData.get('stolenDate'),
  });

  if (typeTags.length < 3 || photoCount < 3) {
    return {
      errors: {
        type: typeTags.length < 3 ? ['You must add atleast 3 tags'] : [],
        photos: photoCount < 3 ? ['You must add atleast 3 Photos'] : [],
      },
      message: 'Missing Fields. Failed to create item.',
    };
  }

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create item.',
    };
  }
  const photoFiles: File[] = [];
  for (let i = 0; i < photoCount; i++) {
    photoFiles[i] = photoFormData.get(`file-${i}`) as File;
  }
  const photos = convertToPhoto(photoFiles);
  const session = await auth();
  const owner = await getUserByEmail(session?.user?.email!!);

  const stolenItem: StolenItem = {
    id: 0,
    ...validatedFields.data,
    photos: photos,
    tags: convertToSearchTags(typeTags),
    owner: owner,
    isStolen: true,
    stolenDate: new Date(formData.get('stolenDate') as string),
  };

  try {
    // Create item in the database and get the generated ID
    const response = await fetch(`${BASE_URL}/stolen-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stolenItem),
    });

    if (!response.ok) {
      throw new Error('Failed to declare item');
    }

    const item: StolenItem = await response.json();
    console.log(`Item created: ${item}`);

    // Upload photos using the created item's ID as the filename
    for (let i = 0; i < photoCount; i++) {
      uploadFile(photoFiles[i], item.photos[i].id, getBucket('stolen-items'));
    }
  } catch (error) {
    console.error(error);
    return { message: 'Error creating item. Try again' };
  }
  revalidatePath('/dashboard/stolen-items');
  redirect('/dashboard/stolen-items');
}

// // Update Item
// export async function updateItem(
//   id: number,
//   oldItem: StolenItem,
//   prevState: ItemState,
//   formData: FormData,
// ) {
//   const validatedFields = ItemFormSchema.safeParse({
//     serialNumber: formData.get('serialNumber'),
//     name: formData.get('name'),
//     type: formData.get('type'),
//     photos: formData.getAll('photos'),
//     description: formData.get('description'),
//     brand: formData.get('brand'),
//     model: formData.get('model'),
//     isStolen: formData.get('isStolen') === 'true',
//     owner: formData.get('owner'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to update item.',
//     };
//   }

//   const item: StolenItem = {
//     id: oldItem.id,
//     ...validatedFields.data,
//   };

//   try {
//     const response = await fetch(`${BASE_URL}/items/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(item),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update item');
//     }

//     const updatedItem = await response.json();
//     console.log(`Item updated: ${updatedItem}`);
//   } catch (error) {
//     console.error(error);
//     return { message: 'Error updating item' };
//   }
//   revalidatePath('/dashboard/items');
//   redirect('/dashboard/items');
// }

/*
export async function createSite(prevState: SiteState, formData: FormData) {
  // We create the user the we navigate to the login
  const validatedFields = SiteFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    region: formData.get('region'),
    country: formData.get('country'),
    town: formData.get('town'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Site.',
    };
  }

  const site: Site = {
    id: 0,
    ...validatedFields.data,
  };

  console.log(site);

  try {
    const response = await fetch(`${BASE_URL}/sites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error('Failed to create site');
    }

    const createdSite = await response.json();
    console.log(`site created:${createdSite} `);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating site' };
  }
  revalidatePath('/dashboard/sites');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/dashboard/sites');
}
export async function updateSite(
  id: number,
  oldSite: Site,
  prevState: SiteState,
  formData: FormData,
) {
  // We create the user the we navigate to the login
  const validatedFields = SiteFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    region: formData.get('region'),
    country: formData.get('country'),
    town: formData.get('town'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create user.',
    };
  }

  const site: Site = {
    id: 0,
    ...validatedFields.data,
  };

  console.log(site);

  try {
    const response = await fetch(`${BASE_URL}/sites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error('Failed to update site');
    }

    const createdSite = await response.json();
  } catch (error) {
    console.error(error);
    return { message: 'Error updating site' };
  }
  revalidatePath('/dashboard/sites');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/dashboard/sites');
}
export async function deleteSite(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/sites/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete site');
    }
    console.log(`Successful Deletion `);
    revalidatePath('/dashboard/sites');
    //   // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  } catch (error) {
    console.error(error);
    return { message: 'Error deleting site' };
  }
}
*/
// To CUD worker
export async function createWorker(prevState: WorkerState, formData: FormData) {
  const validatedFields = WorkerFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create worker.',
    };
  }

  const worker: Worker = {
    id: 0, // or a proper id if available
    ...validatedFields.data,
  };

  try {
    const response = await fetch(`${BASE_URL}/workers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worker),
    });

    if (!response.ok) {
      throw new Error('Failed to create worker');
    }

    const createdWorker = await response.json();
    console.log(`Worker created: ${JSON.stringify(createdWorker)}`);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating worker' };
  }
  revalidatePath('/dashboard/workers');
  redirect('/dashboard/workers');
}
export async function updateWorker(
  id: number,
  oldWorker: Worker,
  prevState: WorkerState,
  formData: FormData,
) {
  const validatedFields = WorkerFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update worker.',
    };
  }

  const worker: Worker = {
    id: oldWorker.id,
    ...validatedFields.data,
  };

  try {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worker),
    });

    if (!response.ok) {
      throw new Error('Failed to update worker');
    }

    const updatedWorker = await response.json();
    console.log(`Worker updated: ${JSON.stringify(updatedWorker)}`);
  } catch (error) {
    console.error(error);
    return { message: 'Error updating worker' };
  }
  revalidatePath('/dashboard/workers');
  redirect('/dashboard/workers');
}
export async function deleteWorker(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete worker');
    }
    console.log(`Worker ${id} successfully deleted`);
    revalidatePath('/dashboard/workers');
  } catch (error) {
    console.error(error);
    return { message: 'Error deleting worker' };
  }
}
