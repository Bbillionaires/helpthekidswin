import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hallway: {
          void: "#05030a",
          panel: "#0f0a1e",
          gold: "#e8b86d",
          ember: "#ff6a3d",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "hallway-floor":
          "radial-gradient(ellipse at 50% 0%, rgba(232,184,109,0.15), transparent 60%)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.85" },
          "50%": { opacity: "0.6" },
          "55%": { opacity: "0.9" },
        },
        drift: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        flicker: "flicker 6s ease-in-out infinite",
        drift: "drift 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
