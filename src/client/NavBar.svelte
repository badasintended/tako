<script lang="ts">
import { goto } from "$app/navigation";

export let source: string;
</script>

<div
  class="fixed top-0 w-full max-w-6xl h-14 border-b border-gray-200 bg-white flex space-x-4 px-4"
>
  <button
    class="focus:outline-none h-full w-auto transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
    on:click={() => goto(`/${source ?? ""}`)}
    >{source ? `tako/${source}` : "tako"}</button
  >
  <div class="flex-grow" />
  <button
    class="focus:outline-none h-full w-auto transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
    on:click={() => goto("/sources")}>sources</button
  >
  <button
    class="focus:outline-none h-full w-auto transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
    on:click={() => goto("/library")}>library</button
  >
  <button
    class="focus:outline-none h-full w-auto transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
    on:click={() => goto("https://github.com/badasintended/tako")}
    >github</button
  >
</div>
