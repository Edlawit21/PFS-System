/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"; // Import Tailwind plugin function

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.4xl") }, // Changed '2xl' to '4xl' for h1
        h2: { fontSize: theme("fontSize.2xl") }, // Changed 'xl' to '3xl' for h2
        h3: { fontSize: theme("fontSize.xl") }, // Changed 'lg' to '2xl' for h3
        h4: { fontSize: theme("fontSize.lg") }, // Added example for h4
        h5: { fontSize: theme("fontSize.lg") }, // Added example for h5
        h6: { fontSize: theme("fontSize.base") }, // Added example for h6
      });
    }),
  ],
};
