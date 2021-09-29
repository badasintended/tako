<script lang="ts">
  export let message: string;
</script>

<div class="absolute z-40 w-full h-screen top-0 left-0 bg-white dark:bg-one-b flex text-gray-500 dark:text-one-w">
  <div class="flex-grow"></div>
  <div class="flex flex-col text-center gap-y-3">
    <div class="flex-grow"></div>
    <div class="text-5xl">┬─┬ノ(ಠ_ಠノ)</div>
    {message}
    <div class="flex-grow"></div>
  </div>
  <div class="flex-grow"></div>
</div>