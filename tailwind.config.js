/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "left-to-right":
          "left-to-right 1s cubic-bezier(0.165, 0.84, 0.44, 1) backwards",
      },
      keyframes: {
        "left-to-right": {
          "0%": { transform: "translateX(-200%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
