import type { ServerRequest } from "@sveltejs/kit/types/hooks";
import type { EndpointOutput } from "@sveltejs/kit";
import type { Source } from "tako/api/source";
import { sources } from "tako/sources";

export async function get(req: ServerRequest): Promise<EndpointOutput> {
  const { source, manga } = req.params;
  const src: Source = sources[source];
  if (src) {
    return {
      body: await src.getChapters(manga)
    };
  }
}