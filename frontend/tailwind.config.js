import { colors } from "./constants";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: {
    safelist: [
      ...colors.map(
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
