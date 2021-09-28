<script lang="ts">
  export let href: string;
</script>

<a class="flex flex-col h-full transition-colors duration-100 ease-in-out hover:text-black dark:hover:text-white"
   {href}>
  <div class="p-2 m-auto">
    <slot />
  </div>
</a>