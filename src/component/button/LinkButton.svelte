<script lang="ts">
  export let href: string;
  export let newTab = false;
</script>

<a class="flex flex-col h-full transition-colors duration-100 ease-in-out hover:text-black dark:hover:text-white"
   {href} target={newTab ? "_blank" : "_self"}>
  <div class="p-2 m-auto">
    <slot />
  </div>
</a>