/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pink: "#ffee99",
        purple: "#FFAB33",
        "light-gray": "#E5E5E5",
        "thin-light-gray": "#858D98",
        "dark-gray": "#374557",
        "lighter-gray": "#878F9A",
        "light-purple": "#E3E4FE",
        gold: "#F2994A",
        "light-green": "#27AE60",
        "light-red": "#EB5757",
        "white-opacity": "#7B7EFC",
        "dark-white": "#1D1F2F",
        "dark-light-purple": "#FFAB3329",
      },
      animation: {
        fly: "fly 6s cubic-bezier(0.75, 0.02, 0.31, 0.87) infinite",
        marquee: "marquee 60s linear infinite",
        marqueeRight: "marqueeRight 60s linear infinite",
        heartBeat: "heartBeat 1s cubic-bezier(0.75, 0.02, 0.31, 0.87) infinite",
        progress: "progress 5s linear",
        "spin-slow": "spin 10s linear infinite",
        gradient: "gradient 6s linear infinite",
        gradientDiagonal: "gradientDiagonal 6s linear infinite",
        fade: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fly: {
          "0%, 100%": { transform: "translateY(5%)" },
          "50%": { transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          to: { transform: "translateX(-2322px)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-2322px)" },
          to: { transform: "translateX(0)" },
        },
        heartBeat: {
          "0%, 40%, 80%, 100%": { transform: "scale(1.1)" },
          "20%, 60%": { transform: "scale(.8)" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        gradient: {
          "100%": { backgroundPosition: "200% center" },
        },
        gradientDiagonal: {
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  // plugins: [require("@tailwindcss/line-clamp")],
};
