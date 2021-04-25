import * as sources from "sources";

import type { Request, Response } from "@sveltejs/kit";

import type { Source } from "api/model";

export async function get(req: Request): Promise<Response> {
  const { source } = req.params;
  const src: Source = sources[source];
  return src ? { body: Object.values(src.indexes)[0].name } : { status: 404 };
}
