/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./middleware/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        primary: ["var(--roboto-font)", ...fontFamily.sans],
        serif: ["var(--roboto-font)", ...fontFamily.serif],
      },
      maxWidth: {
        "8xl": "1620px",
        "3xl": "1460px",
        kbcontainer: "1110px",
        lpcontainer: "1280px",
        smcontainer: "890px",
      },
      colors: {
        colors: {
          brandcolor: {
            moto: "#44C889",
            cozy: "#54ACAE",
          },
        },
        help: {
          DEFAULT: "#699BF7",
        },
        interactive: {
          lightest: "#80C344",
          light: "#80C344", //ногоон өнгө
          DEFAULT: "#0C529D", //шар өнгө
          dark: "#1D9FD9", //хөх өнгө
          darkest: "#1D9FD9",
        },
        primary: "var(--primary)",
        "primary-2": "var(--primary-2)",
        secondary: "var(--secondary)",
        "secondary-2": "var(--secondary-2)",
        violet: "var(--violet)",
        "violet-light": "var(--violet-light)",
        "violet-dark": "var(--violet-dark)",
        cyan: "var(--cyan)",
        transparent: "transparent",
        current: "currentColor",
        blue: colors.blue,
        pink: colors.pink,
        green: colors.emerald,
        red: colors.red,
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        yellow: colors.amber,
        indigo: colors.indigo,
        purple: colors.violet,
      },
      screens: {
        xs: "320px",
        sm: "540px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1300px",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        keyframes: {
          wiggle: {
            "0%, 100%": { transform: "rotate(-3deg)" },
            "50%": { transform: "rotate(3deg)" },
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-out-down": "fade-out-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-out-up": "fade-out-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
