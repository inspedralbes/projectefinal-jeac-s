

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-all': "url('/public/retroNeo.jpg')",
        }
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: 'class',
}

