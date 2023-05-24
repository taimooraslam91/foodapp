/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const forms = require("@tailwindcss/forms");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      height: {
        200: "200px",
      },
    },
  },
  plugins: [forms()],
};
