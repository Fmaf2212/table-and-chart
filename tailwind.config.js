/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dashboardBg: '#2C2C2C',
        containerBg: '#3A3A3A',
        primaryText: '#EAEAEA',
        secondaryText: '#B0B0B0',
        titleColor: '#1AB69D',
        borderColor: '#444444',
      },
    },
  },
  plugins: [],
}