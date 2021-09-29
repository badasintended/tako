<script context="module" lang="ts">
  import type { ErrorLoadInput, LoadOutput } from "@sveltejs/kit";

  export async function load(ctx: ErrorLoadInput): Promise<LoadOutput> {
    return {
      props: {
        message: ctx.error.message
      }
    };
  }
</script>

<script lang="ts">
  import Error from "tako/component/Error.svelte";

  export let message: string;
</script>

<Error {message} />