/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme")
import defaultTheme from "tailwindcss/defaultTheme"
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans], // 設定預設字體
      },
      colors: {
        "brand-gray-1": "#dadce0",
        "brand-blue-1": "#1967d2",
        "brand-green-1": "#137333"
      },
    },
  },
  plugins: [],
}

