<script lang="ts">
  export let key: string;
</script>

<div class="flex flex-col p-2">
  <div class="text-xs font-bold text-gray-500 leading-none">{key}</div>
  <div class="dark:text-one-w">
    <slot />
  </div>
</div>