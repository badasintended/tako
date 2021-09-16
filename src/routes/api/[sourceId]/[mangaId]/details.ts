import type { EndpointOutput } from "@sveltejs/kit";
import type { ServerRequest } from "@sveltejs/kit/types/hooks";
import { sources } from "tako/sources";

export async function get(req: ServerRequest): Promise<EndpointOutput> {
  const { sourceId, mangaId } = req.params;
  const source = sources[sourceId];
  if (source) {
    return {
      body: await source.getDetails(mangaId)
    };
  }
}