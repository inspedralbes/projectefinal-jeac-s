/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'retro-neo':  "url('/public/retroNeo.jpg')",
        'space-planet': "url('/public/Background_planets.jpg')",
        'future-city': "url('/public/Background_future.jpg')",
        }
    },
  },
  plugins: [],
  darkMode: 'class',
}

