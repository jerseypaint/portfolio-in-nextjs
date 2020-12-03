module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '5/6': '83.33333%',
        'full': '100%',
        '66vh': '66vh'
      },
      colors: {
        'brand-purple': '#8884FF',
        'brand-gray': '#5D576B',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
