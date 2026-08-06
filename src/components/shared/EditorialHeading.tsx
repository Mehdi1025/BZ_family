"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/shared/TextReveal";
import { FadeUp } from "@/components/shared/FadeUp";
import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  index?: string;
  label: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function EditorialHeading({
  index,
  label,
  title,
  description,
  href,
  linkLabel,
  align = "left",
  dark = false,
  className,
}: EditorialHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      <FadeUp>
        <div
          className={cn(
            "mb-8 flex items-center gap-4",
            align === "center" && "justify-center"
          )}
        >
          {index && (
            <span
              className={cn(
                "font-display text-sm font-bold tabular-nums",
                dark ? "text-white/30" : "text-primary/40"
              )}
            >
              {index}
            </span>
          )}
          <span className="kicker">{label}</span>
        </div>
      </FadeUp>

      <TextReveal
        as="h2"
        text={title}
        className={cn(
          "font-display font-bold leading-[1.02] tracking-tight",
          align === "center" ? "mx-auto max-w-4xl" : "max-w-3xl",
          dark
            ? "text-[clamp(2.5rem,6vw,5rem)] text-gradient"
            : "text-[clamp(2.5rem,6vw,5rem)] text-gradient-dark"
        )}
        delay={0.08}
      />

      {description && (
        <FadeUp delay={0.25}>
          <p
            className={cn(
              "mt-6 max-w-xl text-lg leading-relaxed",
              align === "center" && "mx-auto",
              dark ? "text-zinc-400" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        </FadeUp>
      )}

      {href && linkLabel && (
        <FadeUp delay={0.35}>
          <Link
            href={href}
            className={cn(
              "group mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors",
              dark
                ? "text-zinc-400 hover:text-white"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {linkLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </FadeUp>
      )}
    </div>
  );
}
