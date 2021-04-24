<script lang="ts">
import type { MangaDetail, ChapterPagination, Chapter } from "tako/api/model";
import { goto } from "$app/navigation";
import { onMount } from "svelte";

export let source: string;
export let manga: MangaDetail;
export let pagination: ChapterPagination;

let chapters: Chapter[] = [];
onMount(() => {
  chapters = pagination.chapters;
});

function more() {
  const { page, totalPages } = pagination;
  if (page < totalPages) {
    fetch(`/${source}/series/${manga.id}/chapters?page=${page + 1}`).then(
      (res) =>
        res.json().then((p) => {
          pagination = p;
          chapters = [...chapters, ...pagination.chapters];
        })
    );
  }
}
</script>

<div class="w-full max-w-3xl my-4 mx-auto">
  {#each chapters as chapter}
    <button
      class="flex w-full flex-col px-2 py-2 border-b border-gray-200"
      on:click={() => goto(`/${source}/series/${manga.id}/${chapter.id}`)}
    >
      {#if chapter.name}
        <div class="text-xs font-bold text-gray-500 leading-none">
          {chapter.volume != undefined ? `Volume ${chapter.volume} - ` : ""}
          Chapter {chapter.number}
        </div>
        <div class="text-left leading-none py-1">{chapter.name}</div>
      {:else}
        <div class="text-left leading-none py-1">
          {chapter.volume != undefined ? `Volume ${chapter.volume} - ` : ""}
          Chapter {chapter.number}
        </div>
      {/if}
      <div class="text-xs font-bold text-gray-500 leading-none">
        {chapter.scanlators.join(", ")}
      </div>
    </button>
  {/each}
  {#if pagination.page < pagination.totalPages}
    <button class="w-full h-8 mx-auto my-2" on:click={more}>More</button>
  {/if}
</div>
