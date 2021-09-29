<script lang="ts">
  import "tako/app.scss";
  import { darkMode } from "tako/stores";
  import { onMount } from "svelte";
  import NavBar from "tako/component/navbar/NavBar.svelte";

  onMount(() => {
    darkMode.set(localStorage.getItem("darkMode") === "true");
    darkMode.subscribe(value => localStorage.setItem("darkMode", value ? "true" : "false"));
  });
</script>

<div class:dark={$darkMode}>
  <div class="w-full h-screen flex flex-col flex-auto bottom-0 dark:bg-one-b transition-colors duration-500 ease-out">
    <NavBar />
    <div class="flex-grow w-full overflow-y-auto overflow-y-auto">
      <div class="w-full max-w-6xl mx-auto font-sans">
        <slot />
      </div>
    </div>
  </div>
</div>
