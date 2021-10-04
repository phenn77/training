module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        "3xl": "1920px",
        "2k": "2560px",
        "4k": "3840px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
