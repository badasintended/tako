import * as sources from "sources";

import type { EndpointOutput, Request } from "@sveltejs/kit";

export async function get(req: Request<never, never>): Promise<EndpointOutput> {
  return { body: sources as any };
}
