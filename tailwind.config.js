/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,html}", "./blog/**/*.html"],
  theme: {
    extend: {
      
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
