<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source, manga } = page.params;
  const detail = await fetch(`/api/${source}/series/${manga}/detail`);
  const pagination = await fetch(`/api/${source}/series/${manga}/chapters`);

  if (detail.status === 200 && pagination.status === 200) {
    return {
      props: {
        source: source,
        manga: await detail.json(),
        pagination: await pagination.json()
      }
    };
  }

  return {
    status: 404
  };
};
</script>

<script lang="ts">
import type { MangaDetail, ChapterPagination } from "tako/api/model";
import Chapters from "tako/client/Chapters.svelte";
import Detail from "tako/client/Detail.svelte";
import NavBar from "tako/client/NavBar.svelte";

export let source: string;
export let manga: MangaDetail;
export let pagination: ChapterPagination;
</script>

<NavBar {source} />

<div class="mt-14">
  <Detail {manga} />
  <Chapters {source} {manga} {pagination} />
</div>
