import type { Request, Response } from "@sveltejs/kit";
import type { Source } from "tako/api/source";
import * as sources from "tako/sources";

export async function get(req: Request): Promise<Response> {
  const { source, index } = req.params;
  const page = +req.query.get("pages") || 1;
  const src: Source = sources[source];
  if (src) {
    const fun = src.indexes[index];
    if (fun) {
      return {
        status: 200,
        body: await fun(page)
      };
    }
  }
}
