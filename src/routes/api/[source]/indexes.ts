import * as sources from "sources";

import type { EndpointOutput, Request } from "@sveltejs/kit";

import type { Source } from "api/model";

export async function get(req: Request): Promise<EndpointOutput> {
  const { source } = req.params;
  const src: Source = sources[source];
  return src ? { body: Object.keys(src.indexes) } : { status: 404 };
}
