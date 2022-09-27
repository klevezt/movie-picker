/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: "#f43f5e !important",
        customSuccess: "#5ed0aa !important",
        customDark: "#2b2627",
      },
      transitionDuration: {
        800: "800ms",
      },
    },
  },
  plugins: [],
};
