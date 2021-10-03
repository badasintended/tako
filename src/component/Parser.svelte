<script lang="ts">
  import type { ParseResult } from "tako/api/source";
  import { goto } from "$app/navigation";

  let url: string;

  function onKeyPress(event: KeyboardEvent) {
    if (url && event.key === "Enter") {
      fetch(`/api/parse?q=${url}`)
        .then(it => it.json() as ParseResult)
        .then(it => goto(`/${it.sourceId}/${it.mangaId}/${it.chapterId ?? ""}`));
    }
  }
</script>

<div class="mx-auto w-full max-w-3xl px-4 my-2">
  <input
    class="w-full py-2 px-4 bg-transparent border rounded-full border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400 placeholder-gray-500 text-black dark:text-one-w"
    type="text"
    autofocus
    placeholder="paste"
    on:keypress={onKeyPress}
    bind:value={url}>
</div>