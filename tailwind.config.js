/* eslint-env node */
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
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
