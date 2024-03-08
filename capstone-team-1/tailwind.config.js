/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_bg: "hsl(180, 52%, 96%)",
        primary_dark_cyan: "rgb(11, 74, 143, 0.4)",
        //
        dark_gray_cyan: "#7b8e8e",
        filter_tablets: "#eef6f6",
        light_grayish_cyan_filter_pill: "hsl(180,31%,95%)",
      },
    },
  },
  plugins: [],
};
