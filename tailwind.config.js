/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./constants.tsx",
  ],
  theme: {
    extend: {
      colors: {
        church: {
          red: '#7B1113',
          gold: '#E5B200',
        }
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Ethiopic", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Noto Serif Ethiopic", "serif"],
      }
    },
  },
  plugins: [],
}
