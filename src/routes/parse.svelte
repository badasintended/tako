<script lang="ts">
  import Title from "tako/component/Title.svelte";
  import Parser from "tako/component/Parser.svelte";
</script>

<Title title="parse" />
<div class="absolute w-full h-screen top-0 left-0 flex flex-col">
  <div class="flex-grow"></div>
  <Parser />
  <div class="flex-grow"></div>
</div>