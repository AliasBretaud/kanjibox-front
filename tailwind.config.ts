import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          navy: "#3f51b5",
          high: "#526bf5",
        },
        grey: {
          dark: "#282c34",
        },
      },
    },
    fontFamily: {
      kanji: [
        "'Hiragino Kaku Gothic Pro'",
        "'ヒラギノ角ゴ Pro W3'",
        "Meiryo",
        "メイリオ",
        "Osaka",
        "'MS PGothic'",
        "arial",
        "helvetica",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
export default config;
