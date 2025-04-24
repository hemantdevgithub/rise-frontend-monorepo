"use client";

import { Upload, X } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Button } from "./button";

interface ImageUploaderProps {
  onFileChange: (file: File | null) => void;
  maxSizeMB?: number;
  acceptedFileTypes?: string[];
  buttonText?: string;
}

export function ImageUploader({
  onFileChange,
  maxSizeMB = 5,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"],
  buttonText = "Browse Images",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!acceptedFileTypes.includes(file.type)) {
      setError("Invalid file type. Please upload an image.");
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    setError(null);
    if (validateFile(file)) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onFileChange(null);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out ${
          isDragging
            ? "border-primary bg-primary/5"
            : preview
              ? "border-primary/50"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={acceptedFileTypes.join(",")}
          onChange={handleChange}
          className="hidden"
          ref={fileInputRef}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="flex cursor-pointer flex-col items-center justify-center gap-4 p-8">
          {preview ? (
            <div className="relative h-fit w-full">
              <img src={preview} alt="Preview" className="mx-auto h-[250px] w-fit rounded-md object-cover" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove();
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 absolute -right-2 -top-2 rounded-full p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                <Upload className="text-primary h-8 w-8" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm">
                  <span className="text-primary font-medium">Drag</span> and{" "}
                  <span className="text-primary font-medium">drop</span> your image here
                </p>
                <p className="text-muted-foreground text-xs">or</p>
                <Button
                  variant="default"
                  className="mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}
                >
                  {buttonText}
                </Button>
              </div>
            </>
          )}
        </label>
      </div>
      {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
    </div>
  );
}
