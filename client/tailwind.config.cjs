/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#1a1a1a",
        "secondary-black": "#2d2d2d",
        "tersiary-black": "#2c343e",
        "box-primary": "#2d2d2d",
        "box-secondary": "#4a4a4a",
        "box-tersiary": "#3e3d3d",
        "grays": "#5e5e5e",
        "darky-gray": "#868686",
        "light-gray": "#b5a9a9",
        "grayish": "#f9f9f9",
        "light-green": "#39d353",
        "dark-green": "#26a641"
      },
      spacing: {
        "logo": "32px",
      },
      spacing: {
        "small": "20rem",
        "320": "320px",
        "400": "400px",
        "500": "500px",
        "700": "700px",
        "large": "1280px",
      },
      screens: {
        "mobile": { max: "507px" }, // min-width(1049px)
        "desktop": "1049px", // min-width(1049px)
      }
    },
  },
  plugins: [],
}
