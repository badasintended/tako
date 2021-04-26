<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source, manga } = page.params;
  const detail = await fetch(`/api/${source}/series/${manga}/detail`);
  const chapters = await fetch(`/api/${source}/series/${manga}/chapters`);

  if (detail.status === 200 && chapters.status === 200) {
    return {
      props: {
        source: source,
        manga: await detail.json(),
        chapters: await chapters.json()
      }
    };
  }

  return {
    status: 404
  };
};
</script>

<script lang="ts">
import type { MangaDetail, Chapter } from "api/model";
import { onMount } from "svelte";
import { session } from "$app/stores";
import { db } from "client/db";
import EyeIcon from "client/svg/EyeIcon.svelte";
import NavBar from "client/component/NavBar.svelte";

export let source: string;
export let manga: MangaDetail;
export let chapters: Chapter[];

let readChapters: string[] = [];
let libraryId = -1;

onMount(async () => {
  for (const chapter of chapters) {
    if (!chapter.uploadDate) {
      await db.fakeUploadTimes
        .filter((it) => it.id === chapter.source + chapter.manga + chapter.id)
        .first((fake) => (chapter.uploadDate = fake.date))
        .catch(async () => {
          chapter.uploadDate = Date.now() / 1000;
          await db.fakeUploadTimes.add({
            id: chapter.source + chapter.manga + chapter.id,
            date: chapter.uploadDate
          });
        });
    }
  }

  chapters = chapters.sort((a, b) => b.number - a.number);

  db.readChapters
    .filter((ch) => ch.source === source && ch.manga === manga.id)
    .toArray((arr) => (readChapters = arr.map((ch) => ch.chapter)));

  db.libraries
    .filter((lib) => lib.source === source && lib.mangaId === manga.id)
    .limit(1)
    .eachPrimaryKey((key) => (libraryId = key));

  $session.manga = manga;
  $session.chapters = chapters;
});

function libraryButton() {
  if (libraryId === -1) {
    db.libraries
      .add({
        source: source,
        mangaId: manga.id,
        title: manga.title,
        cover: manga.cover
      })
      .then((i) => (libraryId = i));
  } else {
    db.libraries.delete(libraryId).then(() => (libraryId = -1));
  }
}
</script>

<NavBar />

<!-- manga detail -->
<div class="flex flex-col sm:flex-row w-full border-b border-gray-200">
  <!-- cover -->
  <div class="min-w-60">
    <img src={manga.cover} alt="" class="w-60 h-80 object-contain mx-auto" />
  </div>

  <div class="flex-grow flex flex-col divide-y divide-gray-200 m-2">
    <!-- title -->
    <div class="flex flex-col p-2">
      <div class="text-xs font-bold text-gray-500 leading-none">Title</div>
      <div>{manga.title}</div>
    </div>

    <!-- alternate titles -->
    {#if manga.altTitles}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Alternate Title{manga.altTitles.length > 1 ? "s" : ""}
        </div>
        <div>{manga.altTitles.join(", ")}</div>
      </div>
    {/if}

    <!-- authors -->
    {#if manga.authors}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Author{manga.authors.length > 1 ? "s" : ""}
        </div>
        <div>{manga.authors.join(", ")}</div>
      </div>
    {/if}

    <!-- artists -->
    {#if manga.artists}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Artist{manga.artists.length > 1 ? "s" : ""}
        </div>
        <div>{manga.authors.join(", ")}</div>
      </div>
    {/if}

    <!-- genres -->
    {#if manga.genres}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">
          Genre{manga.genres.length > 1 ? "s" : ""}
        </div>
        <div>{manga.genres.join(", ")}</div>
      </div>
    {/if}

    <!-- description -->
    {#if manga.description}
      <div class="flex flex-col p-2">
        <div class="text-xs font-bold text-gray-500 leading-none">Description</div>
        <div>{manga.description}</div>
      </div>
    {/if}

    <div class="flex flex-row-reverse p-2">
      <!-- library button -->
      <button
        class="focus:outline-none border rounded py-2 px-3 transition-colors duration-100 ease-in-out border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
        on:click={libraryButton}
        >{libraryId === -1 ? "Add to" : "Remove from"} Library</button
      >
    </div>
  </div>
</div>

<!-- Chapter List -->
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
        <div
          class="text-xs font-bold leading-none transition-colors duration-100 ease-in-out text-gray-400 group-hover:text-gray-500"
        >
          {new Date(chapter.uploadDate * 1000).toLocaleDateString()}
        </div>
      </a>

      <!-- show an icon if chapter already read -->
      {#if readChapters.includes(chapter.id)}
        <div class="text-gray-400"><EyeIcon /></div>
      {/if}
    </div>
  {/each}
</div>
