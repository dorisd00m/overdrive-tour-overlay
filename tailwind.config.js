const { addDynamicIconSelectors } = require("@iconify/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'anta': ["Anta", 'sans-serif'],
        'anton': ["Anton", 'sans-serif'],
        'jersey': ["Jersey 10", 'sans-serif'],
        'digital': ["digital-7", 'sans-serif'],
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
}