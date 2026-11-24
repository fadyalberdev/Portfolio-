import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0b09",
        coal: "#16130f",
        paper: "#efe8dc",
        muted: "#9a9084",
        line: "rgba(239,232,220,0.13)",
        accent: "#ffa31a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1440px" },
      transitionTimingFunction: { out: "cubic-bezier(0.16, 1, 0.3, 1)", in: "cubic-bezier(0.7, 0, 0.84, 0)" },
    },
  },
  plugins: [],
};

export default config;
