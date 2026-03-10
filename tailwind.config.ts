import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      /* ── Typography ── */
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'DM Sans'", "'Segoe UI'", "system-ui", "sans-serif"],
      },

      /* ── AGASA Design System Colors ── */
      colors: {
        // Semantic tokens (CSS vars for light/dark)
        bg: 'var(--bg)',
        'bg-card': 'var(--bg-card)',
        'bg-muted': 'var(--bg-muted)',
        'ds-text': 'var(--text)',
        'ds-text-muted': 'var(--text-muted)',
        'ds-border': 'var(--border)',

        // Institutional colors
        primary: 'var(--primary)',
        agasa: {
          blue: 'var(--blue)',
          emerald: 'var(--emerald)',
          amber: 'var(--amber)',
          rose: 'var(--rose)',
          cyan: 'var(--cyan)',
          violet: 'var(--violet)',
          teal: 'var(--teal)',
          gold: 'var(--gold)',
        },

        // Legacy compat (keep existing classes working during migration)
        'inspect-green': '#1B5E20',
        'inspect-orange': '#E65100',
        'inspect-red': '#B71C1C',
        'inspect-blue': '#0D47A1',
        'terrain-bg': 'var(--bg)',
      },

      /* ── Shadows ── */
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'elegant': 'var(--shadow-elegant)',
        'glow': 'var(--shadow-glow)',
        'terrain': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },

      /* ── Border Radius ── */
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
        'pill': '999px',
      },

      /* ── Animation ── */
      transitionTimingFunction: {
        'agasa': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      /* ── Screens (already Tailwind defaults, documented for clarity) ── */
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      /* ── Max Width ── */
      maxWidth: {
        'reading': '640px', // 65-75 chars at 16px
      },
    },
  },
  plugins: [],
};
export default config;
