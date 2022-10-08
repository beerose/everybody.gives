const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'background': '#EDE7E2',
      'action': '#F5FF7D'
    },
    fontFamily: {
      'sans': ['Arima Madurai', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}