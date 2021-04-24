const preprocess = require("svelte-preprocess");
const { resolve } = require("path");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: preprocess({
    postcss: true
  }),

  kit: {
    target: "#svelte",
    vite: {
      resolve: {
        alias: {
          tako: resolve(__dirname, "src")
        }
      }
    }
  }
};
