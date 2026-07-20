// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "bounce-more": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25px)" },
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        monoton: ["Monoton", "cursive"],
      },
      animation: {
        "bounce-more":
          "bounce-more 1s infinite cubic-bezier(0.28, 0.84, 0.42, 1)",
      },
    },
  },
};
