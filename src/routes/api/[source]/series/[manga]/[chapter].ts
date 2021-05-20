import * as sources from "sources";

import type { EndpointOutput, Request } from "@sveltejs/kit";

import type { Source } from "api/model";

export async function get(req: Request): Promise<EndpointOutput> {
  const { source, manga, chapter } = req.params;
  const src: Source = sources[source];
  if (src) {
    return {
      body: await src.getPages(manga, chapter)
    };
  }
}
