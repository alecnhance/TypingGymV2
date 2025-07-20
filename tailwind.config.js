/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        headerGray: '#2D2D2D',
        navOrange: '#F5972F',
        mainBackground: '#161616',
        worstAcc: '#7f1d1d',
        secondWorstAcc: '#dc2626',
        belowAvgAcc: '#ea580c',
        aboveAvgAcc: '#ca8a04',
        secondBestAcc: '#8bc34a',
        bestAcc: '#16a34a'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

