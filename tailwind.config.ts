import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a5f",
          light: "#2a4f7f",
          dark: "#152d4a",
        },
        gold: {
          DEFAULT: "#c8a45c",
          light: "#d4b574",
          dark: "#b8944c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
