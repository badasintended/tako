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
import type { MangaDetail, ChapterPagination } from "api/model";
import Chapters from "client/component/Chapters.svelte";
import Detail from "client/component/Detail.svelte";
import NavBar from "client/component/NavBar.svelte";

export let source: string;
export let manga: MangaDetail;
export let pagination: ChapterPagination;
</script>

<NavBar {source} />

<Detail {source} {manga} />
<Chapters {source} {manga} {pagination} />
