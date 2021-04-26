<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source } = page.params;
  const index = page.query.get("index");
  const res0 = await fetch(`/api/${source}/indexes`);
  if (res0.status === 200) {
    return {
      props: {
        source: source,
        indexes: await res0.json(),
        index: index
      }
    };
  }
};
</script>

<script lang="ts">
import type { Manga, MangaPagination } from "api/model";
import { Bookmark, db } from "client/db";
import { onMount } from "svelte";

import NavBar from "client/component/NavBar.svelte";
import BookmarkIcon from "client/svg/BookmarkIcon.svelte";

export let source: string;
export let indexes: string[];
export let index: string;

let currentPage = 1;
let totalPages = 1;

let pagination: MangaPagination;

let mangas: Manga[] = [];
let totalManga = 1;

let bookmarks: Bookmark[] = [];

onMount(() => {
  db.libraries.toArray().then((lib) => (bookmarks = lib));
  switchIndex(index || indexes[0], false);
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

function switchIndex(i: string, replace = true) {
  if (replace) {
    history.replaceState({}, document.title, `?index=${i}`);
  }
  index = i;
  fetch(`/api/${source}/${index}`).then((res) =>
    res.json().then((json) => {
      pagination = json;
      mangas = pagination.mangas;
      totalManga = mangas.length;

      currentPage = pagination.page;
      totalPages = pagination.totalPages;
    })
  );
}
</script>

<NavBar />

<div class="pt-2 mb-4">
  <!-- show some meme if the index is empty -->
  {#if totalManga === 0}
    <img
      class="w-72 m-auto"
      src="https://i.kym-cdn.com/photos/images/newsfeed/001/864/893/0d5.png"
      alt="there's nothing here"
    />
  {/if}

  <div class="flex flex-wrap justify-center">
    <!-- if source has multiple indexes, show some buttons to switch between them -->
    {#if indexes.length > 1}
      <div class="flex w-full justify-center space-x-2">
        {#each indexes as index}
          <button
            class="focus:outline-none capitalize border rounded py-2 px-3 transition-colors duration-100 ease-in-out border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
            on:click={() => switchIndex(index)}
            >{index}
          </button>
        {/each}
      </div>
    {/if}

    {#each mangas as manga}
      <a class="flex flex-col w-40 h-72 m-2 group" href="/{source}/series/{manga.id}">
        <img
          class="w-40 h-60 object-cover rounded-md transition-shadow duration-300 ease-in-out group-hover:shadow-2xl"
          src={manga.cover}
          alt={manga.title}
        />
        <div class="flex">
          <div class="flex-grow text-sm line-clamp-2 overflow-ellipsis">
            {manga.title}
          </div>
          {#if bookmarks.some((v) => v.source == manga.source && v.mangaId == manga.id)}
            <div class="text-gray-400"><BookmarkIcon /></div>
          {/if}
        </div>
      </a>
    {/each}
  </div>

  <!-- TODO: make paged indexes load on scroll -->
  {#if currentPage < totalPages}
    <button class="w-full h-8 mx-auto my-2" on:click={more}>More</button>
  {/if}
</div>
