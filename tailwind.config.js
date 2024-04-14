/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          creamy: {
            400: "#FEF6EB",
            500: "#FAEED1",
            600: "#DED0B6",
          },

          dark: {
            800: "#292524",
          },
        },
      },

      // font
      fontFamily: {
        "fira-sans": "Fira sans, sans-serif",
      },
    },

    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};
