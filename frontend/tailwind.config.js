import { colors as myColors } from "./constants";
const { createThemes } = require("tw-colors");
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: {
    safelist: [
      ...myColors.map(
        (color) => `border-[${color?.includes("#") ? color : `#${color}`}]`
      ),
    ],
  },
  theme: {
    fontFamily: {
      merriweather: ["Merriweather", "serif"],
      comfortaa: ["Comfortaa", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
