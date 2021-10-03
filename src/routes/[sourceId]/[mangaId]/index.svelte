<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { Manga } from "tako/api/model";
  import Detail from "tako/component/manga/Detail.svelte";
  import { database } from "tako/database";
  import ChapterSub from "tako/component/manga/ChapterSub.svelte";
  import FullScreenSpinner from "tako/component/spinner/FullScreenSpinner.svelte";
  import Error from "tako/component/Error.svelte";
  import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import { fade } from "svelte/transition";
  import { chapterSort } from "tako/stores";
  import Title from "tako/component/Title.svelte";

  const { sourceId, mangaId } = $page.params;

  let manga: Manga;
  let bookmarkId = -1;
  let error = false;
  let showChapters = true;

  onMount(() => {
    chapterSort.set(localStorage.getItem("chapterSort") === "-1" ? 1 : -1);
    chapterSort.subscribe(value => localStorage.setItem("chapterSort", value.toString()));

    fetch(`/api/${sourceId}/${mangaId}`)
      .then(res => res.json() as Manga)
      .then(async json => {
        await database.libraries
          .filter(it => it.sourceId === sourceId && it.mangaId === json.id)
          .limit(1)
          .eachPrimaryKey(id => bookmarkId = id);

        for (let chapter of json.chapters) {
          if (!chapter.uploadDate) {
            await database.fakeUploadTimes
              .filter(it => it.id === json.source + json.id + chapter.id)
              .first(it => chapter.uploadDate = it.date)
              .catch(async () => {
                chapter.uploadDate = Date.now() / 1000;
                await database.fakeUploadTimes.add({
                  id: json.source + json.id + chapter.id,
                  date: chapter.uploadDate
                });
              });
          }
        }
        manga = json;
        sortChapterButton();
      })
      .catch(() => error = true);
  });

  function libraryButton() {
    if (bookmarkId !== -1) {
      database.libraries
        .delete(bookmarkId)
        .then(() => bookmarkId = -1);
    } else {
      database.libraries.add({
        sourceId,
        mangaId,
        title: manga.title,
        cover: manga.cover
      }).then(it => bookmarkId = it);
    }
  }

  function sortChapterButton() {
    showChapters = false;
    chapterSort.set($chapterSort * -1);
    manga.chapters.sort((a, b) => (a.number * $chapterSort) - (b.number * $chapterSort));
    setTimeout(() => {
      manga = manga;
      showChapters = true;
    }, 200);
  }
</script>

<Title title={manga?.title} />

{#if (!manga)}
  {#if (error)}
    <Error message="Manga not found" />
  {:else}
    <FullScreenSpinner />
  {/if}
{:else}
  <!-- manga detail -->
  <div class="flex flex-col sm:flex-row w-full border-b border-gray-200 dark:border-gray-700">
    <!-- cover -->
    <div class="min-w-60">
      <img src={manga.cover} alt="" class="w-60 h-80 object-contain mx-auto" />
    </div>

    <div class="flex-grow flex flex-col divide-y divide-gray-200 dark:divide-gray-700 m-2">
      <Detail key="Title">
        {manga.title}
      </Detail>

      {#if (manga.altTitles)}
        <Detail key={`Alternate Title${manga.altTitles.length > 1 ? "s" : ""}`}>
          {manga.altTitles.join(", ")}
        </Detail>
      {/if}

      {#if (manga.authors)}
        <Detail key={`Author${manga.authors.length > 1 ? "s" : ""}`}>
          {manga.authors.join(", ")}
        </Detail>
      {/if}

      {#if (manga.artists)}
        <Detail key={`Artist${manga.artists.length > 1 ? "s" : ""}`}>
          {manga.artists.join(", ")}
        </Detail>
      {/if}

      {#if (manga.tags)}
        <Detail key={`Genre${manga.tags.length > 1 ? "s" : ""}`}>
          {manga.tags.join(", ")}
        </Detail>
      {/if}

      {#if (manga.description)}
        <Detail key="Description">
          <div class="manga-desc">{@html manga.description}</div>
        </Detail>
      {/if}

      <div class="flex flex-row-reverse p-2">
        <!-- library button -->
        <button
          class="outline-none border rounded py-2 px-3 transition-colors duration-100 ease-in-out border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white"
          on:click={libraryButton}>{bookmarkId === -1 ? "Add to" : "Remove from"} Library
        </button>
      </div>
    </div>
  </div>

  <!-- chapter list -->
  <div class="w-full max-w-3xl py-4 mx-auto divide-y divide-gray-200 dark:divide-gray-700">
    <div class="px-2 flex items-center">
      {manga.chapters.length} chapters
      <div class="flex-grow"></div>
      <button class="flex items-center gap-x-1 h-full transition-colors duration-100 ease-in-out p-2 m-auto hover:text-black dark:hover:text-white"
              on:click={sortChapterButton}>
        Sort
        <Fa icon={$chapterSort === -1 ? faCaretDown : faCaretUp} scale={1.1} />
      </button>
    </div>
    {#if (showChapters)}
      {#each manga.chapters as chapter}
        <div class="flex w-full p-2 group items-center" transition:fade={{y: 100, duration:200}}>
          <a class="flex flex-col flex-grow"
             href="/{sourceId}/{manga.id}/{chapter.id}">

            {#if (chapter.name)}
              <ChapterSub>
                {chapter.volume !== undefined ? `Volume ${chapter.volume} - ` : ""}
                Chapter {chapter.number}
              </ChapterSub>
            {/if}

            <div
              class="text-left leading-none py-1 transition-colors duration-100 ease-in-out text-gray-500 group-hover:text-black dark:group-hover:text-one-w">
              {#if (chapter.name)}
                {chapter.name}
              {:else }
                {chapter.volume !== undefined ? `Volume ${chapter.volume} - ` : ""}
                Chapter {chapter.number}
              {/if}
            </div>

            {#if (chapter.scanlators)}
              <ChapterSub>
                {chapter.scanlators.join(", ")}
              </ChapterSub>
            {/if}

            <ChapterSub>
              {new Date(chapter.uploadDate * 1000).toLocaleDateString()}
            </ChapterSub>
          </a>

          <!--        &lt;!&ndash; show an icon if chapter already read &ndash;&gt;-->
          <!--        {#if readChapters.includes(chapter.id)}-->
          <!--          <div class="text-gray-400">-->
          <!--            <EyeIcon />-->
          <!--          </div>-->
          <!--        {/if}-->
        </div>
      {/each}
    {/if}
  </div>

{/if}

<style lang="scss">
  // hacky workaround for some site that use html as a description
  .manga-desc {
    :global(img) {
      display: inline;
      margin: 2px;
    }
  }
</style>