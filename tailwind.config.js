module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      openSans: ['"Open Sans"', "sans-serif"],
    },
    colors: {
      current: "currentColor",
      white: "#fff",
      black: "#000",
      custom: {
        50: "#EFF1F1",
        100: "#E2E8E8",
        200: "#C6D2D2",
        300: "#AABCBC",
        400: "#8DA6A6",
        500: "#718F8F",
        600: "#557979",
        700: "#386363",
        800: "#1C4D4D",
        900: "#003737",
      },
      grey: {
        25: "#FBFBFB",
        50: "#F5F5F5",
        100: "#E7E7E7",
        200: "#D0D0D0",
        300: "#B8B8B8",
        400: "#A1A1A1",
        500: "#898989",
        600: "#727272",
        700: "#5A5A5A",
        800: "#434343",
        900: "#2C2C2C",
      },
      yellow: {
        50: "#fefce8",
        900: "#DFB748",
      },
      orange: {
        900: "#D26636",
      },
      red: {
        50: "#fef2f2",
        600: "#E65153",
        700: "#7E0507",
        800: "#980D0F",
        900: "#B01E20",
      },
      purple: {
        900: "#81386C",
      },
      blue: {
        50: "#eff6ff",
        900: "#2E74B0",
      },
      teal: {
        900: "#23BA9F",
      },
      green: {
        800: "#2D8F6F",
        900: "#169160",
      },
      code: {
        fields: "#A6E0FE",
        values: "#D49C7B",
      },
      menu: {
        header: "#F3F2F1",
        hover: "#F3F2F1",
        active: "#EDEBE9",
      },
    },
    extend: {
      borderColor: (theme) => ({
        DEFAULT: theme("colors.grey.100"),
      }),
      divideColor: (theme) => ({
        DEFAULT: theme("colors.grey.100"),
      }),
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-slower": "spin 20s linear infinite",
      },
      borderWidth: {
        3: "3px",
      },
      textColor: {
        primary: "#2C2C2C",
      },
      zIndex: {
        20000000: "20000000",
      },
      transitionProperty: {
        width: "width",
      },
      transitionDuration: {
        5000: "5000ms",
      },
      backgroundImage: {
        "location-not-found": "url('assets/pngs/no-location-bg-image.png')",
      },
      height: {
        128: "32rem",
        192: "48rem",
        "screen-9/20": "45vh",
      },
    },
  },
  plugins: [],
};
