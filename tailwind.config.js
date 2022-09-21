/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: "#f43f5e",
        customSuccess: "#5ed0aa",
        customDark: "#2b2627",
      },
    },
  },
  plugins: [],
};
