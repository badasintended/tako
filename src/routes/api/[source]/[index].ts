import * as sources from "sources";

import type { EndpointOutput, Request } from "@sveltejs/kit";

import type { Source } from "api/model";

export async function get(req: Request): Promise<EndpointOutput> {
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
