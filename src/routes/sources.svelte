<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const res = await fetch("/api/sources");
  return {
    props: {
      sources: await res.json()
    }
  };
};
</script>

<script lang="ts">
import type { Source } from "api/model";

import NavBar from "client/component/NavBar.svelte";

export let sources: Record<string, Source>;
</script>

<NavBar />

<div class="w-full max-w-3xl my-4 mx-auto divide-y divide-gray-200">
  {#each Object.entries(sources) as [id, source]}
    <div class="flex w-full p-2 group items-center">
      <a class="flex flex-col flex-grow" href="/{id}">
        <div
          class="text-left leading-none py-1 transition-colors duration-100 ease-in-out text-gray-500 group-hover:text-black"
        >
          {source.name}
        </div>
        <div
          class="text-xs font-bold leading-none transition-colors duration-100 ease-in-out text-gray-400 group-hover:text-gray-500"
        >
          {JSON.parse(JSON.stringify(source))["baseUrl"]}
        </div>
      </a>
    </div>
  {/each}
</div>
