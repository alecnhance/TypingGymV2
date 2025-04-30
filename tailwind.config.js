/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        headerGray: '#2D2D2D',
        navOrange: '#F5972F',
        mainBackground: '#181414',
      },
    },
  },
  plugins: [],
}

