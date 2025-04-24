import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";

interface ProfileImageUploadProps {
  className?: string;
  userImage?: string;
  handleUploadImage: (file: File) => void;
  role?: number;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  className,
  userImage,
  handleUploadImage,
  role,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [, setImageFile] = useState<File | null>(null);

  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      handleUploadImage(file);
    }
  };

  return (
    <div className="h-fit w-fit">
      <div
        onClick={() =>
          document.querySelector<HTMLInputElement>(".file-input")?.click()
        }
        className={cn(
          "group relative mx-auto h-[100px] w-[100px] cursor-pointer",
          className
        )}
      >
        <input
          type="file"
          className="file-input"
          accept="image/*"
          hidden
          onChange={(e) => handleImageChange(e.target.files)}
        />
        {image || userImage ? (
          <img
            src={image || userImage}
            className={`absolute h-full w-full object-cover ${role === 7483 ? "rounded-full" : "rounded-md"}`}
            alt="Profile"
          />
        ) : (
          <FaUserLarge
            className={`absolute h-full w-full border-2 text-gray-300 ${role === 7483 ? "rounded-full" : "rounded-md"}`}
          />
        )}
        <div
          className={`invisible absolute h-full w-full text-xs opacity-0 backdrop-blur-sm duration-300 group-hover:visible group-hover:opacity-100 ${role === 7483 ? "rounded-full" : "rounded-md"}`}
        >
          <div className="flex h-full flex-col items-center justify-center text-center text-black">
            <BsCloudUpload className="text-lg" />
            <h1 className="bg-white px-3">Upload New Photo</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
