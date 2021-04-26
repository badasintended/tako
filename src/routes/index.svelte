<script lang="ts">
import NavBar from "client/component/NavBar.svelte";
import { db, Bookmark } from "client/db";
import { onMount } from "svelte";

let bookmarks: Bookmark[] = [];

onMount(() => {
  db.libraries
    .toArray()
    .then((lib) => (bookmarks = lib.sort((a, b) => a.title.localeCompare(b.title))));
});
</script>

<NavBar />
<div class="pt-2 mb-4">
  <div class="flex flex-wrap justify-center">
    {#if bookmarks.length === 0}
      <div>Your library is empty, add some manga from the sources page.</div>
    {/if}
    {#each bookmarks as bookmark}
      <a
        class="flex flex-col w-40 h-72 m-2 group"
        href="/{bookmark.source}/series/{bookmark.mangaId}"
      >
        <img
          class="w-40 h-60 object-cover rounded-md transition-shadow duration-300 ease-in-out group-hover:shadow-2xl"
          src={bookmark.cover}
          alt={bookmark.title}
        />
        <div class="text-sm line-clamp-2 overflow-ellipsis">
          {bookmark.title}
        </div>
      </a>
    {/each}
  </div>
</div>
