import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function MediaImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: MediaImageProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover transition-transform duration-500 group-hover:scale-105", className)}
      />
    </div>
  );
}
