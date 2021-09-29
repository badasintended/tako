<script lang="ts">
  import Fa from "svelte-fa";
  import { fade } from "svelte/transition";
  import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
</script>

<div transition:fade={{duration: 500}} class="absolute z-40 w-full h-screen top-0 left-0 bg-white dark:bg-one-b flex text-gray-500 dark:text-one-w">
  <div class="flex-grow"></div>
  <div class="flex flex-col">
    <div class="flex-grow"></div>
    <Fa icon={faCircleNotch} size="3x" spin />
    <div class="flex-grow"></div>
  </div>
  <div class="flex-grow"></div>
</div>