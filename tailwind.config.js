/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gabarito: ['Gabarito', 'sans-serif'],
        hammersmithOne: ['Hammersmith One', 'sans-serif'],
      },
      colors: {
        primary: "#67e8f9",
        secundary: "#3A6299",
        nav: "#f1f5f9"
      }
    },
  },
  plugins: [],
}
