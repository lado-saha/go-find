'use client';

import Link from 'next/link';
import {
  ExclamationCircleIcon,
  // PhotographIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createItem } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import PhotoPicker from '../common/photo_upload';

export default function ItemCreationForm() {
  // Must have the message and errors fields
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createItem, initialState); // Assuming createItem function is defined elsewhere
  const [photosFiles, setPhotosFiles] = useState<File[]>([]);

  const handlePhotoFileChange = (newPhotoFile: File[]) => {
    setPhotosFiles([...newPhotoFile]);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Serial Number */}
        <div className="mb-4">
          <label
            htmlFor="serialNumber"
            className="mb-2 block text-sm font-medium"
          >
            Serial Number
          </label>
          <input
            id="serialNumber"
            name="serialNumber"
            type="text"
            required
            placeholder="Enter serial number"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="serialNumber-error"
          />
          <div id="serialNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.serialNumber?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Item Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Item Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter item name"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Item Type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Type
          </label>
          <input
            id="type"
            name="type"
            type="text"
            required
            placeholder="Enter item type"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="type-error"
          />
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="mb-2 block text-sm font-medium">
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            required
            placeholder="Enter item brand"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="brand-error"
          />
          <div id="brand-error" aria-live="polite" aria-atomic="true">
            {state.errors?.brand?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Model */}
        <div className="mb-4">
          <label htmlFor="model" className="mb-2 block text-sm font-medium">
            Model
          </label>
          <input
            id="model"
            name="model"
            type="text"
            required
            placeholder="Enter item model"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="model-error"
          />
          <div id="model-error" aria-live="polite" aria-atomic="true">
            {state.errors?.model?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <PhotoPicker
            setPhotoFiles={handlePhotoFileChange}
            title="Item's pictures"
            photoFiles={photosFiles}
            max={5}
          />
          <div id="photos-error mt-4" aria-live="polite" aria-atomic="true">
            {state.errors?.model?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter item description"
            className="block w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            rows={4}
          />
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/items"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Declare item</Button>
      </div>
    </form>
  );
}
