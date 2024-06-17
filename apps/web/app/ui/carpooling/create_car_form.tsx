'use client';

import Link from 'next/link';
import {
  CalendarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { declareStolenItem } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import PhotoPicker from '../common/photo_upload';

export default function TripDeclareForm() {
  // Must have the message and errors fields
  const initialState = { message: '', errors: {} };
  // Search tags
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [photosFiles, setPhotosFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const boundedItemDeclaration = declareStolenItem.bind(
    null,
    photosFiles.length,
    formData,
    tags,
  );
  const [state, dispatch] = useFormState(boundedItemDeclaration, initialState); // Assuming createItem function is defined elsewhere

  const handlePhotoFileChange = (newPhotoFile: File[]) => {
    setPhotosFiles([...newPhotoFile]);
    const newFormData: FormData = new FormData();
    newPhotoFile.forEach((file, index) => {
      newFormData.append(`file-${index}`, file);
    });
    setFormData(newFormData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tags.length == 10) {
      alert(`You can only add up to 10 tags.`);
    } else if (e.key === ' ' && inputValue.trim()) {
      e.preventDefault();
      setTags([...tags, inputValue.trim().replaceAll(' ', '-')]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
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
        {/* Day of lost*/}
        <div>
          <label
            className="text-md mb-3 mt-5 block font-medium text-gray-900"
            htmlFor="birthday"
          >
            Stolen date
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="stolenDate"
              type="date"
              name="stolenDate"
              placeholder="Enter your birthday"
              required
              aria-describedby="birthday-error"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {state.errors?.stolenDate?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Type
          </label>
          <div className="flex flex-wrap items-center rounded-md border border-gray-200 px-3 py-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="mb-2 mr-2 flex items-center rounded bg-gray-200 px-2 py-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-gray-600 hover:text-gray-900"
                  onClick={() => handleRemoveTag(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              id="type"
              name="type"
              type="text"
              // required
              placeholder="Enter item type"
              className="flex-grow rounded-md border-none text-sm placeholder-gray-500 outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              aria-describedby="type-help type-error"
            />
          </div>
          <p id="type-help" className="mt-2 text-sm text-gray-500">
            These terms will be used to increase your search visibility: ex
            "phone", "iphone", "samsung", ... Press space to add tags. Click the
            '×' icon to remove a tag.
          </p>

          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        {/* Brand */}
        <div className="mb-4 mt-4">
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
            {state.errors?.photos?.map((error: string) => (
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
            required
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
