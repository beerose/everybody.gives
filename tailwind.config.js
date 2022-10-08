module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'background': '#EDE7E2',
      'action': '#F5FF7D'
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}