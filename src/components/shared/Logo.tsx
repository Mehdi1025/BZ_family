import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const LOGO_SRC = "/images/logo-192.png";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  showWordmark?: boolean;
  href?: string;
}

const sizeMap = {
  sm: { px: 36, className: "h-9 w-9" },
  md: { px: 44, className: "h-11 w-11" },
  lg: { px: 56, className: "h-14 w-14" },
} as const;

export function Logo({
  variant = "dark",
  size = "md",
  className,
  showWordmark = false,
  href,
}: LogoProps) {
  const { px, className: sizeClass } = sizeMap[size];

  const mark = (
    <Image
      src={LOGO_SRC}
      alt="BZ Family — logo mains solidaires"
      width={px}
      height={px}
      className={cn(
        sizeClass,
        "object-contain",
        variant === "light" ? "brightness-0 invert" : "brightness-0",
        className
      )}
      priority
    />
  );

  const content = showWordmark ? (
    <span className="flex items-center gap-3">
      {mark}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold",
            variant === "light" ? "text-white" : "text-encre"
          )}
        >
          BZ Family
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-medium uppercase tracking-wider",
            variant === "light" ? "text-white/50" : "text-muted-foreground"
          )}
        >
          Association de quartier
        </span>
      </span>
    </span>
  ) : (
    mark
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
