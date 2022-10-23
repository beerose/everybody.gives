const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",

      red: colors.red,
      gray: colors.stone,
      primary: colors.emerald,
      background: "#EDE7E2",
      action: "#F5FF7D",
    },
    fontFamily: {
      sans: ["Arima Madurai", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
