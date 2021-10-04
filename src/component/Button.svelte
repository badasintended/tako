<script lang="ts">
  export let onclick = () => {
  };
</script>

<button class="h-full w-9 text-center my-auto p-2 m-auto hover:text-black dark:hover:text-white"
        on:click={onclick}>
  <slot />
</button>