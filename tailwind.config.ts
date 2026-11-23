import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAFA",
        surface: "#FFFFFF",
        ink: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
        },
        brand: {
          DEFAULT: "#059669", // emerald-600
          dark: "#047857",    // emerald-700
          light: "#10B981",   // emerald-500
          subtle: "#ECFDF5",  // emerald-50
          border: "#A7F3D0",  // emerald-200
        },
        amberBrand: {
          DEFAULT: "#D97706",
          subtle: "#FFFBEB",
          border: "#FDE68A",
        },
        blueBrand: {
          DEFAULT: "#2563EB",
          subtle: "#EFF6FF",
          border: "#BFDBFE",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [typography],
} satisfies Config;
