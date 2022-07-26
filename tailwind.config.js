/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{html,js}'],
  theme: {
    extend: {
      fontSize: {
        tiny: '.875rem'
      }
    }
  },
  daisyui: {
    themes: ['winter']
  },
  plugins: [require('daisyui')]
}
