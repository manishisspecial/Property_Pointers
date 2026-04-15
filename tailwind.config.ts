import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f8f9fb",
          100: "#e8eaef",
          200: "#d1d5df",
          300: "#a8b0c2",
          400: "#7a86a0",
          500: "#4a5568",
          600: "#3d4556",
          700: "#2d3344",
          800: "#1f2433",
          900: "#171b26",
          950: "#0f1119",
        },
        gold: {
          50: "#fffbf0",
          100: "#fef3db",
          200: "#fde7b8",
          300: "#fbd889",
          400: "#f7c94d",
          500: "#e6a919",
          600: "#cc8f0d",
          700: "#a96f0f",
          800: "#8a5814",
          900: "#724816",
        },
        warm: {
          50: "#fefdfb",
          100: "#fdfaf5",
          200: "#faf5eb",
          300: "#f5edde",
          400: "#efe3ce",
          500: "#e6d5b8",
        },
        cream: {
          50: "#fefefe",
          100: "#fcfbf9",
          200: "#f9f7f3",
          300: "#f4f1eb",
          400: "#ebe6dc",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "mega-enter": {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "mega-enter": "mega-enter 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
