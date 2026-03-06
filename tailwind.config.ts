import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        revlens: {
          navy: "#0A0F1E",
          "navy-light": "#141B30",
          blue: "#0EA5E9",
          "blue-dim": "rgba(14, 165, 233, 0.15)",
          silver: "#E2E8F0",
          "silver-dim": "rgba(226, 232, 240, 0.15)",
          white: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-10px) translateX(5px)" },
          "50%": { transform: "translateY(-5px) translateX(10px)" },
          "75%": { transform: "translateY(5px) translateX(5px)" },
        },
        "float-medium": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-8px) translateX(-5px)" },
          "66%": { transform: "translateY(5px) translateX(-8px)" },
        },
        "float-fast": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-12px) translateX(8px)" },
        },
        "slide-in-bottom": { "0%": { transform: "translateY(20px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        "scale-in": { "0%": { transform: "scale(0.9)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        "wave-slow": { "0%, 100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(-10px)" } },
        "wave-medium": { "0%, 100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(8px)" } },
        "wave-fast": { "0%, 100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(-6px)" } },
        "pulse-subtle": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-medium": "float-medium 6s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "slide-in-bottom": "slide-in-bottom 0.5s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "wave-slow": "wave-slow 15s ease-in-out infinite",
        "wave-medium": "wave-medium 12s ease-in-out infinite",
        "wave-fast": "wave-fast 10s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      boxShadow: {
        "soft-xl": "0 20px 27px 0 rgba(0,0,0,0.3)",
        "blue-glow": "0 0 24px rgba(14, 165, 233, 0.3), 0 0 60px rgba(14, 165, 233, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config