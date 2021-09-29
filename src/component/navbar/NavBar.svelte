<script lang="ts">
  import { darkMode } from "tako/stores";
  import { faCog, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
  import { faGithub } from "@fortawesome/free-brands-svg-icons";
  import Link from "tako/component/navbar/Link.svelte";
  import Fa from "svelte-fa";

  function toggleDarkMode() {
    darkMode.set(!$darkMode);
  }
</script>

<!-- navbar -->
<div
  class="navbar flex-shrink-0 z-50 sticky top-0 w-full h-14 transition-colors duration-500 ease-out border-b border-gray-200 bg-white dark:bg-one-b dark:border-gray-700">
  <div class="max-w-6xl mx-auto h-full flex px-4">
    <Link href="/">library</Link>
    <Link href="/history">history</Link>
    <Link href="/parse">parse</Link>

    <div class="flex-grow"></div>

    <button class="h-full my-auto transition-colors duration-100 ease-in-out p-2 m-auto hover:text-black dark:hover:text-white"
            on:click={toggleDarkMode}>
      <Fa icon={$darkMode ? faMoon : faSun} scale={1.1} />
    </button>

    <Link href="https://github.com/badasintended/tako">
      <Fa icon={faGithub} scale={1.1} />
    </Link>
    <Link href="/settings">
      <Fa icon={faCog} scale={1.1} />
    </Link>
  </div>
</div>