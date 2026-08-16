import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#f2edea",
        surface: "rgb(255 255 255 / 0.6)",
        chrome: "#faf8f6",
        foreground: "#0a0a0a",
        muted: "#52525b",
      },
      borderRadius: {
        panel: "1.75rem",
      },
      boxShadow: {
        soft: "0 12px 30px rgb(72 54 44 / 0.06)",
        card: "0 12px 36px rgb(72 54 44 / 0.08)",
        raised: "0 18px 42px rgb(72 54 44 / 0.13)",
        panel: "0 24px 70px rgb(72 54 44 / 0.12)",
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
