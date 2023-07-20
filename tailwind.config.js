/* eslint-env node */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        13: '3.25rem',
        15: '3.75rem',
        440: '27.5rem',
        900: '56.25rem',
        600: '37.5rem',
        1000: '62.5rem'
      },
      height: {
        13: '3.25rem',
        15: '3.75rem',
        370: '23.125rem',
        1000: '62.5rem'
      },
      margin: {
        500: '31.438rem'
      },
      padding: {
        440: '27.5rem'
      },
      colors: {
        ...defaultColors,
        ...{
          'light-gray': '#CED4DA',
          'default-bg': '#24222F',
          'medium-gray': '#EFEFEF33',
          'text-gray': '#6C757D',
          'border-gray': '#6C757DB2',
          'light-red': '#E31221',
          'light-green': '#198754',
          'modal-text': '#9c9a9a',
          'modal-border': '#CED4DA33'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
