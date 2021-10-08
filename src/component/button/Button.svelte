<script lang="ts">
  export let onClick = () => {
  };
</script>

<button class="h-full text-center my-auto p-2 hover:text-black dark:hover:text-white"
        on:click={onClick}>
  <slot />
</button>