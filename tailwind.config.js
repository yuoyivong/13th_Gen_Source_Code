const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1B3764",
        secondary: "#FFCA42",
      },

      backgroundImage: {
        "homepage-header": "url('/images/Homepage Header.svg')",
        "book-page-header": "url('/images/Book Header.svg')",
        "book-by-id-page": "url('/images/get by id background.svg')",
      },
    },
  },
  plugins: [nextui()],
};
