import { cn } from "@/lib/utils";
import { Button } from "@repo/ui";
import React, { ChangeEvent, useRef, useState } from "react";

const ImageContainer: React.FC<{ className?: string; setThumbnail: any }> = ({
  setThumbnail,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState<{
    image: string | null;
    file: File | null;
  }>({ image: null, file: null });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setImageData({
        image: URL.createObjectURL(selectedFile),
        file: selectedFile,
      });
      setThumbnail(selectedFile);
    }
  };

  const handleDeleteImage = () => {
    setImageData({ image: null, file: null });
    setThumbnail(null);
  };

  return (
    <div className="w-full">
      <div className="flex h-[40px] w-full items-center gap-2">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "group relative flex h-full w-full cursor-pointer items-center rounded-md border px-4",
            className
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <p className="text-sm font-semibold">
            {(imageData.file && imageData.file.name) || "Select File"}
          </p>
        </div>
        <div className="flex h-full items-center justify-between">
          <Button
            type="button"
            className="w-[130px] bg-gray-200 text-gray-600 hover:bg-gray-200"
            onClick={
              imageData.image
                ? handleDeleteImage
                : () => fileInputRef.current?.click()
            }
          >
            {imageData.image ? "Delete" : "Browse"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
