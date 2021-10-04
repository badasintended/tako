<script lang="ts">
  import { page } from "$app/stores";
  import { currentManga, showNavBar } from "tako/stores";
  import { onMount } from "svelte";
  import type { Chapter, Manga, Page } from "tako/api/model";
  import { database } from "tako/database";
  import { goto } from "$app/navigation";

  const { sourceId, mangaId, chapterId } = $page.params;

  $showNavBar = false;
  let manga = $currentManga;
  let chapters: Chapter[] = [];
  let pages: Page[] = [];

  const mangaPage = `/${sourceId}/${mangaId}`;
  let prevChapter: string = null;
  let nextChapter: string = null;

  let progress;
  $: progress = $page.query.get("last") === "true" ? pages.length - 1 : 0;

  onMount(() => {
    let promise: Promise<any>;
    if (!(manga && manga.source === sourceId && manga.id === mangaId)) {
      promise = fetch(`/api/${sourceId}/${mangaId}`)
        .then(it => it.json() as Manga)
        .then(it => $currentManga = manga = it);
    } else {
      promise = Promise.resolve();
    }

    promise.then(() =>
      fetch(`/api/${sourceId}/${mangaId}/${chapterId}`)
        .then(it => it.json() as Page[])
        .then(it => {
          chapters = manga.chapters.sort((a, b) => b.number - a.number);
          const i = chapters.findIndex((ch) => ch.id === chapterId);
          if (0 <= i && i < chapters.length - 1) prevChapter = `/${sourceId}/${mangaId}/${chapters[i + 1].id}`;
          if (0 < i && i < chapters.length) nextChapter = `/${sourceId}/${mangaId}/${chapters[i - 1].id}`;

          pages = it.sort((a, b) => a.index - b.index);

          database.readChapters
            .filter(it => it.sourceId === sourceId && it.mangaId === mangaId && it.chapterId === chapterId)
            .count()
            .then(n => {
              if (n == 0) {
                database.readChapters.put({
                  sourceId: sourceId,
                  mangaId: mangaId,
                  chapterId: chapterId,
                  lastPage: 0,
                  totalPage: pages.length
                });
              }
            });
        }));
  });

  function turnPage(n: number) {
    progress = progress - Math.sign(n);
    if (progress < 0) {
      goto(prevChapter ? `${prevChapter}?last=true` : mangaPage);
    } else if (progress >= pages.length) {
      goto(nextChapter ?? mangaPage);
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (event.button == 0) turnPage(-(event.clientX - screen.width * 0.33));
  }
</script>

<div class="fixed top-0 left-0 w-screen h-screen">
  <div class="flex w-full h-full" style="margin-left: {progress * -100}%;">
    {#each pages as page}
      <div class="flex min-w-full min-h-full justify-center cursor-pointer"
           on:pointerup={onPointerUp}>
        <img class="object-contain bg-auto bg-center"
             src={page.url}
             alt={page.url} />
      </div>
    {/each}
  </div>
</div>
