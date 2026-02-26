import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'inspect-green': '#1B5E20',
        'inspect-orange': '#E65100',
        'inspect-red': '#B71C1C',
        'inspect-blue': '#0D47A1',
        'terrain-bg': '#F5F5F5',
      },
      boxShadow: {
        'terrain': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
