<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source, manga, chapter } = page.params;
  const res = await fetch(`/api/${source}/series/${manga}/${chapter}`);
  if (res.status === 200) {
    return {
      props: {
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
import type { Page } from "tako/api/model";

export let pages: Page[];
</script>

{#each pages as page}
  <div>{page.url}</div>
{/each}
