"use client";

import Image from "next/image";
import { useId, useState, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
  helper?: string;
};

export function ImageUploadField({
  name,
  label,
  defaultValue,
  placeholder = "URL ou chemin de l'image",
  helper,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const fileInputId = useId();
  const [value, setValue] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "Import impossible.");
      }

      setValue(result.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Import impossible."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-encre">
        {label}
      </label>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <Input
          id={inputId}
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
        />

        <div className="flex flex-wrap gap-2">
          <input
            id={fileInputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={handleFileChange}
          />
          <label
            htmlFor={fileInputId}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-encre shadow-sm transition hover:bg-surface-muted"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Import..." : "Importer"}
          </label>

          {value ? (
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Effacer l'image"
              onClick={() => setValue("")}
            >
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>

      {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

      {value.startsWith("/") ? (
        <div className="relative mt-2 h-28 w-full overflow-hidden rounded-2xl border border-line bg-surface-muted md:w-64">
          <Image
            src={value}
            alt="Apercu de l'image importee"
            fill
            sizes="256px"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
