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
import type { MangaPagination, Manga } from "api/model";
import { onMount } from "svelte";
import NavBar from "client/component/NavBar.svelte";

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

<div class="pt-2 mb-4">
  {#if mangas.length === 0}
    <img
      class="w-72 m-auto"
      src="https://i.kym-cdn.com/photos/images/newsfeed/001/864/893/0d5.png"
      alt="there's nothing here"
    />
  {/if}
  <div class="flex flex-wrap flex-row justify-center">
    {#each mangas as manga}
      <a class="flex flex-col w-40 h-72 m-2 group" href="/{source}/series/{manga.id}">
        <img
          class="w-40 h-60 object-cover rounded-md transition-shadow duration-300 ease-in-out group-hover:shadow-2xl"
          src={manga.cover}
          alt={manga.title}
        />
        <div class="text-sm line-clamp-2 overflow-ellipsis">
          {manga.title}
        </div>
      </a>
    {/each}
  </div>
  {#if pagination.page < pagination.totalPages}
    <button class="w-full h-8 mx-auto my-2" on:click={more}>More</button>
  {/if}
</div>
