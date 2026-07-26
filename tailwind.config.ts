import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#f2edea",
        surface: "rgb(255 255 255 / 0.6)",
        foreground: "#0a0a0a",
        muted: "#52525b",
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-jp)",
          "Arial",
          "Helvetica Neue",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "Meiryo",
          "sans-serif",
        ],
      },
    },
  },
};

export default config;
