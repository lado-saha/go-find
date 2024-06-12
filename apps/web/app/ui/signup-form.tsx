'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  CalendarIcon,
  PhoneIcon,
  PhotoIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { signupUser } from '@/app/lib/actions';
import Link from 'next/link';
import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import PhotoPicker from './common/photo_upload';

export default function SignupForm() {
  const initialState = { message: '', errors: {} };
  const [photosFiles, setPhotosFiles] = useState<File[]>([]);
  const signupUserWithPhoto = signupUser.bind(photosFiles[0]);
  const [state, dispatch] = useFormState(signupUserWithPhoto, initialState);

  const handlePhotoFileChange = (newPhotoFile: File[]) => {
    setPhotosFiles([...newPhotoFile]);
  };

  return (
    <form action={dispatch} className="space-y-3">
      <div className="fill flex-1 rounded-lg bg-gray-50 px-6 pb-4">
        <h1 className="mb-3 text-center text-2xl">
          Welcome! Tell us more about yourself.
        </h1>
        <div className="w-full">
          {/* Name */}
          <div>
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full names"
                required
                aria-describedby="name-error"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Email */}
          <div>
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.email?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.password?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={6}
                aria-describedby="confirm-password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.confirmPassword?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Phone */}
          <div>
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                aria-describedby="phone-error"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.phone?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Birthday */}
          <div>
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="birthday"
            >
              Birthday
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="birthday"
                type="date"
                name="birthday"
                placeholder="Enter your birthday"
                required
                aria-describedby="birthday-error"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.birthday?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>

          {/* Photo Upload */}
          <div>
            <label
              className="text-md mb-3 mt-5 block font-medium text-gray-900"
              htmlFor="photo"
            >
              Profile Photo
            </label>
            <PhotoPicker
              setPhotoFiles={handlePhotoFileChange}
              title=""
              photoFiles={photosFiles}
              max={1}
            />
            {state.errors?.photo?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <SignupButton />
        <LoginButton />
        {state.message && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  return (
    <Link
      key="login"
      href="/login"
      className={clsx(
        'mt-2 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-blue-600 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
      )}
    >
      <p className="w-full md:block">Login instead.</p>
      <ArrowRightEndOnRectangleIcon className="w-6" />
    </Link>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Signup <UserPlusIcon className="ml-auto h-5 w-5" />
    </Button>
  );
}
