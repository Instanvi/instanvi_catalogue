"use client";

import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileWithPreview extends File {
  preview: string;
}

interface FileUploaderProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  className?: string;
}

export function FileUploader({
  onFilesChange,
  maxFiles = 5,
  accept = { "image/*": [".jpeg", ".png", ".jpg", ".webp"] },
  className,
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as FileWithPreview[];

      setFiles((prev) => {
        const totalFiles = [...prev, ...newFiles].slice(0, maxFiles);
        return totalFiles;
      });
    },
    [maxFiles],
  );

  // Notify parent when files change, but do it in a separate effect
  // to avoid updating parent while child is rendering
  useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxFiles,
      multiple: maxFiles > 1,
    });

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f !== fileToRemove);
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(fileToRemove.preview);
      return filtered;
      // onFilesChange will be called by useEffect when files change
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 p-8 text-center transition-all duration-200 cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "hover:bg-muted/30",
          "rounded-none", // Enforcing flat design
        )}
      >
        <input {...getInputProps()} />
        <div className="flex bg-primary/10 p-4 mb-4">
          <Cloud className="h-8 w-8 text-primary" />
        </div>
        <p className="text-sm font-medium">
          {isDragActive
            ? "Drop the files here"
            : "Drag & drop files or click to browse"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Support for images up to 5MB (Max {maxFiles} files)
        </p>
      </div>

      {fileRejections.length > 0 && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 text-destructive text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <div>
            {fileRejections.map(({ file, errors }) => (
              <p key={file.name}>
                {file.name}: {errors.map((e) => e.message).join(", ")}
              </p>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="group relative aspect-square border border-muted-foreground/10 overflow-hidden bg-muted/20"
            >
              <Image
                src={file.preview}
                alt={file.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onLoad={() => URL.revokeObjectURL(file.preview)}
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                <p className="text-[10px] text-white truncate px-1">
                  {file.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
