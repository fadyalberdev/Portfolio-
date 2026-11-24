import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a09",
        paper: "#f2f0ea",
        muted: "#8f8d86",
        line: "rgba(242,240,234,0.12)",
        accent: "#c8ff2e",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1440px" },
    },
  },
  plugins: [],
};

export default config;
