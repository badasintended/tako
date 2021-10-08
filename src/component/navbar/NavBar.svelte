<script lang="ts">
  import { darkMode } from "tako/api/stores";
  import { faCog, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
  import { faGithub } from "@fortawesome/free-brands-svg-icons";
  import Fa from "svelte-fa";
  import Button from "tako/component/button/Button.svelte";
  import LinkButton from "tako/component/button/LinkButton.svelte";

  function toggleDarkMode() {
    darkMode.set(!$darkMode);
  }
</script>

<!-- navbar -->
<div
  class="navbar flex-shrink-0 z-50 sticky top-0 w-full h-14 transition-colors duration-500 ease-out border-b border-gray-200 bg-white dark:bg-one-b dark:border-gray-700">
  <div class="max-w-6xl mx-auto h-full flex px-4">
    <LinkButton href="/">library</LinkButton>
    <LinkButton href="/history">history</LinkButton>
    <LinkButton href="/parse">parse</LinkButton>

    <div class="flex-grow"></div>

    <Button onClick={toggleDarkMode}>
      <Fa icon={$darkMode ? faMoon : faSun} scale={1.1} />
    </Button>

    <LinkButton href="https://github.com/badasintended/tako">
      <Fa icon={faGithub} scale={1.1} />
    </LinkButton>
    <LinkButton href="/settings">
      <Fa icon={faCog} scale={1.1} />
    </LinkButton>
  </div>
</div>