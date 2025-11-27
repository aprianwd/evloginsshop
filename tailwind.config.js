/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Oswald', 'sans-serif'], 
      },
      colors: {
        background: '#050505',
        surface: '#121212',
        primary: '#9333ea',
        'primary-hover': '#7e22ce',
        secondary: '#a1a1aa',
      }
    },
  },
  plugins: [],
}