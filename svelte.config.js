import preprocess from "svelte-preprocess";
import { resolve } from "path";
import vercel from "@sveltejs/adapter-vercel";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: preprocess({
    postcss: true
  }),

  kit: {
    target: "#svelte",
    adapter: vercel(),
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
