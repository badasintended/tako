import preprocess from "svelte-preprocess";
import { resolve } from "path";
import vercel from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: true
  }),

  kit: {
    target: "#svelte",
    vite: {
      resolve: {
        alias: {
          api: resolve("src/api"),
          client: resolve("src/client"),
          routes: resolve("src/routes"),
          sources: resolve("src/sources")
        }
      }
    },
    adapter: vercel()
  }
};

export default config;
