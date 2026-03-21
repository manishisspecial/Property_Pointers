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
          50: "#f0f1f8",
          100: "#d4d7e8",
          200: "#a9aed1",
          300: "#7e86ba",
          400: "#535da3",
          500: "#2d3561",
          600: "#252d52",
          700: "#1d2443",
          800: "#161c35",
          900: "#111728",
          950: "#0d1120",
        },
        gold: {
          50: "#fdf8ed",
          100: "#f9edd0",
          200: "#f3daa1",
          300: "#edc872",
          400: "#e7b543",
          500: "#d4a843",
          600: "#b88a30",
          700: "#9a6d28",
          800: "#7c5520",
          900: "#5e3e18",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
