/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'illuma': {
          600: '#7c13de',
          700: '#4a0a97'
        },
        'blakish': {
          400: '#1f1e25',
          500: "#1b1a20",
          600: '#151419'
        },
        'spotify': {
          400: '#1db954'
        }

      },
    },
    
  },
  plugins: [require("tailwind-scrollbar-hide")],
}