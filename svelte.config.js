import preprocess from "svelte-preprocess";
import { resolve } from "path";
import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: preprocess({
    postcss: true
  }),

  kit: {
    target: "#svelte",
    adapter: adapter({
      fallback: "404.html"
    }),
    vite: {
      resolve: {
        alias: {
          tako: resolve("src")
        }
      }
    }
  }
};

export default config;
