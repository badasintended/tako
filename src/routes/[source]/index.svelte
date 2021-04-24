<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ page, fetch }) => {
  const { source } = page.params;

  const res = await fetch(`/api/${source}`);
  if (res.status === 200) {
    return {
      status: 302,
      redirect: `${source}/${await res.text()}`
    };
  }

  return {
    status: 404
  };
};
</script>
