/* eslint-env node */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        13: '52px',
        15: '60px',
        440: '440px',
        900: '900px',
        600: '600px',
        1000: '1000px'
      },
      height: {
        13: '52px',
        15: '60px',
        370: '370px'
      },
      margin: {
        500: '503px'
      },
      padding: {
        440: '440px'
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
