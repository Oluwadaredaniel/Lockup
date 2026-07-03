/** @type {import('tailwindcss').Config} */
const { COLORS } = require('../packages/core/theme');

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        background: COLORS.background,
        obsidian: COLORS.obsidian,
        ink: COLORS.obsidian.dark,
        violet: COLORS.primary,
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
