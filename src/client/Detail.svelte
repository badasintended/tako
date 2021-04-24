<script lang="ts">
import type { MangaDetail } from "tako/api/model";

export let manga: MangaDetail;
</script>

<div class="flex flex-col sm:flex-row w-full border-b border-gray-200">
  <div class="min-w-60">
    <img src={manga.cover} alt="" class="w-60 h-80 object-contain mx-auto" />
  </div>
  <div class="flex-grow flex flex-col py-2 space-y-1">
    <div class="flex flex-col px-2 py-1">
      <div class="text-xs font-bold text-gray-500 leading-none">Title</div>
      <div>{manga.title}</div>
    </div>
    {#if manga.altTitles}
      <div class="flex flex-col px-2 py-1">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Alternate Title{manga.altTitles.length > 1 ? "s" : ""}
        </div>
        <div>{manga.altTitles.join(", ")}</div>
      </div>
    {/if}
    {#if manga.authors}
      <div class="flex flex-col px-2 py-1">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Author{manga.authors.length > 1 ? "s" : ""}
        </div>
        <div>{manga.authors.join(", ")}</div>
      </div>
    {/if}
    {#if manga.genres}
      <div class="flex flex-col px-2 py-1">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Genre{manga.genres.length > 1 ? "s" : ""}
        </div>
        <div>{manga.genres.join(", ")}</div>
      </div>
    {/if}
    {#if manga.description}
      <div class="flex flex-col px-2 py-1">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Description
        </div>
        <div>{manga.description}</div>
      </div>
    {/if}
  </div>
</div>
