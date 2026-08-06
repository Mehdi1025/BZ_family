import type { Config } from "tailwindcss";

/**
 * BZ Family — Design system raffiné
 * Bleu institutionnel + ambre chaleureux · papier crème · lignes douces
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Tokens éditoriaux (alias sémantiques) */
        encre: "#111827",
        line: "#E7E5E4",
        outremer: {
          DEFAULT: "#1E40AF",
          deep: "#1E3A8A",
          soft: "#DBEAFE",
        },
        rose: {
          DEFAULT: "#D97706",
          deep: "#B45309",
          soft: "#FEF3C7",
        },
        jaune: "#F59E0B",
        papier: {
          DEFAULT: "#FAFAF9",
          deep: "#F5F5F4",
        },

        primary: {
          DEFAULT: "#3B82F6",
          glow: "#60A5FA",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        accent: {
          DEFAULT: "#D97706",
          warm: "#B45309",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        surface: {
          DEFAULT: "#FAFAF9",
          muted: "#F5F5F4",
        },
        foreground: {
          DEFAULT: "#111827",
          muted: "#57534E",
        },
        border: "#E7E5E4",
        input: "#E7E5E4",
        ring: "#1E40AF",
        background: "#FAFAF9",
        destructive: "#DC2626",
        "destructive-foreground": "#FFFFFF",
        muted: {
          DEFAULT: "#F5F5F4",
          foreground: "#57534E",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": [
          "clamp(2.25rem,5vw,3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(2.75rem,7vw,5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(3rem,9vw,7rem)",
          { lineHeight: "1", letterSpacing: "-0.035em" },
        ],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(17, 24, 39, 0.06)",
        card: "0 4px 24px rgba(17, 24, 39, 0.08)",
        lift: "0 8px 32px rgba(30, 64, 175, 0.12)",
        stamp: "0 4px 0 0 #1E40AF",
      },
      transitionTimingFunction: {
        press: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
