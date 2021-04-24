<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source, index } = page.params;
  const res = await fetch(`/api/${source}/${index}`);
  if (res.status === 200) {
    return {
      props: {
        source: source,
        index: index,
        pagination: await res.json()
      }
    };
  }
};
</script>

<script lang="ts">
import type { MangaPagination, Manga } from "tako/api/model";
import { goto } from "$app/navigation";
import { onMount } from "svelte";
import NavBar from "tako/client/NavBar.svelte";

export let source: string;
export let index: string;
export let pagination: MangaPagination;

let mangas: Manga[] = [];

onMount(() => {
  mangas = pagination.mangas;
});

function more() {
  const { page, totalPages } = pagination;
  if (page < totalPages) {
    fetch(`/api/${source}/${index}?page=${page + 1}`).then((res) =>
      res.json().then((p) => {
        pagination = p;
        mangas = [...mangas, ...pagination.mangas];
      })
    );
  }
}
</script>

<NavBar {source} />

<div class="mt-14 pt-2 mb-4">
  <div class="flex flex-wrap flex-row justify-center">
    {#each mangas as manga}
      <button
        class="m-1 w-40 h-60 bg-contain bg-no-repeat bg-center"
        style="background-image: url({manga.cover})"
        on:click={() => goto(`/${source}/series/${manga.id}`)}
        ><button
          class="p-2 w-40 h-60 bg-gray-300 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
        >
          {manga.title}
        </button></button
      >
    {/each}
  </div>
  {#if pagination.page < pagination.totalPages}
    <button class="w-full h-8 mx-auto my-2" on:click={more}>More</button>
  {/if}
</div>
