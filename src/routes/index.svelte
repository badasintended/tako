<script lang="ts">
  import type { Bookmark } from "tako/database";
  import { database } from "tako/database";
  import { onMount } from "svelte";
  import Title from "tako/component/Title.svelte";

  let bookmarks: Bookmark[] = [];

  onMount(() => {
    database.libraries
      .toArray()
      .then(it => bookmarks = it.sort((a, b) => a.title.localeCompare(b.title)));
  });
</script>

<Title title="library"/>

<div class="pt-2 mb-4">
  <div class="flex flex-wrap justify-center">
    {#each bookmarks as bookmark}
      <a class="flex flex-col w-40 h-72 m-2 group"
         href="/{bookmark.sourceId}/{bookmark.mangaId}">
        <img class="flex-shrink-0 w-40 h-60 object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
             src={bookmark.cover}
             alt={bookmark.title} />
        <div class="text-sm title">
          {bookmark.title}
        </div>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  .title {
    height: 3em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
