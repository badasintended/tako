<script lang="ts">
import type { MangaDetail } from "api/model";
import db from "client/db";
import { onMount } from "svelte";

export let source: string;
export let manga: MangaDetail;

let libraryId = -1;

onMount(() => {
  db.libraries
    .filter((lib) => lib.source === source && lib.manga === manga.id)
    .limit(1)
    .eachPrimaryKey((key) => (libraryId = key));
});

function libraryButton() {
  if (libraryId === -1) {
    db.libraries
      .add({
        source: source,
        manga: manga.id
      })
      .then((i) => (libraryId = i));
  } else {
    db.libraries.delete(libraryId).then(() => (libraryId = -1));
  }
}
</script>

<div class="flex flex-col sm:flex-row w-full border-b border-gray-200">
  <div class="min-w-60">
    <img src={manga.cover} alt="" class="w-60 h-80 object-contain mx-auto" />
  </div>
  <div class="flex-grow flex flex-col divide-y divide-gray-200 m-2">
    <div class="flex flex-col p-2">
      <div class="text-xs font-bold text-gray-500 leading-none">Title</div>
      <div>{manga.title}</div>
    </div>
    {#if manga.altTitles}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Alternate Title{manga.altTitles.length > 1 ? "s" : ""}
        </div>
        <div>{manga.altTitles.join(", ")}</div>
      </div>
    {/if}
    {#if manga.authors}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Author{manga.authors.length > 1 ? "s" : ""}
        </div>
        <div>{manga.authors.join(", ")}</div>
      </div>
    {/if}
    {#if manga.artists}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Artist{manga.artists.length > 1 ? "s" : ""}
        </div>
        <div>{manga.authors.join(", ")}</div>
      </div>
    {/if}
    {#if manga.genres}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Genre{manga.genres.length > 1 ? "s" : ""}
        </div>
        <div>{manga.genres.join(", ")}</div>
      </div>
    {/if}
    {#if manga.description}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">Description</div>
        <div>{manga.description}</div>
      </div>
    {/if}
    <div class="flex flex-row-reverse p-2">
      <button
        class="focus:outline-none border rounded py-2 px-3 transition-colors duration-100 ease-in-out border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
        on:click={libraryButton}
        >{libraryId === -1 ? "Add to" : "Remove from"} Library</button
      >
    </div>
  </div>
</div>
