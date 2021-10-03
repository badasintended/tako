<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from "@sveltejs/kit";
  import type { ParseResult } from "tako/api/source";

  export async function load(ctx: LoadInput): Promise<LoadOutput> {
    const parse = ctx.page.query.get("q");
    if (!parse) return {};

    const res = await ctx.fetch(`/api/parse?q=${parse}`);
    if (!res.ok) return {};
    const json: ParseResult = await res.json();
    return {
      status: 301,
      redirect: `/${json.sourceId}/${json.mangaId}/${json.chapterId ?? ""}`
    };
  }
</script>

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

<Title title="library" />
<div class="mb-4">
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
