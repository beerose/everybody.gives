module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'background': '#EDE7E2',
      'action': '#EDE7E2'
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}