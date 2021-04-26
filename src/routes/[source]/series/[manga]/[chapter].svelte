<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source, manga, chapter } = page.params;
  const res = await fetch(`/api/${source}/series/${manga}/${chapter}`);
  if (res.status === 200) {
    return {
      props: {
        source,
        manga,
        chapter,
        pages: await res.json()
      }
    };
  }

  return {
    status: 404
  };
};
</script>

<script lang="ts">
import type { Chapter, MangaDetail, Page } from "api/model";
import { page, session } from "$app/stores";
import { db } from "client/db";
import { onMount } from "svelte";

export let source: string;
export let manga: string;
export let chapter: string;
export let pages: Page[];

let prevChapter = `/${source}/series/${manga}`;
let nextChapter = `/${source}/series/${manga}`;

let progress = $page.query.get("last") === "true" ? pages.length - 1 : 0;

onMount(async () => {
  const detail: MangaDetail = $session.manga;

  if (!(detail && detail.source === source && detail.id === manga)) {
    const detail = await fetch(`/api/${source}/series/${manga}/detail`);
    const chapters = await fetch(`/api/${source}/series/${manga}/chapters`);

    $session.manga = await detail.json();
    $session.chapters = (await chapters.json()).sort((a, b) => b.number - a.number);
  }

  const chapters: Chapter[] = $session.chapters;
  const i = chapters.findIndex((ch) => ch.id === chapter);
  if (0 <= i && i < chapters.length - 1) {
    prevChapter = `/${source}/series/${manga}/${chapters[i + 1].id}`;
  }
  if (0 < i && i < chapters.length) {
    nextChapter = `/${source}/series/${manga}/${chapters[i - 1].id}`;
  }

  db.readChapters
    .filter((ch) => ch.source === source && ch.manga === manga && ch.chapter === chapter)
    .count()
    .then((n) => {
      if (n === 0) {
        db.readChapters.put({ source, manga, chapter });
      }
    });
});

function turnPage(n: number) {
  progress = progress - Math.sign(n);
  if (progress < 0) {
    location.replace(`${prevChapter}?last=true`);
  } else if (progress >= pages.length) {
    location.replace(nextChapter);
  }
}

function onKey(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowLeft":
      turnPage(-1);
      break;
    case "ArrowRight":
      turnPage(+1);
      break;
  }
}

function onPointer(event: PointerEvent) {
  turnPage(-(event.clientX - screen.width * 0.33));
}
</script>

<svelte:window on:keyup={onKey} />

<div class="fixed top-0 left-0 h-screen">
  <div class="flex w-full h-full" style="margin-left: {progress * -100}%;">
    {#each pages as page}
      <div
        class="flex min-w-full min-h-full justify-center cursor-pointer"
        on:pointerup={onPointer}
      >
        <img
          class="object-contain bg-auto bg-center"
          style="background-image: url(/img/placeholder.png);"
          src={page.url}
          alt={page.url}
        />
      </div>
    {/each}
  </div>
</div>
