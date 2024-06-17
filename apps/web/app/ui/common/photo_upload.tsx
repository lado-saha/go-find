import { getFileLocalPath } from '@/app/lib/utils';
import { TrashIcon } from '@heroicons/react/20/solid';

function PhotoPicker({
  title,
  setPhotoFiles,
  photoFiles,
  max,
}: {
  title: string;
  photoFiles: File[];
  setPhotoFiles: (photos: File[]) => void;
  max: number;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (photoFiles.length + files.length <= max) {
        setPhotoFiles([...photoFiles, ...files]);
      } else {
        alert(`You can only upload up to ${max} photos.`);
        e.target.value = ''; // Clear the input field
      }
    }
  };

  const handleFileRemove = (index: number) => {
    URL.revokeObjectURL(photoFiles[index].name);
    setPhotoFiles(photoFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white-50 mb-6 rounded-md border p-6 ">
      <div className="mb-6">
        <label className=" mb-2 block font-semibold">
          {`Upload ${title} (${photoFiles.length}/${max} Selected)`}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className=" w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 transition duration-150 file:cursor-pointer file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:px-4 file:py-3 file:font-semibold file:text-blue-700 file:transition hover:file:bg-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Select photos to upload"
        />
      </div>

      <div className="mt-4 flex gap-6 overflow-x-auto">
        {photoFiles.map((file: File, index: number) => (
          <div
            key={index}
            className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 shadow-md transition duration-150 hover:shadow-lg"
          >
            <a
              href={getFileLocalPath(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <img
                src={getFileLocalPath(file)}
                alt={`Uploaded Photo ${index + 1}`}
                className="h-full w-full rounded-lg object-cover transition duration-150 hover:scale-105"
              />
            </a>
            <button
              onClick={() => handleFileRemove(index)}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition duration-150 hover:bg-red-700"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoPicker;
