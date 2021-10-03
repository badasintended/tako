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
  import Title from "tako/component/Title.svelte";

  export let message: string;
</script>

<Title title="error" />
<Error {message} />