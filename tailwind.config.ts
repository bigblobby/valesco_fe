import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": 'var(--primary)',
        "primary-dark": 'var(--primary-dark)',
        "muted": 'var(--muted)',
        "destructive": 'var(--destructive)',
        "destructive-dark": 'var(--destructive-dark)',
      }
    },
  },
  plugins: [
      require('tailwindcss-animate')
  ],
  darkMode: 'class'
};
export default config;
