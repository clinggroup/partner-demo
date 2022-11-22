/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(146deg 100% 27% / <alpha-value>)',
          50: 'hsl(132deg 50% 94% / <alpha-value>)',
          100: 'hsl(133deg 60% 87% / <alpha-value>)',
          200: 'hsl(137deg 66% 71% / <alpha-value>)',
          300: 'hsl(140deg 75% 55% / <alpha-value>)',
          400: 'hsl(143deg 85% 39% / <alpha-value>)',
          500: 'hsl(146deg 100% 27% / <alpha-value>)',
          600: 'hsl(149deg 100% 21% / <alpha-value>)',
          700: 'hsl(152deg 100% 17% / <alpha-value>)',
          800: 'hsl(155deg 100% 11% / <alpha-value>)',
          900: 'hsl(159deg 100% 7% / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}
