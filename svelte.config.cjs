const preprocess = require("svelte-preprocess");
const vercel = require("@sveltejs/adapter-vercel");
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
          api: resolve(__dirname, "src/api"),
          client: resolve(__dirname, "src/client"),
          routes: resolve(__dirname, "src/routes"),
          sources: resolve(__dirname, "src/sources")
        }
      }
    },
    adapter: vercel()
  }
};
