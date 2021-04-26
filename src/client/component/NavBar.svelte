<script lang="ts">
  export let sticky = true;
</script>

<div class="top-0 w-full max-w-6xl h-14 border-b border-gray-200 bg-white flex space-x-4 px-4"
     class:sticky>
  <a class="flex flex-col h-full transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
     href="/">
    <div class="my-auto">tako</div>
  </a>
  <div class="flex-grow"></div>
  <a class="flex flex-col h-full transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
     href="/sources">
    <div class="my-auto">sources</div>
  </a>
  <a class="flex flex-col h-full transition-colors duration-100 ease-in-out text-gray-500 hover:text-black"
     href="https://github.com/badasintended/tako">
    <div class="my-auto">github</div>
  </a
  >
</div>
