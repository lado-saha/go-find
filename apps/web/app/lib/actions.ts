// This makes sure all functions exported from here are marekd as server functions
'use server';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// We use zod for data validation
import { z } from 'zod';

import bcrypt from 'bcryptjs';
import { Site, TaskStatus, User, Worker } from './models';
import path from 'path';

const BASE_URL = process.env.API_BASE_URL;
// We create a form schema taking into accoun the possible errors and warning
// Great for data validation
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

// Photo Zod Schema
const PhotoSchema = z.object({
  id: z.number(),
  url: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
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
  photo: z.string().optional(),
  birthday: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

const WorkerFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

const SiteFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(255, 'Name must be at most 255 characters long.'),
  latitude: z.coerce
    .number()
    .gte(-180, { message: 'Latitude must be between -180° to 180°' })
    .lte(180, { message: 'Latitude must be between -180° to 180°' }),
  longitude: z.coerce
    .number()
    .gte(-180, { message: 'Longitude must be between -90° to 90°' })
    .lte(180, { message: 'Longitude must be between -90° to 90°' }),
  town: z.string().max(255, 'Town must be at most 255 characters long.'),
  country: z.string().max(255, 'Country must be at most 255 characters long.'),
  region: z.string().max(255, 'Region must be at most 255 characters long.'),
  description: z.string().optional(),
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

export type UserState = {
  errors?: {
    name?: string[];
    id?: string[];
    password?: string[];
    confirmPassword?: string[];
    email?: string[];
    phone?: string[];
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
const CreateSite = SiteFormSchema.omit({ id: true });
const UpdateSite = SiteFormSchema.omit({ id: true });
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateWorker = WorkerFormSchema.omit({ id: true });
const UpdateWorker = WorkerFormSchema.omit({ id: true });

/**
 * Notice that formData is passed automatically by setting this to the action attribute of a form
 * @param formData
 */
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate and returns the 3 fields else fails
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  // Stores the amount in cents
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  // Test it out
  // TO avoid back navigation after the form has been created
  revalidatePath('/dashboard/invoices');
  // Redirect the user
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  state: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error(error);
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

export async function signupUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phone: formData.get('phone') as string,
    birthday: formData.get('birthday') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }

  const { name, email, password, phone, birthday } = validatedFields.data;
  const photoFile = formData.get('photo') as File;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the photo to the public directory
    let photoUrl = '';
    if (photoFile) {
      const photoPath = path.join(
        process.cwd(),
        'public',
        'uploads',
        photoFile.name,
      );
      const buffer = await photoFile.arrayBuffer();
      // fs.writeFileSync(photoPath, Buffer.from(buffer));
      photoUrl = `/uploads/${photoFile.name}`;
    }

    const newUser: User = {
      id: '',
      name,
      email,
      phone,
      password: hashedPassword,
      birthday: new Date(birthday),
      photo: '',
      createdAt: new Date(),
      updatedAt: new Date(),
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

    const createdUser = await response.json();
    console.log(`User created: ${JSON.stringify(createdUser)}`);

    revalidatePath('/signup');
    redirect('/login');
  } catch (error) {
    console.error(error);
    return { message: 'Error creating user' };
  }
}
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
