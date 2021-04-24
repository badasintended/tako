import type { Request, Response } from "@sveltejs/kit";
import type { Source } from "tako/api/source";
import * as sources from "tako/sources";

export async function get(req: Request): Promise<Response> {
  const { source } = req.params;
  const src: Source = sources[source];
  return src ? { body: Object.values(src.indexes)[0].name } : { status: 404 };
}
