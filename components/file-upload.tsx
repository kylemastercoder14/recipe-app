import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "recipeImage";
}

const FileUpload = ({ onChange, value, endPoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="flex items-center justify-center flex-col">
        <div className="relative">
          <div className="w-[600px] h-60">
            <Image
              fill
              src={value}
              alt="Upload"
              className="rounded-sm object-cover"
            />
          </div>
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center p-2 mt-10 rounded-md bg-gray-100">
          <ImageIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            {value}
          </a>
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      className="border-gray-400 dark:border-gray-500"
    />
  );
};

export default FileUpload;
