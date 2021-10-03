<script lang="ts">
  import "tako/app.scss";
  import { darkMode } from "tako/stores";
  import { onMount } from "svelte";
  import NavBar from "tako/component/navbar/NavBar.svelte";
  import { page } from "$app/stores";

  let showScrollBar = false;
  let mouseX = 0;
  let scrolling = false;
  let msSinceLastScroll = 0;

  onMount(() => {
    darkMode.set(localStorage.getItem("darkMode") === "true");
    darkMode.subscribe(value => localStorage.setItem("darkMode", value ? "true" : "false"));

    setInterval(() => {
      if (scrolling) msSinceLastScroll++;
      showScrollBar = (scrolling && msSinceLastScroll < 300) || mouseX > (window.innerWidth - 15);
    }, 1);
  });

  function onScroll() {
    scrolling = true;
    msSinceLastScroll = 0;
  }

  function onMouse(event: MouseEvent) {
    mouseX = event.clientX;
  }
</script>

<div class:dark={$darkMode}>
  <div class="w-full h-screen flex flex-col flex-auto bottom-0 dark:bg-one-b transition-colors duration-500 ease-out text-gray-500 dark:text-one-w">
    <NavBar />
    {#key $page.path}
      <div class="scroller flex-grow w-full overflow-y-auto overflow-y-scroll"
           class:scroller-hidden={!showScrollBar}
           on:scroll={onScroll}
           on:mousemove={onMouse}>
        <div class="w-full max-w-6xl mx-auto font-sans">
          <slot />
        </div>
      </div>
    {/key}
  </div>
</div>
