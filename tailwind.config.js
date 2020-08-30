const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Lato", ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {},
  plugins: [],
};
