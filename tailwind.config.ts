import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'scrum-dark': {
          "primary": "#9333ea", // purple-600
          "primary-focus": "#7c3aed", // purple-700
          "primary-content": "#ffffff",
          "secondary": "#3b82f6", // blue-500
          "secondary-focus": "#2563eb", // blue-600
          "secondary-content": "#ffffff",
          "accent": "#10b981", // emerald-500
          "accent-focus": "#059669", // emerald-600
          "accent-content": "#ffffff",
          "neutral": "#1f2937", // gray-800
          "neutral-focus": "#111827", // gray-900
          "neutral-content": "#ffffff",
          "base-100": "#000000", // black
          "base-200": "#111827", // gray-900
          "base-300": "#1f2937", // gray-800
          "base-content": "#ffffff",
          "info": "#3b82f6", // blue-500
          "success": "#10b981", // emerald-500
          "warning": "#f59e0b", // amber-500
          "error": "#ef4444", // red-500
        },
      },
      'light',
      'dark',
    ],
    darkTheme: "scrum-dark",
  },
} satisfies Config;
