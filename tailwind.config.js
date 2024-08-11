/** @type {import('tailwindcss').Config} */

import twColors from "tailwindcss/colors";

const colors = {
  transparent: twColors.transparent,
  black: "#161D25",
  white: twColors.white,
  primary: "#FF9902",
  secondary: "#161D25",
  "bg-color": "#EEEEEE",
  'bg-color-alt': '#222F3E',
  aqua: "#268697",
  gray: '#39434E'
};

export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    screens: {
      'lg': '1100px',
      '960': '960px',
      'md': '820px',
      'sm': '500px',
      'xs': '400px'
    },
    extend: {
      fontSize: {
        xs: "0.82rem",
        sm: "0.98rem",
        base: "1.15rem",
        lg: "1.22rem",
        xl: "1.36rem",
        "1.5xl": "1.5rem",
        "2xl": "1.725rem",
        "3xl": "2.155rem",
        "4xl": "2.58rem",
        "5xl": "3.45rem",
        "6xl": "4.3rem",
        "7xl": "5.17rem",
        "8xl": "6.9rem",
        "9xl": "9.2rem",
      },
    },
    keyFrames: {
      animationOpacity: {
        from: { opacity: 0.2 },
        to: { opacity: 1 },
      },
      scaleIn: {
        "0%": {
          opacity: 0,
          transform: "scale(0.9)",
        },
        "50%": {
          opacity: 0.3,
        },
        "100%": {
          opacity: 1,
          transform: "scale(1)",
        },
      },
    },
    animation: {
      opacity: "animationOpacity .5s ease-in-out",
      scaleIn: "scaleIn .35s ease-in-out",
    }
  },
  plugins: [],
};
