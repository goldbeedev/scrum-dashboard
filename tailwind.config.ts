import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  daisyui: {
    themes: [
      'light', // default theme
      'dark',  // dark theme
    ],
  },
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
} satisfies Config;
