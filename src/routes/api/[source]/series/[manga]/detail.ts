import type { Request, Response } from "@sveltejs/kit";
import type { Source } from "tako/api/source";
import * as sources from "tako/sources";

export async function get(req: Request): Promise<Response> {
  const { source, manga } = req.params;
  const src: Source = sources[source];
  if (src) {
    return {
      body: await src.getDetail(manga)
    };
  }
}
