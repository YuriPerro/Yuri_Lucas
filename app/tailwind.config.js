module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        100: "400px",
        120: "480px",
        160: "640px",
        200: "800px",
      },
    },
    fontFamily: {
      body: ["Poppins"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
