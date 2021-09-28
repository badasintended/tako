const config = {
  mode: "jit",
  darkMode: "class",
  purge: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      minWidth: {
        60: "15rem"
      },
      fontFamily: {
        sans:
          "Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
      },
      colors: {
        "one-b": "#282c34",
        "one-w": "#abb2bf"
      }
    },
    plugins: []
  }
};

module.exports = config;
