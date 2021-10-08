<script lang="ts">
  import Button from "tako/component/button/Button.svelte";

  export let state: boolean;
  export let onClick: () => {};
</script>

<div class={!state ? "text-gray-300 dark:text-gray-600" : ""}>
  <Button onClick={onClick ?? (() => state = !state)}>
    <slot />
  </Button>
</div>