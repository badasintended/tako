import * as sources from "sources";

import type { Request, Response } from "@sveltejs/kit";

import type { Source } from "api/model";

export async function get(req: Request): Promise<Response> {
  const { source, manga } = req.params;
  const page = +req.query.get("page") || 1;
  const src: Source = sources[source];
  if (src) {
    return {
      body: await src.getChapters(manga, page)
    };
  }
}
