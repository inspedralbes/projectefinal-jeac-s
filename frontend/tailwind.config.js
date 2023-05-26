

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
        'image-all': "url('/public/retroNeo.jpg')",
        'image-arcade': "url('/public/Arcade.jpg')",
        }
    },
  },
  plugins: [],
  darkMode: 'class',
}

