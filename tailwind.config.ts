import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F0E7",
        canvas: "#2A1915",
        ink: "#2A1915",
        surface: "#FFFDF9",
        "terracotta-dark": "#9F452F",
        muted: "#68544C",
        subtle: "#806A60",
        "footer-muted": "#BCA79D",
      },
      fontFamily: {
        sans: [
          "Figtree Variable",
          "Noto Sans JP Variable",
          "Arial",
          "Helvetica Neue",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "Meiryo",
          "sans-serif",
        ],
      },
      maxWidth: {
        site: "1800px",
      },
      height: {
        "hero-mobile": "60svh",
      },
      gridTemplateColumns: {
        site: "30fr 52fr 18fr",
      },
      transitionTimingFunction: {
        pop: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
};

export default config;
