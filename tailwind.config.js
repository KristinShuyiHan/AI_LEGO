/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        "dark-gray": "#D7D7D7",
        "regular-gray": "#F2F2F2",
        "cambridge-blue": "#FF5964",
        "tea-green": "#CCDDD3",
        "munsell-blue": "#CCDDD3",
        problem: "#f0a9ae",
        task: "#b9b9d3",
        data: "#d7e6b7",
        model: "#b9fbe7",
        train: "#b2d1ff",
        test: "#7BC2DA",
        deploy: "#faea82",
        feedback: "#ABC28B",
        modelDev: "#faea82",
        modelEva: "#7BC2DA",
        MLOps: "#ABC28B",
        design: "#C7DE33",
        develop: "#E49675",
        "cardet-gray": "#9CAFB7",
        sage: "#ADB993",
        citron: "#D0D38F",
      },
    },
  },
  plugins: [],
};
