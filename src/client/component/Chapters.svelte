<script lang="ts">
import type { MangaDetail, ChapterPagination, Chapter } from "api/model";
import EyeIcon from "client/svg/EyeIcon.svelte";
import { onMount } from "svelte";
import db from "client/db";

export let source: string;
export let manga: MangaDetail;
export let pagination: ChapterPagination;

let readChapters: string[] = [];
let chapters: Chapter[] = [];

onMount(() => {
  newPagination(pagination);
  db.readChapters
    .filter((ch) => ch.source === source && ch.manga === manga.id)
    .toArray()
    .then((arr) => (readChapters = arr.map((ch) => ch.chapter)));
});

function newPagination(p: ChapterPagination) {
  pagination = p;
  chapters = [...chapters, ...pagination.chapters.sort((a, b) => b.number - a.number)];
}

function more() {
  const { page, totalPages } = pagination;
  if (page < totalPages) {
    fetch(`/${source}/series/${manga.id}/chapters?page=${page + 1}`).then((res) =>
      res.json().then(newPagination)
    );
  }
}
</script>

<div class="w-full max-w-3xl my-4 mx-auto divide-y divide-gray-200">
  {#each chapters as chapter}
    <div class="flex w-full p-2 group items-center">
      <a class="flex flex-col flex-grow" href="/{source}/series/{manga.id}/{chapter.id}">
        {#if chapter.name}
          <div
            class="text-xs font-bold leading-none transition-colors duration-100 ease-in-out text-gray-400 group-hover:text-gray-500"
          >
            {chapter.volume != undefined ? `Volume ${chapter.volume} - ` : ""}
            Chapter {chapter.number}
          </div>
          <div
            class="text-left leading-none py-1 transition-colors duration-100 ease-in-out text-gray-500 group-hover:text-black"
          >
            {chapter.name}
          </div>
        {:else}
          <div
            class="text-left leading-none py-1  transition-colors duration-100 ease-in-out text-gray-500 group-hover:text-black"
          >
            {chapter.volume != undefined ? `Volume ${chapter.volume} - ` : ""}
            Chapter {chapter.number}
          </div>
        {/if}
        <div
          class="text-xs font-bold leading-none transition-colors duration-100 ease-in-out text-gray-400 group-hover:text-gray-500"
        >
          {chapter.scanlators.join(", ")}
        </div>
      </a>
      {#if readChapters.includes(chapter.id)}
        <div class="text-gray-400"><EyeIcon /></div>
      {/if}
    </div>
  {/each}
  {#if pagination.page < pagination.totalPages}
    <button class="w-full h-8 mx-auto my-2" on:click={more}>More</button>
  {/if}
</div>
