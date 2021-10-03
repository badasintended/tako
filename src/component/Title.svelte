<script lang="ts">
  export let title: string;
</script>

<svelte:head>
  <title>{title ? `${title} | tako` : "tako"}</title>
</svelte:head>